import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-z0-9_]+$/, // lowercase only, clean and predictable
      lowercase: true, // enforce uniqueness consistently
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic sanity
    },

    password: {
      type: String,
      required: true,
      minlength: 10,
      select: false, // NEVER return passwords by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      select: false,
    },

    verificationTokenExpires: Date,

    isBanned: {
      type: Boolean,
      default: false,
    },

    lastLogin: Date,
  },
  { timestamps: true }
);

/* =====================
   INDEXES
===================== */
// Explicit compound unique index prevents race conditions
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

/* =====================
   PASSWORD HASHING
===================== */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* =====================
   METHODS
===================== */

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate verification token (hashed for security)
userSchema.methods.createVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.verificationToken = crypto.createHash("sha256").update(token).digest("hex");
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h expiry
  return token; // raw token to send via email
};

// Check if user is banned
userSchema.methods.isUserBanned = function () {
  return this.isBanned;
};

// Return public profile info (hide sensitive fields)
userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    role: this.role,
    isVerified: this.isVerified,
    lastLogin: this.lastLogin,
  };
};

export default mongoose.model("User", userSchema);
