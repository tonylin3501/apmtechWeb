namespace ApmWeb.Models.Cosaty;

public record CosatyProduct(
    string Slug,
    string Name,
    string Price,
    string Summary,
    IReadOnlyList<string> Features,
    string PdfFile);

public record CosatyDownload(string Name, string PdfFile, string Note);
