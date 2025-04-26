using Microsoft.EntityFrameworkCore;

namespace UniConnect.Models.Entities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Attendee> Attendees { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Save> Saves { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Post>()
            .HasOne(p => p.Event)  // A Post has one Event
            .WithOne(e => e.Post)  // An Event is for one post
            .HasForeignKey<Event>(e => e.PostId)  // Event has a PostId that points to the Post
            .IsRequired(false);  // Make the relationship optional (Post can exist without an Event)

        // Configure Friendship relationships
        modelBuilder.Entity<Friendship>(entity =>
        {
            entity.HasOne(f => f.User)
                .WithMany(u => u.Friendships)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(f => f.Friend)
                .WithMany()
                .HasForeignKey(f => f.FriendId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Configure Like relationships
        modelBuilder.Entity<Like>(entity =>
        {
            entity.HasOne(l => l.User)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(l => l.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Configure Save relationships
        modelBuilder.Entity<Save>(entity =>
        {
            entity.HasOne(s => s.User)
                .WithMany(u => u.Saves)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(s => s.Post)
                .WithMany(p => p.Saves)
                .HasForeignKey(s => s.PostId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Configure Comment relationships
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(c => c.ParentComment)
                .WithMany(c => c.Replies)
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}