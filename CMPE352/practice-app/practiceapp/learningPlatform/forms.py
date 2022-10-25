from django import forms


class signUpForm(forms.Form):
    name_surname=forms.CharField(widget=forms.TextInput(attrs={'placeholder':'name surname'}))
    username=forms.CharField(widget=forms.TextInput(attrs={'placeholder':'username'}))
    password=forms.CharField(widget=forms.TextInput(attrs={'placeholder':'password'}))
    is_teacher=forms.BooleanField()

class signUpFormCheckUsername(forms.Form):
    check_username=forms.CharField(widget=forms.TextInput(attrs={'placeholder':'check_username'}))