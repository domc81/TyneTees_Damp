# CONDENSATION Workbook — Forensic Analysis

**Source:** `Copy of Condensation PIV Costing v37 CF - 131125.xlsm`  
**Extracted:** 2026-02-18 00:38:39  
**Tool:** extract_workbook.py v1.0

---

## SECTION 1: WORKBOOK OVERVIEW

**File:** `Copy of Condensation PIV Costing v37 CF - 131125.xlsm`

**Extracted:** 2026-02-18T00:38:39.587196

**Survey Type:** CONDENSATION

**Sheet Count:** 9


| # | Sheet Name | Rows | Cols | State |
|---|-----------|------|------|-------|
| 1 | Report | 339 | 33 | visible |
| 2 | Costing | 181 | 50 | visible |
| 3 | Customer Summary | 22 | 9 | visible |
| 4 | Office Notes | 1 | 9 | visible |
| 5 | CAF1 Form | 29 | 11 | visible |
| 6 | Sub Contractor Costs | 24 | 8 | visible |
| 7 | CF CSV Upload | 97 | 17 | visible |
| 8 | Data Lists | 122 | 2 | visible |
| 9 | Changes | 24 | 4 | visible |

## SECTION 2: REPORT SHEET — Complete Row-by-Row Map

**Total Rows:** 339  |  **Total Cols:** 33

### Key Column Legend
- **Col A (1):** Validation X marker — `=IF(AG_row=1,"X","")`
- **Col B (2):** Visibility flag — 1=prints, 0=hidden, formula=conditional
- **Col D (4):** Main content/question text
- **Col E-Q:** Data entry cells (varies by row)
- **Col Y (25):** Room show/hide toggle (Timber only)
- **Col AB/AC (28+):** Surveyor guidance comments
- **Col AG (33):** Completion validation flag

### Complete Row Data

```
R1: [D4]=Sheet Validation | [J10]==IF(SUM(AF:AF)=0,"SHEET NOT YET STARTED",IF(SUM(AG:AG)>0,"SHEET NOT COMPLETE","SHEET COMPLETE"))
R3: [D4]=Report | [AB28]=Comments for Surveyors | [AD30]=Visibility | [AE31]=Sheet Validation to right | [AF32]=Check if any data is entered | [AG33]=Check if field needs to be completed
R4: [A1]==IF(AG4=1,"X","") | [B2]=1 | [AD30]=Always show
R5: [A1]==IF(AG5=1,"X","") | [B2]=1 | [AD30]=Always show
R6: [A1]==IF(AG6=1,"X","") | [B2]=1 | [D4]=Client Name And Site Details | [AB28]=Will always show | [AD30]=Always show
R7: [A1]==IF(AG7=1,"X","") | [B2]=1 | [AD30]=Always show
R8: [A1]==IF(AG8=1,"X","") | [B2]=1 | [D4]==Costing!E7 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D8<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D8="",D8=0)),1,0)
R9: [A1]==IF(AG9=1,"X","") | [B2]=1 | [D4]==Costing!E8 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D9<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D9="",D9=0)),1,0)
R10: [A1]==IF(AG10=1,"X","") | [B2]=1 | [D4]==Costing!E9 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D10<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D10="",D10=0)),1,0)
R11: [A1]==IF(AG11=1,"X","") | [B2]=1 | [D4]==Costing!E10 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D11<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D11="",D11=0)),1,0)
R12: [A1]==IF(AG12=1,"X","") | [B2]=1 | [D4]==Costing!E11 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D12<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D12="",D12=0)),1,0)
R13: [A1]==IF(AG13=1,"X","") | [B2]=1 | [D4]=Internal Reference ID: | [I9]==Costing!E4 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(I13<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(I13="",I13=0)),1,0)
R14: [A1]==IF(AG14=1,"X","") | [B2]=1 | [AD30]=Always show
R15: [A1]==IF(AG15=1,"X","") | [B2]=1 | [AD30]=Always show
R16: [A1]==IF(AG16=1,"X","") | [B2]=1 | [D4]=Weather Conditions | [AB28]=Will always show | [AD30]=Always show
R17: [A1]==IF(AG17=1,"X","") | [B2]=1 | [D4]=Date of Inspection: | [K11]=2025-11-21 00:00:00 | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K17<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K17=""),1,0)
R18: [A1]==IF(AG18=1,"X","") | [B2]=1 | [D4]=The weather conditions were:  | [K11]=Dry sunny | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K18<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K18=""),1,0)
R19: [A1]==IF(AG19=1,"X","") | [B2]=1 | [D4]=The weather temperature was:  | [K11]=3 | [L12]=(°C). | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K19<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K19=""),1,0)
R20: [A1]==IF(AG20=1,"X","") | [B2]=1 | [D4]=The Property | [AB28]=Will always show | [AD30]=Always show
R21: [A1]==IF(AG21=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R22: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R23: [A1]==IF(AG23=1,"X","") | [B2]==IF(OR(D24="Show",Q24="Show"),1,0) | [AD30]=Always show
R24: [A1]==IF(AG24=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D24="Show",D24="",Q24="Show",Q24=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D24="",Q24="")),1,0)
R25: [A1]==IF(AG25=1,"X","") | [B2]==B23 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R26: [A1]==IF(AG26=1,"X","") | [B2]==B25 | [D4]=Front Elevation | [Q17]=Side Elevation | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D24="Show",D24="",Q24="Show",Q24=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D24="Show",D26=""),AND(Q24="Show",Q26=""))),1,0)
R27: [A1]==IF(AG27=1,"X","") | [B2]==B26 | [AD30]=Always show
R28: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R29: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R30: [A1]==IF(AG30=1,"X","") | [B2]==IF(OR(D31="Show",Q31="Show"),1,0) | [AD30]=Always show
R31: [A1]==IF(AG31=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D31="Show",D31="",Q31="Show",Q31=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D31="",Q31="")),1,0)
R32: [A1]==IF(AG32=1,"X","") | [B2]==B30 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R33: [A1]==IF(AG33=1,"X","") | [B2]==B32 | [D4]=Ensuite  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D31="Show",D31="",Q31="Show",Q31=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D31="Show",D33=""),AND(Q31="Show",Q33=""))),1,0)
R34: [A1]==IF(AG34=1,"X","") | [B2]==B33 | [AD30]=Always show
R35: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R36: [A1]==IF(AG36=1,"X","") | [B2]=1 | [D4]=The property is a: | [M13]=Stone and slate | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M36<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M36=""),1,0)
R37: [A1]==IF(AG37=1,"X","") | [B2]=1 | [D4]=The property is constructed of : | [M13]=Detached  | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M37<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M37=""),1,0)
R38: [A1]==IF(AG38=1,"X","") | [B2]=1 | [D4]=The property was built approximately : | [M13]=1800s | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M38<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M38=""),1,0)
R39: [A1]==IF(AG39=1,"X","") | [B2]=1 | [D4]=The Survey/Specific Defects Inspection | [AB28]=Will always show | [AD30]=Always show
R40: [A1]==IF(AG40=1,"X","") | [B2]=1 | [D4]=In accordance with your specific instructions, we carried out a survey of the above property for problems with mould, mildew & condensation. | [AB28]=Will always show | [AD30]=Always show
R41: [A1]==IF(AG41=1,"X","") | [B2]=1 | [D4]=Our findings and proposals are set out below and should be read in conjunction with the enclosed document 'General Notes for clients and Health and Safety precautions'.  | [AB28]=Will always show | [AD30]=Always show
R42: [A1]==IF(AG42=1,"X","") | [B2]=1 | [D4]=Orientation | [AB28]=Will always show | [AD30]=Always show
R43: [A1]==IF(AG43=1,"X","") | [B2]=1 | [D4]=The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building. | [AB28]=Will always show | [AD30]=Always show
R44: [A1]==IF(AG44=1,"X","") | [B2]=1 | [D4]=The Scope | [AB28]=Will always show | [AD30]=Always show
R45: [A1]==IF(AG45=1,"X","") | [B2]=1 | [D4]=Our specific defects inspection was solely to identify evidence of problems that you have requested us to inspect which was that of mould and condensation within the above property. | [AB28]=Will always show | [AD30]=Always show
R46: [A1]==IF(AG46=1,"X","") | [B2]=1 | [D4]=Abbreviations Used In Report | [AB28]=Will always show | [AD30]=Always show
R47: [A1]==IF(AG47=1,"X","") | [B2]=1 | [D4]=PIV = Positive Input Ventilation, ACM's = Asbestos containing materials. | [AB28]=Will always show | [AD30]=Always show
R48: [A1]==IF(AG48=1,"X","") | [B2]=1 | [D4]=Internal Inspection | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor
R49: [A1]==IF(AG49=1,"X","") | [B2]=1 | [D4]=During the internal inspection the following issues were noted: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B49<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B49=""),1,0)
R50: [A1]==IF(AG50=1,"X","") | [B2]=0 | [D4]=• | [E5]=Condensation, was apparent on the windows.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B50<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B50=""),1,0)
R51: [A1]==IF(AG51=1,"X","") | [B2]=1 | [D4]=• | [E5]=Areas of low temperature/poor air movement to the walls creating dew points. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B51<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B51=""),1,0)
R52: [A1]==IF(AG52=1,"X","") | [B2]=1 | [D4]=• | [E5]=Black spot mould was present within the building. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B52<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B52=""),1,0)
R53: [A1]==IF(AG53=1,"X","") | [B2]=1 | [D4]=• | [E5]=There was a lack of ventilation and air movement within the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B53<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B53=""),1,0)
R54: [A1]==IF(AG54=1,"X","") | [B2]=1 | [D4]=• | [E5]=We suspect poor insulation values due to solid brick walls. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B54<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B54=""),1,0)
R55: [A1]==IF(AG55=1,"X","") | [B2]=1 | [D4]=• | [E5]=Humidity readings were taken within the property, these readings peaked at | [W23]=95 | [Y25]=%. | [AB28]=← Enter humidity % Data Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B55<>"",P55<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B55=1,W55=""),AND(B55="",W55=""),AND(B55="",W55<>""),AND(B55=0,W55<>""))),1,0)
R56: [A1]==IF(AG56=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R57: [A1]==IF(AG57=1,"X","") | [B2]=1 | [D4]=• | [E5]=Staining was noted to the ceiling below the main bathroom and black mould to a cold external wall. The mould to the wall is not related to the bathroom or the ceiling. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B57<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B57=1,E57=""),AND(B57="",E57=""),AND(B57="",E57<>""),AND(B57=0,E57<>""))),1,0)
R58: [A1]==IF(AG58=1,"X","") | [B2]=1 | [D4]=• | [E5]=Plumber to inspect and repair any leaks / damage to the ensuite  | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B58<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B58=1,E58=""),AND(B58="",E58=""),AND(B58="",E58<>""),AND(B58=0,E58<>""))),1,0)
R59: [A1]==IF(AG59=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B59<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B59=1,E59=""),AND(B59="",E59=""),AND(B59="",E59<>""),AND(B59=0,E59<>""))),1,0)
R60: [A1]==IF(AG60=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R61: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R62: [A1]==IF(AG62=1,"X","") | [B2]==IF(OR(D63="Show",Q63="Show"),1,0) | [AD30]=Always show
R63: [A1]==IF(AG63=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D63="Show",D63="",Q63="Show",Q63=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D63="",Q63="")),1,0)
R64: [A1]==IF(AG64=1,"X","") | [B2]==B62 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R65: [A1]==IF(AG65=1,"X","") | [B2]==B64 | [D4]=High humidity | [Q17]=High humidity | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D63="Show",D63="",Q63="Show",Q63=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D63="Show",D65=""),AND(Q63="Show",Q65=""))),1,0)
R66: [A1]==IF(AG66=1,"X","") | [B2]==B65 | [AD30]=Always show
R67: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R68: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R69: [A1]==IF(AG69=1,"X","") | [B2]==IF(OR(D70="Show",Q70="Show"),1,0) | [AD30]=Always show
R70: [A1]==IF(AG70=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D70="Show",D70="",Q70="Show",Q70=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D70="",Q70="")),1,0)
R71: [A1]==IF(AG71=1,"X","") | [B2]==B69 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R72: [A1]==IF(AG72=1,"X","") | [B2]==B71 | [D4]=Main Bedroom | [Q17]=Bedroom | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D70="Show",D70="",Q70="Show",Q70=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D70="Show",D72=""),AND(Q70="Show",Q72=""))),1,0)
R73: [A1]==IF(AG73=1,"X","") | [B2]==B72 | [AD30]=Always show
R74: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R75: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R76: [A1]==IF(AG76=1,"X","") | [B2]==IF(OR(D77="Show",Q77="Show"),1,0) | [AD30]=Always show
R77: [A1]==IF(AG77=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D77="Show",D77="",Q77="Show",Q77=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D77="",Q77="")),1,0)
R78: [A1]==IF(AG78=1,"X","") | [B2]==B76 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R79: [A1]==IF(AG79=1,"X","") | [B2]==B78 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D77="Show",D77="",Q77="Show",Q77=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D77="Show",D79=""),AND(Q77="Show",Q79=""))),1,0)
R80: [A1]==IF(AG80=1,"X","") | [B2]==B79 | [AD30]=Always show
R81: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R82: [A1]==IF(AG82=1,"X","") | [B2]=1 | [AD30]=Always show
R83: [A1]==IF(AG83=1,"X","") | [B2]=1 | [D4]=The above problems have been caused by: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor
R84: [A1]==IF(AG84=1,"X","") | [B2]=0 | [D4]=• | [E5]=A lack of ventilation and air movement within the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B84<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B84=""),1,0)
R85: [A1]==IF(AG85=1,"X","") | [B2]=0 | [D4]=• | [E5]=Poor insulation values of solid brick walls. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B85<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B85=""),1,0)
R86: [A1]==IF(AG86=1,"X","") | [B2]=0 | [D4]=• | [E5]=Dampness within the fabric of the building. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B86<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B86=""),1,0)
R87: [A1]==IF(AG87=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R88: [A1]==IF(AG88=1,"X","") | [B2]=1 | [D4]=• | [E5]=Leaks from the ensuite. Plumber to inspect and repair. Main bathroom has caused staining to the ceiling below. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B88<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B88=1,E88=""),AND(B88="",E88=""),AND(B88="",E88<>""),AND(B88=0,E88<>""))),1,0)
R89: [A1]==IF(AG89=1,"X","") | [B2]=1 | [D4]=• | [E5]=Lack of ventilation and air movement with the property have caused elevated humidity levels within the building.  | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B89<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B89=1,E89=""),AND(B89="",E89=""),AND(B89="",E89<>""),AND(B89=0,E89<>""))),1,0)
R90: [A1]==IF(AG90=1,"X","") | [B2]=1 | [D4]=• | [E5]=It is our opinion that the current extraction and ventilation at the property does not provide sufficient ventilation | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B90<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B90=1,E90=""),AND(B90="",E90=""),AND(B90="",E90<>""),AND(B90=0,E90<>""))),1,0)
R91: [A1]==IF(AG91=1,"X","") | [B2]=0 | [D4]=Airbricks | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B91<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B91=""),1,0)
R92: [A1]==IF(AG92=1,"X","") | [B2]=0 | [D4]=There were no airbricks installed. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B92<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B92=""),1,0)
R93: [A1]==IF(AG93=1,"X","") | [B2]=0 | [D4]=It was not possible to inspect the airbricks due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B93<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B93=""),1,0)
R94: [A1]==IF(AG94=1,"X","") | [B2]=0 | [D4]=• | [E5]=State below - ensure that images are taken of the obstructions to be added to the report. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R95: [A1]==IF(AG95=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B95<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B95=1,E95=""),AND(B95="",E95=""),AND(B95="",E95<>""),AND(B95=0,E95<>""))),1,0)
R96: [A1]==IF(AG96=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B96<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B96=1,E96=""),AND(B96="",E96=""),AND(B96="",E96<>""),AND(B96=0,E96<>""))),1,0)
R97: [A1]==IF(AG97=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B97<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B97=1,E97=""),AND(B97="",E97=""),AND(B97="",E97<>""),AND(B97=0,E97<>""))),1,0)
R98: [A1]==IF(AG98=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R99: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R100: [A1]==IF(AG100=1,"X","") | [B2]==IF(OR(D101="Show",Q101="Show"),1,0) | [AD30]=Always show
R101: [A1]==IF(AG101=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D101="Show",D101="",Q101="Show",Q101=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D101="",Q101="")),1,0)
R102: [A1]==IF(AG102=1,"X","") | [B2]==B100 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R103: [A1]==IF(AG103=1,"X","") | [B2]==B102 | [D4]=Current extraction | [Q17]=Current extraction | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D101="Show",D101="",Q101="Show",Q101=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D101="Show",D103=""),AND(Q101="Show",Q103=""))),1,0)
R104: [A1]==IF(AG104=1,"X","") | [B2]==B103 | [AD30]=Always show
R105: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R106: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R107: [A1]==IF(AG107=1,"X","") | [B2]==IF(OR(D108="Show",Q108="Show"),1,0) | [AD30]=Always show
R108: [A1]==IF(AG108=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D108="Show",D108="",Q108="Show",Q108=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D108="",Q108="")),1,0)
R109: [A1]==IF(AG109=1,"X","") | [B2]==B107 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R110: [A1]==IF(AG110=1,"X","") | [B2]==B109 | [D4]=Current extraction | [Q17]=Current extraction | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D108="Show",D108="",Q108="Show",Q108=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D108="Show",D110=""),AND(Q108="Show",Q110=""))),1,0)
R111: [A1]==IF(AG111=1,"X","") | [B2]==B110 | [AD30]=Always show
R112: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R113: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R114: [A1]==IF(AG114=1,"X","") | [B2]==IF(OR(D115="Show",Q115="Show"),1,0) | [AD30]=Always show
R115: [A1]==IF(AG115=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D115="Show",D115="",Q115="Show",Q115=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D115="",Q115="")),1,0)
R116: [A1]==IF(AG116=1,"X","") | [B2]==B114 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R117: [A1]==IF(AG117=1,"X","") | [B2]==B116 | [D4]=Current extraction | [Q17]=Current extraction | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D115="Show",D115="",Q115="Show",Q115=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D115="Show",D117=""),AND(Q115="Show",Q117=""))),1,0)
R118: [A1]==IF(AG118=1,"X","") | [B2]==B117 | [AD30]=Always show
R119: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R120: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R121: [A1]==IF(AG121=1,"X","") | [B2]==IF(OR(D122="Show",Q122="Show"),1,0) | [AD30]=Always show
R122: [A1]==IF(AG122=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D122="Show",D122="",Q122="Show",Q122=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D122="",Q122="")),1,0)
R123: [A1]==IF(AG123=1,"X","") | [B2]==B121 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R124: [A1]==IF(AG124=1,"X","") | [B2]==B123 | [D4]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [Q17]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D122="Show",D122="",Q122="Show",Q122=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D122="Show",D124=""),AND(Q122="Show",Q124=""))),1,0)
R125: [A1]==IF(AG125=1,"X","") | [B2]==B124 | [AD30]=Always show
R126: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R127: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R128: [A1]==IF(AG128=1,"X","") | [B2]==IF(OR(D129="Show",Q129="Show"),1,0) | [AD30]=Always show
R129: [A1]==IF(AG129=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D129="Show",D129="",Q129="Show",Q129=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D129="",Q129="")),1,0)
R130: [A1]==IF(AG130=1,"X","") | [B2]==B128 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R131: [A1]==IF(AG131=1,"X","") | [B2]==B130 | [D4]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [Q17]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D129="Show",D129="",Q129="Show",Q129=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D129="Show",D131=""),AND(Q129="Show",Q131=""))),1,0)
R132: [A1]==IF(AG132=1,"X","") | [B2]==B131 | [AD30]=Always show
R133: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R134: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R135: [A1]==IF(AG135=1,"X","") | [B2]==IF(OR(D136="Show",Q136="Show"),1,0) | [AD30]=Always show
R136: [A1]==IF(AG136=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D136="Show",D136="",Q136="Show",Q136=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D136="",Q136="")),1,0)
R137: [A1]==IF(AG137=1,"X","") | [B2]==B135 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R138: [A1]==IF(AG138=1,"X","") | [B2]==B137 | [D4]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [Q17]=Plumber to inspect and repair any leaks to the ensuite to the bedroom  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D136="Show",D136="",Q136="Show",Q136=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D136="Show",D138=""),AND(Q136="Show",Q138=""))),1,0)
R139: [A1]==IF(AG139=1,"X","") | [B2]==B138 | [AD30]=Always show
R140: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R141: [A1]==IF(AG141=1,"X","") | [B2]=0 | [D4]=The property is ventilated by the following 'visible' number of airbricks: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B141<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B141=""),1,0)
R142: [A1]==IF(AG142=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the front elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B142<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B142=1,E142=""),AND(B142="",E142=""),AND(B142="",E142<>""),AND(B142=0,E142<>0))),1,0)
R143: [A1]==IF(AG143=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the left elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B143<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B143=1,E143=""),AND(B143="",E143=""),AND(B143="",E143<>""),AND(B143=0,E143<>0))),1,0)
R144: [A1]==IF(AG144=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the right elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B144<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B144=1,E144=""),AND(B144="",E144=""),AND(B144="",E144<>""),AND(B144=0,E144<>0))),1,0)
R145: [A1]==IF(AG145=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the rear elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B145<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B145=1,E145=""),AND(B145="",E145=""),AND(B145="",E145<>""),AND(B145=0,E145<>0))),1,0)
R146: [A1]==IF(AG146=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the rear offshoot | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B146<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B146=1,E146=""),AND(B146="",E146=""),AND(B146="",E146<>""),AND(B146=0,E146<>0))),1,0)
R147: [A1]==IF(AG147=1,"X","") | [B2]=0 | [D4]=It is our opinion that the above airbricks are providing sufficient airflow to the property. | [AB28]=Will be visible dependant on W/W % above. | [AD30]=Determined by surveyor
R148: [A1]==IF(AG148=1,"X","") | [B2]=0 | [D4]=It is our opinion that the above airbricks do not provide sufficient airflow to the property. | [AB28]=Will be visible dependant on W/W % above. | [AD30]=Determined by surveyor
R149: [A1]==IF(AG149=1,"X","") | [B2]=0 | [D4]=During our inspection it was noted that some of the existing airbricks appeared to be blocked and may be providing insufficient airflow to the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B149<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B149=""),1,0)
R150: [A1]==IF(AG150=1,"X","") | [B2]=0 | [D4]=During our inspection it was noted that some of the existing airbricks were installed too low to the external ground levels and may permit water ingress to the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B150<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B150=""),1,0)
R151: [A1]==IF(AG151=1,"X","") | [B2]=1 | [D4]=Proposal | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor
R152: [A1]==IF(AG152=1,"X","") | [B2]=1 | [D4]=We would propose for the following works to be carried out: | [AB28]=← Visibility dependant on below answers | [AD30]=Determined by surveyor | [AF32]==IF(B152<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B152=""),1,0)
R153: [A1]==IF(AG153=1,"X","") | [B2]=1 | [D4]=• | [E5]=Supply and install a system of devices and measures to introduce fresh air and remove stale damp air.  This system will reduce humidity levels and create air movement  to combat the condensation probl… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B153<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B153=""),1,0)
R154: [A1]==IF(AG154=1,"X","") | [B2]=1 | [D4]=You will need the following services: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B154<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B154=""),1,0)
R155: [A1]==IF(AG155=1,"X","") | [B2]=1 | [D4]=• | [E5]=Supply & install of | [I9]=1 | [J10]=loft mounted Dryair PIV heated unit(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B155<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B155=1,I155=""),AND(B155="",I155=""),AND(B155="",I155<>""),AND(B155=0,I155<>""))),1,0)
R156: [A1]==IF(AG156=1,"X","") | [B2]==B155 | [D4]=• | [F6]=Loft area and diffusor to hallway celling  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B156<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B156=1,F156=""),AND(B156="",F156=""),AND(B156="",F156<>""),AND(B156=0,F156<>""))),1,0)
R157: [A1]==IF(AG157=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply & install of | [J10]=loft mounted Dryair PIV unheated unit(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B157<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B157=1,I157=""),AND(B157="",I157=""),AND(B157="",I157<>""),AND(B157=0,I157<>""))),1,0)
R158: [A1]==IF(AG158=1,"X","") | [B2]==B157 | [D4]=• | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B158<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B158=1,F158=""),AND(B158="",F158=""),AND(B158="",F158<>""),AND(B158=0,F158<>""))),1,0)
R159: [A1]==IF(AG159=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply & install of | [J10]=wall mounted Dryair PIV heated unit(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B159<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B159=1,I159=""),AND(B159="",I159=""),AND(B159="",I159<>""),AND(B159=0,I159<>""))),1,0)
R160: [A1]==IF(AG160=1,"X","") | [B2]==B159 | [D4]=• | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B160<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B160=1,F160=""),AND(B160="",F160=""),AND(B160="",F160<>""),AND(B160=0,F160<>""))),1,0)
R161: [A1]==IF(AG161=1,"X","") | [B2]=1 | [D4]=• | [E5]=Supply & install of | [I9]=5 | [J10]=Humidistat trickle and boost fan(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B161<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B161=1,I161=""),AND(B161="",I161=""),AND(B161="",I161<>""),AND(B161=0,I161<>""))),1,0)
R162: [A1]==IF(AG162=1,"X","") | [B2]==B161 | [D4]=• | [F6]=Upgrade the existing extractors at the property | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B162<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B162=1,F162=""),AND(B162="",F162=""),AND(B162="",F162<>""),AND(B162=0,F162<>""))),1,0)
R163: [A1]==IF(AG163=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply & install of | [J10]=Dryair Cpass insulated pullcord passive vent fan(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B163<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B163=1,I163=""),AND(B163="",I163=""),AND(B163="",I163<>""),AND(B163=0,I163<>""))),1,0)
R164: [A1]==IF(AG164=1,"X","") | [B2]==B163 | [D4]=• | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B164<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B164=1,F164=""),AND(B164="",F164=""),AND(B164="",F164<>""),AND(B164=0,F164<>""))),1,0)
R165: [A1]==IF(AG165=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply & install of | [J10]=Dryair Cvent(s) to the following area(s): | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B165<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B165=1,I165=""),AND(B165="",I165=""),AND(B165="",I165<>""),AND(B165=0,I165<>""))),1,0)
R166: [A1]==IF(AG166=1,"X","") | [B2]==B165 | [D4]=• | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B166<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B166=1,F166=""),AND(B166="",F166=""),AND(B166="",F166<>""),AND(B166=0,F166<>""))),1,0)
R167: [A1]==IF(AG167=1,"X","") | [B2]==IF(SUM(B155:B166)>0,1,0) | [D4]=• | [E5]=Supply and installation of any necessary electrical fittings/ducting/trunking/grilles required for the installation of Fans/PIVs/Vents (if applicable). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B167<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B167=""),1,0)
R168: [A1]==IF(AG168=1,"X","") | [B2]=0 | [D4]=• | [E5]=Diamond Core | [I9]=107mm hole(s). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B168<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B168=1,H168=""),AND(B168="",H168=""),AND(B168="",H168<>""),AND(B168=0,H168<>""))),1,0)
R169: [A1]==IF(AG169=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply and install of | [J10]=sark vent(s). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B169<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B169=1,I169=""),AND(B169="",I169=""),AND(B169="",I169<>""),AND(B169=0,I169<>""))),1,0)
R170: [A1]==IF(AG170=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply and install of | [J10]=air brick(s) to increase ventilation to the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B170<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B170=1,I170=""),AND(B170="",I170=""),AND(B170="",I170<>""),AND(B170=0,I170<>""))),1,0)
R171: [A1]==IF(AG171=1,"X","") | [B2]=0 | [D4]=• | [E5]=Lift | [G7]=of the existing air bricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B171<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B171=1,F171=""),AND(B171="",F171=""),AND(B171="",F171<>""),AND(B171=0,F171<>""))),1,0)
R172: [A1]==IF(AG172=1,"X","") | [B2]=0 | [D4]=• | [E5]=Clean out of  | [I9]=existing air brick(s) by removing, cleaning and re-installing). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B172<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B172=1,H172=""),AND(B172="",H172=""),AND(B172="",H172<>""),AND(B172=0,H172<>""))),1,0)
R173: [A1]==IF(AG173=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply materials and labour to box in and insulate ducting (to prevent condensation on ducting). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B173<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B173=""),1,0)
R174: [A1]==IF(AG174=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply and install of new loft hatch with sturdy fold down ladder, handrail and switched lamp. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B174<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B174=""),1,0)
R175: [A1]==IF(AG175=1,"X","") | [B2]=0 | [D4]=• | [E5]=Supply of labour and materials to enlarge current loft hatch. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B175<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B175=""),1,0)
R176: [A1]==IF(AG176=1,"X","") | [B2]=1 | [D4]=• | [E5]=Supply of labour and materials to treat and kill black mould (Any area treated for mould may require you to redecorate). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B176<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B176=""),1,0)
R177: [A1]==IF(AG177=1,"X","") | [B2]=0 | [D4]=• | [E5]=Customer to instruct a Roofing specialist to install external roof vents. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B177<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B177=""),1,0)
R178: [A1]==IF(AG178=1,"X","") | [B2]=0 | [D4]=• | [E5]=Electrical system not up to current standards:  A check of your electrical system revealed that it was not up to current standards. We recommend that you contact a qualified electrician to upgrade you… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B178<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B178=""),1,0)
R179: [A1]==IF(AG179=1,"X","") | [B2]=0 | [D4]=• | [E5]=Asbestos testing:  The ceiling/areas designated for the above installations is covered in Artex/decorative plasterwork. These applications can be Asbestos containing materials (ACMs). It will therefor… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B179<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B179=""),1,0)
R180: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R181: [A1]==IF(AG181=1,"X","") | [B2]==IF(OR(D182="Show",Q182="Show"),1,0) | [AD30]=Always show
R182: [A1]==IF(AG182=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D182="Show",D182="",Q182="Show",Q182=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D182="",Q182="")),1,0)
R183: [A1]==IF(AG183=1,"X","") | [B2]==B181 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R184: [A1]==IF(AG184=1,"X","") | [B2]==B183 | [D4]=Loft access | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D182="Show",D182="",Q182="Show",Q182=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D182="Show",D184=""),AND(Q182="Show",Q184=""))),1,0)
R185: [A1]==IF(AG185=1,"X","") | [B2]==B184 | [AD30]=Always show
R186: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R187: [A1]==IF(AG187=1,"X","") | [B2]==IF(SUM(B155:B159)>0,1,0) | [D4]=Additional Information: Benefits of PIV systems | [AB28]=← Visibility dependant on PIVs in the proposal | [AD30]=Always show
R188: [A1]==IF(AG188=1,"X","") | [B2]==B187 | [D4]=For more information on the benefits of Positive Input Ventilation systems please visit the link below: | [AB28]=← Visibility dependant on PIVs in the proposal | [AD30]=Always show
R189: [A1]==IF(AG271=1,"X","") | [B2]==B188 | [D4]=https://www.tyneteesdampproofing.co.uk/piv-video/ | [AB28]=← Visibility dependant on PIVs in the proposal | [AD30]=Always show
R190: [A1]==IF(AG190=1,"X","") | [B2]=1 | [D4]=Extent Of Survey | [AB28]=Will always show | [AD30]=Always show
R191: [A1]==IF(AG191=1,"X","") | [B2]=1 | [D4]=You should be aware that we have reported upon condensation problems evident to us at the time of our inspection and in accordance with your instructions. If there are any omissions or if you believe … | [AB28]=Will always show | [AD30]=Always show
R192: [A1]==IF(AG192=1,"X","") | [B2]=1 | [D4]=EXTERNAL INSPECTION | [AB28]=Will always show | [AD30]=Always show
R193: [A1]==IF(AG193=1,"X","") | [B2]=1 | [D4]=Building Defects | [AB28]=Will always show | [AD30]=Always show
R194: [A1]==IF(AG194=1,"X","") | [B2]=0 | [D4]=See Damp report for building defects. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B194<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=""),1,0)
R195: [A1]==IF(AG195=1,"X","") | [B2]=1 | [D4]=No building defects were noted at the time of our inspection. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B195<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=""),1,0)
R196: [A1]==IF(AG196=1,"X","") | [B2]==IF(AND($B$194="",$B$195=""),"",IF(OR($B$194=1,$B$195=1),0,1)) | [D4]=We noted the following building defects: | [AB28]=Will be visible based on above input. | [AD30]=Determined by surveyor | [AF32]==IF(B196<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B196=FALSE,B196="")),1,0)
R197: [A1]==IF(AG197=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B197<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B197=FALSE,B197="")),1,0)
R198: [A1]==IF(AG198=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective flashings to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B198<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B198=FALSE,B198="")),1,0)
R199: [A1]==IF(AG199=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to ridge tiles | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B199<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B199=FALSE,B199="")),1,0)
R200: [A1]==IF(AG200=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to verge | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B200<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B200=FALSE,B200="")),1,0)
R201: [A1]==IF(AG201=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to hips | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B201<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B201=FALSE,B201="")),1,0)
R202: [A1]==IF(AG202=1,"X","") | [B2]=0 | [D4]=• | [E5]=Slipped roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B202<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B202=FALSE,B202="")),1,0)
R203: [A1]==IF(AG203=1,"X","") | [B2]=0 | [D4]=• | [E5]=Loose roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B203<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B203=FALSE,B203="")),1,0)
R204: [A1]==IF(AG204=1,"X","") | [B2]=0 | [D4]=• | [E5]=Missing roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B204<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B204=FALSE,B204="")),1,0)
R205: [A1]==IF(AG205=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B205<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B205=FALSE,B205="")),1,0)
R206: [A1]==IF(AG206=1,"X","") | [B2]=0 | [D4]=• | [E5]=Blockage/vegetation to rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B206<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B206=FALSE,B206="")),1,0)
R207: [A1]==IF(AG207=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to external walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B207<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B207=FALSE,B207="")),1,0)
R208: [A1]==IF(AG208=1,"X","") | [B2]=0 | [D4]=• | [E5]=Perished external paintwork | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B208<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B208=FALSE,B208="")),1,0)
R209: [A1]==IF(AG209=1,"X","") | [B2]=0 | [D4]=• | [E5]=Wet rot noted to external joinery timbers | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B209<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B209=FALSE,B209="")),1,0)
R210: [A1]==IF(AG210=1,"X","") | [B2]=0 | [D4]=• | [E5]=Perished external brickwork | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B210<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B210=FALSE,B210="")),1,0)
R211: [A1]==IF(AG211=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective perimeter joint | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B211<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B211=FALSE,B211="")),1,0)
R212: [A1]==IF(AG212=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cracks/movement to walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B212<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B212=FALSE,B212="")),1,0)
R213: [A1]==IF(AG213=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cracks/movement to lintels | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B213<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B213=FALSE,B213="")),1,0)
R214: [A1]==IF(AG214=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R215: [A1]==IF(AG215=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B215<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B215=FALSE,AND(B215=1,E215=""),AND(B215="",E215=""),AND(B215="",E215<>""),AND(B215=0,E215<>""))),1,0)
R216: [A1]==IF(AG216=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B216<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B216=FALSE,AND(B216=1,E216=""),AND(B216="",E216=""),AND(B216="",E216<>""),AND(B216=0,E216<>""))),1,0)
R217: [A1]==IF(AG217=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B217<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$198=0,OR(B217=FALSE,AND(B217=1,E217=""),AND(B217="",E217=""),AND(B217="",E217<>""),AND(B217=0,E217<>""))),1,0)
R218: [A1]==IF(AG218=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R219: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R220: [A1]==IF(AG220=1,"X","") | [B2]==IF(OR(D221="Show",Q221="Show"),1,0) | [AD30]=Always show
R221: [A1]==IF(AG221=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D221="Show",D221="",Q221="Show",Q221=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D221="",Q221="")),1,0)
R222: [A1]==IF(AG222=1,"X","") | [B2]==B220 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R223: [A1]==IF(AG223=1,"X","") | [B2]==B222 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D221="Show",D221="",Q221="Show",Q221=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D221="Show",D223=""),AND(Q221="Show",Q223=""))),1,0)
R224: [A1]==IF(AG224=1,"X","") | [B2]==B223 | [AD30]=Always show
R225: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R226: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R227: [A1]==IF(AG227=1,"X","") | [B2]==IF(OR(D228="Show",Q228="Show"),1,0) | [AD30]=Always show
R228: [A1]==IF(AG228=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D228="Show",D228="",Q228="Show",Q228=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D228="",Q228="")),1,0)
R229: [A1]==IF(AG229=1,"X","") | [B2]==B227 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R230: [A1]==IF(AG230=1,"X","") | [B2]==B229 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D228="Show",D228="",Q228="Show",Q228=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D228="Show",D230=""),AND(Q228="Show",Q230=""))),1,0)
R231: [A1]==IF(AG231=1,"X","") | [B2]==B230 | [AD30]=Always show
R232: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R233: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R234: [A1]==IF(AG234=1,"X","") | [B2]==IF(OR(D235="Show",Q235="Show"),1,0) | [AD30]=Always show
R235: [A1]==IF(AG235=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D235="Show",D235="",Q235="Show",Q235=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D235="",Q235="")),1,0)
R236: [A1]==IF(AG236=1,"X","") | [B2]==B234 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R237: [A1]==IF(AG237=1,"X","") | [B2]==B236 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D235="Show",D235="",Q235="Show",Q235=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D235="Show",D237=""),AND(Q235="Show",Q237=""))),1,0)
R238: [A1]==IF(AG238=1,"X","") | [B2]==B237 | [AD30]=Always show
R239: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R240: [B2]=0 | [D4]=↓ Image Section 4 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R241: [A1]==IF(AG241=1,"X","") | [B2]==IF(OR(D242="Show",Q242="Show"),1,0) | [AD30]=Always show
R242: [A1]==IF(AG242=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D242="Show",D242="",Q242="Show",Q242=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D242="",Q242="")),1,0)
R243: [A1]==IF(AG243=1,"X","") | [B2]==B241 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R244: [A1]==IF(AG244=1,"X","") | [B2]==B243 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D242="Show",D242="",Q242="Show",Q242=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D242="Show",D244=""),AND(Q242="Show",Q244=""))),1,0)
R245: [A1]==IF(AG245=1,"X","") | [B2]==B244 | [AD30]=Always show
R246: [B2]=0 | [D4]=↑ Image Section 4 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R247: [B2]=0 | [D4]=↓ Image Section 5 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R248: [A1]==IF(AG248=1,"X","") | [B2]==IF(OR(D249="Show",Q249="Show"),1,0) | [AD30]=Always show
R249: [A1]==IF(AG249=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D249="Show",D249="",Q249="Show",Q249=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D249="",Q249="")),1,0)
R250: [A1]==IF(AG250=1,"X","") | [B2]==B248 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R251: [A1]==IF(AG251=1,"X","") | [B2]==B250 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D249="Show",D249="",Q249="Show",Q249=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D249="Show",D251=""),AND(Q249="Show",Q251=""))),1,0)
R252: [A1]==IF(AG252=1,"X","") | [B2]==B251 | [AD30]=Always show
R253: [B2]=0 | [D4]=↑ Image Section 5 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R254: [B2]=0 | [D4]=↓ Image Section 6 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R255: [A1]==IF(AG255=1,"X","") | [B2]==IF(OR(D256="Show",Q256="Show"),1,0) | [AD30]=Always show
R256: [A1]==IF(AG256=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D256="Show",D256="",Q256="Show",Q256=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D256="",Q256="")),1,0)
R257: [A1]==IF(AG257=1,"X","") | [B2]==B255 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R258: [A1]==IF(AG258=1,"X","") | [B2]==B257 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D256="Show",D256="",Q256="Show",Q256=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D256="Show",D258=""),AND(Q256="Show",Q258=""))),1,0)
R259: [A1]==IF(AG259=1,"X","") | [B2]==B258 | [AD30]=Always show
R260: [B2]=0 | [D4]=↑ Image Section 6 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R261: [A1]==IF(AG261=1,"X","") | [B2]=0 | [D4]=The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, failure to corre… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B261<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B261=""),1,0)
R262: [A1]==IF(AG262=1,"X","") | [B2]=0 | [D4]=The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B262<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B262=""),1,0)
R263: [A1]==IF(AG263=1,"X","") | [B2]=0 | [D4]=You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repai… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B263<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B263=""),1,0)
R264: [A1]==IF(AG264=1,"X","") | [B2]==B265 | [D4]=Additional Supporting Comments From Surveyor | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B264<>0,1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B264=""),1,0)
R265: [A1]==IF(AG265=1,"X","") | [B2]=1 | [D4]=Prior repainting the ceiling you will have to have your painter apply a stain blocker to the ceiling otherwise the stain will reappear no matter how many times the ceiling is painted. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B265<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B265=1,D265=""),AND(B265="",D265=""),AND(B265="",D265<>""),AND(B265=0,D265<>""))),1,0)
R266: [A1]==IF(AG266=1,"X","") | [B2]=1 | [AD30]=Always show
R267: [A1]==IF(AG267=1,"X","") | [B2]=1 | [D4]=Report produced under the guidance of Tyne Tees Damp Proofing Ltd by: | [AD30]=Always show
R268: [A1]==IF(AG268=1,"X","") | [B2]=1 | [AD30]=Always show
R269: [A1]==IF(AG269=1,"X","") | [B2]==IF(Costing!E14="Steven Robinson",1,0) | [D4]=Steven Robinson | [AD30]=Show dependant on Surveyor
R270: [A1]==IF(AG270=1,"X","") | [B2]==B269 | [D4]=Steve Robinson A.Inst.SSE. | [AD30]=Show dependant on Surveyor
R271: [B2]==B270 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor
R272: [A1]==IF(AG272=1,"X","") | [B2]==IF(Costing!E14="Graeme Hazel",1,0) | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor
R273: [A1]==IF(AG273=1,"X","") | [B2]==B272 | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor
R274: [A1]==IF(AG274=1,"X","") | [B2]==B273 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor
R275: [A1]==IF(AG275=1,"X","") | [B2]==IF(Costing!E14="Mike Davison",1,0) | [D4]=Mike Davison | [AD30]=Show dependant on Surveyor
R276: [A1]==IF(AG276=1,"X","") | [B2]==B275 | [D4]=Mike Davison CSSW  M.inst.SSE  | [AD30]=Show dependant on Surveyor
R277: [A1]==IF(AG277=1,"X","") | [B2]==B276 | [D4]=Technical Director | [AD30]=Show dependant on Surveyor
R278: [A1]==IF(AG278=1,"X","") | [B2]=0 | [D4]=Sketch Plan | [AB28]=Will always show | [AD30]=Always show
R279: [B2]==B278 | [AB28]=Will always show | [AD30]=Always show
R280: [B2]==B279 | [AB28]=Will always show | [AD30]=Always show
R281: [B2]==B280 | [AB28]=Will always show | [AD30]=Always show
R282: [B2]==B281 | [AB28]=Will always show | [AD30]=Always show
R283: [B2]==B282 | [AB28]=Will always show | [AD30]=Always show
R284: [B2]==B283 | [AB28]=Will always show | [AD30]=Always show
R285: [B2]==B284 | [AB28]=Will always show | [AD30]=Always show
R286: [B2]==B285 | [AB28]=Will always show | [AD30]=Always show
R287: [B2]==B286 | [AB28]=Will always show | [AD30]=Always show
R288: [B2]==B287 | [AB28]=Will always show | [AD30]=Always show
R289: [B2]==B288 | [AB28]=Will always show | [AD30]=Always show
R290: [B2]==B289 | [AB28]=Will always show | [AD30]=Always show
R291: [B2]==B290 | [AB28]=Will always show | [AD30]=Always show
R292: [B2]==B291 | [AB28]=Will always show | [AD30]=Always show
R293: [B2]==B292 | [AB28]=Will always show | [AD30]=Always show
R294: [B2]==B293 | [AB28]=Will always show | [AD30]=Always show
R295: [B2]==B294 | [AB28]=Will always show | [AD30]=Always show
R296: [B2]==B295 | [AB28]=Will always show | [AD30]=Always show
R297: [B2]==B296 | [AB28]=Will always show | [AD30]=Always show
R298: [B2]==B297 | [AB28]=Will always show | [AD30]=Always show
R299: [B2]==B298 | [AB28]=Will always show | [AD30]=Always show
R300: [B2]==B299 | [AB28]=Will always show | [AD30]=Always show
R301: [B2]==B300 | [AB28]=Will always show | [AD30]=Always show
R302: [B2]==B301 | [AB28]=Will always show | [AD30]=Always show
R303: [B2]==B302 | [AB28]=Will always show | [AD30]=Always show
R304: [B2]==B303 | [AB28]=Will always show | [AD30]=Always show
R305: [B2]==B304 | [AB28]=Will always show | [AD30]=Always show
R306: [B2]==B305 | [AB28]=Will always show | [AD30]=Always show
R307: [B2]==B306 | [AB28]=Will always show | [AD30]=Always show
R308: [B2]==B307 | [AB28]=Will always show | [AD30]=Always show
R309: [B2]==B308 | [AB28]=Will always show | [AD30]=Always show
R310: [B2]==B309 | [AB28]=Will always show | [AD30]=Always show
R311: [B2]==B310 | [AB28]=Will always show | [AD30]=Always show
R312: [B2]==B311 | [AB28]=Will always show | [AD30]=Always show
R313: [B2]==B312 | [AB28]=Will always show | [AD30]=Always show
R314: [B2]==B313 | [AB28]=Will always show | [AD30]=Always show
R315: [B2]==B314 | [AB28]=Will always show | [AD30]=Always show
R316: [B2]==B315 | [AB28]=Will always show | [AD30]=Always show
R317: [B2]==B316 | [AB28]=Will always show | [AD30]=Always show
R318: [B2]==B317 | [AB28]=Will always show | [AD30]=Always show
R319: [B2]==B318 | [AB28]=Will always show | [AD30]=Always show
R320: [B2]==B319 | [AB28]=Will always show | [AD30]=Always show
R321: [B2]==B320 | [AB28]=Will always show | [AD30]=Always show
R323: [D4]=Office tasks when submitting an estimate 
R324: [D4]=You need to attach the following items to the estimate:
R325: [D4]=• The Survey Inspection Report (generated from the Report tab in this document).
R326: [D4]=• Our Terms and Conditions (latest version always found in the folder '1.Current Documentation'). 
R327: [D4]=• General Notes for clients and Health and Safety precautions (latest version always found in the folder '1.Current Documentation'). 
R330: [D4]=Notes for office
R331: [D4]=Page Breaks:
R332: [D4]=To understand page breaks the link below will be of assistance:
R333: [D4]=https://support.microsoft.com/en-gb/office/insert-move-or-delete-page-breaks-in-a-worksheet-ad3dc726-beec-4a4c-861f-ed640612bdc2
R334: [D4]=Image Best Practices:
R335: [D4]=• Use the 'Alt' key to align an image to the bottom of the cell.
R336: [D4]=• To format an image right click on it to set the height and/or crop ( a good starting height is 6cm).
R337: [D4]=• Try to keep images the same height especially if on the same row and ensure you use the 'alt' key to align the image to the bottom of the cell.
R338: [D4]=• Try and keep the images a fraction smaller than the cell height to prevent overspill if the image cell falls on a page break.
R339: [D4]=• Try and keep the images centrally above their descriptions.
```

