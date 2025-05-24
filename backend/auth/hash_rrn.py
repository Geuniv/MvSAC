from passlib.context import CryptContext

class HashRrn:
    def __init__(self):
        self.rrn_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_rrn(self, rrn: str):
        return self.rrn_context.hash(rrn)
    
    def verify_rrn(self, plain_rrn: str, hashed_rrn: str):
        return self.rrn_context.verify(plain_rrn, hashed_rrn)
