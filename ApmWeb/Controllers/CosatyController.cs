using ApmWeb.Models.Content;
using Microsoft.AspNetCore.Mvc;

namespace ApmWeb.Controllers;

public class CosatyController : Controller
{
    [Route("cosaty")]
    public IActionResult Index() => View();

    [Route("cosaty/endpoint")]
    public IActionResult Endpoint() => View();

    [Route("cosaty/{slug:regex(^(manager|action|usb|process)$)}")]
    public IActionResult Product(string slug)
    {
        var product = CosatyCatalog.Find(slug);
        if (product is null) return NotFound();
        return View(product);
    }
}
