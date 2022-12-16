from django.core.mail import send_mail

from django.conf import settings 
import random
import string

def send_forget_password_mail(email , password ):
  
    subject = 'Your forget password link'
    message = f'Hi, your new password is {password}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]

    print(subject,message,email_from,recipient_list)
    send_mail(subject, message, email_from, recipient_list)
    return True
def get_random_string(length):
    # With combination of lower and upper case
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(length))
    # print random string
    return(result_str)