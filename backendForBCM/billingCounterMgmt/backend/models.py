from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, firstName, lastName, password=None, password2=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            firstName=firstName,
            lastName=lastName,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstName, lastName, password=None):
        """
        Creates and saves a superuser with the given email, firstName,lastName and password.
        """
        user = self.create_user(
            email,
            password=password,
            firstName=firstName,
            lastName=lastName,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['lastName', 'firstName']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Customer(models.Model):
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20, unique=True)
    email = models.EmailField(verbose_name='Email',
        max_length=255,
        )
    dob = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Bill(models.Model):
    billno = models.IntegerField(unique=True)
    mobile = models.CharField(max_length=20)
    billdate = models.DateField()
    counter = models.IntegerField(default=1)
    cashier = models.CharField(max_length=100)
    paymentmode = models.CharField(max_length=10)

class BillItem(models.Model):
    billNum = models.IntegerField(unique=True)
    item = models.CharField(max_length=100)
    price = models.IntegerField()
    quantity = models.IntegerField()
