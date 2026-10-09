using System.Net;
using ApmWeb.Models.Contact;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ApmWeb.Services;

public class MailKitContactMailer : IContactMailer
{
    private readonly SmtpOptions _options;

    public MailKitContactMailer(IOptions<SmtpOptions> options) => _options = options.Value;

    public async Task SendAsync(ContactFormViewModel form, string? remoteIp, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_options.Host) ||
            string.IsNullOrWhiteSpace(_options.FromAddress) ||
            string.IsNullOrWhiteSpace(_options.ToAddress))
        {
            throw new InvalidOperationException("SMTP 尚未設定（Smtp:Host / FromAddress / ToAddress）。");
        }

        var now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        string Enc(string? s) => WebUtility.HtmlEncode(s ?? "");

        var text = string.Join("\n",
            "姓名：" + form.Name,
            "Email：" + form.Email,
            "電話：" + form.Phone,
            "時間：" + now,
            "IP：" + remoteIp,
            "",
            form.Message);

        var html =
            "<p><strong>姓名：</strong>" + Enc(form.Name) + "<br>" +
            "<strong>Email：</strong>" + Enc(form.Email) + "<br>" +
            "<strong>電話：</strong>" + Enc(form.Phone) + "<br>" +
            "<strong>時間：</strong>" + now + "<br>" +
            "<strong>IP：</strong>" + Enc(remoteIp) + "</p><hr>" +
            "<p>" + Enc(form.Message).Replace("\n", "<br>") + "</p>";

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        message.To.Add(MailboxAddress.Parse(_options.ToAddress));
        message.ReplyTo.Add(new MailboxAddress(form.Name, form.Email));
        message.Subject = "[官網聯絡] " + form.Name;
        message.Body = new BodyBuilder { TextBody = text, HtmlBody = html }.ToMessageBody();

        var secure = Enum.TryParse<SecureSocketOptions>(_options.SecureSocketOptions, true, out var parsed)
            ? parsed
            : SecureSocketOptions.StartTls;

        using var client = new SmtpClient();
        await client.ConnectAsync(_options.Host, _options.Port, secure, cancellationToken);
        if (!string.IsNullOrEmpty(_options.UserName))
        {
            await client.AuthenticateAsync(_options.UserName, _options.Password, cancellationToken);
        }
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }
}
