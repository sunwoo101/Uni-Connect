using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Services;

namespace UniConnect;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.WebHost.UseUrls("http://localhost:5000");

        // Add services to the container.
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddControllers();
        
        builder.Services.AddScoped<AuthService>();
        builder.Services.AddScoped<PostService>();
        builder.Services.AddScoped<UploadService>();
        builder.Services.AddScoped<ProfileService>();

        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}