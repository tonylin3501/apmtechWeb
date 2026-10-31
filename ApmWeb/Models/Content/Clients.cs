namespace ApmWeb.Models.Content;

public record Client(string Name, string Logo, bool Dark = false);

public static class Clients
{
    // 近年案例在前；Dark 用於白字 logo，以深色底呈現
    public static readonly IReadOnlyList<Client> All = new Client[]
    {
        new("總統府", "about_logo_president.png"),
        new("國防部", "about_logo05.png"),
        new("國防醫學大學", "about_logo_ndmctsgh.png"),
        new("三軍總醫院", "about_logo01.png"),
        new("全民防衛動員署", "about_logo_aodm.png"),
        new("國軍歷史文物館", "about_logo_afmroc.jpg"),
        new("欣欣天然氣", "about_logo_shinshin.png"),
        new("欣高石油氣", "about_logo_shinkao.png"),
        new("陸軍專科學校", "about_logo_aaroc.png"),
        new("國防大學", "about_logo_ndu.png"),
        new("數位發展部", "about_logo_moda.svg"),
        new("國防部政風室", "about_logo_ethics.png"),
        new("中華民國軍人之友社", "about_logo_fafaroc.png", Dark: true),
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
