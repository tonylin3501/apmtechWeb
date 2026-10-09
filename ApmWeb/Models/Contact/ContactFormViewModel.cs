using System.ComponentModel.DataAnnotations;

namespace ApmWeb.Models.Contact;

public class ContactFormViewModel
{
    [Display(Name = "您的大名")]
    [Required(ErrorMessage = "請輸入姓名")]
    [StringLength(50, ErrorMessage = "姓名最多 50 個字")]
    public string Name { get; set; } = "";

    [Display(Name = "Email")]
    [Required(ErrorMessage = "請輸入 Email")]
    [EmailAddress(ErrorMessage = "Email 格式不正確")]
    [StringLength(100, ErrorMessage = "Email 最多 100 個字")]
    public string Email { get; set; } = "";

    [Display(Name = "聯絡電話")]
    [Required(ErrorMessage = "請輸入聯絡電話")]
    [StringLength(30, ErrorMessage = "電話最多 30 個字")]
    [RegularExpression(@"^[0-9+\-\s()#]{7,30}$", ErrorMessage = "電話格式不正確")]
    public string Phone { get; set; } = "";

    [Display(Name = "留言內容")]
    [Required(ErrorMessage = "請輸入留言內容")]
    [StringLength(2000, MinimumLength = 10, ErrorMessage = "內容請輸入 10 至 2000 個字")]
    public string Message { get; set; } = "";

    /// <summary>Honeypot 欄位：真人看不到也不會填，機器人填了就視為垃圾訊息。</summary>
    public string? Website { get; set; }
}
