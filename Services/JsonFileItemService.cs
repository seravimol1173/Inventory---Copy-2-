using Inventory.Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Inventory.Services
{
    public class JsonFileItemService
    {
        public JsonFileItemService(IWebHostEnvironment webHostEnvironment)
        {
            WebHostEnvironment = webHostEnvironment;

        }

        public IWebHostEnvironment WebHostEnvironment { get; }

        private String JsonFileName
        {
            get { return Path.Combine(WebHostEnvironment.WebRootPath, "data", "Inventory.json"); }
        }

        public IEnumerable<ItemModel> GetItems()
        {
            IEnumerable<ItemModel> temp;

            using(var jsonFileReader = File.OpenText(JsonFileName))
            {
                temp = JsonSerializer.Deserialize<ItemModel[]>(jsonFileReader.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            return temp;
        }

        public void AddItem(ItemModel newItem)
        {
            var Items = GetItems();

            List<ItemModel> newItems = Items.ToList();
            newItems.Add(newItem);

            IEnumerable<ItemModel> sortedItems =
                from Item in newItems
                orderby Item.ItemCategory ascending, Item.ItemName ascending
                select Item;

            //var query = Items.First(x => x.ItemId == ItemId);
            File.WriteAllText(JsonFileName, "");
            using (var outputStream = File.OpenWrite(JsonFileName))
            {
                JsonSerializer.Serialize<IEnumerable<ItemModel>>(
                    new Utf8JsonWriter(outputStream, new JsonWriterOptions
                    {
                        SkipValidation = true,
                        Indented = true
                    }),
                    sortedItems
                    );
            }
        }

        public void DeleteItem(int ItemId)
        {
            IEnumerable<ItemModel> Items = GetItems();
           
            Items = Items.Where(i => i.ItemId != ItemId).ToList();

            // IEnumerable<ItemModel> query = Items.First(x => x.ItemId != ItemId);
            File.WriteAllText(JsonFileName, "");
            using (var outputStream = File.OpenWrite(JsonFileName))
            {
                //JsonSerializer serializer = new JsonSerializer();
                ////serialize object directly into file stream
                //serializer.Serialize(outputStream, Items);
                JsonSerializer.Serialize<IEnumerable<ItemModel>>(
                    new Utf8JsonWriter(outputStream, new JsonWriterOptions
                    {
                        SkipValidation = false,
                        Indented = true
                    }),
                    Items
                    //(IEnumerable<ItemModel>)query
                    );
            }
        }
    }
}
