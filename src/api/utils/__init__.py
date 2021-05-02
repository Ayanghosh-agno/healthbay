import hashlib


def generate_sha_256_hash(*args, **kwargs) -> str:
    s = ""
    for val in args:
        s += val
    return hashlib.sha256(s.encode()).hexdigest()
