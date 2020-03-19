using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Inventory.Models
{
    [Serializable]
    public class ItemModel
    {
        public int ItemId { get; set; }
        public string ItemCategory { get; set; }
        public string ItemName { get; set; }

        public int ItemValue { get; set; }

        public override string ToString() => JsonSerializer.Serialize<ItemModel>(this);
    }
}
