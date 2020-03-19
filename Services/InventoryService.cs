using Inventory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Services
{
    class NameComparer : IComparer<string>
    {
        public int Compare(string x, string y)
        {
            return string.Compare(x, y, true);
        }
    }
    public class InventoryService : IInventoryService
    {
        public void AddItem(ItemModel item)
        {
            InventoryData.Items.Add(item);
        }

        public void DeleteItem(int itemId)
        {
            var item = InventoryData.Items.FirstOrDefault(n => n.ItemId == itemId);

            if (item != null)
            {
                InventoryData.Items.Remove(item);

            }
        }

        //public List<ItemModel> GetAllItems() => InventoryData.Items.ToList();
        public List<ItemModel> GetAllItems(IEnumerable<ItemModel> myItems)
        {
            //List<ItemModel> myItems = InventoryData.Items.ToList();
            List<ItemModel> myItemsFormated = new List<ItemModel>();
            
            string oldCategory;
            int catTotal = 0;
            int grandTotal = 0;

            var intermediate = myItems.OrderBy(n => n.ItemCategory, new NameComparer()).ToArray();
            

            oldCategory = intermediate[0].ItemCategory;
            foreach(ItemModel temp in intermediate)
            {
                if(!string.Equals(oldCategory, temp.ItemCategory))
                {
                    ItemModel oldItem = new ItemModel();
                    oldItem.ItemName = "";
                    oldItem.ItemValue = catTotal;
                    oldItem.ItemId = 100000 + temp.ItemId;
                    oldItem.ItemCategory = oldCategory.ToString();

                    //oldItem.ItemCategory = temp.ItemCategory.ToString();
                    myItemsFormated.Add(oldItem);
                    catTotal = 0;
                }
                //else
                //{
                    catTotal = catTotal + temp.ItemValue;
                    myItemsFormated.Add(temp);

               // }
                grandTotal+=temp.ItemValue;

                oldCategory = temp.ItemCategory.ToString();
            }
            ItemModel LastlItem = new ItemModel();
            LastlItem.ItemCategory = oldCategory;
            LastlItem.ItemName = "";
            LastlItem.ItemValue = catTotal;
            LastlItem.ItemId = 1000000;
            myItemsFormated.Add(LastlItem);

            ItemModel totalItem = new ItemModel();
            totalItem.ItemCategory = "Total";
            totalItem.ItemName = "";
            totalItem.ItemValue = grandTotal;
            totalItem.ItemId = 2000000;
            myItemsFormated.Add(totalItem);


            IEnumerable<ItemModel> sortedItems =
                from Item in myItemsFormated
                orderby Item.ItemCategory ascending, Item.ItemName ascending
                select Item;

            return sortedItems.ToList();
        }



        //public ItemModel GetItembyId(int itemId) => InventoryData.Items.FirstOrDefault(n => n.ItemId == itemId);
        public ItemModel GetItembyId(int itemId)
        {
            ItemModel temp = InventoryData.Items.FirstOrDefault(n => n.ItemId == itemId);

            return temp;
        }
        public void UpdateItem(int itemId, ItemModel item)
        {
            var oldItem = InventoryData.Items.FirstOrDefault(n => n.ItemId == itemId);
            if (oldItem != null)
            {
                oldItem.ItemName = item.ItemName;
                oldItem.ItemCategory = item.ItemCategory;
                oldItem.ItemValue = item.ItemValue;
            }
        }
    }
}
