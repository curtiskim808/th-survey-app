Lockbox.master_key = ENV.fetch("LOCKBOX_MASTER_KEY") {
  if Rails.env.development? || Rails.env.test?
    # Provide a default key for development and testing only
    # In production, if this fallback runs, it will raise an error
    ["0c9ac05a3b0ef6bc8e91c2c65557b7030d9bc05a3b0ef6bc8e91c2c65557b704"].pack("H*") # Convert hex to binary
  else
    raise "Set LOCKBOX_MASTER_KEY environment variable for production."
  end
}