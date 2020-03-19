using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Inventory.Models;
using Inventory.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private IInventoryService _service;

        public JsonFileItemService _itemService { get; }

        public ItemsController(IInventoryService service,
            JsonFileItemService itemService)
        {
            this._service = service;
            this._itemService = itemService;

        }
        
        [HttpGet("[action]")]
        public IActionResult GetItems()
        {
            try{
                IEnumerable<ItemModel> myItems = _itemService.GetItems();
                var allItems = _service.GetAllItems(myItems);
                return Ok(allItems);
                //return View(allItems);
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("SingleItem/{ItemId}")]
        public IActionResult GetItembyId(int ItemId)
        {
            var item = _service.GetItembyId(ItemId);
            return Ok(item);
        }

        [HttpPost("AddItem")]
        public IActionResult AddItem([FromBody]ItemModel item)
        {
            if (item != null)
            {
                _itemService.AddItem(item);
                _service.AddItem(item);
            }

            return Ok();
        }

        [HttpPost("UpdateItem/{ItemId}")]

        public IActionResult UpdateItem(int ItemId, [FromBody]ItemModel item)
        {
            _service.UpdateItem(ItemId, item);
            return Ok(item);
        }

        [HttpDelete("DeleteItem/{ItemId}")]
        public IActionResult DeleteItem(int ItemId)
        {
            _itemService.DeleteItem(ItemId);
            _service.DeleteItem(ItemId);
            return Ok(ItemId);
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}