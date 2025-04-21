using Microsoft.EntityFrameworkCore;

namespace UniConnect.Models.Entities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Save> Saves { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Attendee> Attendees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Post>()
            .HasOne(p => p.Event)  // A Post has one Event
            .WithOne(e => e.Post)  // An Event is for one post
            .HasForeignKey<Event>(e => e.PostId)  // Event has a PostId that points to the Post
            .IsRequired(false);  // Make the relationship optional (Post can exist without an Event)

        modelBuilder.Entity<Friendship>()
        .HasOne(f => f.User) // A friendship includes the user who "owns" the friendship
        .WithMany(u => u.Friendships) // The user has many friendships as the "owner"
        .HasForeignKey(f => f.UserId) // Friendship has a UserId pointing to the User
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Friendship>()
        .HasOne(f => f.Friend) // A friendship includes the friend that was added by the user
        .WithMany() // No navigation property from the Friend back to Friendships (unidirectional)
        .HasForeignKey(f => f.FriendId) // Friendship has a FriendId pointing to the Friend
        .OnDelete(DeleteBehavior.Cascade);
    }
}