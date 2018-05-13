package be.noeson.myfinancialmanager.utils;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class NumberUtils {

    public static BigDecimal parseCommaSeparatedDecimal(String str){
        try{
            BigDecimal bd = new BigDecimal(NumberFormat.getNumberInstance(Locale.FRANCE).parse(str).doubleValue());
            bd = bd.setScale(2, BigDecimal.ROUND_HALF_UP);
            return bd;
        }
        catch(ParseException e){
            throw new RuntimeException("Unable to parse the following value : "+str, e);
        }
    }

}
