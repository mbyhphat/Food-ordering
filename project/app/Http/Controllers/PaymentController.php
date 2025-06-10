<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
  public function vnpay_payment(Request $request)
  {
    $data = $request->all();
    $code_cart = rand(00, 9999);
    $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    $vnp_Returnurl = "http://localhost:8001/api/vnpay_return";
    $vnp_TmnCode = "L8EFGN9D"; //Mã website tại VNPAY 
    $vnp_HashSecret = "F0KX0WOS2RPRR6DI5H7F6Z8GB7CSD3RY"; //Chuỗi bí mật

    $vnp_TxnRef = $code_cart; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
    $vnp_OrderInfo = 'Thanh toán đơn hàng đặt đồ ăn';
    $vnp_OrderType = 'Mama Kitchen';

    // Sử dụng giá trị từ request thay vì giá trị cố định
    $vnp_Amount = $request->input('amount', 1000) * 100; // Sử dụng giá trị mặc định 1000 nếu không có giá trị từ request

    $vnp_Locale = 'vn';
    // $vnp_BankCode = 'NCB';
    $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

    $inputData = array(
      "vnp_Version" => "2.1.0",
      "vnp_TmnCode" => $vnp_TmnCode,
      "vnp_Amount" => $vnp_Amount,
      "vnp_Command" => "pay",
      "vnp_CreateDate" => date('YmdHis'),
      "vnp_CurrCode" => "VND",
      "vnp_IpAddr" => $vnp_IpAddr,
      "vnp_Locale" => $vnp_Locale,
      "vnp_OrderInfo" => $vnp_OrderInfo,
      "vnp_OrderType" => $vnp_OrderType,
      "vnp_ReturnUrl" => $vnp_Returnurl,
      "vnp_TxnRef" => $vnp_TxnRef,

    );

    if (isset($vnp_BankCode) && $vnp_BankCode != "") {
      $inputData['vnp_BankCode'] = $vnp_BankCode;
    }
    if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
      $inputData['vnp_Bill_State'] = $vnp_Bill_State;
    }

    //var_dump($inputData);
    ksort($inputData);
    $query = "";
    $i = 0;
    $hashdata = "";
    foreach ($inputData as $key => $value) {
      if ($i == 1) {
        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
      } else {
        $hashdata .= urlencode($key) . "=" . urlencode($value);
        $i = 1;
      }
      $query .= urlencode($key) . "=" . urlencode($value) . '&';
    }

    $vnp_Url = $vnp_Url . "?" . $query;
    if (isset($vnp_HashSecret)) {
      $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
      $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
    }
    $returnData = array(
      'code' => '00',
      'message' => 'success',
      'data' => $vnp_Url
    );
    if (isset($_POST['redirect'])) {
      header('Location: ' . $vnp_Url);
      die();
    } else {
      echo json_encode($returnData);
    }
  }

  public function vnpay_return(Request $request)
  {
    // Tạo một trang HTML tự động chuyển hướng và reset
    $html = '
    <!DOCTYPE html>
    <html>
    <head>
        <title>Đang chuyển hướng...</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #f8f9fa;
            }
            .success-message {
                background-color: #d4edda;
                color: #155724;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #c3e6cb;
            }
            .loading {
                color: #6c757d;
            }
        </style>
        <script>
            // Hiển thị thông báo thành công trước
            setTimeout(function() {
                // Xóa tất cả localStorage và sessionStorage
                // localStorage.clear();
                // sessionStorage.clear();
                
                // Chuyển hướng về trang chính và reload
                window.location.replace("http://localhost:3000/");
            }, 1000); // Đợi 5 giây để người dùng đọc thông báo
            
            // Backup: nếu replace không hoạt động
            setTimeout(function() {
                window.location.href = "http://localhost:3000/";
                window.location.reload(true);
            }, 1500);
            }, 1500);
        </script>
    </head>
    <body>
        <div class="success-message">
            <h2>✅ Đã thanh toán thành công!</h2>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
        </div>
        <p class="loading">Đang chuyển về trang chính...</p>
    </body>
    </html>';

    return response($html)->header('Content-Type', 'text/html');
  }
}
