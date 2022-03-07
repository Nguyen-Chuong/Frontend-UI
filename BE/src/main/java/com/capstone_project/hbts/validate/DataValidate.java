package com.capstone_project.hbts.validate;

import org.springframework.stereotype.Component;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

@Component
public class DataValidate {

    static final String SECRET_KEY = "06052000";

    public Integer convertEncryptedData(String dataEncrypted) {

        // specify secret key
        SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET_KEY.getBytes(), "DES");

        try {
            // new an object to help decrypt data
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5PADDING");
            // decode data encrypt string to byte[]
            byte[] dataNeedToDecrypted = Base64.getDecoder().decode(dataEncrypted);
            // init cipher decrypt mode with key
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            // get the data byte[] decrypted after decrypt
            byte[] byteDecrypted = cipher.doFinal(dataNeedToDecrypted);
            // convert data byte[] to string
            String decrypted = new String(byteDecrypted);
            // convert string data to int
            return Integer.parseInt(decrypted);
        } catch (NoSuchAlgorithmException |
                NoSuchPaddingException |
                InvalidKeyException |
                IllegalBlockSizeException |
                BadPaddingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
