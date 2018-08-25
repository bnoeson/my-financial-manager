package be.noeson.myfinancialmanager.bankaccount.control;

import be.noeson.myfinancialmanager.bankaccount.entity.TransactionEntity;
import be.noeson.myfinancialmanager.commons.exception.DuplicateTransactionFoundException;
import be.noeson.myfinancialmanager.commons.exception.EmptyLineFoundException;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.batch.item.file.transform.FieldSet;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class TransactionEntityFieldSetMapperUnitTest {

    @Mock
    private FieldSet fieldSet;

    @Rule
    public ExpectedException expectedEx = ExpectedException.none();

    private TransactionFieldSetMapper testObject;

    private String sequenceNumberIn = "12-APZ-12";
    private String sequenceNumberOut = sequenceNumberIn;

    private String executionDateIn = "29/12/2015";
    private LocalDate executionDateOut = LocalDate.of(2015,12,29);

    private String valueDateIn = "01/01/2000";
    private LocalDate valueDateOut = LocalDate.of(2000,1,1);

    private String amountIn = "10,86";
    private BigDecimal amountOut = new BigDecimal("10.86");

    private String currencyIn = "EUR";
    private String currencyOut = "EUR";

    private String counterpartyIn = "BE123456789";
    private String counterpartyOut = "BE123456789";

    private String detailsIn = "DETAILS";
    private String detailsOut = "DETAILS";

    private String accountNumberIn = "BE987654321";
    private String accountNumberOut = "BE987654321";

    @Mock
    private TransactionService transactionService;

    @Before
    public void init(){
        testObject = new TransactionFieldSetMapper(transactionService);

        Mockito.when(fieldSet.readString(0)).thenReturn(sequenceNumberIn);
        Mockito.when(fieldSet.readString(1)).thenReturn(executionDateIn);
        Mockito.when(fieldSet.readString(2)).thenReturn(valueDateIn);
        Mockito.when(fieldSet.readString(3)).thenReturn(amountIn);
        Mockito.when(fieldSet.readString(4)).thenReturn(currencyIn);
    }

    @Test
    public void mapFieldSet_Test_When_FieldCount_Is_7(){
        Mockito.when(fieldSet.readString(5)).thenReturn(detailsIn);
        Mockito.when(fieldSet.readString(6)).thenReturn(accountNumberIn);
        Mockito.when(fieldSet.getFieldCount()).thenReturn(7);

        TransactionEntity result = testObject.mapFieldSet(fieldSet);

        assertEquals(result.getSequenceNumber(), sequenceNumberOut);
        assertEquals(result.getExecutionDate(), executionDateOut);
        assertEquals(result.getValueDate(), valueDateOut);
        assertEquals(result.getAmount(), amountOut);
        assertEquals(result.getCurrency(), currencyOut);
        assertEquals(result.getCounterparty(), null);
        assertEquals(result.getDetails(), detailsOut);
        assertEquals(result.getAccountNumber(), accountNumberOut);
    }

    @Test
    public void mapFieldSet_Test_When_FieldCount_Is_8(){
        Mockito.when(fieldSet.readString(5)).thenReturn(counterpartyIn);
        Mockito.when(fieldSet.readString(6)).thenReturn(detailsIn);
        Mockito.when(fieldSet.readString(7)).thenReturn(accountNumberIn);
        Mockito.when(fieldSet.getFieldCount()).thenReturn(8);

        TransactionEntity result = testObject.mapFieldSet(fieldSet);

        assertEquals(result.getSequenceNumber(), sequenceNumberOut);
        assertEquals(result.getExecutionDate(), executionDateOut);
        assertEquals(result.getValueDate(), valueDateOut);
        assertEquals(result.getAmount(), amountOut);
        assertEquals(result.getCurrency(), currencyOut);
        assertEquals(result.getCounterparty(), counterpartyOut);
        assertEquals(result.getDetails(), detailsOut);
        assertEquals(result.getAccountNumber(), accountNumberOut);
    }

    @Test
    public void mapFieldSet_Test_When_EmptyLine_Then_ThrowException(){
        Mockito.when(fieldSet.toString()).thenReturn("[]");

        expectedEx.expect(EmptyLineFoundException.class);

        testObject.mapFieldSet(fieldSet);
    }

    @Test
    public void mapFieldSet_Test_When_FieldCount_Is_Not_7_Nor_8_Then_ThrowException(){
        Mockito.when(fieldSet.getFieldCount()).thenReturn(6);

        expectedEx.expect(RuntimeException.class);
        expectedEx.expectMessage("Transaction version not implemented : there should be 7 or 8 columns");

        testObject.mapFieldSet(fieldSet);
    }

    @Test
    public void mapFieldSet_Test_When_DuplicateFound_Then_ThrowException(){
        Mockito.when(fieldSet.readString(5)).thenReturn(detailsIn);
        Mockito.when(fieldSet.readString(6)).thenReturn(accountNumberIn);
        Mockito.when(fieldSet.getFieldCount()).thenReturn(7);

        Mockito.when(transactionService.areDuplicateTransactionsPresent(Mockito.any(TransactionEntity.class))).thenReturn(true);

        expectedEx.expect(DuplicateTransactionFoundException.class);

        testObject.mapFieldSet(fieldSet);
    }

}
