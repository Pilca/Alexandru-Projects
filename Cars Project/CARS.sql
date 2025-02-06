CREATE TABLE CARS ( CAR_ID NUMBER PRIMARY KEY,
                   BRAND VARCHAR2 (50) NOT NULL,
                   MODEL VARCHAR2 (50) NOT NULL,
                   DATE_OF_MANUFACTURE DATE NOT NULL,
                   COLOR VARCHAR2 (25) NOT NULL,
                   NUMBER_OF_DOORS NUMBER);
                   
INSERT INTO CARS(CAR_ID, BRAND, MODEL, DATE_OF_MANUFACTURE, COLOR, NUMBER_OF_DOORS)
VALUES (1,'Toyota', 'Corolla', TO_DATE('15-03-2018', 'DD-MM-YYYY'), 'Red', 4);

INSERT INTO CARS(CAR_ID, BRAND, MODEL, DATE_OF_MANUFACTURE, COLOR, NUMBER_OF_DOORS)
VALUES (2, 'Ford', 'Mustang', TO_DATE('25-07-2015', 'DD-MM-YYYY'), 'Blue', 2);

INSERT INTO CARS(CAR_ID, BRAND, MODEL, DATE_OF_MANUFACTURE, COLOR, NUMBER_OF_DOORS)
VALUES (3, 'Honda', 'Civic', TO_DATE('10-11-2020', 'DD-MM-YYYY'), 'Black', 4);

COMMIT;

DECLARE
    V_UPDATE_YEAR NUMBER;
    
BEGIN
    DECLARE
        V_CAR_ROW CARS%ROWTYPE;
    
        FUNCTION UPD_CAR(
            P_ID CARS.CAR_ID%TYPE,  
            P_MODEL CARS.MODEL%TYPE,
            P_DATE_OF_MANUF CARS.DATE_OF_MANUFACTURE%TYPE  
        ) RETURN NUMBER
        AS
        BEGIN
            V_CAR_ROW.CAR_ID := P_ID;
            V_CAR_ROW.MODEL := P_MODEL;
            V_CAR_ROW.DATE_OF_MANUFACTURE := P_DATE_OF_MANUF;

            UPDATE CARS 
            SET 
                MODEL = V_CAR_ROW.MODEL,
                DATE_OF_MANUFACTURE = V_CAR_ROW.DATE_OF_MANUFACTURE
            WHERE CAR_ID = V_CAR_ROW.CAR_ID;

            SELECT EXTRACT(YEAR FROM DATE_OF_MANUFACTURE)
            INTO V_CAR_ROW.DATE_OF_MANUFACTURE
            FROM CARS 
            WHERE CAR_ID = V_CAR_ROW.CAR_ID;   

            RETURN EXTRACT(YEAR FROM V_CAR_ROW.DATE_OF_MANUFACTURE);
        END UPD_CAR;
    
    BEGIN
        V_UPDATE_YEAR := UPDATE_CAR(P_ID => 1,
                                    P_MODEL => 'Yaris',
                                    P_DATE_OF_MANUF => TO_DATE('01-05-2023', 'DD-MM-YYYY'));
                                    
        DBMS_OUTPUT.PUT_LINE('Updated model and year of manufacture: ' || V_UPDATE_YEAR);
    END;
END;
/
