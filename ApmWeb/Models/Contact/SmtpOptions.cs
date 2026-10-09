namespace ApmWeb.Models.Contact;

public class SmtpOptions
{
    public string Host { get; set; } = "";
    public int Port { get; set; } = 587;
    public string SecureSocketOptions { get; set; } = "StartTls";
    public string UserName { get; set; } = "";
    public string Password { get; set; } = "";
    public string FromName { get; set; } = "千機科技官網";
    public string FromAddress { get; set; } = "";
    public string ToAddress { get; set; } = "";
}