## SECTION 3: COSTING SHEET — Complete Pricing Engine

**Total Rows:** 181  |  **Total Cols:** 50

### Complete Row Data (All Formula Columns)

```
R1: [B2]=Sheet Validation | [E5]==IF(SUM(AT:AT)=0,"SHEET NOT YET STARTED",IF(SUM(AU:AU)>0,"SHEET NOT COMPLETE","SHEET COMPLETE")) | [AS45]=Sheet Validation to right | [AT46]=Check if any data is entered | [AU47]=Check if field needs to be completed
R3: [A1]==IF(AU3=1,"X","") | [B2]=Enquiry Details
R4: [A1]==IF(AU4=1,"X","") | [B2]=Enquiry number | [E5]==IF([1]Details!$C$4=0,"",UPPER([1]Details!$C$4)) | [AT46]==IF(E4<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E4=""),1,0)
R5: [A1]==IF(AU5=1,"X","")
R6: [A1]==IF(AU6=1,"X","") | [B2]=Site Details
R7: [A1]==IF(AU7=1,"X","") | [B2]==[1]Details!$B$7 | [E5]==IF([1]Details!$C$7=0,"",PROPER([1]Details!$C$7)) | [AT46]==IF(E7<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E7=""),1,0)
R8: [A1]==IF(AU8=1,"X","") | [B2]==[1]Details!$B$8 | [E5]==IF([1]Details!$C$8=0,"",PROPER([1]Details!$C$8)) | [AT46]==IF(E8<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E8=""),1,0)
R9: [A1]==IF(AU9=1,"X","") | [B2]==[1]Details!$B$9 | [E5]==IF([1]Details!$C$9=0,"",PROPER([1]Details!$C$9)) | [AT46]==IF(E9<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E9=""),1,0)
R10: [A1]==IF(AU10=1,"X","") | [B2]==[1]Details!$B$10 | [E5]==IF([1]Details!$C$10=0,"",PROPER([1]Details!$C$10)) | [AT46]==IF(E10<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E10=""),1,0)
R11: [A1]==IF(AU11=1,"X","") | [B2]==[1]Details!$B$11 | [E5]==IF([1]Details!$C$11=0,"",UPPER([1]Details!$C$11)) | [AT46]==IF(E11<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E11=""),1,0)
R12: [A1]==IF(AU12=1,"X","")
R13: [A1]==IF(AU13=1,"X","") | [B2]=Survey Carried Out By
R14: [A1]==IF(AU14=1,"X","") | [B2]=Surveyor | [E5]==IF([1]Details!$C$16=0,"",[1]Details!$C$16) | [AT46]==IF(E14<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,E14=""),1,0)
R15: [A1]==IF(AU15=1,"X","")
R16: [A1]==IF(AU16=1,"X","") | [B2]=CONDENSATION SHEET
R17: [A1]==IF(AU17=1,"X","") | [B2]=Materials | [F6]=Area/No. | [G7]=UOM | [H8]=Default ↵Mats Cost | [I9]=Adjusted ↵Mats Cost | [J10]=M/U | [K11]=Mats Tot | [M13]=Labour | [N14]=Hour Mult | [O15]=Total Hours | [P16]=Default ↵Lab Cost | [Q17]=Adjusted ↵Lab Cost | [R18]=LMU | [S19]=Lab Total | [T20]=Line total | [U21]=Contractor Materials | [V22]=Contractor hours pay
R18: [A1]==IF(AU18=1,"X","")
R20: [A1]==IF(AU20=1,"X","") | [B2]=PIV - LOFT UNIT | [M13]==B20 | [U21]==B20
R21: [A1]==IF(AU21=1,"X","") | [B2]=VA Pozidry loft unit - heated | [F6]=1 | [G7]=Each | [H8]=324.13 | [I9]==(H21/100)*(100+$F$25) | [J10]=0.4 | [K11]==F21*I21*(1+J21) | [M13]==B21 | [N14]=2.5 | [O15]==F21*N21 | [P16]==$D$107 | [Q17]==(P21/100)*(100+$F$25) | [R18]=4 | [S19]==(O21*Q21*(1+R21)) | [T20]==K21+S21 | [U21]==F21*H21*1.1 | [V22]==O21*$E$107 | [AT46]==IF(F21<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F21=""),1,0)
R22: [A1]==IF(AU22=1,"X","") | [B2]=VA Pozidry loft unit - unheated | [F6]=0 | [G7]=Each | [H8]=309.96 | [I9]==(H22/100)*(100+$F$25) | [J10]=0.4 | [K11]==F22*I22*(1+J22) | [M13]==B22 | [N14]=2.5 | [O15]==F22*N22 | [P16]==$D$107 | [Q17]==(P22/100)*(100+$F$25) | [R18]=4 | [S19]==(O22*Q22*(1+R22)) | [T20]==K22+S22 | [U21]==F22*H22*1.1 | [V22]==O22*$E$107 | [AT46]==IF(F22<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F22=""),1,0)
R23: [A1]==IF(AU23=1,"X","") | [B2]=Electrical Pack - fused spur, cable, JB | [F6]=0 | [G7]=Each | [H8]=12.46 | [I9]==(H23/100)*(100+$F$25) | [J10]=0.3 | [K11]==F23*I23*(1+J23) | [L12]=0.25 | [M13]==B23 | [N14]=1.5 | [O15]==F23*N23 | [P16]==$D$107 | [Q17]==(P23/100)*(100+$F$25) | [R18]=1 | [S19]==(O23*Q23*(1+R23)) | [T20]==K23+S23 | [U21]==F23*H23*1.1 | [V22]==O23*$E$107 | [AT46]==IF(F23<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F23=""),1,0)
R24: [A1]==IF(AU24=1,"X","") | [B2]=Sarkvents | [F6]=0 | [G7]=Each | [H8]=3 | [I9]==(H24/100)*(100+$F$25) | [J10]=0.3 | [K11]==F24*I24*(1+J24) | [L12]=0.25 | [M13]==B24 | [N14]=0.08 | [O15]==F24*N24 | [P16]==$D$107 | [Q17]==(P24/100)*(100+$F$25) | [R18]=1 | [S19]==(O24*Q24*(1+R24)) | [T20]==K24+S24 | [U21]==F24*H24*1.1 | [V22]==O24*$E$107 | [AT46]==IF(F24<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F24=""),1,0)
R25: [A1]==IF(AU25=1,"X","") | [B2]=Section Price Adjustment % | [F6]=-5 | [J10]=Totals | [K11]==SUM(K21:K24) | [M13]=Totals | [O15]==SUM(O21:O24) | [S19]==SUM(S21:S24) | [T20]==SUM(T21:T24) | [U21]==SUM(U21:U24) | [V22]==SUM(V21:V24)
R27: [A1]==IF(AU27=1,"X","") | [B2]=PIV - WALL MOUNTED UNIT | [M13]==B27 | [U21]==B27
R28: [A1]==IF(AU28=1,"X","") | [B2]=VA Pozidry Compact wall mounted unit | [F6]=0 | [G7]=Each | [H8]=273.74 | [I9]==(H28/100)*(100+$F$42) | [J10]=0.4 | [K11]==F28*I28*(1+J28) | [L12]=0.75 | [M13]==B28 | [N14]=4 | [O15]==F28*N28 | [P16]==$D$107 | [Q17]==(P28/100)*(100+$F$42) | [R18]=3 | [S19]==(O28*Q28*(1+R28)) | [T20]==K28+S28 | [U21]==F28*H28*1.1 | [V22]==O28*$E$107 | [AT46]==IF(F28<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F28=""),1,0)
R29: [A1]==IF(AU29=1,"X","") | [B2]=Electrical Pack - fused spur, cable, JB | [F6]=0 | [G7]=Each | [H8]=12.46 | [I9]==(H29/100)*(100+$F$42) | [J10]=0.3 | [K11]==F29*I29*(1+J29) | [L12]=0.25 | [M13]==B29 | [N14]=1.5 | [O15]==F29*N29 | [P16]==$D$107 | [Q17]==(P29/100)*(100+$F$42) | [R18]=1 | [S19]==(O29*Q29*(1+R29)) | [T20]==K29+S29 | [U21]==F29*H29*1.1 | [V22]==O29*$E$107 | [AT46]==IF(F29<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F29=""),1,0)
R30: [A1]==IF(AU30=1,"X","") | [B2]=Ducting - 1m length | [F6]=0 | [G7]=Each | [H8]=3.85 | [I9]==(H30/100)*(100+$F$42) | [J10]=0.3 | [K11]==F30*I30*(1+J30) | [L12]=0.25 | [M13]==B30 | [N14]=0.1 | [O15]==F30*N30 | [P16]==$D$107 | [Q17]==(P30/100)*(100+$F$42) | [R18]=1 | [S19]==(O30*Q30*(1+R30)) | [T20]==K30+S30 | [U21]==F30*H30*1.1 | [V22]==O30*$E$107 | [AT46]==IF(F30<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F30=""),1,0)
R31: [A1]==IF(AU31=1,"X","") | [B2]=Ducting - round elbow | [F6]=0 | [G7]=Each | [H8]=2.78 | [I9]==(H31/100)*(100+$F$42) | [J10]=0.3 | [K11]==F31*I31*(1+J31) | [L12]=0.25 | [M13]==B31 | [N14]=0.1 | [O15]==F31*N31 | [P16]==$D$107 | [Q17]==(P31/100)*(100+$F$42) | [R18]=1 | [S19]==(O31*Q31*(1+R31)) | [T20]==K31+S31 | [U21]==F31*H31*1.1 | [V22]==O31*$E$107 | [AT46]==IF(F31<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F31=""),1,0)
R32: [A1]==IF(AU32=1,"X","") | [B2]=Ducting - round - straight conn | [F6]=0 | [G7]=Each | [H8]=0.52 | [I9]==(H32/100)*(100+$F$42) | [J10]=0.3 | [K11]==F32*I32*(1+J32) | [L12]=0.25 | [M13]==B32 | [N14]=0.1 | [O15]==F32*N32 | [P16]==$D$107 | [Q17]==(P32/100)*(100+$F$42) | [R18]=1 | [S19]==(O32*Q32*(1+R32)) | [T20]==K32+S32 | [U21]==F32*H32*1.1 | [V22]==O32*$E$107 | [AT46]==IF(F32<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F32=""),1,0)
R33: [A1]==IF(AU33=1,"X","") | [B2]=Ducting - round 1m | [F6]=0 | [G7]=Each | [H8]=3.85 | [I9]==(H33/100)*(100+$F$42) | [J10]=0.3 | [K11]==F33*I33*(1+J33) | [L12]=0.25 | [M13]==B33 | [N14]=0.1 | [O15]==F33*N33 | [P16]==$D$107 | [Q17]==(P33/100)*(100+$F$42) | [R18]=1 | [S19]==(O33*Q33*(1+R33)) | [T20]==K33+S33 | [U21]==F33*H33*1.1 | [V22]==O33*$E$107 | [AT46]==IF(F33<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F33=""),1,0)
R34: [A1]==IF(AU34=1,"X","") | [B2]=Ducting - flat to round adaptor | [F6]=0 | [G7]=Each | [H8]=1.63 | [I9]==(H34/100)*(100+$F$42) | [J10]=0.3 | [K11]==F34*I34*(1+J34) | [L12]=0.25 | [M13]==B34 | [N14]=0.1 | [O15]==F34*N34 | [P16]==$D$107 | [Q17]==(P34/100)*(100+$F$42) | [R18]=1 | [S19]==(O34*Q34*(1+R34)) | [T20]==K34+S34 | [U21]==F34*H34*1.1 | [V22]==O34*$E$107 | [AT46]==IF(F34<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F34=""),1,0)
R35: [A1]==IF(AU35=1,"X","") | [B2]=Ducting - flat straight connector | [F6]=0 | [G7]=Each | [H8]=1.14 | [I9]==(H35/100)*(100+$F$42) | [J10]=0.3 | [K11]==F35*I35*(1+J35) | [L12]=0.25 | [M13]==B35 | [N14]=0.1 | [O15]==F35*N35 | [P16]==$D$107 | [Q17]==(P35/100)*(100+$F$42) | [R18]=1 | [S19]==(O35*Q35*(1+R35)) | [T20]==K35+S35 | [U21]==F35*H35*1.1 | [V22]==O35*$E$107 | [AT46]==IF(F35<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F35=""),1,0)
R36: [A1]==IF(AU36=1,"X","") | [B2]=Ducting - flat horizontal bend | [F6]=0 | [G7]=Each | [H8]=3.01 | [I9]==(H36/100)*(100+$F$42) | [J10]=0.3 | [K11]==F36*I36*(1+J36) | [L12]=0.25 | [M13]==B36 | [N14]=0.1 | [O15]==F36*N36 | [P16]==$D$107 | [Q17]==(P36/100)*(100+$F$42) | [R18]=1 | [S19]==(O36*Q36*(1+R36)) | [T20]==K36+S36 | [U21]==F36*H36*1.1 | [V22]==O36*$E$107 | [AT46]==IF(F36<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F36=""),1,0)
R37: [A1]==IF(AU37=1,"X","") | [B2]=Ducting - flat vertical bend | [F6]=0 | [G7]=Each | [H8]=3.01 | [I9]==(H37/100)*(100+$F$42) | [J10]=0.3 | [K11]==F37*I37*(1+J37) | [L12]=0.25 | [M13]==B37 | [N14]=0.1 | [O15]==F37*N37 | [P16]==$D$107 | [Q17]==(P37/100)*(100+$F$42) | [R18]=1 | [S19]==(O37*Q37*(1+R37)) | [T20]==K37+S37 | [U21]==F37*H37*1.1 | [V22]==O37*$E$107 | [AT46]==IF(F37<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F37=""),1,0)
R38: [A1]==IF(AU38=1,"X","") | [B2]=Ducting - flat - 1m | [F6]=0 | [G7]=Each | [H8]=2.87 | [I9]==(H38/100)*(100+$F$42) | [J10]=0.3 | [K11]==F38*I38*(1+J38) | [L12]=0.25 | [M13]==B38 | [N14]=0.1 | [O15]==F38*N38 | [P16]==$D$107 | [Q17]==(P38/100)*(100+$F$42) | [R18]=1 | [S19]==(O38*Q38*(1+R38)) | [T20]==K38+S38 | [U21]==F38*H38*1.1 | [V22]==O38*$E$107 | [AT46]==IF(F38<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F38=""),1,0)
R39: [A1]==IF(AU39=1,"X","") | [B2]=Ducting - insulated flexi (3m Length) | [F6]=0 | [G7]=Each | [H8]=2.5 | [I9]==(H39/100)*(100+$F$42) | [J10]=0.3 | [K11]==F39*I39*(1+J39) | [L12]=0.25 | [M13]==B39 | [N14]=0.1 | [O15]==F39*N39 | [P16]==$D$107 | [Q17]==(P39/100)*(100+$F$42) | [R18]=1 | [S19]==(O39*Q39*(1+R39)) | [T20]==K39+S39 | [U21]==F39*H39*1.1 | [V22]==O39*$E$107 | [AT46]==IF(F39<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F39=""),1,0)
R40: [A1]==IF(AU40=1,"X","") | [B2]=Grille | [F6]=0 | [G7]=Each | [H8]=2.42 | [I9]==(H40/100)*(100+$F$42) | [J10]=0.3 | [K11]==F40*I40*(1+J40) | [L12]=0.25 | [M13]==B40 | [N14]=0.1 | [O15]==F40*N40 | [P16]==$D$107 | [Q17]==(P40/100)*(100+$F$42) | [R18]=1 | [S19]==(O40*Q40*(1+R40)) | [T20]==K40+S40 | [U21]==F40*H40*1.1 | [V22]==O40*$E$107 | [AT46]==IF(F40<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F40=""),1,0)
R41: [A1]==IF(AU41=1,"X","") | [B2]=Diamond core 107mm hole  | [F6]=0 | [G7]=Each | [H8]=0 | [I9]==(H41/100)*(100+$F$42) | [J10]=0.3 | [K11]==F41*I41*(1+J41) | [L12]=0.25 | [M13]==B41 | [N14]=2 | [O15]==F41*N41 | [P16]==$D$107 | [Q17]==(P41/100)*(100+$F$42) | [R18]=1 | [S19]==(O41*Q41*(1+R41)) | [T20]==K41+S41 | [U21]==F41*H41*1.1 | [V22]==O41*$E$107 | [AT46]==IF(F41<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F41=""),1,0)
R42: [A1]==IF(AU42=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K28:K41) | [M13]=Totals | [O15]==SUM(O28:O41) | [S19]==SUM(S28:S41) | [T20]==SUM(T28:T41) | [U21]==SUM(U28:U41) | [V22]==SUM(V28:V41)
R44: [A1]==IF(AU44=1,"X","") | [B2]=TRICKLE AND BOOST HUMIDISTAT FAN | [M13]==B44 | [U21]==B44
R45: [A1]==IF(AU45=1,"X","") | [B2]=Trickle and boost humidistat fan (greenwood) | [F6]=5 | [G7]=Each | [H8]=70.2 | [I9]==(H45/100)*(100+$F$49) | [J10]=0.3 | [K11]==F45*I45*(1+J45) | [L12]=0.75 | [M13]==B45 | [N14]=1.5 | [O15]==F45*N45 | [P16]==$D$107 | [Q17]==(P45/100)*(100+$F$49) | [R18]=1 | [S19]==(O45*Q45*(1+R45)) | [T20]==K45+S45 | [U21]==F45*H45*1.1 | [V22]==O45*$E$107 | [AT46]==IF(F45<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F45=""),1,0)
R46: [A1]==IF(AU46=1,"X","") | [B2]=Electrical Pack - fused spur, cable, JB | [F6]=0 | [G7]=Each | [H8]=12.46 | [I9]==(H46/100)*(100+$F$49) | [J10]=0.3 | [K11]==F46*I46*(1+J46) | [L12]=0.25 | [M13]==B46 | [N14]=1.5 | [O15]==F46*N46 | [P16]==$D$107 | [Q17]==(P46/100)*(100+$F$49) | [R18]=1 | [S19]==(O46*Q46*(1+R46)) | [T20]==K46+S46 | [U21]==F46*H46*1.1 | [V22]==O46*$E$107 | [AT46]==IF(F46<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F46=""),1,0)
R47: [A1]==IF(AU47=1,"X","") | [B2]=Grille | [F6]=0 | [G7]=Each | [H8]=2.42 | [I9]==(H47/100)*(100+$F$49) | [J10]=0.3 | [K11]==F47*I47*(1+J47) | [L12]=0.25 | [M13]==B47 | [N14]=0.1 | [O15]==F47*N47 | [P16]==$D$107 | [Q17]==(P47/100)*(100+$F$49) | [R18]=1 | [S19]==(O47*Q47*(1+R47)) | [T20]==K47+S47 | [U21]==F47*H47*1.1 | [V22]==O47*$E$107 | [AT46]==IF(F47<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F47=""),1,0)
R48: [A1]==IF(AU48=1,"X","") | [B2]=Diamond core 107mm hole  | [F6]=0 | [G7]=Each | [H8]=0 | [I9]==(H48/100)*(100+$F$49) | [J10]=0.3 | [K11]==F48*I48*(1+J48) | [L12]=0.25 | [M13]==B48 | [N14]=2 | [O15]==F48*N48 | [P16]==$D$107 | [Q17]==(P48/100)*(100+$F$49) | [R18]=1 | [S19]==(O48*Q48*(1+R48)) | [T20]==K48+S48 | [U21]==F48*H48*1.1 | [V22]==O48*$E$107 | [AT46]==IF(F48<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F48=""),1,0)
R49: [A1]==IF(AU49=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K45:K48) | [M13]=Totals | [O15]==SUM(O45:O48) | [S19]==SUM(S45:S48) | [T20]==SUM(T45:T48) | [U21]==SUM(U45:U48) | [V22]==SUM(V45:V48)
R51: [A1]==IF(AU51=1,"X","") | [B2]=DRYAIRE CPASS (PLASMO) INSULATED PULLCORD PASSIVE VENT | [M13]==B51 | [U21]==B51
R52: [A1]==IF(AU52=1,"X","") | [B2]=Dryaire Cpass (plasmo) insulated pullcord passive vent | [F6]=0 | [G7]=Each | [H8]=36.18 | [I9]==(H52/100)*(100+$F$54) | [J10]=0.3 | [K11]==F52*I52*(1+J52) | [L12]=0.75 | [M13]==B52 | [N14]=1.5 | [O15]==F52*N52 | [P16]==$D$107 | [Q17]==(P52/100)*(100+$F$54) | [R18]=1 | [S19]==(O52*Q52*(1+R52)) | [T20]==K52+S52 | [U21]==F52*H52*1.1 | [V22]==O52*$E$107 | [AT46]==IF(F52<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F52=""),1,0)
R53: [A1]==IF(AU53=1,"X","") | [B2]=Diamond core 107mm hole  | [F6]=0 | [G7]=Each | [H8]=0 | [I9]==(H53/100)*(100+$F$54) | [J10]=0.3 | [K11]==F53*I53*(1+J53) | [L12]=0.25 | [M13]==B53 | [N14]=2 | [O15]==F53*N53 | [P16]==$D$107 | [Q17]==(P53/100)*(100+$F$54) | [R18]=1 | [S19]==(O53*Q53*(1+R53)) | [T20]==K53+S53 | [U21]==F53*H53*1.1 | [V22]==O53*$E$107 | [AT46]==IF(F53<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F53=""),1,0)
R54: [A1]==IF(AU54=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K52:K53) | [M13]=Totals | [O15]==SUM(O52:O53) | [S19]==SUM(S52:S53) | [T20]==SUM(T52:T53) | [U21]==SUM(U52:U53) | [V22]==SUM(V52:V53)
R56: [A1]==IF(AU56=1,"X","") | [B2]=Dryaire Cvent | [M13]==B56 | [U21]==B56
R57: [A1]==IF(AU57=1,"X","") | [B2]=Dryaire Cvent | [F6]=0 | [G7]=Each | [H8]=12.5 | [I9]==(H57/100)*(100+$F$59) | [J10]=0.3 | [K11]==F57*I57*(1+J57) | [L12]=0.75 | [M13]==B57 | [N14]=1.5 | [O15]==F57*N57 | [P16]==$D$107 | [Q17]==(P57/100)*(100+$F$59) | [R18]=1 | [S19]==(O57*Q57*(1+R57)) | [T20]==K57+S57 | [U21]==F57*H57*1.1 | [V22]==O57*$E$107 | [AT46]==IF(F57<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F57=""),1,0)
R58: [A1]==IF(AU58=1,"X","") | [B2]=Diamond core 107mm hole  | [F6]=0 | [G7]=Each | [H8]=0 | [I9]==(H58/100)*(100+$F$59) | [J10]=0.3 | [K11]==F58*I58*(1+J58) | [L12]=0.25 | [M13]==B58 | [N14]=2 | [O15]==F58*N58 | [P16]==$D$107 | [Q17]==(P58/100)*(100+$F$59) | [R18]=1 | [S19]==(O58*Q58*(1+R58)) | [T20]==K58+S58 | [U21]==F58*H58*1.1 | [V22]==O58*$E$107 | [AT46]==IF(F58<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F58=""),1,0)
R59: [A1]==IF(AU59=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K57:K58) | [M13]=Totals | [O15]==SUM(O57:O58) | [S19]==SUM(S57:S58) | [T20]==SUM(T57:T58) | [U21]==SUM(U57:U58) | [V22]==SUM(V57:V58)
R61: [A1]==IF(AU61=1,"X","") | [B2]=Joinery: Supply and fit boxwork for ducting | [M13]==B61 | [U21]==B61
R62: [A1]==IF(AU62=1,"X","") | [B2]=Joinery to box in ducting (per metre) Min charge 2.4 metres | [F6]=0 | [G7]=LM | [H8]==IF(F62=0,0,IF(F62<2.4,(15*2.4)/F62,15)) | [I9]==(H62/100)*(100+$F$63) | [J10]=0.3 | [K11]==F62*I62*(1+J62) | [M13]==B62 | [N14]=0.5 | [O15]==IF(F62=0,0,IF(F62=0,0,IF(F62<2.4,(N62*2.4),(N62*F62)))) | [P16]==$D$107 | [Q17]==(P62/100)*(100+$F$63) | [R18]=1 | [S19]==(O62*Q62*(1+R62)) | [T20]==K62+S62 | [U21]==F62*H62*1.1 | [V22]==O62*$E$107 | [W23]=Optional Item For Customer | [AT46]==IF(F62<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F62=""),1,0)
R63: [A1]==IF(AU63=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K62:K62) | [M13]=Totals | [O15]==SUM(O62:O62) | [S19]==SUM(S62:S62) | [T20]==SUM(T62:T62) | [U21]==SUM(U62:U62) | [V22]==SUM(V62:V62)
R65: [A1]==IF(AU65=1,"X","") | [B2]=Loft hatch - new hatchwith sturdy fold down ladder with handrail and switched lamp | [M13]==B65 | [U21]==B65
R66: [A1]==IF(AU66=1,"X","") | [B2]=New loft hatch - with sturdy fold down ladder with handrail and switched lamp | [F6]=0 | [G7]=Each | [H8]=360 | [I9]==(H66/100)*(100+$F$67) | [J10]=0.3 | [K11]==F66*I66*(1+J66) | [M13]==B66 | [N14]=4 | [O15]==F66*N66 | [P16]==$D$107 | [Q17]==(P66/100)*(100+$F$67) | [R18]=1 | [S19]==(O66*Q66*(1+R66)) | [T20]==K66+S66 | [U21]==F66*H66*1.1 | [V22]==O66*$E$107 | [W23]=Optional Item For Customer | [AT46]==IF(F66<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F66=""),1,0)
R67: [A1]==IF(AU67=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K66:K66) | [M13]=Totals | [O15]==SUM(O65:O66) | [S19]==SUM(S66:S66) | [T20]==SUM(T66:T66) | [U21]==SUM(U66:U66) | [V22]==SUM(V66:V66)
R69: [A1]==IF(AU69=1,"X","") | [B2]=Loft Hatch - enlarge current loft hatch | [M13]==B69 | [U21]==B69
R70: [A1]==IF(AU70=1,"X","") | [B2]=Existing loft hatch - enlarge loft hatch | [F6]=0 | [G7]=Each | [H8]=45 | [I9]==(H70/100)*(100+$F$71) | [J10]=0.3 | [K11]==F70*I70*(1+J70) | [M13]==B70 | [N14]=4 | [O15]==F70*N70 | [P16]==$D$107 | [Q17]==(P70/100)*(100+$F$71) | [R18]=1 | [S19]==(O70*Q70*(1+R70)) | [T20]==K70+S70 | [U21]==F70*H70*1.1 | [V22]==O70*$E$107 | [W23]=Optional Item For Customer | [AT46]==IF(F70<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F70=""),1,0)
R71: [A1]==IF(AU71=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K70:K70) | [M13]=Totals | [O15]==SUM(O69:O70) | [S19]==SUM(S70:S70) | [T20]==SUM(T70:T70) | [U21]==SUM(U70:U70) | [V22]==SUM(V70:V70)
R73: [A1]==IF(AU73=1,"X","") | [B2]=Mould Treatments | [M13]==B73 | [U21]==B73
R74: [A1]==IF(AU74=1,"X","") | [B2]=Mould treatment  | [F6]=6 | [G7]=M2 | [H8]=0.5 | [I9]==(H74/100)*(100+$F$75) | [J10]=0.3 | [K11]==F74*I74*(1+J74) | [M13]==B74 | [N14]=0.25 | [O15]==F74*N74 | [P16]==$D$107 | [Q17]==(P74/100)*(100+$F$75) | [R18]=1 | [S19]==(O74*Q74*(1+R74)) | [T20]==K74+S74 | [U21]==F74*H74*1.1 | [V22]==O74*$E$107 | [W23]=Optional Item For Customer | [AT46]==IF(F74<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F74=""),1,0)
R75: [A1]==IF(AU75=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K74:K74) | [M13]=Totals | [O15]==SUM(O73:O74) | [S19]==SUM(S74:S74) | [T20]==SUM(T74:T74) | [U21]==SUM(U74:U74) | [V22]==SUM(V74:V74)
R77: [A1]==IF(AU77=1,"X","") | [B2]=Asbestos Testing | [M13]==B77 | [U21]==B77
R78: [A1]==IF(AU78=1,"X","") | [B2]=Asbestos Testing | [F6]=0 | [G7]=Each | [H8]=30 | [I9]==(H78/100)*(100+$F$79) | [J10]=0.3 | [K11]==F78*I78*(1+J78) | [M13]==B78 | [N14]=0.64 | [O15]==F78*N78 | [P16]==$D$107 | [Q17]==(P78/100)*(100+$F$79) | [R18]=1 | [S19]==(O78*Q78*(1+R78)) | [T20]==K78+S78 | [U21]==F78*H78*1.1 | [V22]==O78*$E$107 | [W23]=Optional Item For Customer | [AT46]==IF(F78<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F78=""),1,0)
R79: [A1]==IF(AU79=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K78:K78) | [M13]=Totals | [O15]==SUM(O77:O78) | [S19]==SUM(S78:S78) | [T20]==SUM(T78:T78) | [U21]==SUM(U78:U78) | [V22]==SUM(V78:V78)
R81: [A1]==IF(AU81=1,"X","") | [B2]=Airbricks | [M13]==B81 | [U21]==B81
R82: [A1]==IF(AU82=1,"X","") | [B2]=Clean out airbrick/fit new face | [F6]=0 | [G7]=Each | [H8]=16 | [I9]==(H82/100)*(100+$F$85) | [J10]=0.3 | [K11]==F82*I82*(1+J82) | [M13]==B82 | [N14]=0.5 | [O15]==F82*N82 | [P16]==$D$107 | [Q17]==(P82/100)*(100+$F$85) | [R18]=1 | [S19]==(O82*Q82*(1+R82)) | [T20]==K82+S82 | [U21]==F82*H82*1.1 | [V22]==O82*$E$107 | [AT46]==IF(F82<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F82=""),1,0)
R83: [A1]==IF(AU83=1,"X","") | [B2]=Lift/upgrade existing airbrick/fit new face | [F6]=0 | [G7]=Each | [H8]=16 | [I9]==(H83/100)*(100+$F$85) | [J10]=0.3 | [K11]==F83*I83*(1+J83) | [M13]==B83 | [N14]=0.8 | [O15]==F83*N83 | [P16]==$D$107 | [Q17]==(P83/100)*(100+$F$85) | [R18]=1 | [S19]==(O83*Q83*(1+R83)) | [T20]==K83+S83 | [U21]==F83*H83*1.1 | [V22]==O83*$E$107 | [AT46]==IF(F83<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F83=""),1,0)
R84: [A1]==IF(AU84=1,"X","") | [B2]=Install additional  airbrick | [F6]=0 | [G7]=Each | [H8]=16 | [I9]==(H84/100)*(100+$F$85) | [J10]=0.3 | [K11]==F84*I84*(1+J84) | [M13]==B84 | [N14]=2 | [O15]==F84*N84 | [P16]==$D$107 | [Q17]==(P84/100)*(100+$F$85) | [R18]=1 | [S19]==(O84*Q84*(1+R84)) | [T20]==K84+S84 | [U21]==F84*H84*1.1 | [V22]==O84*$E$107 | [AT46]==IF(F84<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F84=""),1,0)
R85: [A1]==IF(AU85=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K82:K84) | [M13]=Totals | [O15]==SUM(O82:O84) | [S19]==SUM(S82:S84) | [T20]==SUM(T82:T84) | [U21]==SUM(U82:U84) | [V22]==SUM(V82:V84)
R87: [A1]==IF(AU87=1,"X","") | [B2]=Skip hire 8yd | [M13]==B87 | [U21]==B87
R88: [A1]==IF(AU88=1,"X","") | [B2]=Rubbish removal skips | [F6]=0 | [G7]=Each | [H8]=270 | [I9]==H88 | [J10]=0.3 | [K11]==F88*I88*(1+J88) | [M13]==B88 | [N14]=0 | [O15]=0 | [P16]==$D$107 | [Q17]==P88 | [R18]=1 | [S19]==(O88*Q88*(1+R88)) | [T20]==K88+S88 | [U21]=0 | [V22]=0 | [AT46]==IF(F88<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F88=""),1,0)
R90: [A1]==IF(AU90=1,"X","")
R91: [A1]==IF(AU91=1,"X","") | [E5]=Materials sub tot | [K11]==K25+K42+K49+K54+K59+K63+K67+K71+K75+K79+K85+K88 | [M13]=TT Totals | [U21]=Contractor Totals
R92: [A1]==IF(AU92=1,"X","") | [E5]=Labour sub tot | [H8]==O92 | [K11]==S25+S42+S49+S54+S59+S63+S67+S71+S75+S79+S85+S88 | [M13]=Labour hours sub total | [O15]==O25+O42+O49+O54+O59+O63+O67+O71+O75+O79+O85+O88 | [U21]==U25+U42+U49+U54+U59+U63+U67+U71+U75+U79+U85+U88 | [V22]==V25+V42+V49+V54+V59+V63+V67+V71+V75+V79+V85+V88
R93: [A1]==IF(AU93=1,"X","") | [H8]=Travel | [K11]==(F107*C107)+((K98*K99)*2)*J107 | [M13]=Hours travel | [O15]==K98*K99*2*K100/30
R94: [A1]==IF(AU94=1,"X","") | [H8]= Price | [K11]==SUM(K91:K93) | [M13]=Total hours | [O15]==SUM(O92:O93) | [U21]=Travel | [V22]==K98*(K99*2)*0.45
R95: [A1]==IF(AU95=1,"X","") | [H8]=Vat | [K11]==K94*0.2 | [U21]=Tot | [V22]==U92+V92+V94
R96: [A1]==IF(AU96=1,"X","") | [H8]=Total price inc vat | [K11]==SUM(K94:K95)
R97: [A1]==IF(AU97=1,"X","") | [M13]=For Office Only
R98: [A1]==IF(AU98=1,"X","") | [J10]=No of days | [K11]==(ROUNDUP((O92/6.5)/K100,0))
R99: [A1]==IF(AU99=1,"X","") | [J10]=Distance from office to job (one way) | [K11]==IF([1]Details!$C$12=0,"",[1]Details!$C$12) | [M13]=The value of the csv import on upload should match the figures to the right ↵(this may be less than the totals to the left as optional items are are not calculated up on the import until the customer selects them) | [S19]=Sub Total | [U21]==SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!L:L,"No",'CF CSV Upload'!Q:Q,"Yes") | [AT46]==IF(K99<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K99=""),1,0)
R100: [A1]==IF(AU100=1,"X","") | [J10]=No of men travelling | [K11]=1 | [S19]=Tax: VAT (20%)	 | [U21]==U99*0.2 | [AT46]==IF(K100<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K100=""),1,0)
R101: [A1]==IF(AU101=1,"X","") | [S19]=Total | [U21]==U99+U100
R103: [A1]==IF(AU103=1,"X","") | [B2]=Choose Estimate Cover Sheet Image To Use (dropdown) | [F6]=Image 1: Default or Miscellaneous | [M13]=View Images (this link will take you to the the Estimates Coversheet Images Tab) | [AT46]==IF(F103<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F103=""),1,0)
R104: [B2]=Survey sheet end
R105: [C3]=Base Travel Hourly rate  | [D4]=Base Labour Hourly rate  | [E5]=Contractor Labour Hourly rate  | [F6]=Approx Travel cost
R106: [F6]=Hours | [H8]=mens travel | [J10]=Vehicle cost | [K11]=Total
R107: [C3]==D107 | [D4]=30.63 | [E5]=28 | [F6]==O93 | [H8]==F107*D107 | [J10]=0.5 | [K11]==(F107*C107)+(K98*K99*2)*J107
```

