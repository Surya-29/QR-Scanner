import segno

qr = segno.make_qr("xyz@gmail.com")
qr.save("qrcode.png", scale=20)
