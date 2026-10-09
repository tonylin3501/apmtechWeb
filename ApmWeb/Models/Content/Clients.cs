namespace ApmWeb.Models.Content;

public record Client(string Name, string Logo);

public static class Clients
{
    public static readonly IReadOnlyList<Client> All = new Client[]
    {
        new("國防部", "about_logo05.png"),
        new("國防醫學大學", "about_logo_ndmctsgh.png"),
        new("國軍歷史館", "about_logo_afmroc.jpg"),
        new("三軍總醫院", "about_logo01.png"),
        new("全民防衛動員室", "about_logo_aodm.png"),
        new("中國信託", "about_logo04.png"),
        new("大同電腦", "about_logo_Tatung.png"),
        new("訊達電腦", "about_logo_sion.jpg"),
        new("台灣微軟", "about_logo02.png"),
        new("資策會", "about_logo08.png"),
        new("蘇黎世保險", "about_logo09.png"),
        new("台灣大學", "about_logo03.png"),
        new("中華大學", "about_logo07.png"),
        new("國家文官學院", "about_logo06.png"),
    };
}