## SECTION 4: CF CSV UPLOAD SHEET

**Total Rows:** 97  |  **Total Cols:** 17

### Column Headers (Row 1)

| Col | Letter | Header |
|-----|--------|--------|
| 1 | A | Section |
| 2 | B | Section Description |
| 3 | C | Item Name |
| 4 | D | Quantity |
| 5 | E | Unit Cost |
| 6 | F | Unit |
| 7 | G | Cost Code |
| 8 | H | Markup |
| 9 | I | Markup Type |
| 10 | J | Item Type |
| 11 | K | Is Taxable |
| 12 | L | Is Optional |
| 13 | M | Assigned To |
| 14 | N | CF IGNORE - LINE VALUE |
| 15 | O | CF IGNORE - Zero value Section Validation |
| 16 | P | CF IGNORE - LINE VALUE FOR CUSTOMER SUMMARY |
| 17 | Q | CF IGNORE - INCLUDE PRICE IN CUSTOMER SUMMARY |

### Complete Row Data

```
R1: [A1]=Section | [B2]=Section Description | [C3]=Item Name | [D4]=Quantity | [E5]=Unit Cost | [F6]=Unit | [G7]=Cost Code | [H8]=Markup | [I9]=Markup Type | [J10]=Item Type | [K11]=Is Taxable | [L12]=Is Optional | [M13]=Assigned To | [N14]=CF IGNORE - LINE VALUE | [O15]=CF IGNORE - Zero value Section Validation | [P16]=CF IGNORE - LINE VALUE FOR CUSTOMER SUMMARY | [Q17]=CF IGNORE - INCLUDE PRICE IN CUSTOMER SUMMARY
R2: [A1]=='Customer Summary'!C4 | [C3]==Costing!B21 | [D4]==Costing!F21 | [E5]==Costing!I21 | [F6]==Costing!G21 | [G7]=Condensation Materials | [H8]==Costing!J21*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J2="MTL","Preservation Shop","") | [N14]==D2*E2 | [O15]=DELETE | [P16]==N2*(1+(H2/100)) | [Q17]=No
R3: [A1]==A2 | [C3]==Costing!B22 | [D4]==Costing!F22 | [E5]==Costing!I22 | [F6]==Costing!G22 | [G7]=Condensation Materials | [H8]==Costing!J22*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J3="MTL","Preservation Shop","") | [N14]==D3*E3 | [O15]=DELETE | [P16]==N3*(1+(H3/100)) | [Q17]=No
R4: [A1]==A3 | [C3]==Costing!B23 | [D4]==Costing!F23 | [E5]==Costing!I23 | [F6]==Costing!G23 | [G7]=Condensation Materials | [H8]==Costing!J23*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J4="MTL","Preservation Shop","") | [N14]==D4*E4 | [O15]=DELETE | [P16]==N4*(1+(H4/100)) | [Q17]=No
R5: [A1]==A4 | [C3]==Costing!B24 | [D4]==Costing!F24 | [E5]==Costing!I24 | [F6]==Costing!G24 | [G7]=Condensation Materials | [H8]==Costing!J24*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J5="MTL","Preservation Shop","") | [N14]==D5*E5 | [O15]=DELETE | [P16]==N5*(1+(H5/100)) | [Q17]=No
R6: [A1]==A5 | [C3]==Costing!M21 | [D4]==Costing!O21 | [E5]==Costing!Q21 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R21*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J6="MTL","Preservation Shop","") | [N14]==D6*E6 | [O15]=DELETE | [P16]==N6*(1+(H6/100)) | [Q17]=No
R7: [A1]==A6 | [C3]==Costing!M22 | [D4]==Costing!O22 | [E5]==Costing!Q22 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R22*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J7="MTL","Preservation Shop","") | [N14]==D7*E7 | [O15]=DELETE | [P16]==N7*(1+(H7/100)) | [Q17]=No
R8: [A1]==A7 | [C3]==Costing!M23 | [D4]==Costing!O23 | [E5]==Costing!Q23 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R23*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J8="MTL","Preservation Shop","") | [N14]==D8*E8 | [O15]=DELETE | [P16]==N8*(1+(H8/100)) | [Q17]=No
R9: [A1]==A8 | [C3]==Costing!M24 | [D4]==Costing!O24 | [E5]==Costing!Q24 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R24*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J9="MTL","Preservation Shop","") | [N14]==D9*E9 | [O15]=DELETE | [P16]==N9*(1+(H9/100)) | [Q17]=No
R10: [A1]==A9 | [C3]==_xlfn.CONCAT(A10," - Materials") | [D4]=1 | [E5]==N10 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P10-N10)/N10)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D4 | [M13]==IF(J10="MTL","Preservation Shop","") | [N14]==SUM(N2:N5) | [O15]==IF(N10=0,"DELETE","LEAVE") | [P16]==SUM(P2:P5) | [Q17]=Yes
R11: [A1]==A10 | [C3]==_xlfn.CONCAT(A11," - Labour") | [D4]==SUM(D6:D9) | [E5]==N11/D11 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P11-N11)/N11)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L10 | [M13]==IF(J11="MTL","Preservation Shop","") | [N14]==SUM(N6:N9) | [O15]==IF(N11=0,"DELETE","LEAVE") | [P16]==SUM(P6:P9) | [Q17]=Yes
R12: [O15]=DELETE
R13: [A1]=='Customer Summary'!C5 | [C3]==Costing!B28 | [D4]==Costing!F28 | [E5]==Costing!I28 | [F6]==Costing!G28 | [G7]=Condensation Materials | [H8]==Costing!J28*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J13="MTL","Preservation Shop","") | [N14]==D13*E13 | [O15]=DELETE | [P16]==N13*(1+(H13/100)) | [Q17]=No
R14: [A1]==A13 | [C3]==Costing!B29 | [D4]==Costing!F29 | [E5]==Costing!I29 | [F6]==Costing!G29 | [G7]=Condensation Materials | [H8]==Costing!J29*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J14="MTL","Preservation Shop","") | [N14]==D14*E14 | [O15]=DELETE | [P16]==N14*(1+(H14/100)) | [Q17]=No
R15: [A1]==A14 | [C3]==Costing!B30 | [D4]==Costing!F30 | [E5]==Costing!I30 | [F6]==Costing!G30 | [G7]=Condensation Materials | [H8]==Costing!J30*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J15="MTL","Preservation Shop","") | [N14]==D15*E15 | [O15]=DELETE | [P16]==N15*(1+(H15/100)) | [Q17]=No
R16: [A1]==A15 | [C3]==Costing!B31 | [D4]==Costing!F31 | [E5]==Costing!I31 | [F6]==Costing!G31 | [G7]=Condensation Materials | [H8]==Costing!J31*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J16="MTL","Preservation Shop","") | [N14]==D16*E16 | [O15]=DELETE | [P16]==N16*(1+(H16/100)) | [Q17]=No
R17: [A1]==A16 | [C3]==Costing!B32 | [D4]==Costing!F32 | [E5]==Costing!I32 | [F6]==Costing!G32 | [G7]=Condensation Materials | [H8]==Costing!J32*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J17="MTL","Preservation Shop","") | [N14]==D17*E17 | [O15]=DELETE | [P16]==N17*(1+(H17/100)) | [Q17]=No
R18: [A1]==A17 | [C3]==Costing!B33 | [D4]==Costing!F33 | [E5]==Costing!I33 | [F6]==Costing!G33 | [G7]=Condensation Materials | [H8]==Costing!J33*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J18="MTL","Preservation Shop","") | [N14]==D18*E18 | [O15]=DELETE | [P16]==N18*(1+(H18/100)) | [Q17]=No
R19: [A1]==A18 | [C3]==Costing!B34 | [D4]==Costing!F34 | [E5]==Costing!I34 | [F6]==Costing!G34 | [G7]=Condensation Materials | [H8]==Costing!J34*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J19="MTL","Preservation Shop","") | [N14]==D19*E19 | [O15]=DELETE | [P16]==N19*(1+(H19/100)) | [Q17]=No
R20: [A1]==A19 | [C3]==Costing!B35 | [D4]==Costing!F35 | [E5]==Costing!I35 | [F6]==Costing!G35 | [G7]=Condensation Materials | [H8]==Costing!J35*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J20="MTL","Preservation Shop","") | [N14]==D20*E20 | [O15]=DELETE | [P16]==N20*(1+(H20/100)) | [Q17]=No
R21: [A1]==A20 | [C3]==Costing!B36 | [D4]==Costing!F36 | [E5]==Costing!I36 | [F6]==Costing!G36 | [G7]=Condensation Materials | [H8]==Costing!J36*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J21="MTL","Preservation Shop","") | [N14]==D21*E21 | [O15]=DELETE | [P16]==N21*(1+(H21/100)) | [Q17]=No
R22: [A1]==A21 | [C3]==Costing!B37 | [D4]==Costing!F37 | [E5]==Costing!I37 | [F6]==Costing!G37 | [G7]=Condensation Materials | [H8]==Costing!J37*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J22="MTL","Preservation Shop","") | [N14]==D22*E22 | [O15]=DELETE | [P16]==N22*(1+(H22/100)) | [Q17]=No
R23: [A1]==A22 | [C3]==Costing!B38 | [D4]==Costing!F38 | [E5]==Costing!I38 | [F6]==Costing!G38 | [G7]=Condensation Materials | [H8]==Costing!J38*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J23="MTL","Preservation Shop","") | [N14]==D23*E23 | [O15]=DELETE | [P16]==N23*(1+(H23/100)) | [Q17]=No
R24: [A1]==A23 | [C3]==Costing!B39 | [D4]==Costing!F39 | [E5]==Costing!I39 | [F6]==Costing!G39 | [G7]=Condensation Materials | [H8]==Costing!J39*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J24="MTL","Preservation Shop","") | [N14]==D24*E24 | [O15]=DELETE | [P16]==N24*(1+(H24/100)) | [Q17]=No
R25: [A1]==A24 | [C3]==Costing!B40 | [D4]==Costing!F40 | [E5]==Costing!I40 | [F6]==Costing!G40 | [G7]=Condensation Materials | [H8]==Costing!J40*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J25="MTL","Preservation Shop","") | [N14]==D25*E25 | [O15]=DELETE | [P16]==N25*(1+(H25/100)) | [Q17]=No
R26: [A1]==A25 | [C3]==Costing!B41 | [D4]==Costing!F41 | [E5]==Costing!I41 | [F6]==Costing!G41 | [G7]=Condensation Materials | [H8]==Costing!J41*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J26="MTL","Preservation Shop","") | [N14]==D26*E26 | [O15]=DELETE | [P16]==N26*(1+(H26/100)) | [Q17]=No
R27: [A1]==A26 | [C3]==Costing!M28 | [D4]==Costing!O28 | [E5]==Costing!Q28 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R28*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J27="MTL","Preservation Shop","") | [N14]==D27*E27 | [O15]=DELETE | [P16]==N27*(1+(H27/100)) | [Q17]=No
R28: [A1]==A27 | [C3]==Costing!M29 | [D4]==Costing!O29 | [E5]==Costing!Q29 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R29*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J28="MTL","Preservation Shop","") | [N14]==D28*E28 | [O15]=DELETE | [P16]==N28*(1+(H28/100)) | [Q17]=No
R29: [A1]==A28 | [C3]==Costing!M30 | [D4]==Costing!O30 | [E5]==Costing!Q30 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R30*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J29="MTL","Preservation Shop","") | [N14]==D29*E29 | [O15]=DELETE | [P16]==N29*(1+(H29/100)) | [Q17]=No
R30: [A1]==A29 | [C3]==Costing!M31 | [D4]==Costing!O31 | [E5]==Costing!Q31 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R31*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J30="MTL","Preservation Shop","") | [N14]==D30*E30 | [O15]=DELETE | [P16]==N30*(1+(H30/100)) | [Q17]=No
R31: [A1]==A30 | [C3]==Costing!M32 | [D4]==Costing!O32 | [E5]==Costing!Q32 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R32*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J31="MTL","Preservation Shop","") | [N14]==D31*E31 | [O15]=DELETE | [P16]==N31*(1+(H31/100)) | [Q17]=No
R32: [A1]==A31 | [C3]==Costing!M33 | [D4]==Costing!O33 | [E5]==Costing!Q33 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R33*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J32="MTL","Preservation Shop","") | [N14]==D32*E32 | [O15]=DELETE | [P16]==N32*(1+(H32/100)) | [Q17]=No
R33: [A1]==A32 | [C3]==Costing!M34 | [D4]==Costing!O34 | [E5]==Costing!Q34 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R34*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J33="MTL","Preservation Shop","") | [N14]==D33*E33 | [O15]=DELETE | [P16]==N33*(1+(H33/100)) | [Q17]=No
R34: [A1]==A33 | [C3]==Costing!M35 | [D4]==Costing!O35 | [E5]==Costing!Q35 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R35*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J34="MTL","Preservation Shop","") | [N14]==D34*E34 | [O15]=DELETE | [P16]==N34*(1+(H34/100)) | [Q17]=No
R35: [A1]==A34 | [C3]==Costing!M36 | [D4]==Costing!O36 | [E5]==Costing!Q36 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R36*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J35="MTL","Preservation Shop","") | [N14]==D35*E35 | [O15]=DELETE | [P16]==N35*(1+(H35/100)) | [Q17]=No
R36: [A1]==A35 | [C3]==Costing!M37 | [D4]==Costing!O37 | [E5]==Costing!Q37 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R37*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J36="MTL","Preservation Shop","") | [N14]==D36*E36 | [O15]=DELETE | [P16]==N36*(1+(H36/100)) | [Q17]=No
R37: [A1]==A36 | [C3]==Costing!M38 | [D4]==Costing!O38 | [E5]==Costing!Q38 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R38*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J37="MTL","Preservation Shop","") | [N14]==D37*E37 | [O15]=DELETE | [P16]==N37*(1+(H37/100)) | [Q17]=No
R38: [A1]==A37 | [C3]==Costing!M39 | [D4]==Costing!O39 | [E5]==Costing!Q39 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R39*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J38="MTL","Preservation Shop","") | [N14]==D38*E38 | [O15]=DELETE | [P16]==N38*(1+(H38/100)) | [Q17]=No
R39: [A1]==A38 | [C3]==Costing!M40 | [D4]==Costing!O40 | [E5]==Costing!Q40 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R40*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J39="MTL","Preservation Shop","") | [N14]==D39*E39 | [O15]=DELETE | [P16]==N39*(1+(H39/100)) | [Q17]=No
R40: [A1]==A39 | [C3]==Costing!M41 | [D4]==Costing!O41 | [E5]==Costing!Q41 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R41*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J40="MTL","Preservation Shop","") | [N14]==D40*E40 | [O15]=DELETE | [P16]==N40*(1+(H40/100)) | [Q17]=No
R41: [A1]==A40 | [C3]==_xlfn.CONCAT(A41," - Materials") | [D4]=1 | [E5]==N41 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P41-N41)/N41)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D5 | [M13]==IF(J41="MTL","Preservation Shop","") | [N14]==SUM(N13:N26) | [O15]==IF(N41=0,"DELETE","LEAVE") | [P16]==SUM(P13:P26) | [Q17]=Yes
R42: [A1]==A41 | [C3]==_xlfn.CONCAT(A42," - Labour") | [D4]==SUM(D27:D40) | [E5]==N42/D42 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P42-N42)/N42)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L41 | [M13]==IF(J42="MTL","Preservation Shop","") | [N14]==SUM(N27:N40) | [O15]==IF(N42=0,"DELETE","LEAVE") | [P16]==SUM(P27:P40) | [Q17]=Yes
R43: [O15]=DELETE
R44: [A1]=='Customer Summary'!C6 | [C3]==Costing!B45 | [D4]==Costing!F45 | [E5]==Costing!I45 | [F6]==Costing!G45 | [G7]=Condensation Materials | [H8]==Costing!J45*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J44="MTL","Preservation Shop","") | [N14]==D44*E44 | [O15]=DELETE | [P16]==N44*(1+(H44/100)) | [Q17]=No
R45: [A1]==A44 | [C3]==Costing!B46 | [D4]==Costing!F46 | [E5]==Costing!I46 | [F6]==Costing!G46 | [G7]=Condensation Materials | [H8]==Costing!J46*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J45="MTL","Preservation Shop","") | [N14]==D45*E45 | [O15]=DELETE | [P16]==N45*(1+(H45/100)) | [Q17]=No
R46: [A1]==A45 | [C3]==Costing!B47 | [D4]==Costing!F47 | [E5]==Costing!I47 | [F6]==Costing!G47 | [G7]=Condensation Materials | [H8]==Costing!J47*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J46="MTL","Preservation Shop","") | [N14]==D46*E46 | [O15]=DELETE | [P16]==N46*(1+(H46/100)) | [Q17]=No
R47: [A1]==A46 | [C3]==Costing!B48 | [D4]==Costing!F48 | [E5]==Costing!I48 | [F6]==Costing!G48 | [G7]=Condensation Materials | [H8]==Costing!J48*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J47="MTL","Preservation Shop","") | [N14]==D47*E47 | [O15]=DELETE | [P16]==N47*(1+(H47/100)) | [Q17]=No
R48: [A1]==A47 | [C3]==Costing!M45 | [D4]==Costing!O45 | [E5]==Costing!Q45 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R45*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J48="MTL","Preservation Shop","") | [N14]==D48*E48 | [O15]=DELETE | [P16]==N48*(1+(H48/100)) | [Q17]=No
R49: [A1]==A48 | [C3]==Costing!M46 | [D4]==Costing!O46 | [E5]==Costing!Q46 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R46*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J49="MTL","Preservation Shop","") | [N14]==D49*E49 | [O15]=DELETE | [P16]==N49*(1+(H49/100)) | [Q17]=No
R50: [A1]==A49 | [C3]==Costing!M47 | [D4]==Costing!O47 | [E5]==Costing!Q47 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R47*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J50="MTL","Preservation Shop","") | [N14]==D50*E50 | [O15]=DELETE | [P16]==N50*(1+(H50/100)) | [Q17]=No
R51: [A1]==A50 | [C3]==Costing!M48 | [D4]==Costing!O48 | [E5]==Costing!Q48 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R48*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J51="MTL","Preservation Shop","") | [N14]==D51*E51 | [O15]=DELETE | [P16]==N51*(1+(H51/100)) | [Q17]=No
R52: [A1]==A51 | [C3]==_xlfn.CONCAT(A52," - Materials") | [D4]=1 | [E5]==N52 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P52-N52)/N52)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D6 | [M13]==IF(J52="MTL","Preservation Shop","") | [N14]==SUM(N44:N47) | [O15]==IF(N52=0,"DELETE","LEAVE") | [P16]==SUM(P44:P47) | [Q17]=Yes
R53: [A1]==A52 | [C3]==_xlfn.CONCAT(A53," - Labour") | [D4]==SUM(D48:D51) | [E5]==N53/D53 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P53-N53)/N53)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L52 | [M13]==IF(J53="MTL","Preservation Shop","") | [N14]==SUM(N48:N51) | [O15]==IF(N53=0,"DELETE","LEAVE") | [P16]==SUM(P48:P51) | [Q17]=Yes
R54: [O15]=DELETE
R55: [A1]=='Customer Summary'!C7 | [C3]==Costing!B52 | [D4]==Costing!F52 | [E5]==Costing!I52 | [F6]==Costing!G52 | [G7]=Condensation Materials | [H8]==Costing!J52*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J55="MTL","Preservation Shop","") | [N14]==D55*E55 | [O15]=DELETE | [P16]==N55*(1+(H55/100)) | [Q17]=No
R56: [A1]==A55 | [C3]==Costing!B53 | [D4]==Costing!F53 | [E5]==Costing!I53 | [F6]==Costing!G53 | [G7]=Condensation Materials | [H8]==Costing!J53*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J56="MTL","Preservation Shop","") | [N14]==D56*E56 | [O15]=DELETE | [P16]==N56*(1+(H56/100)) | [Q17]=No
R57: [A1]==A56 | [C3]==Costing!M52 | [D4]==Costing!O52 | [E5]==Costing!Q52 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R52*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J57="MTL","Preservation Shop","") | [N14]==D57*E57 | [O15]=DELETE | [P16]==N57*(1+(H57/100)) | [Q17]=No
R58: [A1]==A57 | [C3]==Costing!M53 | [D4]==Costing!O53 | [E5]==Costing!Q53 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R53*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J58="MTL","Preservation Shop","") | [N14]==D58*E58 | [O15]=DELETE | [P16]==N58*(1+(H58/100)) | [Q17]=No
R59: [A1]==A58 | [C3]==_xlfn.CONCAT(A59," - Materials") | [D4]=1 | [E5]==N59 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P59-N59)/N59)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D7 | [M13]==IF(J59="MTL","Preservation Shop","") | [N14]==SUM(N55:N56) | [O15]==IF(N59=0,"DELETE","LEAVE") | [P16]==SUM(P55:P56) | [Q17]=Yes
R60: [A1]==A59 | [C3]==_xlfn.CONCAT(A60," - Labour") | [D4]==SUM(D57:D58) | [E5]==N60/D60 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P60-N60)/N60)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L59 | [M13]==IF(J60="MTL","Preservation Shop","") | [N14]==SUM(N57:N58) | [O15]==IF(N60=0,"DELETE","LEAVE") | [P16]==SUM(P57:P58) | [Q17]=Yes
R61: [O15]=DELETE
R62: [A1]=='Customer Summary'!C8 | [C3]==Costing!B57 | [D4]==Costing!F57 | [E5]==Costing!I57 | [F6]==Costing!G57 | [G7]=Condensation Materials | [H8]==Costing!J57*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J62="MTL","Preservation Shop","") | [N14]==D62*E62 | [O15]=DELETE | [P16]==N62*(1+(H62/100)) | [Q17]=No
R63: [A1]==A62 | [C3]==Costing!B58 | [D4]==Costing!F58 | [E5]==Costing!I58 | [F6]==Costing!G58 | [G7]=Condensation Materials | [H8]==Costing!J58*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J63="MTL","Preservation Shop","") | [N14]==D63*E63 | [O15]=DELETE | [P16]==N63*(1+(H63/100)) | [Q17]=No
R64: [A1]==A63 | [C3]==Costing!M57 | [D4]==Costing!O57 | [E5]==Costing!Q57 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R57*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J64="MTL","Preservation Shop","") | [N14]==D64*E64 | [O15]=DELETE | [P16]==N64*(1+(H64/100)) | [Q17]=No
R65: [A1]==A64 | [C3]==Costing!M58 | [D4]==Costing!O58 | [E5]==Costing!Q58 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R58*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J65="MTL","Preservation Shop","") | [N14]==D65*E65 | [O15]=DELETE | [P16]==N65*(1+(H65/100)) | [Q17]=No
R66: [A1]==A65 | [C3]==_xlfn.CONCAT(A66," - Materials") | [D4]=1 | [E5]==N66 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P66-N66)/N66)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D8 | [M13]==IF(J66="MTL","Preservation Shop","") | [N14]==SUM(N62:N63) | [O15]==IF(N66=0,"DELETE","LEAVE") | [P16]==SUM(P62:P63) | [Q17]=Yes
R67: [A1]==A66 | [C3]==_xlfn.CONCAT(A67," - Labour") | [D4]=1 | [E5]==N67/D67 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P67-N67)/N67)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L66 | [M13]==IF(J67="MTL","Preservation Shop","") | [N14]==SUM(N64:N65) | [O15]==IF(N67=0,"DELETE","LEAVE") | [P16]==SUM(P64:P65) | [Q17]=Yes
R68: [D4]==SUM(D64:D65) | [O15]=DELETE
R69: [A1]=='Customer Summary'!C14 | [C3]==Costing!B82 | [D4]==Costing!F82 | [E5]==Costing!I82 | [F6]==Costing!G82 | [G7]=Condensation Materials | [H8]==Costing!J82*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J69="MTL","Preservation Shop","") | [N14]==D69*E69 | [O15]=DELETE | [P16]==N69*(1+(H69/100)) | [Q17]=No
R70: [A1]==A69 | [C3]==Costing!B83 | [D4]==Costing!F83 | [E5]==Costing!I83 | [F6]==Costing!G83 | [G7]=Condensation Materials | [H8]==Costing!J83*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J70="MTL","Preservation Shop","") | [N14]==D70*E70 | [O15]=DELETE | [P16]==N70*(1+(H70/100)) | [Q17]=No
R71: [A1]==A70 | [C3]==Costing!B84 | [D4]==Costing!F84 | [E5]==Costing!I84 | [F6]==Costing!G84 | [G7]=Condensation Materials | [H8]==Costing!J84*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J71="MTL","Preservation Shop","") | [N14]==D71*E71 | [O15]=DELETE | [P16]==N71*(1+(H71/100)) | [Q17]=No
R72: [A1]==A71 | [C3]==Costing!M82 | [D4]==Costing!O82 | [E5]==Costing!Q82 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R82*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J72="MTL","Preservation Shop","") | [N14]==D72*E72 | [O15]=DELETE | [P16]==N72*(1+(H72/100)) | [Q17]=No
R73: [A1]==A72 | [C3]==Costing!M83 | [D4]==Costing!O83 | [E5]==Costing!Q83 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R83*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J73="MTL","Preservation Shop","") | [N14]==D73*E73 | [O15]=DELETE | [P16]==N73*(1+(H73/100)) | [Q17]=No
R74: [A1]==A73 | [C3]==Costing!M84 | [D4]==Costing!O84 | [E5]==Costing!Q84 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R84*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J74="MTL","Preservation Shop","") | [N14]==D74*E74 | [O15]=DELETE | [P16]==N74*(1+(H74/100)) | [Q17]=No
R75: [A1]==A74 | [C3]==_xlfn.CONCAT(A75," - Materials") | [D4]=1 | [E5]==N75 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P75-N75)/N75)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D14 | [M13]==IF(J75="MTL","Preservation Shop","") | [N14]==SUM(N69:N71) | [O15]==IF(N75=0,"DELETE","LEAVE") | [P16]==SUM(P69:P71) | [Q17]=Yes
R76: [A1]==A75 | [C3]==_xlfn.CONCAT(A76," - Labour") | [D4]==SUM(D72:D74) | [E5]==N76/D76 | [F6]=Hours | [G7]=Condensation Labour | [H8]==((P76-N76)/N76)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L75 | [M13]==IF(J76="MTL","Preservation Shop","") | [N14]==SUM(N72:N74) | [O15]==IF(N76=0,"DELETE","LEAVE") | [P16]==SUM(P72:P74) | [Q17]=Yes
R77: [O15]=DELETE
R78: [A1]=='Customer Summary'!C9 | [C3]==_xlfn.CONCAT(A78," - Materials") | [D4]==Costing!F62 | [E5]==Costing!I62 | [F6]==Costing!G66 | [G7]=Condensation Materials | [H8]==Costing!J62*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D9 | [M13]==IF(J78="MTL","Preservation Shop","") | [N14]==D78*E78 | [O15]==IF(N78=0,"DELETE","LEAVE") | [P16]==N78*(1+(H78/100)) | [Q17]=Yes
R79: [A1]==A78 | [C3]==_xlfn.CONCAT(A79," - Labour") | [D4]==Costing!O62 | [E5]==Costing!Q62 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R62*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L78 | [M13]==IF(J79="MTL","Preservation Shop","") | [N14]==D79*E79 | [O15]==IF(N79=0,"DELETE","LEAVE") | [P16]==N79*(1+(H79/100)) | [Q17]=Yes
R80: [O15]=DELETE
R81: [A1]=='Customer Summary'!C10 | [C3]==_xlfn.CONCAT(A81," - Materials") | [D4]==Costing!F66 | [E5]==Costing!I66 | [F6]==Costing!G66 | [G7]=Condensation Materials | [H8]==Costing!J66*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D10 | [M13]==IF(J81="MTL","Preservation Shop","") | [N14]==D81*E81 | [O15]==IF(N81=0,"DELETE","LEAVE") | [P16]==N81*(1+(H81/100)) | [Q17]=Yes
R82: [A1]==A81 | [C3]==_xlfn.CONCAT(A82," - Labour") | [D4]==Costing!O66 | [E5]==Costing!Q66 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R66*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L81 | [M13]==IF(J82="MTL","Preservation Shop","") | [N14]==D82*E82 | [O15]==IF(N82=0,"DELETE","LEAVE") | [P16]==N82*(1+(H82/100)) | [Q17]=Yes
R83: [O15]=DELETE
R84: [A1]=='Customer Summary'!C11 | [C3]==_xlfn.CONCAT(A84," - Materials") | [D4]==Costing!F70 | [E5]==Costing!I70 | [F6]==Costing!G70 | [G7]=Condensation Materials | [H8]==Costing!J70*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D11 | [M13]==IF(J84="MTL","Preservation Shop","") | [N14]==D84*E84 | [O15]==IF(N84=0,"DELETE","LEAVE") | [P16]==N84*(1+(H84/100)) | [Q17]=Yes
R85: [A1]==A84 | [C3]==_xlfn.CONCAT(A85," - Labour") | [D4]==Costing!O70 | [E5]==Costing!Q70 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R70*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L84 | [M13]==IF(J85="MTL","Preservation Shop","") | [N14]==D85*E85 | [O15]==IF(N85=0,"DELETE","LEAVE") | [P16]==N85*(1+(H85/100)) | [Q17]=Yes
R86: [O15]=DELETE
R87: [A1]=='Customer Summary'!C12 | [C3]==_xlfn.CONCAT(A87," - Materials") | [D4]==Costing!F74 | [E5]==Costing!I74 | [F6]==Costing!G74 | [G7]=Condensation Materials | [H8]==Costing!J74*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D12 | [M13]==IF(J87="MTL","Preservation Shop","") | [N14]==D87*E87 | [O15]==IF(N87=0,"DELETE","LEAVE") | [P16]==N87*(1+(H87/100)) | [Q17]=Yes
R88: [A1]==A87 | [C3]==_xlfn.CONCAT(A88," - Labour") | [D4]==Costing!O74 | [E5]==Costing!Q74 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R74*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L87 | [M13]==IF(J88="MTL","Preservation Shop","") | [N14]==D88*E88 | [O15]==IF(N88=0,"DELETE","LEAVE") | [P16]==N88*(1+(H88/100)) | [Q17]=Yes
R89: [O15]=DELETE
R90: [A1]=='Customer Summary'!C13 | [C3]==_xlfn.CONCAT(A90," - Materials") | [D4]==Costing!F78 | [E5]==Costing!I78 | [F6]==Costing!G78 | [G7]=Condensation Materials | [H8]==Costing!J78*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D13 | [M13]==IF(J90="MTL","Preservation Shop","") | [N14]==D90*E90 | [O15]==IF(N90=0,"DELETE","LEAVE") | [P16]==N90*(1+(H90/100)) | [Q17]=Yes
R91: [A1]==A90 | [C3]==_xlfn.CONCAT(A91," - Labour") | [D4]==Costing!O78 | [E5]==Costing!Q78 | [F6]=Hours | [G7]=Condensation Labour | [H8]==Costing!R78*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L90 | [M13]==IF(J91="MTL","Preservation Shop","") | [N14]==D91*E91 | [O15]==IF(N91=0,"DELETE","LEAVE") | [P16]==N91*(1+(H91/100)) | [Q17]=Yes
R92: [O15]=DELETE
R93: [A1]=='Customer Summary'!C15 | [C3]=Skips | [D4]==Costing!F88 | [E5]==Costing!I88 | [F6]=Each | [G7]=Waste Removal | [H8]==Costing!J88*100 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J93="MTL","Preservation Shop","") | [N14]==D93*E93 | [O15]=DELETE | [P16]==N93*(1+(H93/100)) | [Q17]=No
R94: [A1]==A93 | [C3]=Vehicle Costs (Fuel) | [D4]==Costing!K98*Costing!K99*2 | [E5]==Costing!J107 | [F6]=Miles | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J94="MTL","Preservation Shop","") | [N14]==D94*E94 | [O15]=DELETE | [P16]==N94*(1+(H94/100)) | [Q17]=No
R95: [A1]==A94 | [C3]=Travel Costs for Tradesmen | [D4]==Costing!O93 | [E5]==Costing!C107 | [F6]=Hours | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J95="MTL","Preservation Shop","") | [N14]==D95*E95 | [O15]=DELETE | [P16]==N95*(1+(H95/100)) | [Q17]=No
R96: [A1]==A95 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A96," - Materials") | [D4]=1 | [E5]==N96 | [F6]=EACH | [G7]=Condensation Materials | [H8]==((P96-N96)/N96)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J96="MTL","Preservation Shop","") | [N14]==SUM(N93:N94) | [O15]==IF(N96=0,"DELETE","LEAVE") | [P16]==SUM(P93:P94) | [Q17]=Yes
R97: [A1]==A96 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A97," - Labour") | [D4]==D95 | [E5]==E95 | [F6]==F95 | [G7]=Condensation Labour | [H8]==H95 | [I9]=% | [J10]==J95 | [K11]==K95 | [L12]=No | [M13]==IF(J97="MTL","Preservation Shop","") | [N14]==N95 | [O15]==IF(N97=0,"DELETE","LEAVE") | [P16]==P95 | [Q17]=Yes
```

