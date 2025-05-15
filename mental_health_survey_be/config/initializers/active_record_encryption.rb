Rails.application.config.active_record.encryption.configure(
  primary_key: ENV["AR_ENCRYPTION_PRIMARY_KEY"] || raise("Missing AR_ENCRYPTION_PRIMARY_KEY"),
  deterministic_key: ENV["AR_ENCRYPTION_DETERMINISTIC_KEY"] || raise("Missing AR_ENCRYPTION_DETERMINISTIC_KEY"),
  key_derivation_salt: ENV["AR_ENCRYPTION_KEY_DERIVATION_SALT"] || raise("Missing AR_ENCRYPTION_KEY_DERIVATION_SALT")
)