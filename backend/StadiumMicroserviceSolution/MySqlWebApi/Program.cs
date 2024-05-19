using JwtAuthenticationManager;
using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCostumJwtAuthentication();


var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbPassword = Environment.GetEnvironmentVariable("DB_ROOT_PASSWORD");
var connectionstring = $"Server={dbHost};Initial Catalog={dbName};Port=3306;User Id=lab2admin;Password={dbPassword}";

builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseMySQL(connectionstring));

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed(origin => true)
                        .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