## SECTION 5: CUSTOMER SUMMARY SHEET

**Total Rows:** 22  |  **Total Cols:** 9

### Complete Row Data

```
R1: [B2]==IF(Costing!E1="SHEET NOT COMPLETE","PLEASE COMPLETE COSTING BEFORE SUPPLYING A PRICE","")
R2: [B2]=Customer Pricing Summary
R3: [B2]=# | [C3]=Area of Works  | [D4]=Optional Item? | [E5]=Price ↵(Without Optional items) | [F6]=Price ↵(With Optional Items)
R4: [B2]=1 | [C3]=Condensation control: Supply and install Loft Dryaire system & required accessories | [D4]=No | [E5]==IF(D4="Yes","Optional",F4) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes"))
R5: [B2]==B4+1 | [C3]=Condensation control: Supply and install Wall Mounted Dryaire system & required accessories | [D4]=No | [E5]==IF(D5="Yes","Optional",F5) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes"))
R6: [B2]==B5+1 | [C3]=Condensation control: Supply and install Trickle & Boost Fan | [D4]=No | [E5]==IF(D6="Yes","Optional",F6) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes"))
R7: [B2]==B6+1 | [C3]=Condensation control: Supply and install Dryaire Cpass Insulated Pullcord Passive Vent | [D4]=No | [E5]==IF(D7="Yes","Optional",F7) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes"))
R8: [B2]==B7+1 | [C3]=Condensation control: Supply and install Dryaire CVent | [D4]=No | [E5]==IF(D8="Yes","Optional",F8) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes"))
R9: [B2]==B8+1 | [C3]=Joinery: Supply and fit boxwork for ducting | [D4]=Yes | [E5]==IF(D9="Yes","Optional",F9) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes"))
R10: [B2]==B9+1 | [C3]=New hatch and ladder: Create larger opening, install new sturdy hatch and ladder to loft entry | [D4]=Yes | [E5]==IF(D10="Yes","Optional",F10) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes"))
R11: [B2]==B10+1 | [C3]=Loft opening: Enlarge existing loft opening and install new hatch lid | [D4]=Yes | [E5]==IF(D11="Yes","Optional",F11) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes"))
R12: [B2]==B11+1 | [C3]=Remedial treatments: Mould treatment | [D4]=No | [E5]==IF(D12="Yes","Optional",F12) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes"))
R13: [B2]==B12+1 | [C3]=Asbestos Testing | [D4]=Yes | [E5]==IF(D13="Yes","Optional",F13) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes"))
R14: [B2]==B13+1 | [C3]=Airbricks | [D4]=No | [E5]==IF(D14="Yes","Optional",F14) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C14,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C14,'CF CSV Upload'!Q:Q,"Yes"))
R15: [B2]==B14+1 | [C3]=Project Specific Overheads | [D4]=No | [E5]==IF(D15="Yes","Optional",F15) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C15,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C15,'CF CSV Upload'!Q:Q,"Yes"))
R16: [B2]=Totals
R17: [C3]=Sub Total | [E5]==SUM(E4:E15) | [F6]==SUM(F4:F15)
R18: [C3]=Vat at 20% | [E5]==E17*0.2 | [F6]==F17*0.2
R19: [C3]=Total | [E5]==SUM(E17:E18) | [F6]==SUM(F17:F18)
R21: [C3]=Start of works deposit at 50% | [D4]=Ex. VAT | [E5]==E22/6*5 | [F6]==F22/6*5
R22: [D4]=Inc. VAT | [E5]==E19*0.5 | [F6]==F19*0.5
```

