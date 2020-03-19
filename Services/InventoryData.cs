using Inventory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Services
{
    public static class InventoryData
    {
        public static List<ItemModel> Items => allItems;
        static List<ItemModel> allItems = new List<ItemModel>()
        {
            new ItemModel()
                {
                ItemId     = 1,
                ItemCategory = "Electronics",
                    ItemName = "TV",
                    ItemValue = 2000
                },
            new ItemModel()
            {
                ItemId     = 2,
                ItemCategory = "Electronics",
                ItemName = "Playstation",
                ItemValue = 400
            },
            new ItemModel()
            {
                ItemId     = 3,
                ItemCategory = "Electronics",
                ItemName = "Stereo",
                ItemValue = 1600
            },
            new ItemModel()
            {
                ItemId     = 4,
                ItemCategory = "Clothings",
                ItemName = "Shirts",
                ItemValue = 1100
            },
            new ItemModel()
            {
                ItemId     = 5,
                ItemCategory = "Clothings",
                ItemName = "Jeans",
                ItemValue = 1100
            },
            new ItemModel()
            {
                ItemId     = 6,
                ItemCategory = "Clothings",
                ItemName = "Socks",
                ItemValue = 1600
            },
            new ItemModel()
            {
                ItemId     = 7,
                ItemCategory = "Kitchen",
                ItemName = "Pots and Pans",
                ItemValue = 3000
            },
            new ItemModel()
            {
                ItemId     = 8,
                ItemCategory = "Kitchen",
                ItemName = "Flatware",
                ItemValue = 500
            },
            new ItemModel()
            {
                ItemId     = 9,
                ItemCategory = "Kitchen",
                ItemName = "Knife Set",
                ItemValue = 500
            },
            new ItemModel()
            {
                ItemId     = 10,
                ItemCategory = "Kitchen",
                ItemName = "Misc",
                ItemValue = 1000
            }
        };
    }
}
