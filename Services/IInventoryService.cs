using Inventory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Services
{
    public interface IInventoryService
    {
        List<ItemModel> GetAllItems(IEnumerable<ItemModel> myItems);

        ItemModel GetItembyId(int ItemId);

        void UpdateItem(int ItemId, ItemModel item);

        void DeleteItem(int ItemId);

        void AddItem(ItemModel item);
    }
}
