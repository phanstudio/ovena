from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
# from django.contrib.gis.db import models as gis_modles

class UserManager(BaseUserManager):
    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        if not email and not phone_number:
            raise ValueError("User must have either an email or phone number")

        if email:
            email = self.normalize_email(email)
            extra_fields["email"] = email

        user = self.model(phone_number=phone_number, **extra_fields)

        if user.is_staff or user.is_superuser:
            if not password:
                raise ValueError("Admins must have a password")
            user.set_password(password)
        else:
            user.set_unusable_password()  # OTP-based login

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email=email, password=password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=18, unique=True, null=True, blank=True)
    name = models.CharField(max_length=150)

    role = models.CharField(max_length=20, choices=[
        ("customer", "Customer"),
        ("driver", "Driver"),
        ("restaurant", "Restaurant"),
    ])

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # how to swap
    USERNAME_FIELD = "email"   # but you can swap to phone if OTP-only
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email or self.phone_number

class Address(models.Model):
    address = models.CharField(max_length=255)  
    # location = gis_modles.PointField(geography=True)  
    latitude = models.FloatField()
    longitude = models.FloatField()
    label = models.CharField(max_length=50, blank=True, null=True)  # e.g. "Home", "Work", "Other"
    # place_id = models.CharField(max_length=100, blank=True, null=True)  # optional: Google place_id
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.label or ''} - {self.address}"

class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer_profile")
    birth_date = models.DateField(null=True, blank=True)
    addresses = models.ManyToManyField(Address, related_name="customers", blank=True)
    default_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True, related_name="default_for_customers")

    @property
    def age(self):
        from datetime import date
        if not self.birth_date:
            return None
        today = date.today()
        return today.year - self.birth_date.year - (
            (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )

class DriverProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="driver_profile")
    nin = models.CharField(max_length=50)
    driver_license = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=20)
    vehicle_type = models.CharField(max_length=50)
    photo = models.ImageField(upload_to="drivers/photos/")

class RestaurantProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="restaurant_profile")
    company_name = models.CharField(max_length=255)
    branch = models.CharField(max_length=255, blank=True)
    phone_number2 = models.CharField(max_length=20, blank=True)
    certification = models.FileField(upload_to="restaurants/certs/", null=True, blank=True)
    bn_number = models.CharField(max_length=100)  # Business number
    location = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="restaurants")
