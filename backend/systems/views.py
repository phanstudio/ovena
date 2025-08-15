from rest_framework.views import APIView
from rest_framework.response import Response
from .utils.otp import send_otp, verify_otp

class SendOTPView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")
        if not phone_number:
            return Response({"error": "Phone number is required"}, status=400)

        result = send_otp(phone_number)
        return Response(result, status=200)

class VerifyOTPView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")
        otp_code = request.data.get("otp_code")

        if not phone_number or not otp_code:
            return Response({"error": "Phone number and OTP are required"}, status=400)

        if verify_otp(phone_number, otp_code):
            return Response({"message": "OTP verified successfully"}, status=200)
        return Response({"error": "Invalid or expired OTP"}, status=400)