## SECTION 6: DATA VALIDATION & DROPDOWN LISTS

### 6A: Data Lists Sheet

```
R1: [A1]=Data Lists For Contractor Foreman
R3: [A1]=These are used to differentiate between the types of items and used for the labor calculations.
R4: [A1]=Contractor Foreman Item Types
R5: [A1]=Item | [B2]=Comments
R6: [A1]=EQUIP | [B2]=Equipment Items
R7: [A1]=LBR | [B2]=Labor items
R8: [A1]=MTL | [B2]=Material Items
R9: [A1]=Other | [B2]=Other Items
R10: [A1]=SUB | [B2]=Subcontractors
R12: [A1]=This is used to 'Group' items in a logical order on the estimate.
R13: [A1]=Sections
R14: [A1]=Item | [B2]=Comments
R15: [A1]=='Customer Summary'!C4 | [B2]=n/a
R16: [A1]=='Customer Summary'!C5 | [B2]=n/a
R17: [A1]=='Customer Summary'!C6 | [B2]=n/a
R18: [A1]=='Customer Summary'!C7 | [B2]=n/a
R19: [A1]=='Customer Summary'!C8 | [B2]=n/a
R20: [A1]=='Customer Summary'!C14 | [B2]=n/a
R21: [A1]=='Customer Summary'!C9 | [B2]=n/a
R22: [A1]=='Customer Summary'!C10 | [B2]=n/a
R23: [A1]=='Customer Summary'!C11 | [B2]=n/a
R24: [A1]=='Customer Summary'!C12 | [B2]=n/a
R25: [A1]=='Customer Summary'!C13 | [B2]=n/a
R26: [A1]=='Customer Summary'!C15 | [B2]=n/a
R33: [A1]=This is used in the projects to determine costs by the 'Cost Code' category (lets you see which areas you are over or under budget on).
R34: [A1]=Cost Codes
R35: [A1]=Item | [B2]=Comments
R36: [A1]=Condensation Equipment | [B2]=n/a
R37: [A1]=Condensation Labour | [B2]=n/a
R38: [A1]=Condensation Materials | [B2]=n/a
R39: [A1]=Condensation Other | [B2]=n/a
R40: [A1]=Condensation Sub Contractors | [B2]=n/a
R41: [A1]=Travel Costs | [B2]=n/a
R42: [A1]=Waste Removal | [B2]=n/a
R45: [A1]=This is used to on the items for costing reference
R46: [A1]=Unit of measures
R47: [A1]=Item | [B2]=Comments
R48: [A1]=Each | [B2]=n/a
R49: [A1]=M2 | [B2]=n/a
R50: [A1]=M3 | [B2]=n/a
R51: [A1]=Hours | [B2]=n/a
R52: [A1]=LM | [B2]=n/a
R53: [A1]=Miles | [B2]=n/a
R54: [A1]=Bags | [B2]=n/a
R55: [A1]=Pairs | [B2]=n/a
R58: [A1]=CSV Import File Name Creator
R59: [A1]=CSV File Name | [B2]=CF-Condensation-PIV-
R60: [A1]=Current Date | [B2]=25-11-25-14-57-56
R61: [A1]=Full File Name | [B2]==CONCATENATE(B59,B60)
R63: [A1]=File Name Creator
R64: [A1]=PDF Report Name | [B2]==CONCATENATE(Costing!E4,"-CONDENSATION-PIV-REPORT-",B60)
R66: [A1]=Section Price Adjustment % Values
R67: [A1]=-5
R68: [A1]==A67+1
R69: [A1]==A68+1
R70: [A1]==A69+1
R71: [A1]==A70+1
R72: [A1]==A71+1
R73: [A1]==A72+1
R74: [A1]==A73+1
R75: [A1]==A74+1
R76: [A1]==A75+1
R77: [A1]==A76+1
R78: [A1]==A77+1
R79: [A1]==A78+1
R80: [A1]==A79+1
R81: [A1]==A80+1
R82: [A1]==A81+1
R83: [A1]==A82+1
R84: [A1]==A83+1
R85: [A1]==A84+1
R86: [A1]==A85+1
R87: [A1]==A86+1
R88: [A1]==A87+1
R89: [A1]==A88+1
R90: [A1]==A89+1
R91: [A1]==A90+1
R92: [A1]==A91+1
R93: [A1]==A92+1
R94: [A1]==A93+1
R95: [A1]==A94+1
R96: [A1]==A95+1
R97: [A1]==A96+1
R98: [A1]==A97+1
R99: [A1]==A98+1
R100: [A1]==A99+1
R101: [A1]==A100+1
R102: [A1]==A101+1
R103: [A1]==A102+1
R104: [A1]==A103+1
R105: [A1]==A104+1
R106: [A1]==A105+1
R107: [A1]==A106+1
R108: [A1]==A107+1
R109: [A1]==A108+1
R110: [A1]==A109+1
R111: [A1]==A110+1
R112: [A1]==A111+1
R113: [A1]==A112+1
R114: [A1]==A113+1
R115: [A1]==A114+1
R116: [A1]==A115+1
R117: [A1]==A116+1
R118: [A1]==A117+1
R119: [A1]==A118+1
R120: [A1]==A119+1
R121: [A1]==A120+1
R122: [A1]==A121+1
```

### 6B: Data Validation Rules Per Sheet

#### Sheet: Report (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D24:N24 D31:N31 D63:N63 D70:N70 D77:N77 D101:N101 D108:N108 D115:N115 D122:N122 D129:N129 D136:N136 D182:N182 D221:N221 D228:N228 D235:N235 D242:N242 D249:N249 D256:N256 Q24:Z24 Q31:Z31 Q63:Z63 Q70:Z70 Q77:Z77 Q101:Z101 Q108:Z108 Q115:Z115 Q122:Z122 Q129:Z129 Q136:Z136 Q182:Z182 Q221:Z221 Q228:Z228 Q235:Z235 Q242:Z242 Q249:Z249 Q256:Z256 | list |  | "Hide,Show" |  | True | False |

#### Sheet: Costing (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | F103:L103 | list |  | "Image 1: Default or Miscellaneous, Image 2: Single Male (Young), Image 3: Single Male (Elderly), Image 4: Single Female (Young), Image 5: Single Female (Elderly), Image 6: Young Couple, Image 7: Elde… |  | True | False |

#### Sheet: Customer Summary (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D4:D15 | list |  | "No, Yes" |  | True | False |

#### Sheet: Sub Contractor Costs (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | B10:B13 B16:B29 B32:B35 B38:B39 B42:B43 B46 B49 B52 B55 B58 B61:B63 D3 G5 | list |  | "No,Yes" |  | True | False |

#### Sheet: CF CSV Upload (2 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | Q2:Q11 Q13:Q42 Q44:Q53 Q55:Q60 Q62:Q79 Q81:Q82 Q84:Q85 Q87:Q88 Q90:Q91 Q93:Q97 | list |  | "No,Yes" |  | True | False |
| 2 | L2:L97 | list |  | "Yes,No" |  | True | False |

## SECTION 7: VBA CODE

### Module: ThisWorkbook.cls

**Stream:** `VBA/ThisWorkbook`

```vb
Attribute VB_Name = "ThisWorkbook"
Attribute VB_Base = "0{00020819-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Private Sub Workbook_BeforeClose(Cancel As Boolean)
'Update by Extendoffice 2018/1/24
'https://www.extendoffice.com/documents/excel/5006-excel-vba-protect-all-sheets-on-close.html
    Dim xSheet As Worksheet
    Dim xPsw As String
    xPsw = "window"
    For Each xSheet In Worksheets
        xSheet.Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
        
    Next
    
    'Remove Password on Tabs that need input
    ThisWorkbook.Sheets("Office Notes").Unprotect xPsw
    
    
End Sub

```

### Module: Sheet1.cls

**Stream:** `VBA/Sheet1`

```vb
Attribute VB_Name = "Sheet1"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Private Sub CommandButton1_Click()

Application.DisplayAlerts = True

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

'Remove Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
'Set new time to give a specific file name
ThisWorkbook.Sheets("Data Lists").Range("B60").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################


'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b61")

'Get current folder
Dim current_folder As String
current_folder = ThisWorkbook.Path

'Get full file name
Dim filename_plus_path As String
filename_plus_path = current_folder & "/" & file_name

'ThisWorkbook.Sheets("Data Lists").Range("b62").Value = (filename_plus_path)

'Get Validation Status
Dim validation_status As String
validation_status = ThisWorkbook.Sheets("Costing").Range("E1")

If validation_status = "SHEET COMPLETE" Then

' Save file
ThisWorkbook.Sheets("CF CSV Upload").Copy
ActiveWorkbook.SaveAs Filename:=(filename_plus_path), _
FileFormat:=xlCSVUTF8, _
CreateBackup:=False


'DELETE SECTIONS WITH ZERO VALUE
'https://officetuts.net/excel/vba/delete-a-row-if-cell-contains/

'Unprotect sheet for deleting rows
    ActiveSheet.Unprotect xPsw
    
'Remove formulas and replace with values to prevent errors when deleting rows not required for the import
'https://stackoverflow.com/questions/20671795/how-to-remove-formulas-from-sheet-but-keep-their-calculated-values
ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value
    

    Dim rng As Range
    Set rng = ActiveSheet.Range("O1:O500")
    For i = rng.Cells.Count To 1 Step -1
        If rng.Item(i).Value = "DELETE" Then
            rng.Item(i).EntireRow.Delete
        End If
    Next i

'Re-protect sheet for deleting rows
ActiveSheet.Protect xPsw

ActiveWorkbook.Save
ActiveWorkbook.Close
Application.DisplayAlerts = True


Else
MsgBox "CANNOT CREATE CSV IMPORT - PLEASE COMPLETE THE SHEET FULLY"

End If

End Sub

Private Sub PIV_Loft_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F21:F25").Value = 0
End Sub
Private Sub PIV_Wall_Mounted_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F28:F42").Value = 0
End Sub
Private Sub Trickle_Boost_Fan_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F45:F49").Value = 0
End Sub
Private Sub Dryaire_Passive_Vent_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F52:F54").Value = 0
End Sub
Private Sub Dryaire_CVent_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F57:F59").Value = 0
End Sub
Private Sub Joinery_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F62:F63").Value = 0
End Sub
Private Sub Loft_Hatch_New_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F66:F67").Value = 0
End Sub
Private Sub Loft_Hatch_Existing_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F70:F71").Value = 0
End Sub
Private Sub Mould_Treatments_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F74:F75").Value = 0
End Sub
Private Sub Asbestos_Testing_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F78:F79").Value = 0
End Sub
Private Sub Airbricks_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F82:F85").Value = 0
End Sub
Private Sub Skip_Hire_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F88").Value = 0
End Sub


```

