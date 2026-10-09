using ApmWeb.Models.Contact;

namespace ApmWeb.Services;

public interface IContactMailer
{
    Task SendAsync(ContactFormViewModel form, string? remoteIp, CancellationToken cancellationToken = default);
}
