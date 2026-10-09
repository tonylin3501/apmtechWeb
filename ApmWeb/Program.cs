using System.Threading.RateLimiting;
using ApmWeb.Models.Contact;
using ApmWeb.Services;
using Microsoft.AspNetCore.Rewrite;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddResponseCompression();
builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddScoped<IContactMailer, MailKitContactMailer>();
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("contact", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5,
            Window = TimeSpan.FromMinutes(10),
            QueueLimit = 0
        }));
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error/500");
    app.UseHsts();
}

// 舊 WebForms / 靜態 html 網址 301 轉址到新的乾淨路徑，保留既有 SEO 權重
var redirects = new (string Old, string New)[]
{
    ("index|default|index3", "/"),
    ("about|aboutcompany", "/about"),
    ("news|news_announce", "/news"),
    ("project|project_development", "/project"),
    ("success|success_case", "/success"),
    ("map|website_guide", "/sitemap"),
    ("policy", "/policy"),
    ("dm2", "/cosaty"),
    ("dm", "/cosaty/endpoint"),
    ("cosatymanager", "/cosaty/manager"),
    ("cosatyaction", "/cosaty/action"),
    ("cosatyusb", "/cosaty/usb"),
    ("cosatyprocess", "/cosaty/process"),
    ("contact|contact_us|calltel", "/contact"),
};
var rewrite = new RewriteOptions();
foreach (var (oldNames, newPath) in redirects)
{
    rewrite.AddRedirect($@"(?i)^({oldNames})\.(aspx|html?)$", newPath, StatusCodes.Status301MovedPermanently);
}
app.UseRewriter(rewrite);

app.UseStatusCodePagesWithReExecute("/error/{0}");
app.UseHttpsRedirection();
app.UseResponseCompression();
app.UseStaticFiles();
app.UseRouting();
app.UseRateLimiter();
app.MapControllers();

app.Run();