### Module: Sheet2.cls

**Stream:** `VBA/Sheet2`

```vb
Attribute VB_Name = "Sheet2"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True


```

### Module: Sheet3.cls

**Stream:** `VBA/Sheet3`

```vb
Attribute VB_Name = "Sheet3"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True


```

### Module: Sheet4.cls

**Stream:** `VBA/Sheet4`

```vb
Attribute VB_Name = "Sheet4"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet6.cls

**Stream:** `VBA/Sheet6`

```vb
Attribute VB_Name = "Sheet6"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Private Sub CommandButton1_Click()

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

'Remove Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
'Set new time to give a specific file name
ThisWorkbook.Sheets("Data Lists").Range("B60").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b64")

'Get current folder
Dim current_folder As String
current_folder = ThisWorkbook.Path

'Get full file name
Dim filename_plus_path As String
filename_plus_path = current_folder & "/" & file_name


'Get Validation Status
Dim validation_status As String
validation_status = ThisWorkbook.Sheets("Report").Range("J1")

If validation_status = "SHEET COMPLETE" Then

'Save active workbook as PDF
' https://exceloffthegrid.com/vba-code-save-excel-file-as-pdf/
ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
    Filename:=filename_plus_path, IgnorePrintAreas:=False

Else
MsgBox "CANNOT CREATE REPORT - PLEASE COMPLETE THE SHEET FULLY"

End If

End Sub

' https://excel.tips.net/T003144_Spell-Checking_in_a_Protected_Worksheet.html
Sub SpellCheck_Sheet_Click()

Dim xPsw As String
    xPsw = "window"

    With ActiveSheet
        .Unprotect xPsw
        .Range("D16:Z289").CheckSpelling
        .Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
    End With
End Sub

```

### Module: Module1.bas

**Stream:** `VBA/Module1`

```vb
Attribute VB_Name = "Module1"
Sub ProtectSheetCheckSpellCheck()
'Update by Extendoffice 2018/11/2
Dim xRg As Range
On Error Resume Next
Application.ScreenUpdating = False
    With ActiveSheet
        .Unprotect ("window")
        Set xRg = .UsedRange
        xRg.CheckSpelling
        .Protect ("window")
    End With
Application.ScreenUpdating = True
End Sub

```

### Module: Sheet5.cls

**Stream:** `VBA/Sheet5`

```vb
Attribute VB_Name = "Sheet5"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet7.cls

**Stream:** `VBA/Sheet7`

```vb
Attribute VB_Name = "Sheet7"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet8.cls

**Stream:** `VBA/Sheet8`

```vb
Attribute VB_Name = "Sheet8"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet9.cls

**Stream:** `VBA/Sheet9`

