using ApmWeb.Models.Contact;
using ApmWeb.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ApmWeb.Controllers;

public class ContactController : Controller
{
    private readonly IContactMailer _mailer;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IContactMailer mailer, ILogger<ContactController> logger)
    {
        _mailer = mailer;
        _logger = logger;
    }

    [HttpGet("contact")]
    public IActionResult Index() => View(new ContactFormViewModel());

    [HttpPost("contact")]
    [ValidateAntiForgeryToken]
    [EnableRateLimiting("contact")]
    public async Task<IActionResult> Send(ContactFormViewModel model, CancellationToken cancellationToken)
    {
        // Honeypot：機器人才會填這個欄位，假裝成功但不寄信
        if (!string.IsNullOrWhiteSpace(model.Website))
        {
            return RedirectToAction(nameof(Thanks));
        }

        if (!ModelState.IsValid)
        {
            return View(nameof(Index), model);
        }

        try
        {
            await _mailer.SendAsync(model, HttpContext.Connection.RemoteIpAddress?.ToString(), cancellationToken);
            return RedirectToAction(nameof(Thanks));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "聯絡表單寄信失敗");
            ModelState.AddModelError(string.Empty, "訊息寄送失敗，請稍後再試，或直接來電、來信與我們聯繫。");
            return View(nameof(Index), model);
        }
    }

    [HttpGet("contact/thanks")]
    public IActionResult Thanks() => View();
}
