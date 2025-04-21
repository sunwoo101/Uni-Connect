using Microsoft.EntityFrameworkCore;

namespace UniConnect.Models.Entities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Save> Saves { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>()
            .HasOne(p => p.Event)  // A Post has one Event
            .WithOne(e => e.Post)  // An Event is for one post
            .HasForeignKey<Event>(e => e.PostId)  // Event holds the foreign key (PostId in Event)
            .IsRequired(false);  // Make the relationship optional (Post can exist without an Event)

        base.OnModelCreating(modelBuilder);
    }
}