```vb
Attribute VB_Name = "Sheet9"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

## SECTION 8: CROSS-SHEET REFERENCES

### References FROM: Report

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Report!D11 |
| Costing!E11 | Report!D12 |
| Costing!E14 | Report!B269, Report!B272, Report!B275 |
| Costing!E4 | Report!I13 |
| Costing!E7 | Report!D8 |
| Costing!E8 | Report!D9 |
| Costing!E9 | Report!D10 |

### References FROM: Costing

| Target | Referenced By |
|--------|-------------|
| Details!$B$10 | Costing!B10 |
| Details!$B$11 | Costing!B11 |
| Details!$B$7 | Costing!B7 |
| Details!$B$8 | Costing!B8 |
| Details!$B$9 | Costing!B9 |
| Details!$C$10 | Costing!E10, Costing!E10 |
| Details!$C$11 | Costing!E11, Costing!E11 |
| Details!$C$12 | Costing!K99, Costing!K99 |
| Details!$C$16 | Costing!E14, Costing!E14 |
| Details!$C$4 | Costing!E4, Costing!E4 |
| Details!$C$7 | Costing!E7, Costing!E7 |
| Details!$C$8 | Costing!E8, Costing!E8 |
| Details!$C$9 | Costing!E9, Costing!E9 |

### References FROM: Customer Summary

| Target | Referenced By |
|--------|-------------|
| Costing!E1 | Customer Summary!B1 |
| Customer Summary!C10 | Customer Summary!F10, Customer Summary!F10 |
| Customer Summary!C11 | Customer Summary!F11, Customer Summary!F11 |
| Customer Summary!C12 | Customer Summary!F12, Customer Summary!F12 |
| Customer Summary!C13 | Customer Summary!F13, Customer Summary!F13 |
| Customer Summary!C14 | Customer Summary!F14, Customer Summary!F14 |
| Customer Summary!C15 | Customer Summary!F15, Customer Summary!F15 |
| Customer Summary!C4 | Customer Summary!F4, Customer Summary!F4 |
| Customer Summary!C5 | Customer Summary!F5, Customer Summary!F5 |
| Customer Summary!C6 | Customer Summary!F6, Customer Summary!F6 |
| Customer Summary!C7 | Customer Summary!F7, Customer Summary!F7 |
| Customer Summary!C8 | Customer Summary!F8, Customer Summary!F8 |
| Customer Summary!C9 | Customer Summary!F9, Customer Summary!F9 |

### References FROM: Sub Contractor Costs

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Sub Contractor Costs!D8 |
| Costing!E11 | Sub Contractor Costs!D9 |
| Costing!E4 | Sub Contractor Costs!D4 |
| Costing!E7 | Sub Contractor Costs!D5 |
| Costing!E8 | Sub Contractor Costs!D6 |
| Costing!E9 | Sub Contractor Costs!D7 |
| Costing!O25 | Sub Contractor Costs!G11 |
| Costing!O42 | Sub Contractor Costs!G12 |
| Costing!O49 | Sub Contractor Costs!G13 |
| Costing!O54 | Sub Contractor Costs!G14 |
| Costing!O59 | Sub Contractor Costs!G15 |
| Costing!O63 | Sub Contractor Costs!G16 |
| Costing!V25 | Sub Contractor Costs!D11 |
| Costing!V42 | Sub Contractor Costs!D12 |
| Costing!V49 | Sub Contractor Costs!D13 |
| Costing!V54 | Sub Contractor Costs!D14 |
| Costing!V59 | Sub Contractor Costs!D15 |
| Costing!V63 | Sub Contractor Costs!D16 |
| Costing!V67 | Sub Contractor Costs!D17, Sub Contractor Costs!G17 |
| Costing!V71 | Sub Contractor Costs!D18, Sub Contractor Costs!G18 |
| Costing!V75 | Sub Contractor Costs!D19, Sub Contractor Costs!G19 |
| Costing!V79 | Sub Contractor Costs!D20, Sub Contractor Costs!G20 |
| Costing!V85 | Sub Contractor Costs!D21, Sub Contractor Costs!G21 |
| Customer Summary!C10 | Sub Contractor Costs!C17 |
| Customer Summary!C11 | Sub Contractor Costs!C18 |
| Customer Summary!C12 | Sub Contractor Costs!C19 |
| Customer Summary!C13 | Sub Contractor Costs!C20 |
| Customer Summary!C14 | Sub Contractor Costs!C21 |
| Customer Summary!C4 | Sub Contractor Costs!C11 |
| Customer Summary!C5 | Sub Contractor Costs!C12 |
| Customer Summary!C6 | Sub Contractor Costs!C13 |
| Customer Summary!C7 | Sub Contractor Costs!C14 |
| Customer Summary!C8 | Sub Contractor Costs!C15 |
| Customer Summary!C9 | Sub Contractor Costs!C16 |
| Details!$B$10 | Sub Contractor Costs!B8 |
| Details!$B$11 | Sub Contractor Costs!B9 |
| Details!$B$7 | Sub Contractor Costs!B5 |
| Details!$B$8 | Sub Contractor Costs!B6 |
| Details!$B$9 | Sub Contractor Costs!B7 |

### References FROM: CF CSV Upload

| Target | Referenced By |
|--------|-------------|
| Costing!B21 | CF CSV Upload!C2 |
| Costing!B22 | CF CSV Upload!C3 |
| Costing!B23 | CF CSV Upload!C4 |
| Costing!B24 | CF CSV Upload!C5 |
| Costing!B28 | CF CSV Upload!C13 |
| Costing!B29 | CF CSV Upload!C14 |
| Costing!B30 | CF CSV Upload!C15 |
| Costing!B31 | CF CSV Upload!C16 |
| Costing!B32 | CF CSV Upload!C17 |
| Costing!B33 | CF CSV Upload!C18 |
| Costing!B34 | CF CSV Upload!C19 |
| Costing!B35 | CF CSV Upload!C20 |
| Costing!B36 | CF CSV Upload!C21 |
| Costing!B37 | CF CSV Upload!C22 |
| Costing!B38 | CF CSV Upload!C23 |
| Costing!B39 | CF CSV Upload!C24 |
| Costing!B40 | CF CSV Upload!C25 |
| Costing!B41 | CF CSV Upload!C26 |
| Costing!B45 | CF CSV Upload!C44 |
| Costing!B46 | CF CSV Upload!C45 |
| Costing!B47 | CF CSV Upload!C46 |
| Costing!B48 | CF CSV Upload!C47 |
| Costing!B52 | CF CSV Upload!C55 |
| Costing!B53 | CF CSV Upload!C56 |
| Costing!B57 | CF CSV Upload!C62 |
| Costing!B58 | CF CSV Upload!C63 |
| Costing!B82 | CF CSV Upload!C69 |
| Costing!B83 | CF CSV Upload!C70 |
| Costing!B84 | CF CSV Upload!C71 |
| Costing!C107 | CF CSV Upload!E95 |
| Costing!F21 | CF CSV Upload!D2 |
| Costing!F22 | CF CSV Upload!D3 |
| Costing!F23 | CF CSV Upload!D4 |
| Costing!F24 | CF CSV Upload!D5 |
| Costing!F28 | CF CSV Upload!D13 |
| Costing!F29 | CF CSV Upload!D14 |
| Costing!F30 | CF CSV Upload!D15 |
| Costing!F31 | CF CSV Upload!D16 |
| Costing!F32 | CF CSV Upload!D17 |
| Costing!F33 | CF CSV Upload!D18 |
| Costing!F34 | CF CSV Upload!D19 |
| Costing!F35 | CF CSV Upload!D20 |
| Costing!F36 | CF CSV Upload!D21 |
| Costing!F37 | CF CSV Upload!D22 |
| Costing!F38 | CF CSV Upload!D23 |
| Costing!F39 | CF CSV Upload!D24 |
| Costing!F40 | CF CSV Upload!D25 |
| Costing!F41 | CF CSV Upload!D26 |
| Costing!F45 | CF CSV Upload!D44 |
| Costing!F46 | CF CSV Upload!D45 |
| Costing!F47 | CF CSV Upload!D46 |
| Costing!F48 | CF CSV Upload!D47 |
| Costing!F52 | CF CSV Upload!D55 |
| Costing!F53 | CF CSV Upload!D56 |
| Costing!F57 | CF CSV Upload!D62 |
| Costing!F58 | CF CSV Upload!D63 |
| Costing!F62 | CF CSV Upload!D78 |
| Costing!F66 | CF CSV Upload!D81 |
| Costing!F70 | CF CSV Upload!D84 |
| Costing!F74 | CF CSV Upload!D87 |
| Costing!F78 | CF CSV Upload!D90 |
| Costing!F82 | CF CSV Upload!D69 |
| Costing!F83 | CF CSV Upload!D70 |
| Costing!F84 | CF CSV Upload!D71 |
| Costing!F88 | CF CSV Upload!D93 |
| Costing!G21 | CF CSV Upload!F2 |
| Costing!G22 | CF CSV Upload!F3 |
| Costing!G23 | CF CSV Upload!F4 |
| Costing!G24 | CF CSV Upload!F5 |
| Costing!G28 | CF CSV Upload!F13 |
| Costing!G29 | CF CSV Upload!F14 |
| Costing!G30 | CF CSV Upload!F15 |
| Costing!G31 | CF CSV Upload!F16 |
| Costing!G32 | CF CSV Upload!F17 |
| Costing!G33 | CF CSV Upload!F18 |
| Costing!G34 | CF CSV Upload!F19 |
| Costing!G35 | CF CSV Upload!F20 |
| Costing!G36 | CF CSV Upload!F21 |
| Costing!G37 | CF CSV Upload!F22 |
| Costing!G38 | CF CSV Upload!F23 |
| Costing!G39 | CF CSV Upload!F24 |
| Costing!G40 | CF CSV Upload!F25 |
| Costing!G41 | CF CSV Upload!F26 |
| Costing!G45 | CF CSV Upload!F44 |
| Costing!G46 | CF CSV Upload!F45 |
| Costing!G47 | CF CSV Upload!F46 |
| Costing!G48 | CF CSV Upload!F47 |
| Costing!G52 | CF CSV Upload!F55 |
| Costing!G53 | CF CSV Upload!F56 |
| Costing!G57 | CF CSV Upload!F62 |
| Costing!G58 | CF CSV Upload!F63 |
| Costing!G66 | CF CSV Upload!F78, CF CSV Upload!F81 |
| Costing!G70 | CF CSV Upload!F84 |
| Costing!G74 | CF CSV Upload!F87 |
| Costing!G78 | CF CSV Upload!F90 |
| Costing!G82 | CF CSV Upload!F69 |
| Costing!G83 | CF CSV Upload!F70 |
| Costing!G84 | CF CSV Upload!F71 |
| Costing!I21 | CF CSV Upload!E2 |
| Costing!I22 | CF CSV Upload!E3 |
| Costing!I23 | CF CSV Upload!E4 |
| Costing!I24 | CF CSV Upload!E5 |
| Costing!I28 | CF CSV Upload!E13 |
| Costing!I29 | CF CSV Upload!E14 |
| Costing!I30 | CF CSV Upload!E15 |
| Costing!I31 | CF CSV Upload!E16 |
| Costing!I32 | CF CSV Upload!E17 |
| Costing!I33 | CF CSV Upload!E18 |
| Costing!I34 | CF CSV Upload!E19 |
| Costing!I35 | CF CSV Upload!E20 |
| Costing!I36 | CF CSV Upload!E21 |
| Costing!I37 | CF CSV Upload!E22 |
| Costing!I38 | CF CSV Upload!E23 |
| Costing!I39 | CF CSV Upload!E24 |
| Costing!I40 | CF CSV Upload!E25 |
| Costing!I41 | CF CSV Upload!E26 |
| Costing!I45 | CF CSV Upload!E44 |
| Costing!I46 | CF CSV Upload!E45 |
| Costing!I47 | CF CSV Upload!E46 |
| Costing!I48 | CF CSV Upload!E47 |
| Costing!I52 | CF CSV Upload!E55 |
| Costing!I53 | CF CSV Upload!E56 |
| Costing!I57 | CF CSV Upload!E62 |
| Costing!I58 | CF CSV Upload!E63 |
| Costing!I62 | CF CSV Upload!E78 |
| Costing!I66 | CF CSV Upload!E81 |
| Costing!I70 | CF CSV Upload!E84 |
| Costing!I74 | CF CSV Upload!E87 |
| Costing!I78 | CF CSV Upload!E90 |
| Costing!I82 | CF CSV Upload!E69 |
| Costing!I83 | CF CSV Upload!E70 |
| Costing!I84 | CF CSV Upload!E71 |
| Costing!I88 | CF CSV Upload!E93 |
| Costing!J107 | CF CSV Upload!E94 |
| Costing!J21 | CF CSV Upload!H2 |
| Costing!J22 | CF CSV Upload!H3 |
| Costing!J23 | CF CSV Upload!H4 |
| Costing!J24 | CF CSV Upload!H5 |
| Costing!J28 | CF CSV Upload!H13 |
| Costing!J29 | CF CSV Upload!H14 |
| Costing!J30 | CF CSV Upload!H15 |
| Costing!J31 | CF CSV Upload!H16 |
| Costing!J32 | CF CSV Upload!H17 |
| Costing!J33 | CF CSV Upload!H18 |
| Costing!J34 | CF CSV Upload!H19 |
| Costing!J35 | CF CSV Upload!H20 |
| Costing!J36 | CF CSV Upload!H21 |
| Costing!J37 | CF CSV Upload!H22 |
| Costing!J38 | CF CSV Upload!H23 |
| Costing!J39 | CF CSV Upload!H24 |
| Costing!J40 | CF CSV Upload!H25 |
| Costing!J41 | CF CSV Upload!H26 |
| Costing!J45 | CF CSV Upload!H44 |
| Costing!J46 | CF CSV Upload!H45 |
| Costing!J47 | CF CSV Upload!H46 |
| Costing!J48 | CF CSV Upload!H47 |
| Costing!J52 | CF CSV Upload!H55 |
| Costing!J53 | CF CSV Upload!H56 |
| Costing!J57 | CF CSV Upload!H62 |
| Costing!J58 | CF CSV Upload!H63 |
| Costing!J62 | CF CSV Upload!H78 |
| Costing!J66 | CF CSV Upload!H81 |
| Costing!J70 | CF CSV Upload!H84 |
| Costing!J74 | CF CSV Upload!H87 |
| Costing!J78 | CF CSV Upload!H90 |
| Costing!J82 | CF CSV Upload!H69 |
| Costing!J83 | CF CSV Upload!H70 |
| Costing!J84 | CF CSV Upload!H71 |
| Costing!J88 | CF CSV Upload!H93 |
| Costing!K98 | CF CSV Upload!D94 |
| Costing!K99 | CF CSV Upload!D94 |
| Costing!M21 | CF CSV Upload!C6 |
| Costing!M22 | CF CSV Upload!C7 |
| Costing!M23 | CF CSV Upload!C8 |
| Costing!M24 | CF CSV Upload!C9 |
| Costing!M28 | CF CSV Upload!C27 |
| Costing!M29 | CF CSV Upload!C28 |
| Costing!M30 | CF CSV Upload!C29 |
| Costing!M31 | CF CSV Upload!C30 |
| Costing!M32 | CF CSV Upload!C31 |
| Costing!M33 | CF CSV Upload!C32 |
| Costing!M34 | CF CSV Upload!C33 |
| Costing!M35 | CF CSV Upload!C34 |
| Costing!M36 | CF CSV Upload!C35 |
| Costing!M37 | CF CSV Upload!C36 |
| Costing!M38 | CF CSV Upload!C37 |
| Costing!M39 | CF CSV Upload!C38 |
| Costing!M40 | CF CSV Upload!C39 |
| Costing!M41 | CF CSV Upload!C40 |
| Costing!M45 | CF CSV Upload!C48 |
| Costing!M46 | CF CSV Upload!C49 |
| Costing!M47 | CF CSV Upload!C50 |
| Costing!M48 | CF CSV Upload!C51 |
| Costing!M52 | CF CSV Upload!C57 |
| Costing!M53 | CF CSV Upload!C58 |
| Costing!M57 | CF CSV Upload!C64 |
| Costing!M58 | CF CSV Upload!C65 |
| Costing!M82 | CF CSV Upload!C72 |
| Costing!M83 | CF CSV Upload!C73 |
| Costing!M84 | CF CSV Upload!C74 |
| Costing!O21 | CF CSV Upload!D6 |
| Costing!O22 | CF CSV Upload!D7 |
| Costing!O23 | CF CSV Upload!D8 |
| Costing!O24 | CF CSV Upload!D9 |
| Costing!O28 | CF CSV Upload!D27 |
| Costing!O29 | CF CSV Upload!D28 |
| Costing!O30 | CF CSV Upload!D29 |
| Costing!O31 | CF CSV Upload!D30 |
| Costing!O32 | CF CSV Upload!D31 |
| Costing!O33 | CF CSV Upload!D32 |
| Costing!O34 | CF CSV Upload!D33 |
| Costing!O35 | CF CSV Upload!D34 |
| Costing!O36 | CF CSV Upload!D35 |
| Costing!O37 | CF CSV Upload!D36 |
| Costing!O38 | CF CSV Upload!D37 |
| Costing!O39 | CF CSV Upload!D38 |
| Costing!O40 | CF CSV Upload!D39 |
| Costing!O41 | CF CSV Upload!D40 |
| Costing!O45 | CF CSV Upload!D48 |
| Costing!O46 | CF CSV Upload!D49 |
| Costing!O47 | CF CSV Upload!D50 |
| Costing!O48 | CF CSV Upload!D51 |
| Costing!O52 | CF CSV Upload!D57 |
| Costing!O53 | CF CSV Upload!D58 |
| Costing!O57 | CF CSV Upload!D64 |
| Costing!O58 | CF CSV Upload!D65 |
| Costing!O62 | CF CSV Upload!D79 |
| Costing!O66 | CF CSV Upload!D82 |
| Costing!O70 | CF CSV Upload!D85 |
| Costing!O74 | CF CSV Upload!D88 |
| Costing!O78 | CF CSV Upload!D91 |
| Costing!O82 | CF CSV Upload!D72 |
| Costing!O83 | CF CSV Upload!D73 |
| Costing!O84 | CF CSV Upload!D74 |
| Costing!O93 | CF CSV Upload!D95 |
| Costing!Q21 | CF CSV Upload!E6 |
| Costing!Q22 | CF CSV Upload!E7 |
| Costing!Q23 | CF CSV Upload!E8 |
| Costing!Q24 | CF CSV Upload!E9 |
| Costing!Q28 | CF CSV Upload!E27 |
| Costing!Q29 | CF CSV Upload!E28 |
| Costing!Q30 | CF CSV Upload!E29 |
| Costing!Q31 | CF CSV Upload!E30 |
| Costing!Q32 | CF CSV Upload!E31 |
| Costing!Q33 | CF CSV Upload!E32 |
| Costing!Q34 | CF CSV Upload!E33 |
| Costing!Q35 | CF CSV Upload!E34 |
| Costing!Q36 | CF CSV Upload!E35 |
| Costing!Q37 | CF CSV Upload!E36 |
| Costing!Q38 | CF CSV Upload!E37 |
| Costing!Q39 | CF CSV Upload!E38 |
| Costing!Q40 | CF CSV Upload!E39 |
| Costing!Q41 | CF CSV Upload!E40 |
| Costing!Q45 | CF CSV Upload!E48 |
| Costing!Q46 | CF CSV Upload!E49 |
| Costing!Q47 | CF CSV Upload!E50 |
| Costing!Q48 | CF CSV Upload!E51 |
| Costing!Q52 | CF CSV Upload!E57 |
| Costing!Q53 | CF CSV Upload!E58 |
| Costing!Q57 | CF CSV Upload!E64 |
| Costing!Q58 | CF CSV Upload!E65 |
| Costing!Q62 | CF CSV Upload!E79 |
| Costing!Q66 | CF CSV Upload!E82 |
| Costing!Q70 | CF CSV Upload!E85 |
| Costing!Q74 | CF CSV Upload!E88 |
| Costing!Q78 | CF CSV Upload!E91 |
| Costing!Q82 | CF CSV Upload!E72 |
| Costing!Q83 | CF CSV Upload!E73 |
| Costing!Q84 | CF CSV Upload!E74 |
| Costing!R21 | CF CSV Upload!H6 |
| Costing!R22 | CF CSV Upload!H7 |
| Costing!R23 | CF CSV Upload!H8 |
| Costing!R24 | CF CSV Upload!H9 |
| Costing!R28 | CF CSV Upload!H27 |
| Costing!R29 | CF CSV Upload!H28 |
| Costing!R30 | CF CSV Upload!H29 |
| Costing!R31 | CF CSV Upload!H30 |
| Costing!R32 | CF CSV Upload!H31 |
| Costing!R33 | CF CSV Upload!H32 |
| Costing!R34 | CF CSV Upload!H33 |
| Costing!R35 | CF CSV Upload!H34 |
| Costing!R36 | CF CSV Upload!H35 |
| Costing!R37 | CF CSV Upload!H36 |
| Costing!R38 | CF CSV Upload!H37 |
| Costing!R39 | CF CSV Upload!H38 |
| Costing!R40 | CF CSV Upload!H39 |
| Costing!R41 | CF CSV Upload!H40 |
| Costing!R45 | CF CSV Upload!H48 |
| Costing!R46 | CF CSV Upload!H49 |
| Costing!R47 | CF CSV Upload!H50 |
| Costing!R48 | CF CSV Upload!H51 |
| Costing!R52 | CF CSV Upload!H57 |
| Costing!R53 | CF CSV Upload!H58 |
| Costing!R57 | CF CSV Upload!H64 |
| Costing!R58 | CF CSV Upload!H65 |
| Costing!R62 | CF CSV Upload!H79 |
| Costing!R66 | CF CSV Upload!H82 |
| Costing!R70 | CF CSV Upload!H85 |
| Costing!R74 | CF CSV Upload!H88 |
| Costing!R78 | CF CSV Upload!H91 |
| Costing!R82 | CF CSV Upload!H72 |
| Costing!R83 | CF CSV Upload!H73 |
| Costing!R84 | CF CSV Upload!H74 |
| Customer Summary!C10 | CF CSV Upload!A81 |
| Customer Summary!C11 | CF CSV Upload!A84 |
| Customer Summary!C12 | CF CSV Upload!A87 |
| Customer Summary!C13 | CF CSV Upload!A90 |
| Customer Summary!C14 | CF CSV Upload!A69 |
| Customer Summary!C15 | CF CSV Upload!A93 |
| Customer Summary!C4 | CF CSV Upload!A2 |
| Customer Summary!C5 | CF CSV Upload!A13 |
| Customer Summary!C6 | CF CSV Upload!A44 |
| Customer Summary!C7 | CF CSV Upload!A55 |
| Customer Summary!C8 | CF CSV Upload!A62 |
| Customer Summary!C9 | CF CSV Upload!A78 |
| Customer Summary!D10 | CF CSV Upload!L81 |
| Customer Summary!D11 | CF CSV Upload!L84 |
| Customer Summary!D12 | CF CSV Upload!L87 |
| Customer Summary!D13 | CF CSV Upload!L90 |
| Customer Summary!D14 | CF CSV Upload!L75 |
| Customer Summary!D4 | CF CSV Upload!L10 |
| Customer Summary!D5 | CF CSV Upload!L41 |
| Customer Summary!D6 | CF CSV Upload!L52 |
| Customer Summary!D7 | CF CSV Upload!L59 |
| Customer Summary!D8 | CF CSV Upload!L66 |
| Customer Summary!D9 | CF CSV Upload!L78 |

### References FROM: Data Lists

| Target | Referenced By |
|--------|-------------|
| Costing!E4 | Data Lists!B64 |
| Customer Summary!C10 | Data Lists!A22 |
| Customer Summary!C11 | Data Lists!A23 |
| Customer Summary!C12 | Data Lists!A24 |
| Customer Summary!C13 | Data Lists!A25 |
| Customer Summary!C14 | Data Lists!A20 |
| Customer Summary!C15 | Data Lists!A26 |
| Customer Summary!C4 | Data Lists!A15 |
| Customer Summary!C5 | Data Lists!A16 |
| Customer Summary!C6 | Data Lists!A17 |
| Customer Summary!C7 | Data Lists!A18 |
| Customer Summary!C8 | Data Lists!A19 |
| Customer Summary!C9 | Data Lists!A21 |

## SECTION 9: NAMED RANGES

*No named ranges defined.*

## SECTION 10: CONDITIONAL FORMATTING

### Sheet: Report (215 rules)

**Rule 1** — Range: `<ConditionalFormatting J1>`

- Type: `cellIs`
  Priority: 313
  Operator: equal
  Formula: `['"SHEET COMPLETE"']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 314
  Operator: equal
  Formula: `['"SHEET NOT COMPLETE"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 2** — Range: `<ConditionalFormatting B49:B54 B84:B86 B153:B170 B172:B179 F166:F167 H172 I169:I170 K17:K19 M36:M38>`

- Type: `containsBlanks`
  Priority: 312
  Formula: `['LEN(TRIM(B17))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 3** — Range: `<ConditionalFormatting B152>`

- Type: `containsBlanks`
  Priority: 311
  Formula: `['LEN(TRIM(B152))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 4** — Range: `<ConditionalFormatting D63:N63 Q63:Z63>`

- Type: `cellIs`
  Priority: 305
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 307
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 309
  Formula: `['LEN(TRIM(D63))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 5** — Range: `<ConditionalFormatting D65:N66>`

- Type: `expression`
  Priority: 308
  Formula: `['AND(D63="Show",D65="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 6** — Range: `<ConditionalFormatting Q65:Z66>`

- Type: `expression`
  Priority: 306
  Formula: `['AND(Q63="Show",Q65="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 7** — Range: `<ConditionalFormatting D63:N63>`

- Type: `expression`
  Priority: 304
  Formula: `['OR(D63="Show",D63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 8** — Range: `<ConditionalFormatting D64:N64>`

- Type: `expression`
  Priority: 303
  Formula: `['OR(D63="Show",D63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 9** — Range: `<ConditionalFormatting D65:N65>`

- Type: `expression`
  Priority: 302
  Formula: `['OR(D63="Show",D63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 10** — Range: `<ConditionalFormatting Q63:Z63>`

- Type: `expression`
  Priority: 301
  Formula: `['OR(Q63="Show",Q63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 11** — Range: `<ConditionalFormatting Q64:Z64>`

- Type: `expression`
  Priority: 300
  Formula: `['OR(Q63="Show",Q63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 12** — Range: `<ConditionalFormatting Q65:Z65>`

- Type: `expression`
  Priority: 299
  Formula: `['OR(Q63="Show",Q63="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 13** — Range: `<ConditionalFormatting D73:N73>`

- Type: `expression`
  Priority: 298
  Formula: `['AND(D71="Show",D73="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 14** — Range: `<ConditionalFormatting Q73:Z73>`

- Type: `expression`
  Priority: 297
  Formula: `['AND(Q71="Show",Q73="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 15** — Range: `<ConditionalFormatting B70>`

- Type: `containsBlanks`
  Priority: 296
  Formula: `['LEN(TRIM(B70))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 16** — Range: `<ConditionalFormatting D70:N70 Q70:Z70>`

- Type: `cellIs`
  Priority: 291
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 293
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 295
  Formula: `['LEN(TRIM(D70))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 17** — Range: `<ConditionalFormatting D72:N72>`

- Type: `expression`
  Priority: 294
  Formula: `['AND(D70="Show",D72="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 288
  Formula: `['OR(D70="Show",D70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 18** — Range: `<ConditionalFormatting Q72:Z72>`

- Type: `expression`
  Priority: 292
  Formula: `['AND(Q70="Show",Q72="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 285
  Formula: `['OR(Q70="Show",Q70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 19** — Range: `<ConditionalFormatting D70:N70>`

- Type: `expression`
  Priority: 290
  Formula: `['OR(D70="Show",D70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 20** — Range: `<ConditionalFormatting D71:N71>`

- Type: `expression`
  Priority: 289
  Formula: `['OR(D70="Show",D70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 21** — Range: `<ConditionalFormatting Q70:Z70>`

- Type: `expression`
  Priority: 287
  Formula: `['OR(Q70="Show",Q70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 22** — Range: `<ConditionalFormatting Q71:Z71>`

- Type: `expression`
  Priority: 286
  Formula: `['OR(Q70="Show",Q70="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 23** — Range: `<ConditionalFormatting D80:N80>`

- Type: `expression`
  Priority: 284
  Formula: `['AND(D78="Show",D80="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 24** — Range: `<ConditionalFormatting Q80:Z80>`

- Type: `expression`
  Priority: 283
  Formula: `['AND(Q78="Show",Q80="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 25** — Range: `<ConditionalFormatting B77>`

- Type: `containsBlanks`
  Priority: 282
  Formula: `['LEN(TRIM(B77))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 26** — Range: `<ConditionalFormatting D77:N77 Q77:Z77>`

- Type: `cellIs`
  Priority: 277
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 279
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 281
  Formula: `['LEN(TRIM(D77))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 27** — Range: `<ConditionalFormatting D79:N79>`

- Type: `expression`
  Priority: 280
  Formula: `['AND(D77="Show",D79="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 274
  Formula: `['OR(D77="Show",D77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 28** — Range: `<ConditionalFormatting Q79:Z79>`

- Type: `expression`
  Priority: 278
  Formula: `['AND(Q77="Show",Q79="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 271
  Formula: `['OR(Q77="Show",Q77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 29** — Range: `<ConditionalFormatting D77:N77>`

- Type: `expression`
  Priority: 276
  Formula: `['OR(D77="Show",D77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 30** — Range: `<ConditionalFormatting D78:N78>`

- Type: `expression`
  Priority: 275
  Formula: `['OR(D77="Show",D77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 31** — Range: `<ConditionalFormatting Q77:Z77>`

- Type: `expression`
  Priority: 273
  Formula: `['OR(Q77="Show",Q77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 32** — Range: `<ConditionalFormatting Q78:Z78>`

- Type: `expression`
  Priority: 272
  Formula: `['OR(Q77="Show",Q77="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 33** — Range: `<ConditionalFormatting E57:Z59>`

- Type: `containsBlanks`
  Priority: 269
  Formula: `['LEN(TRIM(E57))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 34** — Range: `<ConditionalFormatting B57:B59>`

- Type: `containsBlanks`
  Priority: 268
  Formula: `['LEN(TRIM(B57))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 35** — Range: `<ConditionalFormatting B63>`

- Type: `containsBlanks`
  Priority: 267
  Formula: `['LEN(TRIM(B63))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 36** — Range: `<ConditionalFormatting W55>`

- Type: `containsBlanks`
  Priority: 266
  Formula: `['LEN(TRIM(W55))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 37** — Range: `<ConditionalFormatting B55>`

- Type: `containsBlanks`
  Priority: 265
  Formula: `['LEN(TRIM(B55))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 38** — Range: `<ConditionalFormatting E88:Z90>`

- Type: `containsBlanks`
  Priority: 264
  Formula: `['LEN(TRIM(E88))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 39** — Range: `<ConditionalFormatting B88:B90>`

- Type: `containsBlanks`
  Priority: 263
  Formula: `['LEN(TRIM(B88))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 40** — Range: `<ConditionalFormatting D24:N24 Q24:Z24>`

- Type: `cellIs`
  Priority: 258
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 260
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 262
  Formula: `['LEN(TRIM(D24))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 41** — Range: `<ConditionalFormatting D26:N27>`

- Type: `expression`
  Priority: 261
  Formula: `['AND(D24="Show",D26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 42** — Range: `<ConditionalFormatting Q26:Z27>`

- Type: `expression`
  Priority: 259
  Formula: `['AND(Q24="Show",Q26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 43** — Range: `<ConditionalFormatting D24:N24>`

- Type: `expression`
  Priority: 257
  Formula: `['OR(D24="Show",D24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 44** — Range: `<ConditionalFormatting D25:N25>`

- Type: `expression`
  Priority: 256
  Formula: `['OR(D24="Show",D24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 45** — Range: `<ConditionalFormatting D26:N26>`

- Type: `expression`
  Priority: 255
  Formula: `['OR(D24="Show",D24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 46** — Range: `<ConditionalFormatting Q24:Z24>`

- Type: `expression`
  Priority: 254
  Formula: `['OR(Q24="Show",Q24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 47** — Range: `<ConditionalFormatting Q25:Z25>`

- Type: `expression`
  Priority: 253
  Formula: `['OR(Q24="Show",Q24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 48** — Range: `<ConditionalFormatting Q26:Z26>`

- Type: `expression`
  Priority: 252
  Formula: `['OR(Q24="Show",Q24="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 49** — Range: `<ConditionalFormatting B24>`

- Type: `containsBlanks`
  Priority: 251
  Formula: `['LEN(TRIM(B24))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 50** — Range: `<ConditionalFormatting H168>`

- Type: `containsBlanks`
  Priority: 245
  Formula: `['LEN(TRIM(H168))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 51** — Range: `<ConditionalFormatting I155 I157 I159>`

- Type: `containsBlanks`
  Priority: 241
  Formula: `['LEN(TRIM(I155))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 52** — Range: `<ConditionalFormatting F160 F162 F164>`

- Type: `containsBlanks`
  Priority: 240
  Formula: `['LEN(TRIM(F160))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 53** — Range: `<ConditionalFormatting I161>`

- Type: `containsBlanks`
  Priority: 239
  Formula: `['LEN(TRIM(I161))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 54** — Range: `<ConditionalFormatting I163>`

- Type: `containsBlanks`
  Priority: 238
  Formula: `['LEN(TRIM(I163))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 55** — Range: `<ConditionalFormatting I165>`

- Type: `containsBlanks`
  Priority: 237
  Formula: `['LEN(TRIM(I165))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 56** — Range: `<ConditionalFormatting F158>`

- Type: `containsBlanks`
  Priority: 236
  Formula: `['LEN(TRIM(F158))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 57** — Range: `<ConditionalFormatting F156>`

- Type: `containsBlanks`
  Priority: 235
  Formula: `['LEN(TRIM(F156))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 58** — Range: `<ConditionalFormatting D265>`

- Type: `containsBlanks`
  Priority: 234
  Formula: `['LEN(TRIM(D265))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 59** — Range: `<ConditionalFormatting B265>`

- Type: `containsBlanks`
  Priority: 233
  Formula: `['LEN(TRIM(B265))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 60** — Range: `<ConditionalFormatting B194>`

- Type: `containsBlanks`
  Priority: 232
  Formula: `['LEN(TRIM(B194))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 61** — Range: `<ConditionalFormatting D221:N221 Q221:Z221>`

- Type: `cellIs`
  Priority: 227
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 229
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 231
  Formula: `['LEN(TRIM(D221))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 62** — Range: `<ConditionalFormatting D223:N224>`

- Type: `expression`
  Priority: 230
  Formula: `['AND(D221="Show",D223="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 63** — Range: `<ConditionalFormatting Q223:Z224>`

- Type: `expression`
  Priority: 228
  Formula: `['AND(Q221="Show",Q223="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 64** — Range: `<ConditionalFormatting D221:N221>`

- Type: `expression`
  Priority: 226
  Formula: `['OR(D221="Show",D221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 65** — Range: `<ConditionalFormatting D222:N222>`

- Type: `expression`
  Priority: 225
  Formula: `['OR(D221="Show",D221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 66** — Range: `<ConditionalFormatting D223:N223>`

- Type: `expression`
  Priority: 224
  Formula: `['OR(D221="Show",D221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 67** — Range: `<ConditionalFormatting Q221:Z221>`

- Type: `expression`
  Priority: 223
  Formula: `['OR(Q221="Show",Q221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 68** — Range: `<ConditionalFormatting Q222:Z222>`

- Type: `expression`
  Priority: 222
  Formula: `['OR(Q221="Show",Q221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 69** — Range: `<ConditionalFormatting Q223:Z223>`

- Type: `expression`
  Priority: 221
  Formula: `['OR(Q221="Show",Q221="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 70** — Range: `<ConditionalFormatting D231:N231>`

- Type: `expression`
  Priority: 220
  Formula: `['AND(D229="Show",D231="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 71** — Range: `<ConditionalFormatting Q231:Z231>`

- Type: `expression`
  Priority: 219
  Formula: `['AND(Q229="Show",Q231="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 72** — Range: `<ConditionalFormatting D228:N228 Q228:Z228>`

- Type: `cellIs`
  Priority: 214
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 216
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 218
  Formula: `['LEN(TRIM(D228))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 73** — Range: `<ConditionalFormatting D230:N230>`

- Type: `expression`
  Priority: 217
  Formula: `['AND(D228="Show",D230="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 211
  Formula: `['OR(D228="Show",D228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 74** — Range: `<ConditionalFormatting Q230:Z230>`

- Type: `expression`
  Priority: 215
  Formula: `['AND(Q228="Show",Q230="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 208
  Formula: `['OR(Q228="Show",Q228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 75** — Range: `<ConditionalFormatting D228:N228>`

- Type: `expression`
  Priority: 213
  Formula: `['OR(D228="Show",D228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 76** — Range: `<ConditionalFormatting D229:N229>`

- Type: `expression`
  Priority: 212
  Formula: `['OR(D228="Show",D228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 77** — Range: `<ConditionalFormatting Q228:Z228>`

- Type: `expression`
  Priority: 210
  Formula: `['OR(Q228="Show",Q228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 78** — Range: `<ConditionalFormatting Q229:Z229>`

- Type: `expression`
  Priority: 209
  Formula: `['OR(Q228="Show",Q228="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 79** — Range: `<ConditionalFormatting D238:N238>`

- Type: `expression`
  Priority: 207
  Formula: `['AND(D236="Show",D238="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 80** — Range: `<ConditionalFormatting Q238:Z238>`

- Type: `expression`
  Priority: 206
  Formula: `['AND(Q236="Show",Q238="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 81** — Range: `<ConditionalFormatting D235:N235 Q235:Z235>`

- Type: `cellIs`
  Priority: 201
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 203
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 205
  Formula: `['LEN(TRIM(D235))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 82** — Range: `<ConditionalFormatting D237:N237>`

- Type: `expression`
  Priority: 204
  Formula: `['AND(D235="Show",D237="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 198
  Formula: `['OR(D235="Show",D235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 83** — Range: `<ConditionalFormatting Q237:Z237>`

- Type: `expression`
  Priority: 202
  Formula: `['AND(Q235="Show",Q237="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 195
  Formula: `['OR(Q235="Show",Q235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 84** — Range: `<ConditionalFormatting D235:N235>`

- Type: `expression`
  Priority: 200
  Formula: `['OR(D235="Show",D235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 85** — Range: `<ConditionalFormatting D236:N236>`

- Type: `expression`
  Priority: 199
  Formula: `['OR(D235="Show",D235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 86** — Range: `<ConditionalFormatting Q235:Z235>`

- Type: `expression`
  Priority: 197
  Formula: `['OR(Q235="Show",Q235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 87** — Range: `<ConditionalFormatting Q236:Z236>`

- Type: `expression`
  Priority: 196
  Formula: `['OR(Q235="Show",Q235="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 88** — Range: `<ConditionalFormatting E215:Z217>`

- Type: `containsBlanks`
  Priority: 193
  Formula: `['LEN(TRIM(E215))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 89** — Range: `<ConditionalFormatting B221>`

- Type: `containsBlanks`
  Priority: 192
  Formula: `['LEN(TRIM(B221))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 90** — Range: `<ConditionalFormatting B228>`

- Type: `containsBlanks`
  Priority: 190
  Formula: `['LEN(TRIM(B228))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 91** — Range: `<ConditionalFormatting B235>`

- Type: `containsBlanks`
  Priority: 189
  Formula: `['LEN(TRIM(B235))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 92** — Range: `<ConditionalFormatting D245:N245>`

- Type: `expression`
  Priority: 186
  Formula: `['AND(D243="Show",D245="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 93** — Range: `<ConditionalFormatting Q245:Z245>`

- Type: `expression`
  Priority: 185
  Formula: `['AND(Q243="Show",Q245="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 94** — Range: `<ConditionalFormatting D242:N242 Q242:Z242>`

- Type: `cellIs`
  Priority: 180
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 182
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 184
  Formula: `['LEN(TRIM(D242))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 95** — Range: `<ConditionalFormatting D244:N244>`

- Type: `expression`
  Priority: 183
  Formula: `['AND(D242="Show",D244="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 177
  Formula: `['OR(D242="Show",D242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 96** — Range: `<ConditionalFormatting Q244:Z244>`

- Type: `expression`
  Priority: 181
  Formula: `['AND(Q242="Show",Q244="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 174
  Formula: `['OR(Q242="Show",Q242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 97** — Range: `<ConditionalFormatting D242:N242>`

- Type: `expression`
  Priority: 179
  Formula: `['OR(D242="Show",D242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 98** — Range: `<ConditionalFormatting D243:N243>`

- Type: `expression`
  Priority: 178
  Formula: `['OR(D242="Show",D242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 99** — Range: `<ConditionalFormatting Q242:Z242>`

- Type: `expression`
  Priority: 176
  Formula: `['OR(Q242="Show",Q242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 100** — Range: `<ConditionalFormatting Q243:Z243>`

- Type: `expression`
  Priority: 175
  Formula: `['OR(Q242="Show",Q242="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 101** — Range: `<ConditionalFormatting B242>`

- Type: `containsBlanks`
  Priority: 173
  Formula: `['LEN(TRIM(B242))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 102** — Range: `<ConditionalFormatting D252:N252>`

- Type: `expression`
  Priority: 172
  Formula: `['AND(D250="Show",D252="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 103** — Range: `<ConditionalFormatting Q252:Z252>`

- Type: `expression`
  Priority: 171
  Formula: `['AND(Q250="Show",Q252="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 104** — Range: `<ConditionalFormatting D249:N249 Q249:Z249>`

- Type: `cellIs`
  Priority: 166
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 168
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 170
  Formula: `['LEN(TRIM(D249))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 105** — Range: `<ConditionalFormatting D251:N251>`

- Type: `expression`
  Priority: 169
  Formula: `['AND(D249="Show",D251="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 163
  Formula: `['OR(D249="Show",D249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 106** — Range: `<ConditionalFormatting Q251:Z251>`

- Type: `expression`
  Priority: 167
  Formula: `['AND(Q249="Show",Q251="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 160
  Formula: `['OR(Q249="Show",Q249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 107** — Range: `<ConditionalFormatting D249:N249>`

- Type: `expression`
  Priority: 165
  Formula: `['OR(D249="Show",D249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 108** — Range: `<ConditionalFormatting D250:N250>`

- Type: `expression`
  Priority: 164
  Formula: `['OR(D249="Show",D249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 109** — Range: `<ConditionalFormatting Q249:Z249>`

- Type: `expression`
  Priority: 162
  Formula: `['OR(Q249="Show",Q249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 110** — Range: `<ConditionalFormatting Q250:Z250>`

- Type: `expression`
  Priority: 161
  Formula: `['OR(Q249="Show",Q249="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 111** — Range: `<ConditionalFormatting B249>`

- Type: `containsBlanks`
  Priority: 159
  Formula: `['LEN(TRIM(B249))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 112** — Range: `<ConditionalFormatting D259:N259>`

- Type: `expression`
  Priority: 158
  Formula: `['AND(D257="Show",D259="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 113** — Range: `<ConditionalFormatting Q259:Z259>`

- Type: `expression`
  Priority: 157
  Formula: `['AND(Q257="Show",Q259="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 114** — Range: `<ConditionalFormatting D256:N256 Q256:Z256>`

- Type: `cellIs`
  Priority: 152
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 154
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 156
  Formula: `['LEN(TRIM(D256))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 115** — Range: `<ConditionalFormatting D258:N258>`

- Type: `expression`
  Priority: 155
  Formula: `['AND(D256="Show",D258="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 149
  Formula: `['OR(D256="Show",D256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 116** — Range: `<ConditionalFormatting Q258:Z258>`

- Type: `expression`
  Priority: 153
  Formula: `['AND(Q256="Show",Q258="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 146
  Formula: `['OR(Q256="Show",Q256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 117** — Range: `<ConditionalFormatting D256:N256>`

- Type: `expression`
  Priority: 151
  Formula: `['OR(D256="Show",D256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 118** — Range: `<ConditionalFormatting D257:N257>`

- Type: `expression`
  Priority: 150
  Formula: `['OR(D256="Show",D256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 119** — Range: `<ConditionalFormatting Q256:Z256>`

- Type: `expression`
  Priority: 148
  Formula: `['OR(Q256="Show",Q256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 120** — Range: `<ConditionalFormatting Q257:Z257>`

- Type: `expression`
  Priority: 147
  Formula: `['OR(Q256="Show",Q256="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 121** — Range: `<ConditionalFormatting B256>`

- Type: `containsBlanks`
  Priority: 145
  Formula: `['LEN(TRIM(B256))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 122** — Range: `<ConditionalFormatting B91>`

- Type: `containsBlanks`
  Priority: 138
  Formula: `['LEN(TRIM(B91))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 123** — Range: `<ConditionalFormatting B92>`

- Type: `containsBlanks`
  Priority: 137
  Formula: `['LEN(TRIM(B92))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 124** — Range: `<ConditionalFormatting B93:B97>`

- Type: `containsBlanks`
  Priority: 136
  Formula: `['LEN(TRIM(B93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 125** — Range: `<ConditionalFormatting E95:Z97>`

- Type: `containsBlanks`
  Priority: 135
  Formula: `['LEN(TRIM(E95))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 126** — Range: `<ConditionalFormatting B95:B97>`

- Type: `containsBlanks`
  Priority: 134
  Formula: `['LEN(TRIM(B95))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 127** — Range: `<ConditionalFormatting B141:B150>`

- Type: `containsBlanks`
  Priority: 133
  Formula: `['LEN(TRIM(B141))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 128** — Range: `<ConditionalFormatting E142:F142>`

- Type: `containsBlanks`
  Priority: 132
  Formula: `['LEN(TRIM(E142))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 129** — Range: `<ConditionalFormatting E143:F146>`

- Type: `containsBlanks`
  Priority: 131
  Formula: `['LEN(TRIM(E143))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 130** — Range: `<ConditionalFormatting D104:N104>`

- Type: `expression`
  Priority: 130
  Formula: `['AND(D102="Show",D104="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 131** — Range: `<ConditionalFormatting Q104:Z104>`

- Type: `expression`
  Priority: 129
  Formula: `['AND(Q102="Show",Q104="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 132** — Range: `<ConditionalFormatting D101:N101 Q101:Z101>`

- Type: `cellIs`
  Priority: 124
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 126
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 128
  Formula: `['LEN(TRIM(D101))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 133** — Range: `<ConditionalFormatting D103:N103>`

- Type: `expression`
  Priority: 127
  Formula: `['AND(D101="Show",D103="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 121
  Formula: `['OR(D101="Show",D101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 134** — Range: `<ConditionalFormatting Q103:Z103>`

- Type: `expression`
  Priority: 125
  Formula: `['AND(Q101="Show",Q103="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 118
  Formula: `['OR(Q101="Show",Q101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 135** — Range: `<ConditionalFormatting D101:N101>`

- Type: `expression`
  Priority: 123
  Formula: `['OR(D101="Show",D101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 136** — Range: `<ConditionalFormatting D102:N102>`

- Type: `expression`
  Priority: 122
  Formula: `['OR(D101="Show",D101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 137** — Range: `<ConditionalFormatting Q101:Z101>`

- Type: `expression`
  Priority: 120
  Formula: `['OR(Q101="Show",Q101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 138** — Range: `<ConditionalFormatting Q102:Z102>`

- Type: `expression`
  Priority: 119
  Formula: `['OR(Q101="Show",Q101="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 139** — Range: `<ConditionalFormatting D111:N111>`

- Type: `expression`
  Priority: 117
  Formula: `['AND(D109="Show",D111="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 140** — Range: `<ConditionalFormatting Q111:Z111>`

- Type: `expression`
  Priority: 116
  Formula: `['AND(Q109="Show",Q111="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 141** — Range: `<ConditionalFormatting D108:N108 Q108:Z108>`

- Type: `cellIs`
  Priority: 111
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 113
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 115
  Formula: `['LEN(TRIM(D108))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 142** — Range: `<ConditionalFormatting D110:N110>`

- Type: `expression`
  Priority: 114
  Formula: `['AND(D108="Show",D110="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 108
  Formula: `['OR(D108="Show",D108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 143** — Range: `<ConditionalFormatting Q110:Z110>`

- Type: `expression`
  Priority: 112
  Formula: `['AND(Q108="Show",Q110="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 105
  Formula: `['OR(Q108="Show",Q108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 144** — Range: `<ConditionalFormatting D108:N108>`

- Type: `expression`
  Priority: 110
  Formula: `['OR(D108="Show",D108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 145** — Range: `<ConditionalFormatting D109:N109>`

- Type: `expression`
  Priority: 109
  Formula: `['OR(D108="Show",D108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 146** — Range: `<ConditionalFormatting Q108:Z108>`

- Type: `expression`
  Priority: 107
  Formula: `['OR(Q108="Show",Q108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 147** — Range: `<ConditionalFormatting Q109:Z109>`

- Type: `expression`
  Priority: 106
  Formula: `['OR(Q108="Show",Q108="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 148** — Range: `<ConditionalFormatting D118:N118>`

- Type: `expression`
  Priority: 104
  Formula: `['AND(D116="Show",D118="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 149** — Range: `<ConditionalFormatting Q118:Z118>`

- Type: `expression`
  Priority: 103
  Formula: `['AND(Q116="Show",Q118="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 150** — Range: `<ConditionalFormatting D115:N115 Q115:Z115>`

- Type: `cellIs`
  Priority: 98
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 100
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 102
  Formula: `['LEN(TRIM(D115))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 151** — Range: `<ConditionalFormatting D117:N117>`

- Type: `expression`
  Priority: 101
  Formula: `['AND(D115="Show",D117="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 95
  Formula: `['OR(D115="Show",D115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 152** — Range: `<ConditionalFormatting Q117:Z117>`

- Type: `expression`
  Priority: 99
  Formula: `['AND(Q115="Show",Q117="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 92
  Formula: `['OR(Q115="Show",Q115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 153** — Range: `<ConditionalFormatting D115:N115>`

- Type: `expression`
  Priority: 97
  Formula: `['OR(D115="Show",D115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 154** — Range: `<ConditionalFormatting D116:N116>`

- Type: `expression`
  Priority: 96
  Formula: `['OR(D115="Show",D115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 155** — Range: `<ConditionalFormatting Q115:Z115>`

- Type: `expression`
  Priority: 94
  Formula: `['OR(Q115="Show",Q115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 156** — Range: `<ConditionalFormatting Q116:Z116>`

- Type: `expression`
  Priority: 93
  Formula: `['OR(Q115="Show",Q115="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 157** — Range: `<ConditionalFormatting B101>`

- Type: `containsBlanks`
  Priority: 91
  Formula: `['LEN(TRIM(B101))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 158** — Range: `<ConditionalFormatting B108>`

- Type: `containsBlanks`
  Priority: 90
  Formula: `['LEN(TRIM(B108))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 159** — Range: `<ConditionalFormatting B115>`

- Type: `containsBlanks`
  Priority: 89
  Formula: `['LEN(TRIM(B115))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 160** — Range: `<ConditionalFormatting B171>`

- Type: `containsBlanks`
  Priority: 72
  Formula: `['LEN(TRIM(B171))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 161** — Range: `<ConditionalFormatting F171>`

- Type: `containsBlanks`
  Priority: 71
  Formula: `['LEN(TRIM(F171))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 162** — Range: `<ConditionalFormatting B197:B213>`

- Type: `containsBlanks`
  Priority: 70
  Formula: `['LEN(TRIM(B197))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 163** — Range: `<ConditionalFormatting B195>`

- Type: `containsBlanks`
  Priority: 69
  Formula: `['LEN(TRIM(B195))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 164** — Range: `<ConditionalFormatting B215:B217>`

- Type: `containsBlanks`
  Priority: 68
  Formula: `['LEN(TRIM(B215))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 165** — Range: `<ConditionalFormatting B261:B263>`

- Type: `containsBlanks`
  Priority: 67
  Formula: `['LEN(TRIM(B261))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 166** — Range: `<ConditionalFormatting D31:N31 Q31:Z31>`

- Type: `cellIs`
  Priority: 62
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 64
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 66
  Formula: `['LEN(TRIM(D31))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 167** — Range: `<ConditionalFormatting D33:N34>`

- Type: `expression`
  Priority: 65
  Formula: `['AND(D31="Show",D33="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 168** — Range: `<ConditionalFormatting Q33:Z34>`

- Type: `expression`
  Priority: 63
  Formula: `['AND(Q31="Show",Q33="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 169** — Range: `<ConditionalFormatting D31:N31>`

- Type: `expression`
  Priority: 61
  Formula: `['OR(D31="Show",D31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 170** — Range: `<ConditionalFormatting D32:N32>`

- Type: `expression`
  Priority: 60
  Formula: `['OR(D31="Show",D31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 171** — Range: `<ConditionalFormatting D33:N33>`

- Type: `expression`
  Priority: 59
  Formula: `['OR(D31="Show",D31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 172** — Range: `<ConditionalFormatting Q31:Z31>`

- Type: `expression`
  Priority: 58
  Formula: `['OR(Q31="Show",Q31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 173** — Range: `<ConditionalFormatting Q32:Z32>`

- Type: `expression`
  Priority: 57
  Formula: `['OR(Q31="Show",Q31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 174** — Range: `<ConditionalFormatting Q33:Z33>`

- Type: `expression`
  Priority: 56
  Formula: `['OR(Q31="Show",Q31="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 175** — Range: `<ConditionalFormatting B31>`

- Type: `containsBlanks`
  Priority: 55
  Formula: `['LEN(TRIM(B31))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 176** — Range: `<ConditionalFormatting D125:N125>`

- Type: `expression`
  Priority: 54
  Formula: `['AND(D123="Show",D125="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 177** — Range: `<ConditionalFormatting Q125:Z125>`

- Type: `expression`
  Priority: 53
  Formula: `['AND(Q123="Show",Q125="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 178** — Range: `<ConditionalFormatting D122:N122 Q122:Z122>`

- Type: `cellIs`
  Priority: 48
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 50
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 52
  Formula: `['LEN(TRIM(D122))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 179** — Range: `<ConditionalFormatting D124:N124>`

- Type: `expression`
  Priority: 51
  Formula: `['AND(D122="Show",D124="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 45
  Formula: `['OR(D122="Show",D122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 180** — Range: `<ConditionalFormatting Q124:Z124>`

- Type: `expression`
  Priority: 49
  Formula: `['AND(Q122="Show",Q124="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 42
  Formula: `['OR(Q122="Show",Q122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 181** — Range: `<ConditionalFormatting D122:N122>`

- Type: `expression`
  Priority: 47
  Formula: `['OR(D122="Show",D122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 182** — Range: `<ConditionalFormatting D123:N123>`

- Type: `expression`
  Priority: 46
  Formula: `['OR(D122="Show",D122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 183** — Range: `<ConditionalFormatting Q122:Z122>`

- Type: `expression`
  Priority: 44
  Formula: `['OR(Q122="Show",Q122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 184** — Range: `<ConditionalFormatting Q123:Z123>`

- Type: `expression`
  Priority: 43
  Formula: `['OR(Q122="Show",Q122="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 185** — Range: `<ConditionalFormatting D132:N132>`

- Type: `expression`
  Priority: 41
  Formula: `['AND(D130="Show",D132="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 186** — Range: `<ConditionalFormatting Q132:Z132>`

- Type: `expression`
  Priority: 40
  Formula: `['AND(Q130="Show",Q132="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 187** — Range: `<ConditionalFormatting D129:N129 Q129:Z129>`

- Type: `cellIs`
  Priority: 35
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 37
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 39
  Formula: `['LEN(TRIM(D129))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 188** — Range: `<ConditionalFormatting D131:N131>`

- Type: `expression`
  Priority: 38
  Formula: `['AND(D129="Show",D131="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 32
  Formula: `['OR(D129="Show",D129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 189** — Range: `<ConditionalFormatting Q131:Z131>`

- Type: `expression`
  Priority: 36
  Formula: `['AND(Q129="Show",Q131="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 29
  Formula: `['OR(Q129="Show",Q129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 190** — Range: `<ConditionalFormatting D129:N129>`

- Type: `expression`
  Priority: 34
  Formula: `['OR(D129="Show",D129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 191** — Range: `<ConditionalFormatting D130:N130>`

- Type: `expression`
  Priority: 33
  Formula: `['OR(D129="Show",D129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 192** — Range: `<ConditionalFormatting Q129:Z129>`

- Type: `expression`
  Priority: 31
  Formula: `['OR(Q129="Show",Q129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 193** — Range: `<ConditionalFormatting Q130:Z130>`

- Type: `expression`
  Priority: 30
  Formula: `['OR(Q129="Show",Q129="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 194** — Range: `<ConditionalFormatting D139:N139>`

- Type: `expression`
  Priority: 28
  Formula: `['AND(D137="Show",D139="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 195** — Range: `<ConditionalFormatting Q139:Z139>`

- Type: `expression`
  Priority: 27
  Formula: `['AND(Q137="Show",Q139="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 196** — Range: `<ConditionalFormatting D136:N136 Q136:Z136>`

- Type: `cellIs`
  Priority: 22
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 24
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 26
  Formula: `['LEN(TRIM(D136))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 197** — Range: `<ConditionalFormatting D138:N138>`

- Type: `expression`
  Priority: 25
  Formula: `['AND(D136="Show",D138="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 19
  Formula: `['OR(D136="Show",D136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 198** — Range: `<ConditionalFormatting Q138:Z138>`

- Type: `expression`
  Priority: 23
  Formula: `['AND(Q136="Show",Q138="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 16
  Formula: `['OR(Q136="Show",Q136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 199** — Range: `<ConditionalFormatting D136:N136>`

- Type: `expression`
  Priority: 21
  Formula: `['OR(D136="Show",D136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 200** — Range: `<ConditionalFormatting D137:N137>`

- Type: `expression`
  Priority: 20
  Formula: `['OR(D136="Show",D136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 201** — Range: `<ConditionalFormatting Q136:Z136>`

- Type: `expression`
  Priority: 18
  Formula: `['OR(Q136="Show",Q136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 202** — Range: `<ConditionalFormatting Q137:Z137>`

- Type: `expression`
  Priority: 17
  Formula: `['OR(Q136="Show",Q136="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 203** — Range: `<ConditionalFormatting B122>`

- Type: `containsBlanks`
  Priority: 15
  Formula: `['LEN(TRIM(B122))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 204** — Range: `<ConditionalFormatting B129>`

- Type: `containsBlanks`
  Priority: 14
  Formula: `['LEN(TRIM(B129))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 205** — Range: `<ConditionalFormatting B136>`

- Type: `containsBlanks`
  Priority: 13
  Formula: `['LEN(TRIM(B136))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 206** — Range: `<ConditionalFormatting D182:N182 Q182:Z182>`

- Type: `cellIs`
  Priority: 8
  Operator: equal
  Formula: `['"Show"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 10
  Operator: equal
  Formula: `['"Hide"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=False
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 12
  Formula: `['LEN(TRIM(D182))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 207** — Range: `<ConditionalFormatting D184:N185>`

- Type: `expression`
  Priority: 11
  Formula: `['AND(D182="Show",D184="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 208** — Range: `<ConditionalFormatting Q184:Z185>`

- Type: `expression`
  Priority: 9
  Formula: `['AND(Q182="Show",Q184="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 209** — Range: `<ConditionalFormatting D182:N182>`

- Type: `expression`
  Priority: 7
  Formula: `['OR(D182="Show",D182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=None, horizontal=None

**Rule 210** — Range: `<ConditionalFormatting D183:N183>`

- Type: `expression`
  Priority: 6
  Formula: `['OR(D182="Show",D182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 211** — Range: `<ConditionalFormatting D184:N184>`

- Type: `expression`
  Priority: 5
  Formula: `['OR(D182="Show",D182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 212** — Range: `<ConditionalFormatting Q182:Z182>`

- Type: `expression`
  Priority: 4
  Formula: `['OR(Q182="Show",Q182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 213** — Range: `<ConditionalFormatting Q183:Z183>`

- Type: `expression`
  Priority: 3
  Formula: `['OR(Q182="Show",Q182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 214** — Range: `<ConditionalFormatting Q184:Z184>`

- Type: `expression`
  Priority: 2
  Formula: `['OR(Q182="Show",Q182="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 215** — Range: `<ConditionalFormatting B182>`

- Type: `containsBlanks`
  Priority: 1
  Formula: `['LEN(TRIM(B182))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'


### Sheet: Costing (25 rules)

**Rule 1** — Range: `<ConditionalFormatting E1>`

- Type: `cellIs`
  Priority: 49
  Operator: equal
  Formula: `['"SHEET COMPLETE"']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 50
  Operator: equal
  Formula: `['"SHEET NOT COMPLETE"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 2** — Range: `<ConditionalFormatting F19>`

- Type: `cellIs`
  Priority: 47
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 48
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 3** — Range: `<ConditionalFormatting F26>`

- Type: `cellIs`
  Priority: 45
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 46
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 4** — Range: `<ConditionalFormatting F43>`

- Type: `cellIs`
  Priority: 43
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 44
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 5** — Range: `<ConditionalFormatting F50>`

- Type: `cellIs`
  Priority: 41
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 42
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 6** — Range: `<ConditionalFormatting F55>`

- Type: `cellIs`
  Priority: 39
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 40
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 7** — Range: `<ConditionalFormatting F60>`

- Type: `cellIs`
  Priority: 37
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 38
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 8** — Range: `<ConditionalFormatting F64>`

- Type: `cellIs`
  Priority: 35
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 36
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 9** — Range: `<ConditionalFormatting F68>`

- Type: `cellIs`
  Priority: 33
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 34
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 10** — Range: `<ConditionalFormatting F72>`

- Type: `cellIs`
  Priority: 31
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 32
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 11** — Range: `<ConditionalFormatting F76>`

- Type: `cellIs`
  Priority: 29
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 30
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 12** — Range: `<ConditionalFormatting F80>`

- Type: `cellIs`
  Priority: 27
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 28
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 13** — Range: `<ConditionalFormatting F86>`

- Type: `cellIs`
  Priority: 25
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 26
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 14** — Range: `<ConditionalFormatting F89>`

- Type: `cellIs`
  Priority: 23
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 24
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 15** — Range: `<ConditionalFormatting F25>`

- Type: `cellIs`
  Priority: 21
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 22
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 16** — Range: `<ConditionalFormatting F42>`

- Type: `cellIs`
  Priority: 19
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 20
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 17** — Range: `<ConditionalFormatting F49>`

- Type: `cellIs`
  Priority: 17
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 18
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 18** — Range: `<ConditionalFormatting F54>`

- Type: `cellIs`
  Priority: 15
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 16
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 19** — Range: `<ConditionalFormatting F59>`

- Type: `cellIs`
  Priority: 13
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 14
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 20** — Range: `<ConditionalFormatting F63>`

- Type: `cellIs`
  Priority: 11
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 12
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 21** — Range: `<ConditionalFormatting F67>`

- Type: `cellIs`
  Priority: 9
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 10
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 22** — Range: `<ConditionalFormatting F71>`

- Type: `cellIs`
  Priority: 7
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 8
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 23** — Range: `<ConditionalFormatting F75>`

- Type: `cellIs`
  Priority: 5
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 6
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 24** — Range: `<ConditionalFormatting F79>`

- Type: `cellIs`
  Priority: 3
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 4
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 25** — Range: `<ConditionalFormatting F85>`

- Type: `cellIs`
  Priority: 1
  Operator: greaterThan
  Formula: `['0']`
  Font: color=None, bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFC000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `cellIs`
  Priority: 2
  Operator: lessThan
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'


### Sheet: Customer Summary (4 rules)

**Rule 1** — Range: `<ConditionalFormatting B1:F1>`

- Type: `cellIs`
  Priority: 5
  Operator: equal
  Formula: `['"PLEASE COMPLETE COSTING BEFORE SUPPLYING A PRICE"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=0.0, type='theme', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style='thin', color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', right=<openpyxl.styles.borders.Side object>
Parameters:
style='thin', color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', top=<openpyxl.styles.borders.Side object>
Parameters:
style='thin', color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', bottom=<openpyxl.styles.borders.Side object>
Parameters:
style='thin', color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 2** — Range: `<ConditionalFormatting D4:D15>`

- Type: `cellIs`
  Priority: 4
  Operator: equal
  Formula: `['"Yes"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bold=False

**Rule 3** — Range: `<ConditionalFormatting E4:E15>`

- Type: `cellIs`
  Priority: 2
  Operator: equal
  Formula: `['"n/a"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

- Type: `cellIs`
  Priority: 3
  Operator: equal
  Formula: `['"Optional"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

**Rule 4** — Range: `<ConditionalFormatting F4:F15>`

- Type: `cellIs`
  Priority: 1
  Operator: equal
  Formula: `['"n/a"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'


### Sheet: Sub Contractor Costs (3 rules)

**Rule 1** — Range: `<ConditionalFormatting D11:D21>`

- Type: `cellIs`
  Priority: 5
  Operator: equal
  Formula: `['"n/a"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

- Type: `cellIs`
  Priority: 6
  Operator: equal
  Formula: `['"Optional"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

**Rule 2** — Range: `<ConditionalFormatting G11:G21>`

- Type: `cellIs`
  Priority: 3
  Operator: equal
  Formula: `['"n/a"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

- Type: `cellIs`
  Priority: 4
  Operator: equal
  Formula: `['"Optional"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

**Rule 3** — Range: `<ConditionalFormatting G23>`

- Type: `cellIs`
  Priority: 1
  Operator: equal
  Formula: `['"n/a"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'

- Type: `cellIs`
  Priority: 2
  Operator: equal
  Formula: `['"Optional"']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme'


## SECTION 11: OTHER SHEETS

### Sheet: Office Notes

**Rows:** 1  |  **Cols:** 9

```
R1: [A1]=Add notes below that the office need to consider when compiling the estimate and report.
```

### Sheet: CAF1 Form

**Rows:** 29  |  **Cols:** 11

```
R1: [B2]=On Site Acceptance Form (CAF1).
R3: [B2]=Enquiry ID:
R4: [B2]=Client Name
R5: [B2]=Address 1
R6: [B2]=Address 2
R7: [B2]=Address 3
R8: [B2]=Address 4
R9: [B2]=Postcode
R11: [B2]=I wish to proceed with the woks specified below. (tick items required and total cost)
R13: [B2]=Operation | [I9]=Price | [K11]=Tick
R14: [B2]=Damp Proofing
R15: [B2]=Timber treatments/replacements
R16: [B2]=Condensation
R17: [B2]=Wall Ties
R18: [B2]=Other works
R19: [B2]=Subtotal
R20: [B2]=VAT
R21: [B2]=Total
R22: [B2]=Deposit
R24: [B2]=I accept the company terms and conditions of contract which I have viewed at the link below and I have paid my deposit with this order.
R25: [B2]=https://www.tyneteesdampproofing.co.uk/terms-and-conditions/
R27: [B2]=I wish the work to commence before the 14 day cooling off period and waive my consumer rights (please sign to confirm)
R29: [B2]=Signed: | [I9]=Date:
```

### Sheet: Sub Contractor Costs

**Rows:** 24  |  **Cols:** 8

```
R2: [B2]=Sub Contractor Costs
R3: [B2]=Project Details
R4: [B2]=Enquiry number | [D4]==Costing!E4
R5: [B2]==[1]Details!$B$7 | [D4]==Costing!E7
R6: [B2]==[1]Details!$B$8 | [D4]==Costing!E8
R7: [B2]==[1]Details!$B$9 | [D4]==Costing!E9
R8: [B2]==[1]Details!$B$10 | [D4]==Costing!E10
R9: [B2]==[1]Details!$B$11 | [D4]==Costing!E11
R10: [B2]=# | [C3]=Area of Works  | [D4]=Costs↵(Ex VAT) | [E5]=Assigned to / Comments: | [G7]=Total Projected Hours
R11: [B2]=1 | [C3]=='Customer Summary'!C4 | [D4]==Costing!V25 | [G7]==Costing!O25
R12: [B2]==B11+1 | [C3]=='Customer Summary'!C5 | [D4]==Costing!V42 | [G7]==Costing!O42
R13: [B2]==B12+1 | [C3]=='Customer Summary'!C6 | [D4]==Costing!V49 | [G7]==Costing!O49
R14: [B2]==B13+1 | [C3]=='Customer Summary'!C7 | [D4]==Costing!V54 | [G7]==Costing!O54
R15: [B2]==B14+1 | [C3]=='Customer Summary'!C8 | [D4]==Costing!V59 | [G7]==Costing!O59
R16: [B2]==B15+1 | [C3]=='Customer Summary'!C9 | [D4]==Costing!V63 | [G7]==Costing!O63
R17: [B2]==B16+1 | [C3]=='Customer Summary'!C10 | [D4]==Costing!V67 | [G7]==Costing!V67
R18: [B2]==B17+1 | [C3]=='Customer Summary'!C11 | [D4]==Costing!V71 | [G7]==Costing!V71
R19: [B2]==B18+1 | [C3]=='Customer Summary'!C12 | [D4]==Costing!V75 | [G7]==Costing!V75
R20: [B2]==B19+1 | [C3]=='Customer Summary'!C13 | [D4]==Costing!V79 | [G7]==Costing!V79
R21: [B2]==B20+1 | [C3]=='Customer Summary'!C14 | [D4]==Costing!V85 | [G7]==Costing!V85
R23: [C3]=Total | [D4]==SUM(D11:D22) | [G7]==SUM(G11:G22)
```

### Sheet: Changes

**Rows:** 24  |  **Cols:** 4

```
R1: [A1]=Date | [B2]=Version From | [C3]=Version To | [D4]=Change
R2: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Add VBA to updated the file name (date) on each click as the file names only changed on open so if clicking multiple times it was trying to save the same file again which is confusing)
R3: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Added Sub Contractor 'clarity' section on costing sheet - Vat registered and non vat registered
R4: [A1]=2024-05-13 00:00:00 | [B2]=18 | [C3]=19 | [D4]=Added the word trunking along with ducting etc.
R5: [A1]=2024-05-28 00:00:00 | [B2]=19 | [C3]=20 | [D4]=Changed ambiguous wording to roof vents to 'Customer to …'.
R6: [A1]=2024-05-28 00:00:00 | [B2]=19 | [C3]=20 | [D4]=Added deposit value ex vat and inc vat for card readers.
R7: [A1]=2024-06-17 00:00:00 | [B2]=20 | [C3]=21 | [D4]=Added Section Price Adjustment %.
R8: [A1]=2024-07-16 00:00:00 | [B2]=21 | [C3]=22 | [D4]=Added external defects & airbricks section to the report.
R9: [A1]=2024-07-18 00:00:00 | [B2]=22 | [C3]=23 | [D4]=Re-arranged the external defects section to be put at the bottom of the report.
R10: [A1]=2024-07-22 00:00:00 | [B2]=23 | [C3]=24 | [D4]=Fixed conditional logic issue which was showing a row on the report when it shouldn't have been.
R11: [A1]=2024-09-04 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Added conditional logic to Defects section on report so that it pre-populates more cells as requested by GH.  Also removed the Office comments section at the bottom of the report as it is hiiden when …
R12: [A1]=2024-09-27 00:00:00 | [B2]=26 | [C3]=27 | [D4]=Changed wording on Projects Specific Overheads to make it look more generic and to cover more areas and removed the vehicle costs statement.↵Added the On Site Approval Form Tab.
R13: [A1]=2024-11-04 00:00:00 | [B2]=27 | [C3]=28 | [D4]=Increased rate from £30 to £30.63 to cover for Employers NI increase.
R14: [A1]=2024-12-19 00:00:00 | [B2]=28 | [C3]=29 | [D4]=Allowed the editing of the customer summary lines for the surveyors including being able to set something as optional.↵Updated the wording etc on the 'Overheads' sections to olny show as Lab and Mats …
R15: [A1]=2025-01-27 00:00:00 | [B2]=29 | [C3]=30 | [D4]=Added Estimate Coversheet Selections To Cost Sheet.
R16: [A1]=2025-02-03 00:00:00 | [B2]=30 | [C3]=31 | [D4]=Updated pricing on the PIV units due to supplier price increase.
R17: [A1]=2025-02-10 00:00:00 | [B2]=31 | [C3]=32 | [D4]=Added more coversheet images
R18: [A1]=2025-06-06 00:00:00 | [B2]=32 | [C3]=33 | [D4]=Project Specifics Overhead description amended on csv upload for change to CF estimate to make it clear that the overheads may contain all or some of the items mentioned.
R19: [A1]=2025-10-02 00:00:00 | [B2]=33 | [C3]=34 | [D4]="Fixed margin value column on csv import for beta estimates.↵Applied filter to costing sheet for the headers."
R20: [A1]=2025-10-25 00:00:00 | [B2]=34 | [C3]=35 | [D4]=Reduced cost of asbesto testing as requested by MD
R21: [A1]=2025-11-07 00:00:00 | [B2]=35 | [C3]=36 | [D4]=Updated costs on PIV loft units.
R22: [A1]=2025-11-13 00:00:00 | [B2]=36 | [C3]=37 | [D4]=Updated master password.
```
