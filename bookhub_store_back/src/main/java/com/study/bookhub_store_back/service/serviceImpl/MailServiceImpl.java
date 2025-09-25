package com.study.bookhub_store_back.service.serviceImpl;

import com.study.bookhub_store_back.dto.ResponseDto;
import com.study.bookhub_store_back.entity.Customer;
import com.study.bookhub_store_back.repository.CustomerRepository;
import com.study.bookhub_store_back.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender javaMailSender;

    public ResponseDto<Void> sendVerificationEmail(String email, String code) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("북허브 스토어 이메일 인증");

            String content = """
                    <!DOCTYPE html>
                    <html>
                    <body>
                    <div style="margin:50px;">
                        <h3> 북허브 스토어 이메일 인증 </h3>
                        <br>
                        <div align="center" style="border:1px solid black; padding: 20px;">
                            <p> 아래 인증번호를 입력해주세요 </p>
                            <p style="color:blue;">%s</p>
                        </div>
                        <br/>
                    </div>
                    </body>
                    </html>
                    """.formatted(code);

            mimeMessageHelper.setText(content, true);
            javaMailSender.send(mimeMessage);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseDto.success("SU", "인증 메일 전송 성공");
    }

}
