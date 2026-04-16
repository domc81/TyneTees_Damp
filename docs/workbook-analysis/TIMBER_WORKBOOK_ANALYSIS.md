# TIMBER Workbook — Forensic Analysis

**Source:** `Copy of Timber Costing v33 - CF - 131125.xlsm`  
**Extracted:** 2026-02-18 00:38:40  
**Tool:** extract_workbook.py v1.0

---

## SECTION 1: WORKBOOK OVERVIEW

**File:** `Copy of Timber Costing v33 - CF - 131125.xlsm`

**Extracted:** 2026-02-18T00:38:40.989137

**Survey Type:** TIMBER

**Sheet Count:** 14


| # | Sheet Name | Rows | Cols | State |
|---|-----------|------|------|-------|
| 1 | Report | 946 | 35 | visible |
| 2 | Costing | 217 | 47 | visible |
| 3 | Customer Summary | 22 | 8 | visible |
| 4 | Office Notes | 1 | 9 | visible |
| 5 | CAF1 Form | 29 | 11 | visible |
| 6 | Access Email Template | 25 | 11 | visible |
| 7 | Party Wall Letter | 33 | 11 | visible |
| 8 | Sub Contractor Costs | 22 | 8 | visible |
| 9 | Sub Contractor Mats | 53 | 9 | visible |
| 10 | CF CSV Upload | 171 | 20 | visible |
| 11 | Data Lists | 131 | 2 | visible |
| 12 | Filter-Check | 1 | 2 | visible |
| 13 | Cell References | 14 | 6 | visible |
| 14 | Changes | 25 | 4 | visible |

## SECTION 2: REPORT SHEET — Complete Row-by-Row Map

**Total Rows:** 946  |  **Total Cols:** 35

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
R3: [B2]==AI927 | [D4]=Report | [AB28]=Comments for Surveyors | [AD30]=Visibility | [AE31]=Sheet Validation to right | [AF32]=Check if any data is entered | [AG33]=Check if field needs to be completed | [AI35]=Filter Checker
R4: [A1]==IF(AG4=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R5: [A1]==IF(AG5=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R6: [A1]==IF(AG6=1,"X","") | [B2]=1 | [D4]=Client Name And Site Details | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R7: [A1]==IF(AG7=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R8: [A1]==IF(AG8=1,"X","") | [B2]=1 | [D4]==Costing!E7 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D8<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D8="",D8=0)),1,0) | [AI35]=1
R9: [A1]==IF(AG9=1,"X","") | [B2]=1 | [D4]==Costing!E8 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D9<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D9="",D9=0)),1,0) | [AI35]=1
R10: [A1]==IF(AG10=1,"X","") | [B2]=1 | [D4]==Costing!E9 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D10<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D10="",D10=0)),1,0) | [AI35]=1
R11: [A1]==IF(AG11=1,"X","") | [B2]=1 | [D4]==Costing!E10 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D11<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D11="",D11=0)),1,0) | [AI35]=1
R12: [A1]==IF(AG12=1,"X","") | [B2]=1 | [D4]==Costing!E11 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D12<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D12="",D12=0)),1,0) | [AI35]=1
R13: [A1]==IF(AG13=1,"X","") | [B2]=1 | [D4]=Internal Reference ID: | [I9]==Costing!E4 | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(I13<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(I13="",I13=0)),1,0) | [AI35]=1
R14: [A1]==IF(AG14=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R15: [A1]==IF(AG15=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R16: [A1]==IF(AG16=1,"X","") | [B2]=1 | [D4]=Weather Conditions | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R17: [A1]==IF(AG17=1,"X","") | [B2]=1 | [D4]=Date of Inspection: | [K11]=2025-12-09 00:00:00 | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K17<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K17=""),1,0) | [AI35]=1
R18: [A1]==IF(AG18=1,"X","") | [B2]=1 | [D4]=The weather conditions were:  | [K11]=Dry overcast | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K18<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K18=""),1,0) | [AI35]=1
R19: [A1]==IF(AG19=1,"X","") | [B2]=1 | [D4]=The weather temperature was:  | [K11]=14 | [L12]=(°C). | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K19<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K19=""),1,0) | [AI35]=1
R20: [A1]==IF(AG20=1,"X","") | [B2]=1 | [D4]=The Property | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R21: [A1]==IF(AG21=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R22: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R23: [A1]==IF(AG23=1,"X","") | [B2]==IF(OR(D24="Show",Q24="Show"),1,0) | [AD30]=Always show | [AI35]=1
R24: [A1]==IF(AG24=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D24="Show",D24="",Q24="Show",Q24=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D24="",Q24="")),1,0) | [AI35]=1
R25: [A1]==IF(AG25=1,"X","") | [B2]==B23 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R26: [A1]==IF(AG26=1,"X","") | [B2]==B25 | [D4]=Front Elevation | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D24="Show",D24="",Q24="Show",Q24=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D24="Show",D26=""),AND(Q24="Show",Q26=""))),1,0) | [AI35]=1
R27: [A1]==IF(AG27=1,"X","") | [B2]==B26 | [AD30]=Always show | [AI35]=1
R28: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R29: [A1]==IF(AG29=1,"X","") | [B2]=1 | [D4]=The property is a: | [M13]=Mid terrace ground floor flat | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M29<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M29=""),1,0) | [AI35]=1
R30: [A1]==IF(AG30=1,"X","") | [B2]=1 | [D4]=The property is constructed of : | [M13]=Brick slate | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M30<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M30=""),1,0) | [AI35]=1
R31: [A1]==IF(AG31=1,"X","") | [B2]=1 | [D4]=The property was built approximately : | [M13]=1900s | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M31<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M31=""),1,0) | [AI35]=1
R32: [A1]==IF(AG32=1,"X","") | [B2]=1 | [D4]=The Survey/Specific Defects Inspection | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R33: [A1]==IF(AG33=1,"X","") | [B2]=1 | [D4]=In accordance with your instructions, we carried out a survey/specific defects inspection to the above property for the reported problem which was:   | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R34: [A1]==IF(AG34=1,"X","") | [B2]=1 | [D4]==IF(D36<>"",D36,IF([1]Details!$C$13=0,"",[1]Details!$C$13)) | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D34<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D34="",D34=0)),1,0) | [AI35]=1
R35: [A1]==IF(AG35=1,"X","") | [B2]=0 | [D4]=If the reported defect above, which pulls through from the master document, is no longer appropriate you can overwrite it by inputting a new one below otherwise leave it blank.   | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R36: [A1]==IF(AG36=1,"X","") | [B2]=0 | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R37: [A1]==IF(AG37=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R38: [A1]==IF(AG38=1,"X","") | [B2]=1 | [D4]=Our findings and proposals are set out below and should be read in conjunction with the enclosed document 'General Notes for clients and Health and Safety precautions'.  | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R39: [A1]==IF(AG39=1,"X","") | [B2]=1 | [D4]=Orientation | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R40: [A1]==IF(AG40=1,"X","") | [B2]=1 | [D4]=The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building. | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R41: [A1]==IF(AG41=1,"X","") | [B2]=1 | [D4]=The Scope | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R42: [A1]==IF(AG42=1,"X","") | [B2]=1 | [D4]=We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which… | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R43: [A1]==IF(AG43=1,"X","") | [B2]=1 | [D4]=Abbreviations Used In Report | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R44: [A1]==IF(AG44=1,"X","") | [B2]=1 | [D4]=W/W = Water Weight, SOP = Standard Operating Procedures. | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R45: [A1]==IF(AG45=1,"X","") | [B2]=1 | [D4]=External Building Defects | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R46: [A1]==IF(AG46=1,"X","") | [B2]=1 | [D4]=No building defects were noted at the time of our inspection. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B46<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B46=""),1,0) | [AI35]=1
R47: [A1]==IF(AG47=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,1)) | [D4]=We noted the following building defects: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B47<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B47=FALSE,B47="")),1,0) | [AI35]=1
R48: [A1]==IF(AG48=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B48<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B48=FALSE,B48="")),1,0) | [AI35]=1
R49: [A1]==IF(AG49=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective flashings to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B49<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B49=FALSE,B49="")),1,0) | [AI35]=1
R50: [A1]==IF(AG50=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to ridge tiles | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B50<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B50=FALSE,B50="")),1,0) | [AI35]=1
R51: [A1]==IF(AG51=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to verge | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B51<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B51=FALSE,B51="")),1,0) | [AI35]=1
R52: [A1]==IF(AG52=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to hips | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B52<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B52=FALSE,B52="")),1,0) | [AI35]=1
R53: [A1]==IF(AG53=1,"X","") | [B2]=0 | [D4]=• | [E5]=Slipped roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B53<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B53=FALSE,B53="")),1,0) | [AI35]=1
R54: [A1]==IF(AG54=1,"X","") | [B2]=0 | [D4]=• | [E5]=Loose roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B54<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B54=FALSE,B54="")),1,0) | [AI35]=1
R55: [A1]==IF(AG55=1,"X","") | [B2]=0 | [D4]=• | [E5]=Missing roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B55<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B55=FALSE,B55="")),1,0) | [AI35]=1
R56: [A1]==IF(AG56=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B56<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B56=FALSE,B56="")),1,0) | [AI35]=1
R57: [A1]==IF(AG57=1,"X","") | [B2]=0 | [D4]=• | [E5]=Blockage/vegetation to rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B57<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B57=FALSE,B57="")),1,0) | [AI35]=1
R58: [A1]==IF(AG58=1,"X","") | [B2]=0 | [D4]=• | [E5]=Defective pointing to external walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B58<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B58=FALSE,B58="")),1,0) | [AI35]=1
R59: [A1]==IF(AG59=1,"X","") | [B2]=0 | [D4]=• | [E5]=Perished external paintwork | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B59<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B59=FALSE,B59="")),1,0) | [AI35]=1
R60: [A1]==IF(AG60=1,"X","") | [B2]=0 | [D4]=• | [E5]=Wet rot noted to external joinery timbers | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B60<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B60=FALSE,B60="")),1,0) | [AI35]=1
R61: [A1]==IF(AG61=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cracks/movement to walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B61<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B61=FALSE,B61="")),1,0) | [AI35]=1
R62: [A1]==IF(AG62=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cracks/movement to lintels | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B62<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B62=FALSE,B62="")),1,0) | [AI35]=1
R63: [A1]==IF(AG63=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R64: [A1]==IF(AG64=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B64<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B64=FALSE,AND(B64=1,E64=""),AND(B64="",E64=""),AND(B64="",E64<>""),AND(B64=0,E64<>""))),1,0) | [AI35]=1
R65: [A1]==IF(AG65=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B65<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B65=FALSE,AND(B65=1,E65=""),AND(B65="",E65=""),AND(B65="",E65<>""),AND(B65=0,E65<>""))),1,0) | [AI35]=1
R66: [A1]==IF(AG66=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B66<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B66=FALSE,AND(B66=1,E66=""),AND(B66="",E66=""),AND(B66="",E66<>""),AND(B66=0,E66<>""))),1,0) | [AI35]=1
R67: [A1]==IF(AG67=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R68: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R69: [A1]==IF(AG69=1,"X","") | [B2]==IF(OR(D70="Show",Q70="Show"),1,0) | [AD30]=Always show | [AI35]=1
R70: [A1]==IF(AG70=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D70="Show",D70="",Q70="Show",Q70=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D70="",Q70="")),1,0) | [AI35]=1
R71: [A1]==IF(AG71=1,"X","") | [B2]==B69 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R72: [A1]==IF(AG72=1,"X","") | [B2]==B71 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D70="Show",D70="",Q70="Show",Q70=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D70="Show",D72=""),AND(Q70="Show",Q72=""))),1,0) | [AI35]=1
R73: [A1]==IF(AG73=1,"X","") | [B2]==B72 | [AD30]=Always show | [AI35]=1
R74: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R75: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R76: [A1]==IF(AG76=1,"X","") | [B2]==IF(OR(D77="Show",Q77="Show"),1,0) | [AD30]=Always show | [AI35]=1
R77: [A1]==IF(AG77=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D77="Show",D77="",Q77="Show",Q77=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D77="",Q77="")),1,0) | [AI35]=1
R78: [A1]==IF(AG78=1,"X","") | [B2]==B76 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R79: [A1]==IF(AG79=1,"X","") | [B2]==B78 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D77="Show",D77="",Q77="Show",Q77=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D77="Show",D79=""),AND(Q77="Show",Q79=""))),1,0) | [AI35]=1
R80: [A1]==IF(AG80=1,"X","") | [B2]==B79 | [AD30]=Always show | [AI35]=1
R81: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R82: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R83: [A1]==IF(AG83=1,"X","") | [B2]==IF(OR(D84="Show",Q84="Show"),1,0) | [AD30]=Always show | [AI35]=1
R84: [A1]==IF(AG84=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D84="Show",D84="",Q84="Show",Q84=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D84="",Q84="")),1,0) | [AI35]=1
R85: [A1]==IF(AG85=1,"X","") | [B2]==B83 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R86: [A1]==IF(AG86=1,"X","") | [B2]==B85 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D84="Show",D84="",Q84="Show",Q84=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D84="Show",D86=""),AND(Q84="Show",Q86=""))),1,0) | [AI35]=1
R87: [A1]==IF(AG87=1,"X","") | [B2]==B86 | [AD30]=Always show | [AI35]=1
R88: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R89: [A1]==IF(AG89=1,"X","") | [B2]=0 | [D4]=The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, Failure to corre… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B89<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B89=""),1,0) | [AI35]=1
R90: [A1]==IF(AG90=1,"X","") | [B2]=0 | [D4]=You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repai… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B90<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B90=""),1,0) | [AI35]=1
R91: [A1]==IF(AG91=1,"X","") | [B2]=0 | [D4]=External Ground Levels | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B91<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B91=""),1,0) | [AI35]=1
R92: [A1]==IF(AG92=1,"X","") | [B2]=0 | [D4]=There were no apparent ground level issues. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B92<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B92=""),1,0) | [AI35]=1
R93: [A1]==IF(AG93=1,"X","") | [B2]=0 | [D4]=We noted high ground levels to the following areas: | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B93<>"",P93<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B93=1,P93=""),AND(B93="",P93=""),AND(B93="",P93<>""),AND(B93=0,P93<>""))),1,0) | [AI35]=1
R94: [A1]==IF(AG94=1,"X","") | [B2]=0 | [D4]=External ground was falling towards building at: | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B94<>"",O94<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B94=1,O94=""),AND(B94="",O94=""),AND(B94="",O94<>""),AND(B94=0,O94<>""))),1,0) | [AI35]=1
R95: [A1]==IF(AG95=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R96: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R97: [A1]==IF(AG97=1,"X","") | [B2]==IF(OR(D98="Show",Q98="Show"),1,0) | [AD30]=Always show | [AI35]=1
R98: [A1]==IF(AG98=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D98="Show",D98="",Q98="Show",Q98=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D98="",Q98="")),1,0) | [AI35]=1
R99: [A1]==IF(AG99=1,"X","") | [B2]==B97 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R100: [A1]==IF(AG100=1,"X","") | [B2]==B99 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D98="Show",D98="",Q98="Show",Q98=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D98="Show",D100=""),AND(Q98="Show",Q100=""))),1,0) | [AI35]=1
R101: [A1]==IF(AG101=1,"X","") | [B2]==B100 | [AD30]=Always show | [AI35]=1
R102: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R103: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R104: [A1]==IF(AG104=1,"X","") | [B2]==IF(OR(D105="Show",Q105="Show"),1,0) | [AD30]=Always show | [AI35]=1
R105: [A1]==IF(AG105=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D105="Show",D105="",Q105="Show",Q105=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D105="",Q105="")),1,0) | [AI35]=1
R106: [A1]==IF(AG106=1,"X","") | [B2]==B104 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R107: [A1]==IF(AG107=1,"X","") | [B2]==B106 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D105="Show",D105="",Q105="Show",Q105=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D105="Show",D107=""),AND(Q105="Show",Q107=""))),1,0) | [AI35]=1
R108: [A1]==IF(AG108=1,"X","") | [B2]==B107 | [AD30]=Always show | [AI35]=1
R109: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R110: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R111: [A1]==IF(AG111=1,"X","") | [B2]==IF(OR(D112="Show",Q112="Show"),1,0) | [AD30]=Always show | [AI35]=1
R112: [A1]==IF(AG112=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D112="Show",D112="",Q112="Show",Q112=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D112="",Q112="")),1,0) | [AI35]=1
R113: [A1]==IF(AG113=1,"X","") | [B2]==B111 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R114: [A1]==IF(AG114=1,"X","") | [B2]==B113 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D112="Show",D112="",Q112="Show",Q112=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D112="Show",D114=""),AND(Q112="Show",Q114=""))),1,0) | [AI35]=1
R115: [A1]==IF(AG115=1,"X","") | [B2]==B114 | [AD30]=Always show | [AI35]=1
R116: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R117: [A1]==IF(AG117=1,"X","") | [B2]=0 | [D4]=Recommendation | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B117<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B117=""),1,0) | [AI35]=1
R118: [A1]==IF(AG118=1,"X","") | [B2]=0 | [D4]=All ground levels to be maintained at a minimum of 150mm below DPC level, paths, drives, yards etc should not cause rainwater etc to run against your property walls. You should  arrange work to correc… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B118<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B118=""),1,0) | [AI35]=1
R119: [A1]==IF(AG119=1,"X","") | [B2]=0 | [D4]=The rear yard would benefit from the installation of an aco drain channel to carry water to the drain. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B119<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B119=""),1,0) | [AI35]=1
R120: [A1]==IF(AG120=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R121: [A1]==IF(AG121=1,"X","") | [B2]=1 | [D4]=Sub Floor Ventilation | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B121<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B121=""),1,0) | [AI35]=1
R122: [A1]==IF(AG122=1,"X","") | [B2]=0 | [D4]=There were no airbricks installed. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B122<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B122=""),1,0) | [AI35]=1
R123: [A1]==IF(AG123=1,"X","") | [B2]=0 | [D4]=It was not possible to inspect the airbricks due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B123<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B123=""),1,0) | [AI35]=1
R124: [A1]==IF(AG124=1,"X","") | [B2]=0 | [D4]=• | [E5]=State below - ensure that images are taken of the obstructions to be added to the report. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R125: [A1]==IF(AG125=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B125<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B125=1,E125=""),AND(B125="",E125=""),AND(B125="",E125<>""),AND(B125=0,E125<>""))),1,0) | [AI35]=1
R126: [A1]==IF(AG126=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B126<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B126=1,E126=""),AND(B126="",E126=""),AND(B126="",E126<>""),AND(B126=0,E126<>""))),1,0) | [AI35]=1
R127: [A1]==IF(AG127=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B127<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B127=1,E127=""),AND(B127="",E127=""),AND(B127="",E127<>""),AND(B127=0,E127<>""))),1,0) | [AI35]=1
R128: [A1]==IF(AG128=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R129: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R130: [A1]==IF(AG130=1,"X","") | [B2]==IF(OR(D131="Show",Q131="Show"),1,0) | [AD30]=Always show | [AI35]=1
R131: [A1]==IF(AG131=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D131="Show",D131="",Q131="Show",Q131=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D131="",Q131="")),1,0) | [AI35]=1
R132: [A1]==IF(AG132=1,"X","") | [B2]==B130 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R133: [A1]==IF(AG133=1,"X","") | [B2]==B132 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D131="Show",D131="",Q131="Show",Q131=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D131="Show",D133=""),AND(Q131="Show",Q133=""))),1,0) | [AI35]=1
R134: [A1]==IF(AG134=1,"X","") | [B2]==B133 | [AD30]=Always show | [AI35]=1
R135: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R136: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R137: [A1]==IF(AG137=1,"X","") | [B2]==IF(OR(D138="Show",Q138="Show"),1,0) | [AD30]=Always show | [AI35]=1
R138: [A1]==IF(AG138=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D138="Show",D138="",Q138="Show",Q138=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D138="",Q138="")),1,0) | [AI35]=1
R139: [A1]==IF(AG139=1,"X","") | [B2]==B137 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R140: [A1]==IF(AG140=1,"X","") | [B2]==B139 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D138="Show",D138="",Q138="Show",Q138=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D138="Show",D140=""),AND(Q138="Show",Q140=""))),1,0) | [AI35]=1
R141: [A1]==IF(AG141=1,"X","") | [B2]==B140 | [AD30]=Always show | [AI35]=1
R142: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R143: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R144: [A1]==IF(AG144=1,"X","") | [B2]==IF(OR(D145="Show",Q145="Show"),1,0) | [AD30]=Always show | [AI35]=1
R145: [A1]==IF(AG145=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D145="Show",D145="",Q145="Show",Q145=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D145="",Q145="")),1,0) | [AI35]=1
R146: [A1]==IF(AG146=1,"X","") | [B2]==B144 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R147: [A1]==IF(AG147=1,"X","") | [B2]==B146 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D145="Show",D145="",Q145="Show",Q145=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D145="Show",D147=""),AND(Q145="Show",Q147=""))),1,0) | [AI35]=1
R148: [A1]==IF(AG148=1,"X","") | [B2]==B147 | [AD30]=Always show | [AI35]=1
R149: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R150: [A1]==IF(AG150=1,"X","") | [B2]=1 | [D4]=The sub floor voids were ventilated by the following 'visible' number of airbricks: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B150<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B150=""),1,0) | [AI35]=1
R151: [A1]==IF(AG151=1,"X","") | [B2]=1 | [D4]=• | [E5]=2 | [G7]=To the front elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B151<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B151=1,E151=""),AND(B151="",E151=""),AND(B151="",E151<>""),AND(B151=0,E151<>0))),1,0) | [AI35]=1
R152: [A1]==IF(AG152=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the left elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B152<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B152=1,E152=""),AND(B152="",E152=""),AND(B152="",E152<>""),AND(B152=0,E152<>0))),1,0) | [AI35]=1
R153: [A1]==IF(AG153=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the right elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B153<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B153=1,E153=""),AND(B153="",E153=""),AND(B153="",E153<>""),AND(B153=0,E153<>0))),1,0) | [AI35]=1
R154: [A1]==IF(AG154=1,"X","") | [B2]=1 | [D4]=• | [E5]=2 | [G7]=To the rear elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B154<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B154=1,E154=""),AND(B154="",E154=""),AND(B154="",E154<>""),AND(B154=0,E154<>0))),1,0) | [AI35]=1
R155: [A1]==IF(AG155=1,"X","") | [B2]=0 | [D4]=• | [G7]=To the rear offshoot | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B155<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B155=1,E155=""),AND(B155="",E155=""),AND(B155="",E155<>""),AND(B155=0,E155<>0))),1,0) | [AI35]=1
R156: [A1]==IF(AG156=1,"X","") | [B2]=0 | [D4]=Proposal (Airbricks) | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B156<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B156=""),1,0)
R157: [A1]==IF(AG157=1,"X","") | [B2]=1 | [D4]=Remove | [G7]=4 | [H8]=number air bricks, check airflow, adjust as necessary, clean debris & reinstall. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B157<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B157=1,G157=""),AND(B157="",G157=""),AND(B157="",G157<>""),AND(B157=0,G157<>""))),1,0)
R158: [A1]==IF(AG158=1,"X","") | [B2]=1 | [D4]=Install | [F6]=2 | [G7]=x | [H8]=225 x 150 additional airbricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B158<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B158=1,F158=""),AND(B158="",F158=""),AND(B158="",F158<>""),AND(B158=0,F158<>""))),1,0)
R159: [A1]==IF(AG159=1,"X","") | [B2]=1 | [D4]=This will increase the airflow through the floor voids, reduce the humidity and the moisture content of linked timbers, which will greatly reduce the chances of attack by wood rotting fungi such as dr… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B159<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B159=""),1,0)
R160: [A1]==IF(AG160=1,"X","") | [B2]=0 | [D4]=Lift | [F6]=of the existing air bricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B160<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B160=1,E160=""),AND(B160="",E160=""),AND(B160="",E160<>""),AND(B160=0,E160<>""))),1,0)
R161: [A1]==IF(AG161=1,"X","") | [B2]=0 | [D4]=Lifting the airbricks will help to prevent water ponding and snow melting, causing water to run into the sub floor void, elevating the moisture levels of the timbers within. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B161<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B161=""),1,0)
R162: [A1]==IF(AG162=1,"X","") | [B2]=0 | [D4]=No further works required. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B162<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B162=""),1,0)
R163: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R164: [A1]==IF(AG164=1,"X","") | [B2]==IF(OR(D165="Show",Q165="Show"),1,0) | [AD30]=Always show | [AI35]=1
R165: [A1]==IF(AG165=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D165="Show",D165="",Q165="Show",Q165=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D165="",Q165="")),1,0) | [AI35]=1
R166: [A1]==IF(AG166=1,"X","") | [B2]==B164 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R167: [A1]==IF(AG167=1,"X","") | [B2]==B166 | [D4]=Remove airbricks clean re-adjust and install additional airbricks | [Q17]=Remove airbricks clean re-adjust and install additional airbricks  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D165="Show",D165="",Q165="Show",Q165=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D165="Show",D167=""),AND(Q165="Show",Q167=""))),1,0) | [AI35]=1
R168: [A1]==IF(AG168=1,"X","") | [B2]==B167 | [AD30]=Always show | [AI35]=1
R169: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R170: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N171," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R171: [A1]==IF(AG171=1,"X","") | [B2]=1 | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]=1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R172: [A1]==IF(AG172=1,"X","") | [B2]=1 | [D4]=Room (current use): | [I9]=Rear room  | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B172<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B172=1,I172=""),AND(B172="",I172=""),AND(B172="",I172<>""),AND(B172=0,I172<>""))),1,0) | [AI35]=1
R173: [A1]==IF(AG173=1,"X","") | [B2]=1 | [D4]=Room designation: | [I9]=Living room | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B173<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B173=1,I173=""),AND(B173="",I173=""),AND(B173="",I173<>""),AND(B173=0,I173<>""))),1,0) | [AI35]=1
R174: [A1]==IF(AG174=1,"X","") | [B2]=1 | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R175: [A1]==IF(AG175=1,"X","") | [B2]=1 | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B175<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B175=""),1,0) | [AI35]=1
R176: [A1]==IF(AG176=1,"X","") | [B2]=0 | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B176<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B176=""),1,0) | [AI35]=1
R177: [A1]==IF(AG177=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B177<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B177=""),1,0) | [AI35]=1
R178: [A1]==IF(AG178=1,"X","") | [B2]=0 | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B178<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B178=""),1,0) | [AI35]=1
R179: [A1]==IF(AG179=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R180: [A1]==IF(AG180=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B180<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B180=1,E180=""),AND(B180="",E180=""),AND(B180="",E180<>""),AND(B180=0,E180<>""))),1,0) | [AI35]=1
R181: [A1]==IF(AG181=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B181<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B181=1,E181=""),AND(B181="",E181=""),AND(B181="",E181<>""),AND(B181=0,E181<>""))),1,0) | [AI35]=1
R182: [A1]==IF(AG182=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B182<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B182=1,E182=""),AND(B182="",E182=""),AND(B182="",E182<>""),AND(B182=0,E182<>""))),1,0) | [AI35]=1
R183: [A1]==IF(AG183=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R184: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R185: [A1]==IF(AG185=1,"X","") | [B2]==IF(OR(D186="Show",Q186="Show"),1,0) | [AD30]=Always show | [AI35]=1
R186: [A1]==IF(AG186=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D186="Show",D186="",Q186="Show",Q186=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D186="",Q186="")),1,0) | [AI35]=1
R187: [A1]==IF(AG187=1,"X","") | [B2]==B185 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R188: [A1]==IF(AG188=1,"X","") | [B2]==B187 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D186="Show",D186="",Q186="Show",Q186=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D186="Show",D188=""),AND(Q186="Show",Q188=""))),1,0) | [AI35]=1
R189: [A1]==IF(AG189=1,"X","") | [B2]==B188 | [AD30]=Always show | [AI35]=1
R190: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R191: [A1]==IF(AG191=1,"X","") | [B2]=1 | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R192: [A1]==IF(AG192=1,"X","") | [B2]=1 | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B192<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B192=""),1,0) | [AI35]=1
R193: [A1]==IF(AG193=1,"X","") | [B2]=0 | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B193<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B193=""),1,0) | [AI35]=1
R194: [A1]==IF(AG194=1,"X","") | [B2]=0 | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B194<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B194=""),1,0) | [AI35]=1
R195: [A1]==IF(AG195=1,"X","") | [B2]=0 | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B195<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B195=""),1,0) | [AI35]=1
R196: [A1]==IF(AG196=1,"X","") | [B2]=0 | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B196<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B196=""),1,0) | [AI35]=1
R197: [A1]==IF(AG197=1,"X","") | [B2]=0 | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B197<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B197=""),1,0) | [AI35]=1
R198: [A1]==IF(AG198=1,"X","") | [B2]=0 | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B198<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B198=""),1,0) | [AI35]=1
R199: [A1]==IF(AG199=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R200: [A1]==IF(AG200=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B200<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B200=1,E200=""),AND(B200="",E200=""),AND(B200="",E200<>""),AND(B200=0,E200<>""))),1,0) | [AI35]=1
R201: [A1]==IF(AG201=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B201<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B201=1,E201=""),AND(B201="",E201=""),AND(B201="",E201<>""),AND(B201=0,E201<>""))),1,0) | [AI35]=1
R202: [A1]==IF(AG202=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B202<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B202=1,E202=""),AND(B202="",E202=""),AND(B202="",E202<>""),AND(B202=0,E202<>""))),1,0) | [AI35]=1
R203: [A1]==IF(AG203=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R204: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R205: [A1]==IF(AG205=1,"X","") | [B2]==IF(OR(D206="Show",Q206="Show"),1,0) | [AD30]=Always show | [AI35]=1
R206: [A1]==IF(AG206=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D206="Show",D206="",Q206="Show",Q206=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D206="",Q206="")),1,0) | [AI35]=1
R207: [A1]==IF(AG207=1,"X","") | [B2]==B205 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R208: [A1]==IF(AG208=1,"X","") | [B2]==B207 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D206="Show",D206="",Q206="Show",Q206=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D206="Show",D208=""),AND(Q206="Show",Q208=""))),1,0) | [AI35]=1
R209: [A1]==IF(AG209=1,"X","") | [B2]==B208 | [AD30]=Always show | [AI35]=1
R210: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R211: [A1]==IF(AG211=1,"X","") | [B2]=1 | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R212: [A1]==IF(AG212=1,"X","") | [B2]=1 | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B212<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B212=""),1,0) | [AI35]=1
R213: [A1]==IF(AG213=1,"X","") | [B2]=0 | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B213<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B213=""),1,0) | [AI35]=1
R214: [A1]==IF(AG214=1,"X","") | [B2]=0 | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B214<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B214=""),1,0) | [AI35]=1
R215: [A1]==IF(AG215=1,"X","") | [B2]=1 | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B215<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B215=""),1,0) | [AI35]=1
R216: [A1]==IF(AG216=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R217: [A1]==IF(AG217=1,"X","") | [B2]=1 | [D4]=• | [E5]=Woodboring insects  | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B217<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B217=1,E217=""),AND(B217="",E217=""),AND(B217="",E217<>""),AND(B217=0,E217<>""))),1,0) | [AI35]=1
R218: [A1]==IF(AG218=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B218<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B218=1,E218=""),AND(B218="",E218=""),AND(B218="",E218<>""),AND(B218=0,E218<>""))),1,0) | [AI35]=1
R219: [A1]==IF(AG219=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B219<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B219=1,E219=""),AND(B219="",E219=""),AND(B219="",E219<>""),AND(B219=0,E219<>""))),1,0) | [AI35]=1
R220: [A1]==IF(AG220=1,"X","") | [B2]=1 | [D4]=Moisture reading taken from the timbers was recorded as:  | [R18]=21 | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B220<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B220=1,R220=""),AND(B220="",R220=""),AND(B220="",R220<>""),AND(B220=0,R220<>""))),1,0) | [AI35]=1
R221: [A1]==IF(AG221=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R222: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R223: [A1]==IF(AG223=1,"X","") | [B2]==IF(OR(D224="Show",Q224="Show"),1,0) | [AD30]=Always show | [AI35]=1
R224: [A1]==IF(AG224=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D224="Show",D224="",Q224="Show",Q224=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D224="",Q224="")),1,0) | [AI35]=1
R225: [A1]==IF(AG225=1,"X","") | [B2]==B223 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R226: [A1]==IF(AG226=1,"X","") | [B2]==B225 | [D4]=High moisture | [Q17]=Rot and woodboring insects | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D224="Show",D224="",Q224="Show",Q224=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D224="Show",D226=""),AND(Q224="Show",Q226=""))),1,0) | [AI35]=1
R227: [A1]==IF(AG227=1,"X","") | [B2]==B226 | [AD30]=Always show | [AI35]=1
R228: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R229: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R230: [A1]==IF(AG230=1,"X","") | [B2]==IF(OR(D231="Show",Q231="Show"),1,0) | [AD30]=Always show | [AI35]=1
R231: [A1]==IF(AG231=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D231="Show",D231="",Q231="Show",Q231=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D231="",Q231="")),1,0) | [AI35]=1
R232: [A1]==IF(AG232=1,"X","") | [B2]==B230 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R233: [A1]==IF(AG233=1,"X","") | [B2]==B232 | [D4]=New floor to living room  | [Q17]=New floor to living room  | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D231="Show",D231="",Q231="Show",Q231=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D231="Show",D233=""),AND(Q231="Show",Q233=""))),1,0) | [AI35]=1
R234: [A1]==IF(AG234=1,"X","") | [B2]==B233 | [AD30]=Always show | [AI35]=1
R235: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R236: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R237: [A1]==IF(AG237=1,"X","") | [B2]==IF(OR(D238="Show",Q238="Show"),1,0) | [AD30]=Always show | [AI35]=1
R238: [A1]==IF(AG238=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D238="Show",D238="",Q238="Show",Q238=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D238="",Q238="")),1,0) | [AI35]=1
R239: [A1]==IF(AG239=1,"X","") | [B2]==B237 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R240: [A1]==IF(AG240=1,"X","") | [B2]==B239 | [D4]=Apply liquid membrane to concrete hearth | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D238="Show",D238="",Q238="Show",Q238=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D238="Show",D240=""),AND(Q238="Show",Q240=""))),1,0) | [AI35]=1
R241: [A1]==IF(AG241=1,"X","") | [B2]==B240 | [AD30]=Always show | [AI35]=1
R242: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R243: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N171," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R244: [A1]==IF(OR(SUM(AG245:AG304),Y244=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N246," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R245: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N246," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R246: [A1]==IF(AG246=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N171+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R247: [A1]==IF(AG247=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B247<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B247=1,Y244="No"),AND(B247=1,I247="",Y244="Yes"),AND(B247="",I247="",Y244="Yes"),AND(B247="",I247<>"",Y244="Yes"),AND(B247=0,I247<>"",Y244="Yes"))),1,0) | [AI35]=1
R248: [A1]==IF(AG248=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B248<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B248=1,Y244="No"),AND(B248=1,I248="",Y244="Yes"),AND(B248="",I248="",Y244="Yes"),AND(B248="",I248<>"",Y244="Yes"),AND(B248=0,I248<>"",Y244="Yes"))),1,0) | [AI35]=1
R249: [A1]==IF(AG249=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R250: [A1]==IF(AG250=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B250<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B250="",Y244="Yes"),AND(B250=1,Y244="No"))),1,0) | [AI35]=1
R251: [A1]==IF(AG251=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B251<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B251="",Y244="Yes"),AND(B251=1,Y244="No"))),1,0) | [AI35]=1
R252: [A1]==IF(AG252=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B252<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B252="",Y244="Yes"),AND(B252=1,Y244="No"))),1,0) | [AI35]=1
R253: [A1]==IF(AG253=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B253<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B253="",Y244="Yes"),AND(B253=1,Y244="No"))),1,0) | [AI35]=1
R254: [A1]==IF(AG254=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R255: [A1]==IF(AG255=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B255<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B255=1,Y244="No"),AND(B255=1,E255="",Y244="Yes"),AND(B255="",E255="",Y244="Yes"),AND(B255="",E255<>"",Y244="Yes"),AND(B255=0,E255<>"",Y244="Yes"))),1,0) | [AI35]=1
R256: [A1]==IF(AG256=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B256<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B256=1,Y244="No"),AND(B256=1,E256="",Y244="Yes"),AND(B256="",E256="",Y244="Yes"),AND(B256="",E256<>"",Y244="Yes"),AND(B256=0,E256<>"",Y244="Yes"))),1,0) | [AI35]=1
R257: [A1]==IF(AG257=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B257<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B257=1,Y244="No"),AND(B257=1,E257="",Y244="Yes"),AND(B257="",E257="",Y244="Yes"),AND(B257="",E257<>"",Y244="Yes"),AND(B257=0,E257<>"",Y244="Yes"))),1,0) | [AI35]=1
R258: [A1]==IF(AG258=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R259: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R260: [A1]==IF(AG260=1,"X","") | [B2]==IF(OR(D261="Show",Q261="Show"),1,0) | [AD30]=Always show | [AI35]=1
R261: [A1]==IF(AG261=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D261="Show",D261="",Q261="Show",Q261=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D261="",Q261="")),1,0) | [AI35]=1
R262: [A1]==IF(AG262=1,"X","") | [B2]==B260 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R263: [A1]==IF(AG263=1,"X","") | [B2]==B262 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D261="Show",D261="",Q261="Show",Q261=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D261="Show",D263=""),AND(Q261="Show",Q263=""))),1,0) | [AI35]=1
R264: [A1]==IF(AG264=1,"X","") | [B2]==B263 | [AD30]=Always show | [AI35]=1
R265: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R266: [A1]==IF(AG266=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R267: [A1]==IF(AG267=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B267<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B267="",Y244="Yes"),AND(B267=1,Y244="No"))),1,0) | [AI35]=1
R268: [A1]==IF(AG268=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B268<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B268="",Y244="Yes"),AND(B268=1,Y244="No"))),1,0) | [AI35]=1
R269: [A1]==IF(AG269=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B269<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B269="",Y244="Yes"),AND(B269=1,Y244="No"))),1,0) | [AI35]=1
R270: [A1]==IF(AG270=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B270<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B270="",Y244="Yes"),AND(B270=1,Y244="No"))),1,0) | [AI35]=1
R271: [A1]==IF(AG271=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B271<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B271="",Y244="Yes"),AND(B271=1,Y244="No"))),1,0) | [AI35]=1
R272: [A1]==IF(AG272=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B272<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B272="",Y244="Yes"),AND(B272=1,Y244="No"))),1,0) | [AI35]=1
R273: [A1]==IF(AG273=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B273<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B273="",Y244="Yes"),AND(B273=1,Y244="No"))),1,0) | [AI35]=1
R274: [A1]==IF(AG274=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R275: [A1]==IF(AG275=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B275<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B275=1,Y244="No"),AND(B275=1,E275="",Y244="Yes"),AND(B275="",E275="",Y244="Yes"),AND(B275="",E275<>"",Y244="Yes"),AND(B275=0,E275<>"",Y244="Yes"))),1,0) | [AI35]=1
R276: [A1]==IF(AG276=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B276<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B276=1,Y244="No"),AND(B276=1,E276="",Y244="Yes"),AND(B276="",E276="",Y244="Yes"),AND(B276="",E276<>"",Y244="Yes"),AND(B276=0,E276<>"",Y244="Yes"))),1,0) | [AI35]=1
R277: [A1]==IF(AG277=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B277<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B277=1,Y244="No"),AND(B277=1,E277="",Y244="Yes"),AND(B277="",E277="",Y244="Yes"),AND(B277="",E277<>"",Y244="Yes"),AND(B277=0,E277<>"",Y244="Yes"))),1,0) | [AI35]=1
R278: [A1]==IF(AG278=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R279: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R280: [A1]==IF(AG280=1,"X","") | [B2]==IF(OR(D281="Show",Q281="Show"),1,0) | [AD30]=Always show | [AI35]=1
R281: [A1]==IF(AG281=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D281="Show",D281="",Q281="Show",Q281=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D281="",Q281="")),1,0) | [AI35]=1
R282: [A1]==IF(AG282=1,"X","") | [B2]==B280 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R283: [A1]==IF(AG283=1,"X","") | [B2]==B282 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D281="Show",D281="",Q281="Show",Q281=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D281="Show",D283=""),AND(Q281="Show",Q283=""))),1,0) | [AI35]=1
R284: [A1]==IF(AG284=1,"X","") | [B2]==B283 | [AD30]=Always show | [AI35]=1
R285: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R286: [A1]==IF(AG286=1,"X","") | [B2]==IF(Y$244="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R287: [A1]==IF(AG287=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B287<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B287="",Y244="Yes"),AND(B287=1,Y244="No"))),1,0) | [AI35]=1
R288: [A1]==IF(AG288=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B288<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B288="",Y244="Yes"),AND(B288=1,Y244="No"))),1,0) | [AI35]=1
R289: [A1]==IF(AG289=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B289<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B289="",Y244="Yes"),AND(B289=1,Y244="No"))),1,0) | [AI35]=1
R290: [A1]==IF(AG290=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B290<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B290="",Y244="Yes"),AND(B290=1,Y244="No"))),1,0) | [AI35]=1
R291: [A1]==IF(AG291=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R292: [A1]==IF(AG292=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B292<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B292=1,Y244="No"),AND(B292=1,E292="",Y244="Yes"),AND(B292="",E292="",Y244="Yes"),AND(B292="",E292<>"",Y244="Yes"),AND(B292=0,E292<>"",Y244="Yes"))),1,0) | [AI35]=1
R293: [A1]==IF(AG293=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B293<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B293=1,Y244="No"),AND(B293=1,E293="",Y244="Yes"),AND(B293="",E293="",Y244="Yes"),AND(B293="",E293<>"",Y244="Yes"),AND(B293=0,E293<>"",Y244="Yes"))),1,0) | [AI35]=1
R294: [A1]==IF(AG294=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B294<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B294=1,Y244="No"),AND(B294=1,E294="",Y244="Yes"),AND(B294="",E294="",Y244="Yes"),AND(B294="",E294<>"",Y244="Yes"),AND(B294=0,E294<>"",Y244="Yes"))),1,0) | [AI35]=1
R295: [A1]==IF(AG295=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B295<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B295=1,Y244="No"),AND(B295=1,R295="",Y244="Yes"),AND(B295="",R295="",Y244="Yes"),AND(B295="",R295<>"",Y244="Yes"),AND(B295=0,R295<>"",Y244="Yes"))),1,0) | [AI35]=1
R296: [A1]==IF(AG296=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R297: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R298: [A1]==IF(AG298=1,"X","") | [B2]==IF(OR(D299="Show",Q299="Show"),1,0) | [AD30]=Always show | [AI35]=1
R299: [A1]==IF(AG299=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D299="Show",D299="",Q299="Show",Q299=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D299="",Q299="")),1,0) | [AI35]=1
R300: [A1]==IF(AG300=1,"X","") | [B2]==B298 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R301: [A1]==IF(AG301=1,"X","") | [B2]==B300 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D299="Show",D299="",Q299="Show",Q299=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D299="Show",D301=""),AND(Q299="Show",Q301=""))),1,0) | [AI35]=1
R302: [A1]==IF(AG302=1,"X","") | [B2]==B301 | [AD30]=Always show | [AI35]=1
R303: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R304: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N246," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R305: [A1]==IF(OR(SUM(AG306:AG365),Y305=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N307," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R306: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N307," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R307: [A1]==IF(AG307=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N246+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R308: [A1]==IF(AG308=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B308<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B308=1,Y305="No"),AND(B308=1,I308="",Y305="Yes"),AND(B308="",I308="",Y305="Yes"),AND(B308="",I308<>"",Y305="Yes"),AND(B308=0,I308<>"",Y305="Yes"))),1,0) | [AI35]=1
R309: [A1]==IF(AG309=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B309<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B309=1,Y305="No"),AND(B309=1,I309="",Y305="Yes"),AND(B309="",I309="",Y305="Yes"),AND(B309="",I309<>"",Y305="Yes"),AND(B309=0,I309<>"",Y305="Yes"))),1,0) | [AI35]=1
R310: [A1]==IF(AG310=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R311: [A1]==IF(AG311=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B311<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B311="",Y305="Yes"),AND(B311=1,Y305="No"))),1,0) | [AI35]=1
R312: [A1]==IF(AG312=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B312<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B312="",Y305="Yes"),AND(B312=1,Y305="No"))),1,0) | [AI35]=1
R313: [A1]==IF(AG313=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B313<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B313="",Y305="Yes"),AND(B313=1,Y305="No"))),1,0) | [AI35]=1
R314: [A1]==IF(AG314=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B314<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B314="",Y305="Yes"),AND(B314=1,Y305="No"))),1,0) | [AI35]=1
R315: [A1]==IF(AG315=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R316: [A1]==IF(AG316=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B316<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B316=1,Y305="No"),AND(B316=1,E316="",Y305="Yes"),AND(B316="",E316="",Y305="Yes"),AND(B316="",E316<>"",Y305="Yes"),AND(B316=0,E316<>"",Y305="Yes"))),1,0) | [AI35]=1
R317: [A1]==IF(AG317=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B317<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B317=1,Y305="No"),AND(B317=1,E317="",Y305="Yes"),AND(B317="",E317="",Y305="Yes"),AND(B317="",E317<>"",Y305="Yes"),AND(B317=0,E317<>"",Y305="Yes"))),1,0) | [AI35]=1
R318: [A1]==IF(AG318=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B318<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B318=1,Y305="No"),AND(B318=1,E318="",Y305="Yes"),AND(B318="",E318="",Y305="Yes"),AND(B318="",E318<>"",Y305="Yes"),AND(B318=0,E318<>"",Y305="Yes"))),1,0) | [AI35]=1
R319: [A1]==IF(AG319=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R320: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R321: [A1]==IF(AG321=1,"X","") | [B2]==IF(OR(D322="Show",Q322="Show"),1,0) | [AD30]=Always show | [AI35]=1
R322: [A1]==IF(AG322=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D322="Show",D322="",Q322="Show",Q322=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D322="",Q322="")),1,0) | [AI35]=1
R323: [A1]==IF(AG323=1,"X","") | [B2]==B321 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R324: [A1]==IF(AG324=1,"X","") | [B2]==B323 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D322="Show",D322="",Q322="Show",Q322=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D322="Show",D324=""),AND(Q322="Show",Q324=""))),1,0) | [AI35]=1
R325: [A1]==IF(AG325=1,"X","") | [B2]==B324 | [AD30]=Always show | [AI35]=1
R326: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R327: [A1]==IF(AG327=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R328: [A1]==IF(AG328=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B328<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B328="",Y305="Yes"),AND(B328=1,Y305="No"))),1,0) | [AI35]=1
R329: [A1]==IF(AG329=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B329<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B329="",Y305="Yes"),AND(B329=1,Y305="No"))),1,0) | [AI35]=1
R330: [A1]==IF(AG330=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B330<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B330="",Y305="Yes"),AND(B330=1,Y305="No"))),1,0) | [AI35]=1
R331: [A1]==IF(AG331=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B331<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B331="",Y305="Yes"),AND(B331=1,Y305="No"))),1,0) | [AI35]=1
R332: [A1]==IF(AG332=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B332<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B332="",Y305="Yes"),AND(B332=1,Y305="No"))),1,0) | [AI35]=1
R333: [A1]==IF(AG333=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B333<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B333="",Y305="Yes"),AND(B333=1,Y305="No"))),1,0) | [AI35]=1
R334: [A1]==IF(AG334=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B334<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B334="",Y305="Yes"),AND(B334=1,Y305="No"))),1,0) | [AI35]=1
R335: [A1]==IF(AG335=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R336: [A1]==IF(AG336=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B336<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B336=1,Y305="No"),AND(B336=1,E336="",Y305="Yes"),AND(B336="",E336="",Y305="Yes"),AND(B336="",E336<>"",Y305="Yes"),AND(B336=0,E336<>"",Y305="Yes"))),1,0) | [AI35]=1
R337: [A1]==IF(AG337=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B337<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B337=1,Y305="No"),AND(B337=1,E337="",Y305="Yes"),AND(B337="",E337="",Y305="Yes"),AND(B337="",E337<>"",Y305="Yes"),AND(B337=0,E337<>"",Y305="Yes"))),1,0) | [AI35]=1
R338: [A1]==IF(AG338=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B338<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B338=1,Y305="No"),AND(B338=1,E338="",Y305="Yes"),AND(B338="",E338="",Y305="Yes"),AND(B338="",E338<>"",Y305="Yes"),AND(B338=0,E338<>"",Y305="Yes"))),1,0) | [AI35]=1
R339: [A1]==IF(AG339=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R340: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R341: [A1]==IF(AG341=1,"X","") | [B2]==IF(OR(D342="Show",Q342="Show"),1,0) | [AD30]=Always show | [AI35]=1
R342: [A1]==IF(AG342=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D342="Show",D342="",Q342="Show",Q342=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D342="",Q342="")),1,0) | [AI35]=1
R343: [A1]==IF(AG343=1,"X","") | [B2]==B341 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R344: [A1]==IF(AG344=1,"X","") | [B2]==B343 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D342="Show",D342="",Q342="Show",Q342=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D342="Show",D344=""),AND(Q342="Show",Q344=""))),1,0) | [AI35]=1
R345: [A1]==IF(AG345=1,"X","") | [B2]==B344 | [AD30]=Always show | [AI35]=1
R346: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R347: [A1]==IF(AG347=1,"X","") | [B2]==IF(Y$305="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R348: [A1]==IF(AG348=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B348<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B348="",Y305="Yes"),AND(B348=1,Y305="No"))),1,0) | [AI35]=1
R349: [A1]==IF(AG349=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B349<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B349="",Y305="Yes"),AND(B349=1,Y305="No"))),1,0) | [AI35]=1
R350: [A1]==IF(AG350=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B350<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B350="",Y305="Yes"),AND(B350=1,Y305="No"))),1,0) | [AI35]=1
R351: [A1]==IF(AG351=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B351<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B351="",Y305="Yes"),AND(B351=1,Y305="No"))),1,0) | [AI35]=1
R352: [A1]==IF(AG352=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R353: [A1]==IF(AG353=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B353<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B353=1,Y305="No"),AND(B353=1,E353="",Y305="Yes"),AND(B353="",E353="",Y305="Yes"),AND(B353="",E353<>"",Y305="Yes"),AND(B353=0,E353<>"",Y305="Yes"))),1,0) | [AI35]=1
R354: [A1]==IF(AG354=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B354<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B354=1,Y305="No"),AND(B354=1,E354="",Y305="Yes"),AND(B354="",E354="",Y305="Yes"),AND(B354="",E354<>"",Y305="Yes"),AND(B354=0,E354<>"",Y305="Yes"))),1,0) | [AI35]=1
R355: [A1]==IF(AG355=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B355<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B355=1,Y305="No"),AND(B355=1,E355="",Y305="Yes"),AND(B355="",E355="",Y305="Yes"),AND(B355="",E355<>"",Y305="Yes"),AND(B355=0,E355<>"",Y305="Yes"))),1,0) | [AI35]=1
R356: [A1]==IF(AG356=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B356<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B356=1,Y305="No"),AND(B356=1,R356="",Y305="Yes"),AND(B356="",R356="",Y305="Yes"),AND(B356="",R356<>"",Y305="Yes"),AND(B356=0,R356<>"",Y305="Yes"))),1,0) | [AI35]=1
R357: [A1]==IF(AG357=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R358: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R359: [A1]==IF(AG359=1,"X","") | [B2]==IF(OR(D360="Show",Q360="Show"),1,0) | [AD30]=Always show | [AI35]=1
R360: [A1]==IF(AG360=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D360="Show",D360="",Q360="Show",Q360=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D360="",Q360="")),1,0) | [AI35]=1
R361: [A1]==IF(AG361=1,"X","") | [B2]==B359 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R362: [A1]==IF(AG362=1,"X","") | [B2]==B361 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D360="Show",D360="",Q360="Show",Q360=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D360="Show",D362=""),AND(Q360="Show",Q362=""))),1,0) | [AI35]=1
R363: [A1]==IF(AG363=1,"X","") | [B2]==B362 | [AD30]=Always show | [AI35]=1
R364: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R365: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N307," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R366: [A1]==IF(OR(SUM(AG367:AG426),Y366=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N368," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R367: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N368," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R368: [A1]==IF(AG368=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N307+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R369: [A1]==IF(AG369=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B369<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B369=1,Y366="No"),AND(B369=1,I369="",Y366="Yes"),AND(B369="",I369="",Y366="Yes"),AND(B369="",I369<>"",Y366="Yes"),AND(B369=0,I369<>"",Y366="Yes"))),1,0) | [AI35]=1
R370: [A1]==IF(AG370=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B370<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B370=1,Y366="No"),AND(B370=1,I370="",Y366="Yes"),AND(B370="",I370="",Y366="Yes"),AND(B370="",I370<>"",Y366="Yes"),AND(B370=0,I370<>"",Y366="Yes"))),1,0) | [AI35]=1
R371: [A1]==IF(AG371=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R372: [A1]==IF(AG372=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B372<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B372="",Y366="Yes"),AND(B372=1,Y366="No"))),1,0) | [AI35]=1
R373: [A1]==IF(AG373=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B373<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B373="",Y366="Yes"),AND(B373=1,Y366="No"))),1,0) | [AI35]=1
R374: [A1]==IF(AG374=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B374<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B374="",Y366="Yes"),AND(B374=1,Y366="No"))),1,0) | [AI35]=1
R375: [A1]==IF(AG375=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B375<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B375="",Y366="Yes"),AND(B375=1,Y366="No"))),1,0) | [AI35]=1
R376: [A1]==IF(AG376=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R377: [A1]==IF(AG377=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B377<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B377=1,Y366="No"),AND(B377=1,E377="",Y366="Yes"),AND(B377="",E377="",Y366="Yes"),AND(B377="",E377<>"",Y366="Yes"),AND(B377=0,E377<>"",Y366="Yes"))),1,0) | [AI35]=1
R378: [A1]==IF(AG378=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B378<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B378=1,Y366="No"),AND(B378=1,E378="",Y366="Yes"),AND(B378="",E378="",Y366="Yes"),AND(B378="",E378<>"",Y366="Yes"),AND(B378=0,E378<>"",Y366="Yes"))),1,0) | [AI35]=1
R379: [A1]==IF(AG379=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B379<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B379=1,Y366="No"),AND(B379=1,E379="",Y366="Yes"),AND(B379="",E379="",Y366="Yes"),AND(B379="",E379<>"",Y366="Yes"),AND(B379=0,E379<>"",Y366="Yes"))),1,0) | [AI35]=1
R380: [A1]==IF(AG380=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R381: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R382: [A1]==IF(AG382=1,"X","") | [B2]==IF(OR(D383="Show",Q383="Show"),1,0) | [AD30]=Always show | [AI35]=1
R383: [A1]==IF(AG383=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D383="Show",D383="",Q383="Show",Q383=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D383="",Q383="")),1,0) | [AI35]=1
R384: [A1]==IF(AG384=1,"X","") | [B2]==B382 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R385: [A1]==IF(AG385=1,"X","") | [B2]==B384 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D383="Show",D383="",Q383="Show",Q383=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D383="Show",D385=""),AND(Q383="Show",Q385=""))),1,0) | [AI35]=1
R386: [A1]==IF(AG386=1,"X","") | [B2]==B385 | [AD30]=Always show | [AI35]=1
R387: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R388: [A1]==IF(AG388=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R389: [A1]==IF(AG389=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B389<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B389="",Y366="Yes"),AND(B389=1,Y366="No"))),1,0) | [AI35]=1
R390: [A1]==IF(AG390=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B390<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B390="",Y366="Yes"),AND(B390=1,Y366="No"))),1,0) | [AI35]=1
R391: [A1]==IF(AG391=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B391<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B391="",Y366="Yes"),AND(B391=1,Y366="No"))),1,0) | [AI35]=1
R392: [A1]==IF(AG392=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B392<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B392="",Y366="Yes"),AND(B392=1,Y366="No"))),1,0) | [AI35]=1
R393: [A1]==IF(AG393=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B393<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B393="",Y366="Yes"),AND(B393=1,Y366="No"))),1,0) | [AI35]=1
R394: [A1]==IF(AG394=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B394<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B394="",Y366="Yes"),AND(B394=1,Y366="No"))),1,0) | [AI35]=1
R395: [A1]==IF(AG395=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B395<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B395="",Y366="Yes"),AND(B395=1,Y366="No"))),1,0) | [AI35]=1
R396: [A1]==IF(AG396=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R397: [A1]==IF(AG397=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B397<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B397=1,Y366="No"),AND(B397=1,E397="",Y366="Yes"),AND(B397="",E397="",Y366="Yes"),AND(B397="",E397<>"",Y366="Yes"),AND(B397=0,E397<>"",Y366="Yes"))),1,0) | [AI35]=1
R398: [A1]==IF(AG398=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B398<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B398=1,Y366="No"),AND(B398=1,E398="",Y366="Yes"),AND(B398="",E398="",Y366="Yes"),AND(B398="",E398<>"",Y366="Yes"),AND(B398=0,E398<>"",Y366="Yes"))),1,0) | [AI35]=1
R399: [A1]==IF(AG399=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B399<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B399=1,Y366="No"),AND(B399=1,E399="",Y366="Yes"),AND(B399="",E399="",Y366="Yes"),AND(B399="",E399<>"",Y366="Yes"),AND(B399=0,E399<>"",Y366="Yes"))),1,0) | [AI35]=1
R400: [A1]==IF(AG400=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R401: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R402: [A1]==IF(AG402=1,"X","") | [B2]==IF(OR(D403="Show",Q403="Show"),1,0) | [AD30]=Always show | [AI35]=1
R403: [A1]==IF(AG403=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D403="Show",D403="",Q403="Show",Q403=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D403="",Q403="")),1,0) | [AI35]=1
R404: [A1]==IF(AG404=1,"X","") | [B2]==B402 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R405: [A1]==IF(AG405=1,"X","") | [B2]==B404 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D403="Show",D403="",Q403="Show",Q403=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D403="Show",D405=""),AND(Q403="Show",Q405=""))),1,0) | [AI35]=1
R406: [A1]==IF(AG406=1,"X","") | [B2]==B405 | [AD30]=Always show | [AI35]=1
R407: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R408: [A1]==IF(AG408=1,"X","") | [B2]==IF(Y$366="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R409: [A1]==IF(AG409=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B409<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B409="",Y366="Yes"),AND(B409=1,Y366="No"))),1,0) | [AI35]=1
R410: [A1]==IF(AG410=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B410<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B410="",Y366="Yes"),AND(B410=1,Y366="No"))),1,0) | [AI35]=1
R411: [A1]==IF(AG411=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B411<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B411="",Y366="Yes"),AND(B411=1,Y366="No"))),1,0) | [AI35]=1
R412: [A1]==IF(AG412=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B412<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B412="",Y366="Yes"),AND(B412=1,Y366="No"))),1,0) | [AI35]=1
R413: [A1]==IF(AG413=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R414: [A1]==IF(AG414=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B414<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B414=1,Y366="No"),AND(B414=1,E414="",Y366="Yes"),AND(B414="",E414="",Y366="Yes"),AND(B414="",E414<>"",Y366="Yes"),AND(B414=0,E414<>"",Y366="Yes"))),1,0) | [AI35]=1
R415: [A1]==IF(AG415=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B415<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B415=1,Y366="No"),AND(B415=1,E415="",Y366="Yes"),AND(B415="",E415="",Y366="Yes"),AND(B415="",E415<>"",Y366="Yes"),AND(B415=0,E415<>"",Y366="Yes"))),1,0) | [AI35]=1
R416: [A1]==IF(AG416=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B416<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B416=1,Y366="No"),AND(B416=1,E416="",Y366="Yes"),AND(B416="",E416="",Y366="Yes"),AND(B416="",E416<>"",Y366="Yes"),AND(B416=0,E416<>"",Y366="Yes"))),1,0) | [AI35]=1
R417: [A1]==IF(AG417=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B417<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B417=1,Y366="No"),AND(B417=1,R417="",Y366="Yes"),AND(B417="",R417="",Y366="Yes"),AND(B417="",R417<>"",Y366="Yes"),AND(B417=0,R417<>"",Y366="Yes"))),1,0) | [AI35]=1
R418: [A1]==IF(AG418=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R419: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R420: [A1]==IF(AG420=1,"X","") | [B2]==IF(OR(D421="Show",Q421="Show"),1,0) | [AD30]=Always show | [AI35]=1
R421: [A1]==IF(AG421=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D421="Show",D421="",Q421="Show",Q421=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D421="",Q421="")),1,0) | [AI35]=1
R422: [A1]==IF(AG422=1,"X","") | [B2]==B420 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R423: [A1]==IF(AG423=1,"X","") | [B2]==B422 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D421="Show",D421="",Q421="Show",Q421=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D421="Show",D423=""),AND(Q421="Show",Q423=""))),1,0) | [AI35]=1
R424: [A1]==IF(AG424=1,"X","") | [B2]==B423 | [AD30]=Always show | [AI35]=1
R425: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R426: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N368," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R427: [A1]==IF(OR(SUM(AG428:AG487),Y427=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N429," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R428: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N429," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R429: [A1]==IF(AG429=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N368+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R430: [A1]==IF(AG430=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B430<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B430=1,Y427="No"),AND(B430=1,I430="",Y427="Yes"),AND(B430="",I430="",Y427="Yes"),AND(B430="",I430<>"",Y427="Yes"),AND(B430=0,I430<>"",Y427="Yes"))),1,0) | [AI35]=1
R431: [A1]==IF(AG431=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B431<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B431=1,Y427="No"),AND(B431=1,I431="",Y427="Yes"),AND(B431="",I431="",Y427="Yes"),AND(B431="",I431<>"",Y427="Yes"),AND(B431=0,I431<>"",Y427="Yes"))),1,0) | [AI35]=1
R432: [A1]==IF(AG432=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R433: [A1]==IF(AG433=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B433<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B433="",Y427="Yes"),AND(B433=1,Y427="No"))),1,0) | [AI35]=1
R434: [A1]==IF(AG434=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B434<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B434="",Y427="Yes"),AND(B434=1,Y427="No"))),1,0) | [AI35]=1
R435: [A1]==IF(AG435=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B435<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B435="",Y427="Yes"),AND(B435=1,Y427="No"))),1,0) | [AI35]=1
R436: [A1]==IF(AG436=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B436<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B436="",Y427="Yes"),AND(B436=1,Y427="No"))),1,0) | [AI35]=1
R437: [A1]==IF(AG437=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R438: [A1]==IF(AG438=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B438<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B438=1,Y427="No"),AND(B438=1,E438="",Y427="Yes"),AND(B438="",E438="",Y427="Yes"),AND(B438="",E438<>"",Y427="Yes"),AND(B438=0,E438<>"",Y427="Yes"))),1,0) | [AI35]=1
R439: [A1]==IF(AG439=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B439<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B439=1,Y427="No"),AND(B439=1,E439="",Y427="Yes"),AND(B439="",E439="",Y427="Yes"),AND(B439="",E439<>"",Y427="Yes"),AND(B439=0,E439<>"",Y427="Yes"))),1,0) | [AI35]=1
R440: [A1]==IF(AG440=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B440<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B440=1,Y427="No"),AND(B440=1,E440="",Y427="Yes"),AND(B440="",E440="",Y427="Yes"),AND(B440="",E440<>"",Y427="Yes"),AND(B440=0,E440<>"",Y427="Yes"))),1,0) | [AI35]=1
R441: [A1]==IF(AG441=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R442: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R443: [A1]==IF(AG443=1,"X","") | [B2]==IF(OR(D444="Show",Q444="Show"),1,0) | [AD30]=Always show | [AI35]=1
R444: [A1]==IF(AG444=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D444="Show",D444="",Q444="Show",Q444=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D444="",Q444="")),1,0) | [AI35]=1
R445: [A1]==IF(AG445=1,"X","") | [B2]==B443 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R446: [A1]==IF(AG446=1,"X","") | [B2]==B445 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D444="Show",D444="",Q444="Show",Q444=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D444="Show",D446=""),AND(Q444="Show",Q446=""))),1,0) | [AI35]=1
R447: [A1]==IF(AG447=1,"X","") | [B2]==B446 | [AD30]=Always show | [AI35]=1
R448: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R449: [A1]==IF(AG449=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R450: [A1]==IF(AG450=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B450<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B450="",Y427="Yes"),AND(B450=1,Y427="No"))),1,0) | [AI35]=1
R451: [A1]==IF(AG451=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B451<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B451="",Y427="Yes"),AND(B451=1,Y427="No"))),1,0) | [AI35]=1
R452: [A1]==IF(AG452=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B452<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B452="",Y427="Yes"),AND(B452=1,Y427="No"))),1,0) | [AI35]=1
R453: [A1]==IF(AG453=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B453<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B453="",Y427="Yes"),AND(B453=1,Y427="No"))),1,0) | [AI35]=1
R454: [A1]==IF(AG454=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B454<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B454="",Y427="Yes"),AND(B454=1,Y427="No"))),1,0) | [AI35]=1
R455: [A1]==IF(AG455=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B455<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B455="",Y427="Yes"),AND(B455=1,Y427="No"))),1,0) | [AI35]=1
R456: [A1]==IF(AG456=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B456<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B456="",Y427="Yes"),AND(B456=1,Y427="No"))),1,0) | [AI35]=1
R457: [A1]==IF(AG457=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R458: [A1]==IF(AG458=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B458<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B458=1,Y427="No"),AND(B458=1,E458="",Y427="Yes"),AND(B458="",E458="",Y427="Yes"),AND(B458="",E458<>"",Y427="Yes"),AND(B458=0,E458<>"",Y427="Yes"))),1,0) | [AI35]=1
R459: [A1]==IF(AG459=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B459<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B459=1,Y427="No"),AND(B459=1,E459="",Y427="Yes"),AND(B459="",E459="",Y427="Yes"),AND(B459="",E459<>"",Y427="Yes"),AND(B459=0,E459<>"",Y427="Yes"))),1,0) | [AI35]=1
R460: [A1]==IF(AG460=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B460<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B460=1,Y427="No"),AND(B460=1,E460="",Y427="Yes"),AND(B460="",E460="",Y427="Yes"),AND(B460="",E460<>"",Y427="Yes"),AND(B460=0,E460<>"",Y427="Yes"))),1,0) | [AI35]=1
R461: [A1]==IF(AG461=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R462: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R463: [A1]==IF(AG463=1,"X","") | [B2]==IF(OR(D464="Show",Q464="Show"),1,0) | [AD30]=Always show | [AI35]=1
R464: [A1]==IF(AG464=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D464="Show",D464="",Q464="Show",Q464=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D464="",Q464="")),1,0) | [AI35]=1
R465: [A1]==IF(AG465=1,"X","") | [B2]==B463 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R466: [A1]==IF(AG466=1,"X","") | [B2]==B465 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D464="Show",D464="",Q464="Show",Q464=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D464="Show",D466=""),AND(Q464="Show",Q466=""))),1,0) | [AI35]=1
R467: [A1]==IF(AG467=1,"X","") | [B2]==B466 | [AD30]=Always show | [AI35]=1
R468: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R469: [A1]==IF(AG469=1,"X","") | [B2]==IF(Y$427="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R470: [A1]==IF(AG470=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B470<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B470="",Y427="Yes"),AND(B470=1,Y427="No"))),1,0) | [AI35]=1
R471: [A1]==IF(AG471=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B471<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B471="",Y427="Yes"),AND(B471=1,Y427="No"))),1,0) | [AI35]=1
R472: [A1]==IF(AG472=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B472<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B472="",Y427="Yes"),AND(B472=1,Y427="No"))),1,0) | [AI35]=1
R473: [A1]==IF(AG473=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B473<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B473="",Y427="Yes"),AND(B473=1,Y427="No"))),1,0) | [AI35]=1
R474: [A1]==IF(AG474=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R475: [A1]==IF(AG475=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B475<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B475=1,Y427="No"),AND(B475=1,E475="",Y427="Yes"),AND(B475="",E475="",Y427="Yes"),AND(B475="",E475<>"",Y427="Yes"),AND(B475=0,E475<>"",Y427="Yes"))),1,0) | [AI35]=1
R476: [A1]==IF(AG476=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B476<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B476=1,Y427="No"),AND(B476=1,E476="",Y427="Yes"),AND(B476="",E476="",Y427="Yes"),AND(B476="",E476<>"",Y427="Yes"),AND(B476=0,E476<>"",Y427="Yes"))),1,0) | [AI35]=1
R477: [A1]==IF(AG477=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B477<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B477=1,Y427="No"),AND(B477=1,E477="",Y427="Yes"),AND(B477="",E477="",Y427="Yes"),AND(B477="",E477<>"",Y427="Yes"),AND(B477=0,E477<>"",Y427="Yes"))),1,0) | [AI35]=1
R478: [A1]==IF(AG478=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B478<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B478=1,Y427="No"),AND(B478=1,R478="",Y427="Yes"),AND(B478="",R478="",Y427="Yes"),AND(B478="",R478<>"",Y427="Yes"),AND(B478=0,R478<>"",Y427="Yes"))),1,0) | [AI35]=1
R479: [A1]==IF(AG479=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R480: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R481: [A1]==IF(AG481=1,"X","") | [B2]==IF(OR(D482="Show",Q482="Show"),1,0) | [AD30]=Always show | [AI35]=1
R482: [A1]==IF(AG482=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D482="Show",D482="",Q482="Show",Q482=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D482="",Q482="")),1,0) | [AI35]=1
R483: [A1]==IF(AG483=1,"X","") | [B2]==B481 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R484: [A1]==IF(AG484=1,"X","") | [B2]==B483 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D482="Show",D482="",Q482="Show",Q482=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D482="Show",D484=""),AND(Q482="Show",Q484=""))),1,0) | [AI35]=1
R485: [A1]==IF(AG485=1,"X","") | [B2]==B484 | [AD30]=Always show | [AI35]=1
R486: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R487: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N429," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R488: [A1]==IF(OR(SUM(AG489:AG548),Y488=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N490," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R489: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N490," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R490: [A1]==IF(AG490=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N429+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R491: [A1]==IF(AG491=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B491<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B491=1,Y488="No"),AND(B491=1,I491="",Y488="Yes"),AND(B491="",I491="",Y488="Yes"),AND(B491="",I491<>"",Y488="Yes"),AND(B491=0,I491<>"",Y488="Yes"))),1,0) | [AI35]=1
R492: [A1]==IF(AG492=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B492<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B492=1,Y488="No"),AND(B492=1,I492="",Y488="Yes"),AND(B492="",I492="",Y488="Yes"),AND(B492="",I492<>"",Y488="Yes"),AND(B492=0,I492<>"",Y488="Yes"))),1,0) | [AI35]=1
R493: [A1]==IF(AG493=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R494: [A1]==IF(AG494=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B494<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B494="",Y488="Yes"),AND(B494=1,Y488="No"))),1,0) | [AI35]=1
R495: [A1]==IF(AG495=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B495<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B495="",Y488="Yes"),AND(B495=1,Y488="No"))),1,0) | [AI35]=1
R496: [A1]==IF(AG496=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B496<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B496="",Y488="Yes"),AND(B496=1,Y488="No"))),1,0) | [AI35]=1
R497: [A1]==IF(AG497=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B497<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B497="",Y488="Yes"),AND(B497=1,Y488="No"))),1,0) | [AI35]=1
R498: [A1]==IF(AG498=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R499: [A1]==IF(AG499=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B499<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B499=1,Y488="No"),AND(B499=1,E499="",Y488="Yes"),AND(B499="",E499="",Y488="Yes"),AND(B499="",E499<>"",Y488="Yes"),AND(B499=0,E499<>"",Y488="Yes"))),1,0) | [AI35]=1
R500: [A1]==IF(AG500=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B500<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B500=1,Y488="No"),AND(B500=1,E500="",Y488="Yes"),AND(B500="",E500="",Y488="Yes"),AND(B500="",E500<>"",Y488="Yes"),AND(B500=0,E500<>"",Y488="Yes"))),1,0) | [AI35]=1
R501: [A1]==IF(AG501=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B501<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B501=1,Y488="No"),AND(B501=1,E501="",Y488="Yes"),AND(B501="",E501="",Y488="Yes"),AND(B501="",E501<>"",Y488="Yes"),AND(B501=0,E501<>"",Y488="Yes"))),1,0) | [AI35]=1
R502: [A1]==IF(AG502=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R503: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R504: [A1]==IF(AG504=1,"X","") | [B2]==IF(OR(D505="Show",Q505="Show"),1,0) | [AD30]=Always show | [AI35]=1
R505: [A1]==IF(AG505=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D505="Show",D505="",Q505="Show",Q505=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D505="",Q505="")),1,0) | [AI35]=1
R506: [A1]==IF(AG506=1,"X","") | [B2]==B504 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R507: [A1]==IF(AG507=1,"X","") | [B2]==B506 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D505="Show",D505="",Q505="Show",Q505=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D505="Show",D507=""),AND(Q505="Show",Q507=""))),1,0) | [AI35]=1
R508: [A1]==IF(AG508=1,"X","") | [B2]==B507 | [AD30]=Always show | [AI35]=1
R509: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R510: [A1]==IF(AG510=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R511: [A1]==IF(AG511=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B511<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B511="",Y488="Yes"),AND(B511=1,Y488="No"))),1,0) | [AI35]=1
R512: [A1]==IF(AG512=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B512<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B512="",Y488="Yes"),AND(B512=1,Y488="No"))),1,0) | [AI35]=1
R513: [A1]==IF(AG513=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B513<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B513="",Y488="Yes"),AND(B513=1,Y488="No"))),1,0) | [AI35]=1
R514: [A1]==IF(AG514=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B514<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B514="",Y488="Yes"),AND(B514=1,Y488="No"))),1,0) | [AI35]=1
R515: [A1]==IF(AG515=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B515<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B515="",Y488="Yes"),AND(B515=1,Y488="No"))),1,0) | [AI35]=1
R516: [A1]==IF(AG516=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B516<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B516="",Y488="Yes"),AND(B516=1,Y488="No"))),1,0) | [AI35]=1
R517: [A1]==IF(AG517=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B517<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B517="",Y488="Yes"),AND(B517=1,Y488="No"))),1,0) | [AI35]=1
R518: [A1]==IF(AG518=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R519: [A1]==IF(AG519=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B519<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B519=1,Y488="No"),AND(B519=1,E519="",Y488="Yes"),AND(B519="",E519="",Y488="Yes"),AND(B519="",E519<>"",Y488="Yes"),AND(B519=0,E519<>"",Y488="Yes"))),1,0) | [AI35]=1
R520: [A1]==IF(AG520=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B520<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B520=1,Y488="No"),AND(B520=1,E520="",Y488="Yes"),AND(B520="",E520="",Y488="Yes"),AND(B520="",E520<>"",Y488="Yes"),AND(B520=0,E520<>"",Y488="Yes"))),1,0) | [AI35]=1
R521: [A1]==IF(AG521=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B521<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B521=1,Y488="No"),AND(B521=1,E521="",Y488="Yes"),AND(B521="",E521="",Y488="Yes"),AND(B521="",E521<>"",Y488="Yes"),AND(B521=0,E521<>"",Y488="Yes"))),1,0) | [AI35]=1
R522: [A1]==IF(AG522=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R523: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R524: [A1]==IF(AG524=1,"X","") | [B2]==IF(OR(D525="Show",Q525="Show"),1,0) | [AD30]=Always show | [AI35]=1
R525: [A1]==IF(AG525=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D525="Show",D525="",Q525="Show",Q525=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D525="",Q525="")),1,0) | [AI35]=1
R526: [A1]==IF(AG526=1,"X","") | [B2]==B524 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R527: [A1]==IF(AG527=1,"X","") | [B2]==B526 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D525="Show",D525="",Q525="Show",Q525=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D525="Show",D527=""),AND(Q525="Show",Q527=""))),1,0) | [AI35]=1
R528: [A1]==IF(AG528=1,"X","") | [B2]==B527 | [AD30]=Always show | [AI35]=1
R529: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R530: [A1]==IF(AG530=1,"X","") | [B2]==IF(Y$488="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R531: [A1]==IF(AG531=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B531<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B531="",Y488="Yes"),AND(B531=1,Y488="No"))),1,0) | [AI35]=1
R532: [A1]==IF(AG532=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B532<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B532="",Y488="Yes"),AND(B532=1,Y488="No"))),1,0) | [AI35]=1
R533: [A1]==IF(AG533=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B533<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B533="",Y488="Yes"),AND(B533=1,Y488="No"))),1,0) | [AI35]=1
R534: [A1]==IF(AG534=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B534<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B534="",Y488="Yes"),AND(B534=1,Y488="No"))),1,0) | [AI35]=1
R535: [A1]==IF(AG535=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R536: [A1]==IF(AG536=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B536<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B536=1,Y488="No"),AND(B536=1,E536="",Y488="Yes"),AND(B536="",E536="",Y488="Yes"),AND(B536="",E536<>"",Y488="Yes"),AND(B536=0,E536<>"",Y488="Yes"))),1,0) | [AI35]=1
R537: [A1]==IF(AG537=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B537<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B537=1,Y488="No"),AND(B537=1,E537="",Y488="Yes"),AND(B537="",E537="",Y488="Yes"),AND(B537="",E537<>"",Y488="Yes"),AND(B537=0,E537<>"",Y488="Yes"))),1,0) | [AI35]=1
R538: [A1]==IF(AG538=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B538<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B538=1,Y488="No"),AND(B538=1,E538="",Y488="Yes"),AND(B538="",E538="",Y488="Yes"),AND(B538="",E538<>"",Y488="Yes"),AND(B538=0,E538<>"",Y488="Yes"))),1,0) | [AI35]=1
R539: [A1]==IF(AG539=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B539<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B539=1,Y488="No"),AND(B539=1,R539="",Y488="Yes"),AND(B539="",R539="",Y488="Yes"),AND(B539="",R539<>"",Y488="Yes"),AND(B539=0,R539<>"",Y488="Yes"))),1,0) | [AI35]=1
R540: [A1]==IF(AG540=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R541: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R542: [A1]==IF(AG542=1,"X","") | [B2]==IF(OR(D543="Show",Q543="Show"),1,0) | [AD30]=Always show | [AI35]=1
R543: [A1]==IF(AG543=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D543="Show",D543="",Q543="Show",Q543=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D543="",Q543="")),1,0) | [AI35]=1
R544: [A1]==IF(AG544=1,"X","") | [B2]==B542 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R545: [A1]==IF(AG545=1,"X","") | [B2]==B544 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D543="Show",D543="",Q543="Show",Q543=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D543="Show",D545=""),AND(Q543="Show",Q545=""))),1,0) | [AI35]=1
R546: [A1]==IF(AG546=1,"X","") | [B2]==B545 | [AD30]=Always show | [AI35]=1
R547: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R548: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N490," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R549: [A1]==IF(OR(SUM(AG550:AG609),Y549=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N551," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R550: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N551," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R551: [A1]==IF(AG551=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N490+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R552: [A1]==IF(AG552=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B552<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B552=1,Y549="No"),AND(B552=1,I552="",Y549="Yes"),AND(B552="",I552="",Y549="Yes"),AND(B552="",I552<>"",Y549="Yes"),AND(B552=0,I552<>"",Y549="Yes"))),1,0) | [AI35]=1
R553: [A1]==IF(AG553=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B553<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B553=1,Y549="No"),AND(B553=1,I553="",Y549="Yes"),AND(B553="",I553="",Y549="Yes"),AND(B553="",I553<>"",Y549="Yes"),AND(B553=0,I553<>"",Y549="Yes"))),1,0) | [AI35]=1
R554: [A1]==IF(AG554=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R555: [A1]==IF(AG555=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B555<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B555="",Y549="Yes"),AND(B555=1,Y549="No"))),1,0) | [AI35]=1
R556: [A1]==IF(AG556=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B556<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B556="",Y549="Yes"),AND(B556=1,Y549="No"))),1,0) | [AI35]=1
R557: [A1]==IF(AG557=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B557<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B557="",Y549="Yes"),AND(B557=1,Y549="No"))),1,0) | [AI35]=1
R558: [A1]==IF(AG558=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B558<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B558="",Y549="Yes"),AND(B558=1,Y549="No"))),1,0) | [AI35]=1
R559: [A1]==IF(AG559=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R560: [A1]==IF(AG560=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B560<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B560=1,Y549="No"),AND(B560=1,E560="",Y549="Yes"),AND(B560="",E560="",Y549="Yes"),AND(B560="",E560<>"",Y549="Yes"),AND(B560=0,E560<>"",Y549="Yes"))),1,0) | [AI35]=1
R561: [A1]==IF(AG561=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B561<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B561=1,Y549="No"),AND(B561=1,E561="",Y549="Yes"),AND(B561="",E561="",Y549="Yes"),AND(B561="",E561<>"",Y549="Yes"),AND(B561=0,E561<>"",Y549="Yes"))),1,0) | [AI35]=1
R562: [A1]==IF(AG562=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B562<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B562=1,Y549="No"),AND(B562=1,E562="",Y549="Yes"),AND(B562="",E562="",Y549="Yes"),AND(B562="",E562<>"",Y549="Yes"),AND(B562=0,E562<>"",Y549="Yes"))),1,0) | [AI35]=1
R563: [A1]==IF(AG563=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R564: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R565: [A1]==IF(AG565=1,"X","") | [B2]==IF(OR(D566="Show",Q566="Show"),1,0) | [AD30]=Always show | [AI35]=1
R566: [A1]==IF(AG566=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D566="Show",D566="",Q566="Show",Q566=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D566="",Q566="")),1,0) | [AI35]=1
R567: [A1]==IF(AG567=1,"X","") | [B2]==B565 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R568: [A1]==IF(AG568=1,"X","") | [B2]==B567 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D566="Show",D566="",Q566="Show",Q566=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D566="Show",D568=""),AND(Q566="Show",Q568=""))),1,0) | [AI35]=1
R569: [A1]==IF(AG569=1,"X","") | [B2]==B568 | [AD30]=Always show | [AI35]=1
R570: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R571: [A1]==IF(AG571=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R572: [A1]==IF(AG572=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B572<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B572="",Y549="Yes"),AND(B572=1,Y549="No"))),1,0) | [AI35]=1
R573: [A1]==IF(AG573=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B573<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B573="",Y549="Yes"),AND(B573=1,Y549="No"))),1,0) | [AI35]=1
R574: [A1]==IF(AG574=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B574<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B574="",Y549="Yes"),AND(B574=1,Y549="No"))),1,0) | [AI35]=1
R575: [A1]==IF(AG575=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B575<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B575="",Y549="Yes"),AND(B575=1,Y549="No"))),1,0) | [AI35]=1
R576: [A1]==IF(AG576=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B576<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B576="",Y549="Yes"),AND(B576=1,Y549="No"))),1,0) | [AI35]=1
R577: [A1]==IF(AG577=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B577<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B577="",Y549="Yes"),AND(B577=1,Y549="No"))),1,0) | [AI35]=1
R578: [A1]==IF(AG578=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B578<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B578="",Y549="Yes"),AND(B578=1,Y549="No"))),1,0) | [AI35]=1
R579: [A1]==IF(AG579=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R580: [A1]==IF(AG580=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B580<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B580=1,Y549="No"),AND(B580=1,E580="",Y549="Yes"),AND(B580="",E580="",Y549="Yes"),AND(B580="",E580<>"",Y549="Yes"),AND(B580=0,E580<>"",Y549="Yes"))),1,0) | [AI35]=1
R581: [A1]==IF(AG581=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B581<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B581=1,Y549="No"),AND(B581=1,E581="",Y549="Yes"),AND(B581="",E581="",Y549="Yes"),AND(B581="",E581<>"",Y549="Yes"),AND(B581=0,E581<>"",Y549="Yes"))),1,0) | [AI35]=1
R582: [A1]==IF(AG582=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B582<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B582=1,Y549="No"),AND(B582=1,E582="",Y549="Yes"),AND(B582="",E582="",Y549="Yes"),AND(B582="",E582<>"",Y549="Yes"),AND(B582=0,E582<>"",Y549="Yes"))),1,0) | [AI35]=1
R583: [A1]==IF(AG583=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R584: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R585: [A1]==IF(AG585=1,"X","") | [B2]==IF(OR(D586="Show",Q586="Show"),1,0) | [AD30]=Always show | [AI35]=1
R586: [A1]==IF(AG586=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D586="Show",D586="",Q586="Show",Q586=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D586="",Q586="")),1,0) | [AI35]=1
R587: [A1]==IF(AG587=1,"X","") | [B2]==B585 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R588: [A1]==IF(AG588=1,"X","") | [B2]==B587 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D586="Show",D586="",Q586="Show",Q586=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D586="Show",D588=""),AND(Q586="Show",Q588=""))),1,0) | [AI35]=1
R589: [A1]==IF(AG589=1,"X","") | [B2]==B588 | [AD30]=Always show | [AI35]=1
R590: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R591: [A1]==IF(AG591=1,"X","") | [B2]==IF(Y$549="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R592: [A1]==IF(AG592=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B592<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B592="",Y549="Yes"),AND(B592=1,Y549="No"))),1,0) | [AI35]=1
R593: [A1]==IF(AG593=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B593<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B593="",Y549="Yes"),AND(B593=1,Y549="No"))),1,0) | [AI35]=1
R594: [A1]==IF(AG594=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B594<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B594="",Y549="Yes"),AND(B594=1,Y549="No"))),1,0) | [AI35]=1
R595: [A1]==IF(AG595=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B595<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B595="",Y549="Yes"),AND(B595=1,Y549="No"))),1,0) | [AI35]=1
R596: [A1]==IF(AG596=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R597: [A1]==IF(AG597=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B597<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B597=1,Y549="No"),AND(B597=1,E597="",Y549="Yes"),AND(B597="",E597="",Y549="Yes"),AND(B597="",E597<>"",Y549="Yes"),AND(B597=0,E597<>"",Y549="Yes"))),1,0) | [AI35]=1
R598: [A1]==IF(AG598=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B598<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B598=1,Y549="No"),AND(B598=1,E598="",Y549="Yes"),AND(B598="",E598="",Y549="Yes"),AND(B598="",E598<>"",Y549="Yes"),AND(B598=0,E598<>"",Y549="Yes"))),1,0) | [AI35]=1
R599: [A1]==IF(AG599=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B599<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B599=1,Y549="No"),AND(B599=1,E599="",Y549="Yes"),AND(B599="",E599="",Y549="Yes"),AND(B599="",E599<>"",Y549="Yes"),AND(B599=0,E599<>"",Y549="Yes"))),1,0) | [AI35]=1
R600: [A1]==IF(AG600=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B600<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B600=1,Y549="No"),AND(B600=1,R600="",Y549="Yes"),AND(B600="",R600="",Y549="Yes"),AND(B600="",R600<>"",Y549="Yes"),AND(B600=0,R600<>"",Y549="Yes"))),1,0) | [AI35]=1
R601: [A1]==IF(AG601=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R602: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R603: [A1]==IF(AG603=1,"X","") | [B2]==IF(OR(D604="Show",Q604="Show"),1,0) | [AD30]=Always show | [AI35]=1
R604: [A1]==IF(AG604=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D604="Show",D604="",Q604="Show",Q604=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D604="",Q604="")),1,0) | [AI35]=1
R605: [A1]==IF(AG605=1,"X","") | [B2]==B603 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R606: [A1]==IF(AG606=1,"X","") | [B2]==B605 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D604="Show",D604="",Q604="Show",Q604=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D604="Show",D606=""),AND(Q604="Show",Q606=""))),1,0) | [AI35]=1
R607: [A1]==IF(AG607=1,"X","") | [B2]==B606 | [AD30]=Always show | [AI35]=1
R608: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R609: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N551," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R610: [A1]==IF(OR(SUM(AG611:AG670),Y610=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N612," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R611: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N612," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R612: [A1]==IF(AG612=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N551+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R613: [A1]==IF(AG613=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B613<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B613=1,Y610="No"),AND(B613=1,I613="",Y610="Yes"),AND(B613="",I613="",Y610="Yes"),AND(B613="",I613<>"",Y610="Yes"),AND(B613=0,I613<>"",Y610="Yes"))),1,0) | [AI35]=1
R614: [A1]==IF(AG614=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B614<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B614=1,Y610="No"),AND(B614=1,I614="",Y610="Yes"),AND(B614="",I614="",Y610="Yes"),AND(B614="",I614<>"",Y610="Yes"),AND(B614=0,I614<>"",Y610="Yes"))),1,0) | [AI35]=1
R615: [A1]==IF(AG615=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R616: [A1]==IF(AG616=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B616<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B616="",Y610="Yes"),AND(B616=1,Y610="No"))),1,0) | [AI35]=1
R617: [A1]==IF(AG617=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B617<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B617="",Y610="Yes"),AND(B617=1,Y610="No"))),1,0) | [AI35]=1
R618: [A1]==IF(AG618=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B618<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B618="",Y610="Yes"),AND(B618=1,Y610="No"))),1,0) | [AI35]=1
R619: [A1]==IF(AG619=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B619<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B619="",Y610="Yes"),AND(B619=1,Y610="No"))),1,0) | [AI35]=1
R620: [A1]==IF(AG620=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R621: [A1]==IF(AG621=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B621<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B621=1,Y610="No"),AND(B621=1,E621="",Y610="Yes"),AND(B621="",E621="",Y610="Yes"),AND(B621="",E621<>"",Y610="Yes"),AND(B621=0,E621<>"",Y610="Yes"))),1,0) | [AI35]=1
R622: [A1]==IF(AG622=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B622<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B622=1,Y610="No"),AND(B622=1,E622="",Y610="Yes"),AND(B622="",E622="",Y610="Yes"),AND(B622="",E622<>"",Y610="Yes"),AND(B622=0,E622<>"",Y610="Yes"))),1,0) | [AI35]=1
R623: [A1]==IF(AG623=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B623<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B623=1,Y610="No"),AND(B623=1,E623="",Y610="Yes"),AND(B623="",E623="",Y610="Yes"),AND(B623="",E623<>"",Y610="Yes"),AND(B623=0,E623<>"",Y610="Yes"))),1,0) | [AI35]=1
R624: [A1]==IF(AG624=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R625: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R626: [A1]==IF(AG626=1,"X","") | [B2]==IF(OR(D627="Show",Q627="Show"),1,0) | [AD30]=Always show | [AI35]=1
R627: [A1]==IF(AG627=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D627="Show",D627="",Q627="Show",Q627=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D627="",Q627="")),1,0) | [AI35]=1
R628: [A1]==IF(AG628=1,"X","") | [B2]==B626 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R629: [A1]==IF(AG629=1,"X","") | [B2]==B628 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D627="Show",D627="",Q627="Show",Q627=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D627="Show",D629=""),AND(Q627="Show",Q629=""))),1,0) | [AI35]=1
R630: [A1]==IF(AG630=1,"X","") | [B2]==B629 | [AD30]=Always show | [AI35]=1
R631: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R632: [A1]==IF(AG632=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R633: [A1]==IF(AG633=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B633<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B633="",Y610="Yes"),AND(B633=1,Y610="No"))),1,0) | [AI35]=1
R634: [A1]==IF(AG634=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B634<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B634="",Y610="Yes"),AND(B634=1,Y610="No"))),1,0) | [AI35]=1
R635: [A1]==IF(AG635=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B635<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B635="",Y610="Yes"),AND(B635=1,Y610="No"))),1,0) | [AI35]=1
R636: [A1]==IF(AG636=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B636<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B636="",Y610="Yes"),AND(B636=1,Y610="No"))),1,0) | [AI35]=1
R637: [A1]==IF(AG637=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B637<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B637="",Y610="Yes"),AND(B637=1,Y610="No"))),1,0) | [AI35]=1
R638: [A1]==IF(AG638=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B638<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B638="",Y610="Yes"),AND(B638=1,Y610="No"))),1,0) | [AI35]=1
R639: [A1]==IF(AG639=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B639<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B639="",Y610="Yes"),AND(B639=1,Y610="No"))),1,0) | [AI35]=1
R640: [A1]==IF(AG640=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R641: [A1]==IF(AG641=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B641<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B641=1,Y610="No"),AND(B641=1,E641="",Y610="Yes"),AND(B641="",E641="",Y610="Yes"),AND(B641="",E641<>"",Y610="Yes"),AND(B641=0,E641<>"",Y610="Yes"))),1,0) | [AI35]=1
R642: [A1]==IF(AG642=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B642<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B642=1,Y610="No"),AND(B642=1,E642="",Y610="Yes"),AND(B642="",E642="",Y610="Yes"),AND(B642="",E642<>"",Y610="Yes"),AND(B642=0,E642<>"",Y610="Yes"))),1,0) | [AI35]=1
R643: [A1]==IF(AG643=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B643<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B643=1,Y610="No"),AND(B643=1,E643="",Y610="Yes"),AND(B643="",E643="",Y610="Yes"),AND(B643="",E643<>"",Y610="Yes"),AND(B643=0,E643<>"",Y610="Yes"))),1,0) | [AI35]=1
R644: [A1]==IF(AG644=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R645: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R646: [A1]==IF(AG646=1,"X","") | [B2]==IF(OR(D647="Show",Q647="Show"),1,0) | [AD30]=Always show | [AI35]=1
R647: [A1]==IF(AG647=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D647="Show",D647="",Q647="Show",Q647=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D647="",Q647="")),1,0) | [AI35]=1
R648: [A1]==IF(AG648=1,"X","") | [B2]==B646 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R649: [A1]==IF(AG649=1,"X","") | [B2]==B648 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D647="Show",D647="",Q647="Show",Q647=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D647="Show",D649=""),AND(Q647="Show",Q649=""))),1,0) | [AI35]=1
R650: [A1]==IF(AG650=1,"X","") | [B2]==B649 | [AD30]=Always show | [AI35]=1
R651: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R652: [A1]==IF(AG652=1,"X","") | [B2]==IF(Y$610="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R653: [A1]==IF(AG653=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B653<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B653="",Y610="Yes"),AND(B653=1,Y610="No"))),1,0) | [AI35]=1
R654: [A1]==IF(AG654=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B654<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B654="",Y610="Yes"),AND(B654=1,Y610="No"))),1,0) | [AI35]=1
R655: [A1]==IF(AG655=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B655<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B655="",Y610="Yes"),AND(B655=1,Y610="No"))),1,0) | [AI35]=1
R656: [A1]==IF(AG656=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B656<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B656="",Y610="Yes"),AND(B656=1,Y610="No"))),1,0) | [AI35]=1
R657: [A1]==IF(AG657=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R658: [A1]==IF(AG658=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B658<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B658=1,Y610="No"),AND(B658=1,E658="",Y610="Yes"),AND(B658="",E658="",Y610="Yes"),AND(B658="",E658<>"",Y610="Yes"),AND(B658=0,E658<>"",Y610="Yes"))),1,0) | [AI35]=1
R659: [A1]==IF(AG659=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B659<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B659=1,Y610="No"),AND(B659=1,E659="",Y610="Yes"),AND(B659="",E659="",Y610="Yes"),AND(B659="",E659<>"",Y610="Yes"),AND(B659=0,E659<>"",Y610="Yes"))),1,0) | [AI35]=1
R660: [A1]==IF(AG660=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B660<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B660=1,Y610="No"),AND(B660=1,E660="",Y610="Yes"),AND(B660="",E660="",Y610="Yes"),AND(B660="",E660<>"",Y610="Yes"),AND(B660=0,E660<>"",Y610="Yes"))),1,0) | [AI35]=1
R661: [A1]==IF(AG661=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B661<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B661=1,Y610="No"),AND(B661=1,R661="",Y610="Yes"),AND(B661="",R661="",Y610="Yes"),AND(B661="",R661<>"",Y610="Yes"),AND(B661=0,R661<>"",Y610="Yes"))),1,0) | [AI35]=1
R662: [A1]==IF(AG662=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R663: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R664: [A1]==IF(AG664=1,"X","") | [B2]==IF(OR(D665="Show",Q665="Show"),1,0) | [AD30]=Always show | [AI35]=1
R665: [A1]==IF(AG665=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D665="Show",D665="",Q665="Show",Q665=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D665="",Q665="")),1,0) | [AI35]=1
R666: [A1]==IF(AG666=1,"X","") | [B2]==B664 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R667: [A1]==IF(AG667=1,"X","") | [B2]==B666 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D665="Show",D665="",Q665="Show",Q665=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D665="Show",D667=""),AND(Q665="Show",Q667=""))),1,0) | [AI35]=1
R668: [A1]==IF(AG668=1,"X","") | [B2]==B667 | [AD30]=Always show | [AI35]=1
R669: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R670: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N612," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R671: [A1]==IF(OR(SUM(AG672:AG731),Y671=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N673," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R672: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N673," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R673: [A1]==IF(AG673=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N612+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R674: [A1]==IF(AG674=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B674<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B674=1,Y671="No"),AND(B674=1,I674="",Y671="Yes"),AND(B674="",I674="",Y671="Yes"),AND(B674="",I674<>"",Y671="Yes"),AND(B674=0,I674<>"",Y671="Yes"))),1,0) | [AI35]=1
R675: [A1]==IF(AG675=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B675<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B675=1,Y671="No"),AND(B675=1,I675="",Y671="Yes"),AND(B675="",I675="",Y671="Yes"),AND(B675="",I675<>"",Y671="Yes"),AND(B675=0,I675<>"",Y671="Yes"))),1,0) | [AI35]=1
R676: [A1]==IF(AG676=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R677: [A1]==IF(AG677=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B677<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B677="",Y671="Yes"),AND(B677=1,Y671="No"))),1,0) | [AI35]=1
R678: [A1]==IF(AG678=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B678<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B678="",Y671="Yes"),AND(B678=1,Y671="No"))),1,0) | [AI35]=1
R679: [A1]==IF(AG679=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B679<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B679="",Y671="Yes"),AND(B679=1,Y671="No"))),1,0) | [AI35]=1
R680: [A1]==IF(AG680=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B680<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B680="",Y671="Yes"),AND(B680=1,Y671="No"))),1,0) | [AI35]=1
R681: [A1]==IF(AG681=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R682: [A1]==IF(AG682=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B682<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B682=1,Y671="No"),AND(B682=1,E682="",Y671="Yes"),AND(B682="",E682="",Y671="Yes"),AND(B682="",E682<>"",Y671="Yes"),AND(B682=0,E682<>"",Y671="Yes"))),1,0) | [AI35]=1
R683: [A1]==IF(AG683=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B683<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B683=1,Y671="No"),AND(B683=1,E683="",Y671="Yes"),AND(B683="",E683="",Y671="Yes"),AND(B683="",E683<>"",Y671="Yes"),AND(B683=0,E683<>"",Y671="Yes"))),1,0) | [AI35]=1
R684: [A1]==IF(AG684=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B684<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B684=1,Y671="No"),AND(B684=1,E684="",Y671="Yes"),AND(B684="",E684="",Y671="Yes"),AND(B684="",E684<>"",Y671="Yes"),AND(B684=0,E684<>"",Y671="Yes"))),1,0) | [AI35]=1
R685: [A1]==IF(AG685=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R686: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R687: [A1]==IF(AG687=1,"X","") | [B2]==IF(OR(D688="Show",Q688="Show"),1,0) | [AD30]=Always show | [AI35]=1
R688: [A1]==IF(AG688=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D688="Show",D688="",Q688="Show",Q688=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D688="",Q688="")),1,0) | [AI35]=1
R689: [A1]==IF(AG689=1,"X","") | [B2]==B687 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R690: [A1]==IF(AG690=1,"X","") | [B2]==B689 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D688="Show",D688="",Q688="Show",Q688=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D688="Show",D690=""),AND(Q688="Show",Q690=""))),1,0) | [AI35]=1
R691: [A1]==IF(AG691=1,"X","") | [B2]==B690 | [AD30]=Always show | [AI35]=1
R692: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R693: [A1]==IF(AG693=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R694: [A1]==IF(AG694=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B694<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B694="",Y671="Yes"),AND(B694=1,Y671="No"))),1,0) | [AI35]=1
R695: [A1]==IF(AG695=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B695<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B695="",Y671="Yes"),AND(B695=1,Y671="No"))),1,0) | [AI35]=1
R696: [A1]==IF(AG696=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B696<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B696="",Y671="Yes"),AND(B696=1,Y671="No"))),1,0) | [AI35]=1
R697: [A1]==IF(AG697=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B697<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B697="",Y671="Yes"),AND(B697=1,Y671="No"))),1,0) | [AI35]=1
R698: [A1]==IF(AG698=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B698<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B698="",Y671="Yes"),AND(B698=1,Y671="No"))),1,0) | [AI35]=1
R699: [A1]==IF(AG699=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B699<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B699="",Y671="Yes"),AND(B699=1,Y671="No"))),1,0) | [AI35]=1
R700: [A1]==IF(AG700=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B700<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B700="",Y671="Yes"),AND(B700=1,Y671="No"))),1,0) | [AI35]=1
R701: [A1]==IF(AG701=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R702: [A1]==IF(AG702=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B702<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B702=1,Y671="No"),AND(B702=1,E702="",Y671="Yes"),AND(B702="",E702="",Y671="Yes"),AND(B702="",E702<>"",Y671="Yes"),AND(B702=0,E702<>"",Y671="Yes"))),1,0) | [AI35]=1
R703: [A1]==IF(AG703=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B703<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B703=1,Y671="No"),AND(B703=1,E703="",Y671="Yes"),AND(B703="",E703="",Y671="Yes"),AND(B703="",E703<>"",Y671="Yes"),AND(B703=0,E703<>"",Y671="Yes"))),1,0) | [AI35]=1
R704: [A1]==IF(AG704=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B704<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B704=1,Y671="No"),AND(B704=1,E704="",Y671="Yes"),AND(B704="",E704="",Y671="Yes"),AND(B704="",E704<>"",Y671="Yes"),AND(B704=0,E704<>"",Y671="Yes"))),1,0) | [AI35]=1
R705: [A1]==IF(AG705=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R706: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R707: [A1]==IF(AG707=1,"X","") | [B2]==IF(OR(D708="Show",Q708="Show"),1,0) | [AD30]=Always show | [AI35]=1
R708: [A1]==IF(AG708=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D708="Show",D708="",Q708="Show",Q708=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D708="",Q708="")),1,0) | [AI35]=1
R709: [A1]==IF(AG709=1,"X","") | [B2]==B707 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R710: [A1]==IF(AG710=1,"X","") | [B2]==B709 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D708="Show",D708="",Q708="Show",Q708=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D708="Show",D710=""),AND(Q708="Show",Q710=""))),1,0) | [AI35]=1
R711: [A1]==IF(AG711=1,"X","") | [B2]==B710 | [AD30]=Always show | [AI35]=1
R712: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R713: [A1]==IF(AG713=1,"X","") | [B2]==IF(Y$671="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R714: [A1]==IF(AG714=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B714<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B714="",Y671="Yes"),AND(B714=1,Y671="No"))),1,0) | [AI35]=1
R715: [A1]==IF(AG715=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B715<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B715="",Y671="Yes"),AND(B715=1,Y671="No"))),1,0) | [AI35]=1
R716: [A1]==IF(AG716=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B716<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B716="",Y671="Yes"),AND(B716=1,Y671="No"))),1,0) | [AI35]=1
R717: [A1]==IF(AG717=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B717<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B717="",Y671="Yes"),AND(B717=1,Y671="No"))),1,0) | [AI35]=1
R718: [A1]==IF(AG718=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R719: [A1]==IF(AG719=1,"X","") | [D4]=• | [E5]=sdf | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B719<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B719=1,Y671="No"),AND(B719=1,E719="",Y671="Yes"),AND(B719="",E719="",Y671="Yes"),AND(B719="",E719<>"",Y671="Yes"),AND(B719=0,E719<>"",Y671="Yes"))),1,0) | [AI35]=1
R720: [A1]==IF(AG720=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B720<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B720=1,Y671="No"),AND(B720=1,E720="",Y671="Yes"),AND(B720="",E720="",Y671="Yes"),AND(B720="",E720<>"",Y671="Yes"),AND(B720=0,E720<>"",Y671="Yes"))),1,0) | [AI35]=1
R721: [A1]==IF(AG721=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B721<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B721=1,Y671="No"),AND(B721=1,E721="",Y671="Yes"),AND(B721="",E721="",Y671="Yes"),AND(B721="",E721<>"",Y671="Yes"),AND(B721=0,E721<>"",Y671="Yes"))),1,0) | [AI35]=1
R722: [A1]==IF(AG722=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B722<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B722=1,Y671="No"),AND(B722=1,R722="",Y671="Yes"),AND(B722="",R722="",Y671="Yes"),AND(B722="",R722<>"",Y671="Yes"),AND(B722=0,R722<>"",Y671="Yes"))),1,0) | [AI35]=1
R723: [A1]==IF(AG723=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R724: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R725: [A1]==IF(AG725=1,"X","") | [B2]==IF(OR(D726="Show",Q726="Show"),1,0) | [AD30]=Always show | [AI35]=1
R726: [A1]==IF(AG726=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D726="Show",D726="",Q726="Show",Q726=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D726="",Q726="")),1,0) | [AI35]=1
R727: [A1]==IF(AG727=1,"X","") | [B2]==B725 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R728: [A1]==IF(AG728=1,"X","") | [B2]==B727 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D726="Show",D726="",Q726="Show",Q726=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D726="Show",D728=""),AND(Q726="Show",Q728=""))),1,0) | [AI35]=1
R729: [A1]==IF(AG729=1,"X","") | [B2]==B728 | [AD30]=Always show | [AI35]=1
R730: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R731: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N673," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R732: [A1]==IF(OR(SUM(AG733:AG792),Y732=""),"X","") | [B2]=0 | [D4]==CONCATENATE("Show Room ",N734," Inspection Section?") | [Y25]=No | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R733: [B2]=0 | [D4]==CONCATENATE("↓ Room Section ", N734," ↓") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R734: [A1]==IF(AG734=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Internal Room Inspection Details: | [L12]=Area | [N14]==N673+1 | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R735: [A1]==IF(AG735=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Room (current use): | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B735<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B735=1,Y732="No"),AND(B735=1,I735="",Y732="Yes"),AND(B735="",I735="",Y732="Yes"),AND(B735="",I735<>"",Y732="Yes"),AND(B735=0,I735<>"",Y732="Yes"))),1,0) | [AI35]=1
R736: [A1]==IF(AG736=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Room designation: | [AB28]=← Enter Data | [AD30]=Always Shows | [AF32]==IF(B736<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B736=1,Y732="No"),AND(B736=1,I736="",Y732="Yes"),AND(B736="",I736="",Y732="Yes"),AND(B736="",I736<>"",Y732="Yes"),AND(B736=0,I736<>"",Y732="Yes"))),1,0) | [AI35]=1
R737: [A1]==IF(AG737=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Ceiling | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R738: [A1]==IF(AG738=1,"X","") | [D4]=At the time of inspection there were no defects to the ceilings of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B738<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B738="",Y732="Yes"),AND(B738=1,Y732="No"))),1,0) | [AI35]=1
R739: [A1]==IF(AG739=1,"X","") | [D4]=At the time of inspection the following defects were observed to the ceiling of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B739<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B739="",Y732="Yes"),AND(B739=1,Y732="No"))),1,0) | [AI35]=1
R740: [A1]==IF(AG740=1,"X","") | [D4]=• | [E5]=Cracking | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B740<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B740="",Y732="Yes"),AND(B740=1,Y732="No"))),1,0) | [AI35]=1
R741: [A1]==IF(AG741=1,"X","") | [D4]=• | [E5]=Staining | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B741<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B741="",Y732="Yes"),AND(B741=1,Y732="No"))),1,0) | [AI35]=1
R742: [A1]==IF(AG742=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R743: [A1]==IF(AG743=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B743<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B743=1,Y732="No"),AND(B743=1,E743="",Y732="Yes"),AND(B743="",E743="",Y732="Yes"),AND(B743="",E743<>"",Y732="Yes"),AND(B743=0,E743<>"",Y732="Yes"))),1,0) | [AI35]=1
R744: [A1]==IF(AG744=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B744<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B744=1,Y732="No"),AND(B744=1,E744="",Y732="Yes"),AND(B744="",E744="",Y732="Yes"),AND(B744="",E744<>"",Y732="Yes"),AND(B744=0,E744<>"",Y732="Yes"))),1,0) | [AI35]=1
R745: [A1]==IF(AG745=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B745<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B745=1,Y732="No"),AND(B745=1,E745="",Y732="Yes"),AND(B745="",E745="",Y732="Yes"),AND(B745="",E745<>"",Y732="Yes"),AND(B745=0,E745<>"",Y732="Yes"))),1,0) | [AI35]=1
R746: [A1]==IF(AG746=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R747: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R748: [A1]==IF(AG748=1,"X","") | [B2]==IF(OR(D749="Show",Q749="Show"),1,0) | [AD30]=Always show | [AI35]=1
R749: [A1]==IF(AG749=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D749="Show",D749="",Q749="Show",Q749=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D749="",Q749="")),1,0) | [AI35]=1
R750: [A1]==IF(AG750=1,"X","") | [B2]==B748 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R751: [A1]==IF(AG751=1,"X","") | [B2]==B750 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D749="Show",D749="",Q749="Show",Q749=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D749="Show",D751=""),AND(Q749="Show",Q751=""))),1,0) | [AI35]=1
R752: [A1]==IF(AG752=1,"X","") | [B2]==B751 | [AD30]=Always show | [AI35]=1
R753: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R754: [A1]==IF(AG754=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Walls | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R755: [A1]==IF(AG755=1,"X","") | [D4]=At the time of inspection there were no defects to the walls of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B755<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B755="",Y732="Yes"),AND(B755=1,Y732="No"))),1,0) | [AI35]=1
R756: [A1]==IF(AG756=1,"X","") | [D4]=At the time of inspection the following defects were observed to the walls of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B756<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B756="",Y732="Yes"),AND(B756=1,Y732="No"))),1,0) | [AI35]=1
R757: [A1]==IF(AG757=1,"X","") | [D4]=• | [E5]=Joinery timbers (skirtings, backmoulds, panelling) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B757<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B757="",Y732="Yes"),AND(B757=1,Y732="No"))),1,0) | [AI35]=1
R758: [A1]==IF(AG758=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B758<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B758="",Y732="Yes"),AND(B758=1,Y732="No"))),1,0) | [AI35]=1
R759: [A1]==IF(AG759=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B759<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B759="",Y732="Yes"),AND(B759=1,Y732="No"))),1,0) | [AI35]=1
R760: [A1]==IF(AG760=1,"X","") | [D4]=• | [E5]=Blistering cracking or warping | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B760<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B760="",Y732="Yes"),AND(B760=1,Y732="No"))),1,0) | [AI35]=1
R761: [A1]==IF(AG761=1,"X","") | [D4]=• | [E5]=Dampness | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B761<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B761="",Y732="Yes"),AND(B761=1,Y732="No"))),1,0) | [AI35]=1
R762: [A1]==IF(AG762=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R763: [A1]==IF(AG763=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B763<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B763=1,Y732="No"),AND(B763=1,E763="",Y732="Yes"),AND(B763="",E763="",Y732="Yes"),AND(B763="",E763<>"",Y732="Yes"),AND(B763=0,E763<>"",Y732="Yes"))),1,0) | [AI35]=1
R764: [A1]==IF(AG764=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B764<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B764=1,Y732="No"),AND(B764=1,E764="",Y732="Yes"),AND(B764="",E764="",Y732="Yes"),AND(B764="",E764<>"",Y732="Yes"),AND(B764=0,E764<>"",Y732="Yes"))),1,0) | [AI35]=1
R765: [A1]==IF(AG765=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B765<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B765=1,Y732="No"),AND(B765=1,E765="",Y732="Yes"),AND(B765="",E765="",Y732="Yes"),AND(B765="",E765<>"",Y732="Yes"),AND(B765=0,E765<>"",Y732="Yes"))),1,0) | [AI35]=1
R766: [A1]==IF(AG766=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R767: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R768: [A1]==IF(AG768=1,"X","") | [B2]==IF(OR(D769="Show",Q769="Show"),1,0) | [AD30]=Always show | [AI35]=1
R769: [A1]==IF(AG769=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D769="Show",D769="",Q769="Show",Q769=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D769="",Q769="")),1,0) | [AI35]=1
R770: [A1]==IF(AG770=1,"X","") | [B2]==B768 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R771: [A1]==IF(AG771=1,"X","") | [B2]==B770 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D769="Show",D769="",Q769="Show",Q769=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D769="Show",D771=""),AND(Q769="Show",Q771=""))),1,0) | [AI35]=1
R772: [A1]==IF(AG772=1,"X","") | [B2]==B771 | [AD30]=Always show | [AI35]=1
R773: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R774: [A1]==IF(AG774=1,"X","") | [B2]==IF(Y$732="Yes",1,0) | [D4]=Floors and floor voids | [AB28]=This line will always show on the report | [AD30]=Always Shows | [AI35]=1
R775: [A1]==IF(AG775=1,"X","") | [D4]=At the time of inspection there were no defects to the floor voids of this room. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B775<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B775="",Y732="Yes"),AND(B775=1,Y732="No"))),1,0) | [AI35]=1
R776: [A1]==IF(AG776=1,"X","") | [D4]=At the time of inspection the following defects were observed to the floor voids of this room: | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B776<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B776="",Y732="Yes"),AND(B776=1,Y732="No"))),1,0) | [AI35]=1
R777: [A1]==IF(AG777=1,"X","") | [D4]=• | [E5]=Woodworm | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B777<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B777="",Y732="Yes"),AND(B777=1,Y732="No"))),1,0) | [AI35]=1
R778: [A1]==IF(AG778=1,"X","") | [D4]=• | [E5]=Wood rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B778<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B778="",Y732="Yes"),AND(B778=1,Y732="No"))),1,0) | [AI35]=1
R779: [A1]==IF(AG779=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R780: [A1]==IF(AG780=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B780<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B780=1,Y732="No"),AND(B780=1,E780="",Y732="Yes"),AND(B780="",E780="",Y732="Yes"),AND(B780="",E780<>"",Y732="Yes"),AND(B780=0,E780<>"",Y732="Yes"))),1,0) | [AI35]=1
R781: [A1]==IF(AG781=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B781<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B781=1,Y732="No"),AND(B781=1,E781="",Y732="Yes"),AND(B781="",E781="",Y732="Yes"),AND(B781="",E781<>"",Y732="Yes"),AND(B781=0,E781<>"",Y732="Yes"))),1,0) | [AI35]=1
R782: [A1]==IF(AG782=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B782<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B782=1,Y732="No"),AND(B782=1,E782="",Y732="Yes"),AND(B782="",E782="",Y732="Yes"),AND(B782="",E782<>"",Y732="Yes"),AND(B782=0,E782<>"",Y732="Yes"))),1,0) | [AI35]=1
R783: [A1]==IF(AG783=1,"X","") | [D4]=Moisture reading taken from the timbers was recorded as:  | [S19]=%. | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B783<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B783=1,Y732="No"),AND(B783=1,R783="",Y732="Yes"),AND(B783="",R783="",Y732="Yes"),AND(B783="",R783<>"",Y732="Yes"),AND(B783=0,R783<>"",Y732="Yes"))),1,0) | [AI35]=1
R784: [A1]==IF(AG784=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R785: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R786: [A1]==IF(AG786=1,"X","") | [B2]==IF(OR(D787="Show",Q787="Show"),1,0) | [AD30]=Always show | [AI35]=1
R787: [A1]==IF(AG787=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D787="Show",D787="",Q787="Show",Q787=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D787="",Q787="")),1,0) | [AI35]=1
R788: [A1]==IF(AG788=1,"X","") | [B2]==B786 | [AB28]=← Add Images | [AD30]=Determined by surveyor | [AI35]=1
R789: [A1]==IF(AG789=1,"X","") | [B2]==B788 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D787="Show",D787="",Q787="Show",Q787=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D787="Show",D789=""),AND(Q787="Show",Q789=""))),1,0) | [AI35]=1
R790: [A1]==IF(AG790=1,"X","") | [B2]==B789 | [AD30]=Always show | [AI35]=1
R791: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R792: [B2]=0 | [D4]==CONCATENATE("↑ Room Section ", N734," ↑") | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R793: [A1]==IF(AG793=1,"X","") | [B2]=1 | [D4]=Summary | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R794: [A1]==IF(AG794=1,"X","") | [B2]=0 | [D4]=It was noted that you had issues in the following timbers: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B794<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B794=""),1,0) | [AI35]=1
R795: [A1]==IF(AG795=1,"X","") | [B2]=0 | [D4]=Notes for the surveyor: Write where problem is e.g., joists 1,2 and 3 counting from left of front elevation. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide | [AI35]=1
R796: [A1]==IF(AG796=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B796<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B796=1,E796=""),AND(B796="",E796=""),AND(B796="",E796<>""),AND(B796=0,E796<>""))),1,0) | [AI35]=1
R797: [A1]==IF(AG797=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B797<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B797=1,E797=""),AND(B797="",E797=""),AND(B797="",E797<>""),AND(B797=0,E797<>""))),1,0) | [AI35]=1
R798: [A1]==IF(AG798=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B798<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B798=1,E798=""),AND(B798="",E798=""),AND(B798="",E798<>""),AND(B798=0,E798<>""))),1,0) | [AI35]=1
R799: [A1]==IF(AG799=1,"X","") | [B2]=0 | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B799<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B799=1,E799=""),AND(B799="",E799=""),AND(B799="",E799<>""),AND(B799=0,E799<>""))),1,0) | [AI35]=1
R800: [A1]==IF(AG800=1,"X","") | [B2]=1 | [D4]=The timbers were suffering from the following issues: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B800<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B800=""),1,0) | [AI35]=1
R801: [A1]==IF(AG801=1,"X","") | [B2]=0 | [D4]=• | [E5]=A woodworm infestation, the attack was of common furniture beetle (anobium punctatum) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B801<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B801=""),1,0) | [AI35]=1
R802: [A1]==IF(AG802=1,"X","") | [B2]=1 | [D4]=• | [E5]=An attack of wood rotting fungi, this was identified as wet rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B802<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B802=""),1,0) | [AI35]=1
R803: [A1]==IF(AG803=1,"X","") | [B2]=1 | [D4]=• | [E5]=Rotting timbers were also suffering from an infestation of woodboring weevil (Pentarthrum Huttoni) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B803<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B803=""),1,0) | [AI35]=1
R804: [A1]==IF(AG804=1,"X","") | [B2]=0 | [D4]=• | [E5]=An attack of wood rotting fungi, this was identified as dry rot (sepulae lacrymans) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B804<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B804=""),1,0) | [AI35]=1
R805: [A1]==IF(AG805=1,"X","") | [B2]=1 | [D4]=• | [E5]=A high W/W moisture level to the floor timbers, this was due to a lack of ventilation to the sub floor voids | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B805<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B805=""),1,0) | [AI35]=1
R806: [A1]==IF(AG806=1,"X","") | [B2]=0 | [D4]=Dry Rot - Treatment And Party Wall Act | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B806<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B806=""),1,0) | [AI35]=1
R807: [A1]==IF(AG807=1,"X","") | [B2]=0 | [D4]=Should an attack of dry rot affect the party wall (the wall between you and your neighbouring property) It is important that we treat the fungal attack in it's entirety, that is from both sides. The h… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B807<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B807=""),1,0) | [AI35]=1
R808: [A1]==IF(AG808=1,"X","") | [B2]=0 | [D4]=Please find attached letter of notification to print out and pass to your neighbour, this should also assist with your party wall obligations (you are legally required to tell your neighbour of anythi… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AE31]=sfsf | [AF32]==IF(B808<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B808=""),1,0) | [AI35]=1
R809: [A1]==IF(AG809=1,"X","") | [B2]=0 | [D4]=Non-guaranteed work: The work in this quotation is carried out as per your instructions and not as per our recommendations, we have no way of knowing if the attack has spread to adjoining properties T… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AE31]=sfsf | [AF32]==IF(B809<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B809=""),1,0) | [AI35]=1
R810: [A1]==IF(AG810=1,"X","") | [B2]=1 | [D4]=Proposals below | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B810<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B810=""),1,0) | [AI35]=1
R811: [A1]==IF(AG811=1,"X","") | [B2]=1 | [D4]=We would propose for the following works to be carried out: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B811<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B811=""),1,0) | [AI35]=1
R812: [A1]==IF(AG812=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treatment for Dry Rot attack, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B812<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B812=""),1,0) | [AI35]=1
R813: [A1]==IF(AG813=1,"X","") | [B2]=0 | [D4]=• | [E5]=Timber replacement and treatment for wood rot, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B813<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B813=""),1,0) | [AI35]=1
R814: [A1]==IF(AG814=1,"X","") | [B2]=1 | [D4]=• | [E5]=Timber replacement and treatment for wood rot and woodboring insects, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B814<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B814=""),1,0) | [AI35]=1
R815: [A1]==IF(AG815=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treatment for woodworm infestation, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B815<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B815=""),1,0) | [AI35]=1
R816: [A1]==IF(AG816=1,"X","") | [B2]=0 | [D4]=• | [E5]=Obtain permission from the vendor to carry out a destructive survey. For your convenience we have included a pre-filled email template for you to request permission from the property owner. You can us… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AE31]=ffsdf | [AF32]==IF(B816<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B816=""),1,0) | [AI35]=1
R817: [A1]==IF(AG817=1,"X","") | [B2]=0 | [D4]=Schedule For Treatment Of Woodworm | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B817<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B817=""),1,0) | [AI35]=1
R818: [A1]==IF(AG818=1,"X","") | [B2]=0 | [D4]=• | [E5]=Create openings/lift floorboards as required ensuring no nails left sticking out of removed boards. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B818<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B818=""),1,0) | [AI35]=1
R819: [A1]==IF(AG819=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cover open electric outlets with polythene to prevent wetting (electric shock hazard). | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B819<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B819=""),1,0) | [AI35]=1
R820: [A1]==IF(AG820=1,"X","") | [B2]=0 | [D4]=• | [E5]=Apply fog to voids/surfaces as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B820<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B820=""),1,0) | [AI35]=1
R821: [A1]==IF(AG821=1,"X","") | [B2]=0 | [D4]=• | [E5]=Make good to all areas treated. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B821<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B821=""),1,0) | [AI35]=1
R822: [A1]==IF(AG822=1,"X","") | [B2]=0 | [D4]=Schedule For Treatment Of Dry Rot | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B822<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B822=""),1,0) | [AI35]=1
R823: [A1]==IF(AG823=1,"X","") | [B2]=0 | [D4]=• | [E5]=Open up affected area. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B823<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B823=""),1,0) | [AI35]=1
R824: [A1]==IF(AG824=1,"X","") | [B2]=0 | [D4]=• | [E5]=Support any structural bearing timbers for duration of works. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B824<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B824=""),1,0) | [AI35]=1
R825: [A1]==IF(AG825=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cut out affected timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B825<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B825=""),1,0) | [AI35]=1
R826: [A1]==IF(AG826=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all remaining timber cut ends as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B826<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B826=""),1,0) | [AI35]=1
R827: [A1]==IF(AG827=1,"X","") | [B2]=0 | [D4]=• | [E5]=Prepare and place new timbers, do not fix. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B827<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B827=""),1,0) | [AI35]=1
R828: [A1]==IF(AG828=1,"X","") | [B2]=0 | [D4]=• | [E5]=Remove new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B828<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B828=""),1,0) | [AI35]=1
R829: [A1]==IF(AG829=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all masonry as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B829<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B829=""),1,0) | [AI35]=1
R830: [A1]==IF(AG830=1,"X","") | [B2]=0 | [D4]=• | [E5]=Clean out and sterilise joist wall socket holes as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B830<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B830=""),1,0) | [AI35]=1
R831: [A1]==IF(AG831=1,"X","") | [B2]=0 | [D4]=• | [E5]=Apply fungal treatment gel to walls. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B831<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B831=""),1,0) | [AI35]=1
R832: [A1]==IF(AG832=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install membrane system to protect walls and promote drying of masonry. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B832<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B832=""),1,0) | [AI35]=1
R833: [A1]==IF(AG833=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all surfaces of new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B833<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B833=""),1,0) | [AI35]=1
R834: [A1]==IF(AG834=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install bower beam metal plating system. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B834<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B834=""),1,0) | [AI35]=1
R835: [A1]==IF(AG835=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat and endwrap joists as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B835<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B835=""),1,0) | [AI35]=1
R836: [A1]==IF(AG836=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install and fix new timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B836<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B836=""),1,0) | [AI35]=1
R837: [A1]==IF(AG837=1,"X","") | [B2]=0 | [D4]=• | [E5]=Bag up and remove debris to safe external area. Clean and tidy site. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B837<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B837=""),1,0) | [AI35]=1
R838: [A1]==IF(AG838=1,"X","") | [B2]=0 | [D4]=• | [E5]=Clean and tidy site. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B838<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B838=""),1,0) | [AI35]=1
R839: [A1]==IF(AG839=1,"X","") | [B2]=0 | [D4]=Schedule For Treatment Of Wet Rot | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B839<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B839=""),1,0) | [AI35]=1
R840: [A1]==IF(AG840=1,"X","") | [B2]=0 | [D4]=• | [E5]=Open up affected area. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B840<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B840=""),1,0) | [AI35]=1
R841: [A1]==IF(AG841=1,"X","") | [B2]=0 | [D4]=• | [E5]=Support any structural bearing timbers for duration of works. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B841<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B841=""),1,0) | [AI35]=1
R842: [A1]==IF(AG842=1,"X","") | [B2]=0 | [D4]=• | [E5]=Cut out affected timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B842<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B842=""),1,0) | [AI35]=1
R843: [A1]==IF(AG843=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all remaining timber cut ends as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B843<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B843=""),1,0) | [AI35]=1
R844: [A1]==IF(AG844=1,"X","") | [B2]=0 | [D4]=• | [E5]=Prepare and place new timbers, do not fix. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B844<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B844=""),1,0) | [AI35]=1
R845: [A1]==IF(AG845=1,"X","") | [B2]=0 | [D4]=• | [E5]=Remove new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B845<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B845=""),1,0) | [AI35]=1
R846: [A1]==IF(AG846=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all masonry as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B846<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B846=""),1,0) | [AI35]=1
R847: [A1]==IF(AG847=1,"X","") | [B2]=0 | [D4]=• | [E5]=Clean out and sterilise joist wall socket holes as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B847<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B847=""),1,0) | [AI35]=1
R848: [A1]==IF(AG848=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat all surfaces of new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B848<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B848=""),1,0) | [AI35]=1
R849: [A1]==IF(AG849=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install bower beam metal plating system. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B849<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B849=""),1,0) | [AI35]=1
R850: [A1]==IF(AG850=1,"X","") | [B2]=0 | [D4]=• | [E5]=Treat and endwrap joists as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B850<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B850=""),1,0) | [AI35]=1
R851: [A1]==IF(AG851=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install and fix new timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B851<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B851=""),1,0) | [AI35]=1
R852: [A1]==IF(AG852=1,"X","") | [B2]=0 | [D4]=• | [E5]=Bag up and remove debris to safe external area.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B852<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B852=""),1,0) | [AI35]=1
R853: [A1]==IF(AG853=1,"X","") | [B2]=0 | [D4]=• | [E5]=Clean and tidy site. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B853<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B853=""),1,0) | [AI35]=1
R854: [A1]==IF(AG854=1,"X","") | [B2]=1 | [D4]=Schedule For Treatment Of Wet Rot And Woodboring Weevil | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B854<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B854=""),1,0) | [AI35]=1
R855: [A1]==IF(AG855=1,"X","") | [B2]=1 | [D4]=• | [E5]=Open up affected area. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B855<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B855=""),1,0) | [AI35]=1
R856: [A1]==IF(AG856=1,"X","") | [B2]=0 | [D4]=• | [E5]=Support any structural bearing timbers for duration of works. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B856<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B856=""),1,0) | [AI35]=1
R857: [A1]==IF(AG857=1,"X","") | [B2]=1 | [D4]=• | [E5]=Cut out affected timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B857<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B857=""),1,0) | [AI35]=1
R858: [A1]==IF(AG858=1,"X","") | [B2]=1 | [D4]=• | [E5]=Treat all remaining timber cut ends as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B858<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B858=""),1,0) | [AI35]=1
R859: [A1]==IF(AG859=1,"X","") | [B2]=0 | [D4]=• | [E5]=Prepare and place new timbers, do not fix. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B859<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B859=""),1,0) | [AI35]=1
R860: [A1]==IF(AG860=1,"X","") | [B2]=0 | [D4]=• | [E5]=Remove new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B860<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B860=""),1,0) | [AI35]=1
R861: [A1]==IF(AG861=1,"X","") | [B2]=1 | [D4]=• | [E5]=Treat all masonry as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B861<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B861=""),1,0) | [AI35]=1
R862: [A1]==IF(AG862=1,"X","") | [B2]=1 | [D4]=• | [E5]=Clean out and sterilise joist wall socket holes as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B862<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B862=""),1,0) | [AI35]=1
R863: [A1]==IF(AG863=1,"X","") | [B2]=1 | [D4]=• | [E5]=Treat all surfaces of new timbers with dual purpose application. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B863<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B863=""),1,0) | [AI35]=1
R864: [A1]==IF(AG864=1,"X","") | [B2]=0 | [D4]=• | [E5]=Install bower beam metal plating system. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B864<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B864=""),1,0) | [AI35]=1
R865: [A1]==IF(AG865=1,"X","") | [B2]=1 | [D4]=• | [E5]=Treat and endwrap joists as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B865<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B865=""),1,0) | [AI35]=1
R866: [A1]==IF(AG866=1,"X","") | [B2]=1 | [D4]=• | [E5]=Install and fix new timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B866<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B866=""),1,0) | [AI35]=1
R867: [A1]==IF(AG867=1,"X","") | [B2]=1 | [D4]=• | [E5]=Bag up and remove debris to safe external area.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B867<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B867=""),1,0) | [AI35]=1
R868: [A1]==IF(AG868=1,"X","") | [B2]=1 | [D4]=• | [E5]=Clean and tidy site. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B868<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B868=""),1,0) | [AI35]=1
R869: [A1]==IF(AG869=1,"X","") | [B2]==B870 | [D4]=Additional Supporting Comments From Surveyor | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B869<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B869=""),1,0) | [AI35]=1
R870: [A1]==IF(AG870=1,"X","") | [B2]=1 | [D4]=We have quoted to carry out a guaranteed solution to resolve the issue fully this will come with a 25 year guarantee. The floor is bouncing, and I was able to push a screw driver through the joist end… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B870<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B870=1,D870=""),AND(B870="",D870=""),AND(B870="",D870<>""),AND(B870=0,D870<>""))),1,0) | [AI35]=1
R871: [A1]==IF(AG871=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R872: [A1]==IF(AG872=1,"X","") | [B2]=1 | [D4]=Report produced under the guidance of Tyne Tees Damp Proofing Ltd by: | [AD30]=Always show | [AI35]=1
R873: [A1]==IF(AG873=1,"X","") | [B2]=1 | [AD30]=Always show | [AI35]=1
R874: [A1]==IF(AG874=1,"X","") | [B2]==IF(Costing!E14="Steven Robinson",1,0) | [D4]=Steven Robinson | [AD30]=Show dependant on Surveyor | [AI35]=1
R875: [A1]==IF(AG875=1,"X","") | [B2]==B874 | [D4]=Steve Robinson A.Inst.SSE. | [AD30]=Show dependant on Surveyor | [AI35]=1
R876: [A1]==IF(AG876=1,"X","") | [B2]==B875 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor | [AI35]=1
R877: [A1]==IF(AG877=1,"X","") | [B2]==IF(Costing!E14="Graeme Hazel",1,0) | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor | [AI35]=1
R878: [A1]==IF(AG878=1,"X","") | [B2]==B877 | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor | [AI35]=1
R879: [A1]==IF(AG879=1,"X","") | [B2]==B878 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor | [AI35]=1
R880: [A1]==IF(AG880=1,"X","") | [B2]==IF(Costing!E14="Mike Davison",1,0) | [D4]=Mike Davison | [AD30]=Show dependant on Surveyor | [AI35]=1
R881: [A1]==IF(AG881=1,"X","") | [B2]==B880 | [D4]=Mike Davison CSSW  M.inst.SSE  | [AD30]=Show dependant on Surveyor | [AI35]=1
R882: [A1]==IF(AG882=1,"X","") | [B2]==B881 | [D4]=Technical Director | [AD30]=Show dependant on Surveyor | [AI35]=1
R883: [A1]==IF(AG883=1,"X","") | [B2]=1 | [D4]=Sketch Plan | [AB28]=Will always dependant on visibility | [AD30]=Determined by office | [AI35]=1
R884: [B2]==B883 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R885: [B2]==B884 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R886: [B2]==B885 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R887: [B2]==B886 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R888: [B2]==B887 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R889: [B2]==B888 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R890: [B2]==B889 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R891: [B2]==B890 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R892: [B2]==B891 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R893: [B2]==B892 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R894: [B2]==B893 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R895: [B2]==B894 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R896: [B2]==B895 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R897: [B2]==B896 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R898: [B2]==B897 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R899: [B2]==B898 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R900: [B2]==B899 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R901: [B2]==B900 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R902: [B2]==B901 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R903: [B2]==B902 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R904: [B2]==B903 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R905: [B2]==B904 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R906: [B2]==B905 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R907: [B2]==B906 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R908: [B2]==B907 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R909: [B2]==B908 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R910: [B2]==B909 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R911: [B2]==B910 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R912: [B2]==B911 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R913: [B2]==B912 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R914: [B2]==B913 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R915: [B2]==B914 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R916: [B2]==B915 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R917: [B2]==B916 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R918: [B2]==B917 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R919: [B2]==B918 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R920: [B2]==B919 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R921: [B2]==B920 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R922: [B2]==B921 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R923: [B2]==B922 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R924: [B2]==B923 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R925: [B2]==B924 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R926: [B2]==B925 | [AB28]=Will always show | [AD30]=Always show | [AI35]=1
R927: [AI35]==SUBTOTAL(3,AI4:AI926)
R928: [D4]=Office tasks when submitting an estimate 
R929: [D4]=You need to attach the following items to the estimate:
R930: [D4]=• The Survey Inspection Report (generated from the Report tab in this document).
R931: [D4]=• Our Terms and Conditions (latest version always found in the folder '1.Current Documentation'). 
R932: [D4]=• General Notes for clients and Health and Safety precautions (latest version always found in the folder '1.Current Documentation'). 
R933: [D4]=• Access Permission Email Template (generated from the Access Email Template tab in this document). | [AB28]=Access Email Template: Will show if access permission is needed
R934: [D4]=• Party Wall Letter (generated from the Party Wall Letter tab in this document). | [AB28]=Party Wall Letter: Will show if letter is needed
R937: [D4]=Notes for office
R938: [D4]=Page Breaks:
R939: [D4]=To understand page breaks the link below will be of assistance:
R940: [D4]=https://support.microsoft.com/en-gb/office/insert-move-or-delete-page-breaks-in-a-worksheet-ad3dc726-beec-4a4c-861f-ed640612bdc2
R941: [D4]=Image Best Practices:
R942: [D4]=• Use the 'Alt' key to align an image to the bottom of the cell.
R943: [D4]=• To format an image right click on it to set the height and/or crop ( a good starting height is 6cm).
R944: [D4]=• Try to keep images the same height especially if on the same row and ensure you use the 'alt' key to align the image to the bottom of the cell.
R945: [D4]=• Try and keep the images a fraction smaller than the cell height to prevent overspill if the image cell falls on a page break.
R946: [D4]=• Try and keep the images centrally above their descriptions.
```

## SECTION 3: COSTING SHEET — Complete Pricing Engine

**Total Rows:** 217  |  **Total Cols:** 47

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
R16: [A1]==IF(AU16=1,"X","") | [B2]=TIMBER SHEET
R17: [A1]==IF(AU17=1,"X","") | [B2]=Materials | [F6]=Area/No. | [G7]=UOM | [H8]=Default ↵Mats Cost | [I9]=Adjusted ↵Mats Cost | [J10]=M/U | [K11]=Mats Tot | [M13]=Labour | [N14]=Hour Mult | [O15]=Total Hours | [P16]=Default ↵Lab Cost | [Q17]=Adjusted ↵Lab Cost | [R18]=LMU | [S19]=Lab Total | [T20]=Line total | [U21]=Contractor Materials | [V22]=Contractor hours pay
R18: [A1]==IF(AU18=1,"X","")
R20: [A1]==IF(AU20=1,"X","") | [B2]=Preparatory work | [M13]==B20 | [U21]==M20
R21: [A1]==IF(AU21=1,"X","") | [B2]=Remove radiators & cap valves | [F6]=0 | [G7]=Each | [H8]=7 | [I9]==(H21/100)*(100+$F$26) | [J10]=0.3 | [K11]==F21*I21*(1+J21) | [M13]==B21 | [N14]==(1/60)*20 | [O15]==F21*N21 | [P16]==$D$139 | [Q17]==(P21/100)*(100+$F$26) | [R18]=1 | [S19]==(O21*Q21*(1+R21)) | [T20]==K21+S21 | [U21]==F21*H21*1.1 | [V22]==O21*$E$139 | [AT46]==IF(F21<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F21=""),1,0)
R22: [A1]==IF(AU22=1,"X","") | [B2]=Remove socket fronts and isolate | [F6]=0 | [G7]=Each | [H8]=2 | [I9]==(H22/100)*(100+$F$26) | [J10]=0.3 | [K11]==F22*I22*(1+J22) | [M13]==B22 | [N14]==(1/60)*12 | [O15]==F22*N22 | [P16]==$D$139 | [Q17]==(P22/100)*(100+$F$26) | [R18]=1 | [S19]==(O22*Q22*(1+R22)) | [T20]==K22+S22 | [U21]==F22*H22*1.1 | [V22]==O22*$E$139 | [AT46]==IF(F22<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F22=""),1,0)
R23: [A1]==IF(AU23=1,"X","") | [B2]=Skirting board removal & set aside | [F6]=0 | [G7]=LM | [H8]=0.1 | [I9]==(H23/100)*(100+$F$26) | [J10]=0.3 | [K11]==F23*I23*(1+J23) | [L12]=0.25 | [M13]==B23 | [N14]=0.07 | [O15]==F23*N23 | [P16]==$D$139 | [Q17]==(P23/100)*(100+$F$26) | [R18]=1 | [S19]==(O23*Q23*(1+R23)) | [T20]==K23+S23 | [U21]==F23*H23*1.1 | [V22]==O23*$E$139 | [AT46]==IF(F23<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F23=""),1,0)
R24: [A1]==IF(AU24=1,"X","") | [B2]=Strip Wall Paper | [F6]=0 | [G7]=M2 | [H8]=0.5 | [I9]==(H24/100)*(100+$F$26) | [J10]=0.3 | [K11]==F24*I24*(1+J24) | [L12]=0.25 | [M13]==B24 | [N14]=0.5 | [O15]==F24*N24 | [P16]==$D$139 | [Q17]==(P24/100)*(100+$F$26) | [R18]=1 | [S19]==(O24*Q24*(1+R24)) | [T20]==K24+S24 | [U21]==F24*H24*1.1 | [V22]==O24*$E$139 | [AT46]==IF(F24<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F24=""),1,0)
R25: [A1]==IF(AU25=1,"X","") | [B2]=Antinox HD Floor Protection Boards – 2.4m x 1.2m | [F6]=0 | [G7]=M2 | [H8]==4.16*1.1 | [I9]==(H25/100)*(100+$F$26) | [J10]=0.3 | [K11]==F25*I25*(1+J25) | [L12]=0.25 | [M13]==B25 | [N14]==(1/60)*2 | [O15]==F25*N25 | [P16]==$D$139 | [Q17]==(P25/100)*(100+$F$26) | [R18]=1 | [S19]==(O25*Q25*(1+R25)) | [T20]==K25+S25 | [U21]==F25*H25*1.1 | [V22]==O25*$E$139 | [AT46]==IF(F25<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F25=""),1,0)
R26: [A1]==IF(AU26=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K21:K25) | [M13]=Totals | [O15]==SUM(O21:O25) | [S19]==SUM(S21:S25) | [T20]==SUM(T21:T25) | [U21]==SUM(U21:U25) | [V22]==SUM(V21:V25)
R28: [A1]==IF(AU28=1,"X","") | [B2]=Strip out | [M13]==B28 | [U21]==M28
R29: [A1]==IF(AU29=1,"X","") | [B2]=Remove carpet/tiles/overlays | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H29/100)*(100+$F$39) | [J10]=0 | [K11]==F29*I29*(1+J29) | [L12]=0.75 | [M13]==B29 | [N14]==1/6 | [O15]==F29*N29 | [P16]==$D$139 | [Q17]==(P29/100)*(100+$F$39) | [R18]=1 | [S19]==(O29*Q29*(1+R29)) | [T20]==K29+S29 | [U21]==F29*H29*1.1 | [V22]==O29*$E$139 | [AT46]==IF(F29<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F29=""),1,0)
R30: [A1]==IF(AU30=1,"X","") | [B2]=Remove plaster/render (Walls) | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H30/100)*(100+$F$39) | [J10]=0 | [K11]==F30*I30*(1+J30) | [L12]=0.75 | [M13]=Plaster/render Removal (Walls) | [N14]=0.3 | [O15]==F30*N30 | [P16]==$D$139 | [Q17]==(P30/100)*(100+$F$39) | [R18]=1 | [S19]==(O30*Q30*(1+R30)) | [T20]==K30+S30 | [U21]==F30*H30*1.1 | [V22]==O30*$E$139 | [AT46]==IF(F30<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F30=""),1,0)
R31: [A1]==IF(AU31=1,"X","") | [B2]=Removal of stud walls etc (Bag & cart away) | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H31/100)*(100+$F$39) | [J10]=0 | [K11]==F31*I31*(1+J31) | [L12]=0.8 | [M13]=Removal of stud walls etc | [N14]=0.4 | [O15]==F31*N31 | [P16]==$D$139 | [Q17]==(P31/100)*(100+$F$39) | [R18]=1 | [S19]==(O31*Q31*(1+R31)) | [T20]==K31+S31 | [U21]==F31*H31*1.1 | [V22]==O31*$E$139 | [AT46]==IF(F31<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F31=""),1,0)
R32: [A1]==IF(AU32=1,"X","") | [B2]=Plaster & stud Removal (Ceilings) | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H32/100)*(100+$F$39) | [J10]=0 | [K11]==F32*I32*(1+J32) | [L12]=0.6 | [M13]=Plaster/render Removal (Ceilings) | [N14]=0.8 | [O15]==F32*N32 | [P16]==$D$139 | [Q17]==(P32/100)*(100+$F$39) | [R18]=1 | [S19]==(O32*Q32*(1+R32)) | [T20]==K32+S32 | [U21]==F32*H32*1.1 | [V22]==O32*$E$139 | [AT46]==IF(F32<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F32=""),1,0)
R33: [A1]==IF(AU33=1,"X","") | [B2]=Strip out existing timber floor (GF) | [F6]=16 | [G7]=M2 | [H8]=0 | [I9]==(H33/100)*(100+$F$39) | [J10]=0 | [K11]==F33*I33*(1+J33) | [M13]=Strip out existing timber floor (GF) | [N14]=0.5 | [O15]==F33*N33 | [P16]==$D$139 | [Q17]==(P33/100)*(100+$F$39) | [R18]=1 | [S19]==(O33*Q33*(1+R33)) | [T20]==K33+S33 | [U21]==F33*H33*1.1 | [V22]==O33*$E$139 | [AT46]==IF(F33<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F33=""),1,0)
R34: [A1]==IF(AU34=1,"X","") | [B2]=Scrape back/clear sub floors | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H34/100)*(100+$F$39) | [J10]=0 | [K11]==F34*I34*(1+J34) | [M13]=Scrape back/clear sub floors | [N14]=0.25 | [O15]==F34*N34 | [P16]==$D$139 | [Q17]==(P34/100)*(100+$F$39) | [R18]=1 | [S19]==(O34*Q34*(1+R34)) | [T20]==K34+S34 | [U21]==F34*H34*1.1 | [V22]==O34*$E$139 | [AT46]==IF(F34<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F34=""),1,0)
R35: [A1]==IF(AU35=1,"X","") | [B2]=Grind back mortar courses on brickwork | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H35/100)*(100+$F$39) | [J10]=0 | [K11]==F35*I35*(1+J35) | [M13]=Grind back mortar | [N14]=0.3 | [O15]==F35*N35 | [P16]==$D$139 | [Q17]==(P35/100)*(100+$F$39) | [R18]=1 | [S19]==(O35*Q35*(1+R35)) | [T20]==K35+S35 | [U21]==F35*H35*1.1 | [V22]==O35*$E$139 | [AT46]==IF(F35<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F35=""),1,0)
R36: [A1]==IF(AU36=1,"X","") | [B2]=Wire scrub brickwork faces | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H36/100)*(100+$F$39) | [J10]=0 | [K11]==F36*I36*(1+J36) | [M13]=Wire brush | [N14]=0.25 | [O15]==F36*N36 | [P16]==$D$139 | [Q17]==(P36/100)*(100+$F$39) | [R18]=1 | [S19]==(O36*Q36*(1+R36)) | [T20]==K36+S36 | [U21]==F36*H36*1.1 | [V22]==O36*$E$139 | [AT46]==IF(F36<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F36=""),1,0)
R37: [A1]==IF(AU37=1,"X","") | [B2]=Bag up debris & cart outside  | [F6]==SUM(F29:F34)*2 | [G7]=Bags | [H8]=1 | [I9]==(H37/100)*(100+$F$39) | [J10]=0.3 | [K11]==F37*I37*(1+J37) | [M13]=Bag up debris cart outside  | [N14]=0.01 | [O15]==F37*N37 | [P16]==$D$139 | [Q17]==(P37/100)*(100+$F$39) | [R18]=1 | [S19]==(O37*Q37*(1+R37)) | [T20]==K37+S37 | [U21]==F37*H37*1.1 | [V22]==O37*$E$139
R38: [A1]==IF(AU38=1,"X","") | [B2]=Disposal via licensed transfer agent | [F6]==F37 | [G7]=Bags | [H8]==IF(F38=0,0,IF(F38<=20,40/F38,2)) | [I9]==(H38/100)*(100+$F$39) | [J10]=0.3 | [K11]==F38*I38*(1+J38) | [M13]=Disposal via licensed transfer agent | [N14]=0 | [O15]=0 | [P16]==$D$139 | [Q17]==(P38/100)*(100+$F$39) | [R18]=1 | [S19]==(O38*$D$139*2) | [T20]==K38+S38 | [U21]=0 | [V22]==O38*$E$139
R39: [A1]==IF(AU39=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K29:K38) | [M13]=Totals | [O15]==SUM(O29:O38) | [S19]==SUM(S29:S38) | [T20]==SUM(T29:T38) | [U21]==SUM(U29:U38) | [V22]==SUM(V29:V38)
R41: [A1]==IF(AU41=1,"X","") | [B2]=Walls | [M13]==B41 | [U21]==M41
R42: [A1]==IF(AU42=1,"X","") | [B2]=Apply 2 x Brunosol + 1 x Wykabor 20.1 | [F6]=0 | [G7]=M2 | [H8]=5.5 | [I9]==(H42/100)*(100+$F$55) | [J10]=0.3 | [K11]==F42*I42*(1+J42) | [M13]=Brumasol/Wykabor 20.1 | [N14]=0.3 | [O15]==F42*N42 | [P16]==$D$139 | [Q17]==(P42/100)*(100+$F$55) | [R18]=1 | [S19]==(O42*Q42*(1+R42)) | [T20]==K42+S42 | [U21]==F42*H42*1.1 | [V22]==O42*$E$139 | [AT46]==IF(F42<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F42=""),1,0)
R43: [A1]==IF(AU43=1,"X","") | [B2]=Wall membrane CM3  - 1mtr | [D4]=0 | [E5]=1 | [F6]==D43*E43 | [G7]=M2 | [H8]==IF(F43=0,0,(_xlfn.CEILING.MATH(F43,5)*((20.83/5)*1.1))/F43) | [I9]==(H43/100)*(100+$F$55) | [J10]=0.3 | [K11]==F43*I43*(1+J43) | [M13]==B43 | [N14]=0.3 | [O15]==F43*N43 | [P16]==$D$139 | [Q17]==(P43/100)*(100+$F$55) | [R18]=1 | [S19]==(O43*Q43*(1+R43)) | [T20]==K43+S43 | [U21]==F43*H43*1.1 | [V22]==O43*$E$139 | [AT46]==IF(D43<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D43=""),1,0)
R44: [A1]==IF(AU44=1,"X","") | [B2]=Wall membrane CM3  - 1.2mtr | [D4]=0 | [E5]=1.2 | [F6]==D44*E44 | [G7]=M2 | [H8]==IF(F44=0,0,(_xlfn.CEILING.MATH(F44,5)*((26.67/6)*1.1))/F44) | [I9]==(H44/100)*(100+$F$55) | [J10]=0.3 | [K11]==F44*I44*(1+J44) | [M13]==B44 | [N14]=0.3 | [O15]==F44*N44 | [P16]==$D$139 | [Q17]==(P44/100)*(100+$F$55) | [R18]=1 | [S19]==(O44*Q44*(1+R44)) | [T20]==K44+S44 | [U21]==F44*H44*1.1 | [V22]==O44*$E$139 | [AT46]==IF(D44<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D44=""),1,0)
R45: [A1]==IF(AU45=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #1 | [D4]=0 | [E5]=0 | [F6]==D45*E45 | [G7]=M2 | [H8]=0 | [I9]==(H45/100)*(100+$F$55) | [J10]=0.3 | [K11]==F45*I45*(1+J45) | [M13]==B45 | [N14]=0 | [O15]==F45*N45 | [P16]==$D$139 | [Q17]==(P45/100)*(100+$F$55) | [R18]=1 | [S19]==(O45*Q45*(1+R45)) | [T20]==K45+S45 | [U21]==F45*H45*1.1 | [V22]==O45*$E$139 | [AT46]==IF(OR(D45<>"",E45<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D45="",E45="")),1,0)
R46: [A1]==IF(AU46=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #2 | [D4]=0 | [E5]=0 | [F6]==D46*E46 | [G7]=M2 | [H8]=0 | [I9]==(H46/100)*(100+$F$55) | [J10]=0.3 | [K11]==F46*I46*(1+J46) | [M13]==B46 | [N14]=0 | [O15]==F46*N46 | [P16]==$D$139 | [Q17]==(P46/100)*(100+$F$55) | [R18]=1 | [S19]==(O46*Q46*(1+R46)) | [T20]==K46+S46 | [U21]==F46*H46*1.1 | [V22]==O46*$E$139 | [AT46]==IF(OR(D46<>"",E46<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D46="",E46="")),1,0)
R47: [A1]==IF(AU47=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #3 | [D4]=0 | [E5]=0 | [F6]==D47*E47 | [G7]=M2 | [H8]=0 | [I9]==(H47/100)*(100+$F$55) | [J10]=0.3 | [K11]==F47*I47*(1+J47) | [M13]==B47 | [N14]=0 | [O15]==F47*N47 | [P16]==$D$139 | [Q17]==(P47/100)*(100+$F$55) | [R18]=1 | [S19]==(O47*Q47*(1+R47)) | [T20]==K47+S47 | [U21]==F47*H47*1.1 | [V22]==O47*$E$139 | [AT46]==IF(OR(D47<>"",E47<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D47="",E47="")),1,0)
R48: [A1]==IF(AU48=1,"X","") | [B2]=Wall membrane CM3 - Subtotals for above 3 lines | [F6]==SUM(F45:F47) | [G7]=M2 | [H8]==IF(F48=0,0,(_xlfn.CEILING.MATH(F48,5)*((44.17/10)*1.1))/F48) | [I9]==(H48/100)*(100+$F$55) | [J10]=0.3 | [K11]==F48*I48*(1+J48) | [M13]==B48 | [N14]=0.3 | [O15]==F48*N48 | [P16]==$D$139 | [Q17]==(P48/100)*(100+$F$55) | [R18]=1 | [S19]==(O48*Q48*(1+R48)) | [T20]==K48+S48 | [U21]==F48*H48*1.1 | [V22]==O48*$E$139 | [AT46]==IF(F48<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F48=""),1,0)
R49: [A1]==IF(AU49=1,"X","") | [B2]=Membrane plugs for m2 listed | [F6]==SUM(F43:F47) | [G7]=M2 | [H8]==IF(F49=0,0,(_xlfn.CEILING.MATH(F49,2)*((9.33/10)*1.1))/F49) | [I9]==(H49/100)*(100+$F$55) | [J10]=0.3 | [K11]==F49*I49*(1+J49) | [M13]==B49 | [N14]=0.25 | [O15]==F49*N49 | [P16]==$D$139 | [Q17]==(P49/100)*(100+$F$55) | [R18]=1 | [S19]==(O49*Q49*(1+R49)) | [T20]==K49+S49 | [U21]==F49*H49*1.1 | [V22]==O49*$E$139
R50: [A1]==IF(AU50=1,"X","") | [B2]=Sealing Tape Lm | [F6]==SUM(F43:F47)/2.5 | [G7]=LM | [H8]==IF(F50=0,0,(_xlfn.CEILING.MATH(F50,22)*((19.16/22)*1.1))/F50) | [I9]==(H50/100)*(100+$F$55) | [J10]=0.3 | [K11]==F50*I50*(1+J50) | [M13]==B50 | [N14]=0.1 | [O15]==F50*N50 | [P16]==$D$139 | [Q17]==(P50/100)*(100+$F$55) | [R18]=1 | [S19]==(O50*Q50*(1+R50)) | [T20]==K50+S50 | [U21]==F50*H50*1.1 | [V22]==O50*$E$139
R51: [A1]==IF(AU51=1,"X","") | [B2]=Technoseal Lm | [F6]==F53 | [G7]=LM | [H8]==80/80 | [I9]==(H51/100)*(100+$F$55) | [J10]=0.3 | [K11]==F51*I51*(1+J51) | [M13]==B51 | [N14]==1/60 | [O15]==F51*N51 | [P16]==$D$139 | [Q17]==(P51/100)*(100+$F$55) | [R18]=1 | [S19]==(O51*Q51*(1+R51)) | [T20]==K51+S51 | [U21]==F51*H51*1.1 | [V22]==O51*$E$139
R52: [D4]=Length | [E5]=Height
R53: [A1]==IF(AU53=1,"X","") | [B2]=Overtape Lm | [D4]=0 | [E5]=0 | [F6]==D53+(E53*2) | [G7]=LM | [H8]==IF(F53=0,0,(_xlfn.CEILING.MATH(F53,5)*((10.83/5)*1.1))/F53) | [I9]==(H53/100)*(100+$F$55) | [J10]=0.3 | [K11]==F53*I53*(1+J53) | [M13]==B53 | [N14]=0.1 | [O15]==F53*N53 | [P16]==$D$139 | [Q17]==(P53/100)*(100+$F$55) | [R18]=1 | [S19]==(O53*Q53*(1+R53)) | [T20]==K53+S53 | [U21]==F53*H53*1.1 | [V22]==O53*$E$139 | [AT46]==IF(OR(D53<>"",E53<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D53="",E53="")),1,0)
R54: [A1]==IF(AU54=1,"X","") | [B2]=Fixing Rope Lm | [F6]==SUM(F43:F47)*0.2 | [G7]=LM | [H8]==IF(F54=0,0,(_xlfn.CEILING.MATH(F54,5)*((10.33/5)*1.1))/F54) | [I9]==(H54/100)*(100+$F$55) | [J10]=0.3 | [K11]==F54*I54*(1+J54) | [M13]==B54 | [N14]=0.1 | [O15]==F54*N54 | [P16]==$D$139 | [Q17]==(P54/100)*(100+$F$55) | [R18]=1 | [S19]==(O54*Q54*(1+R54)) | [T20]==K54+S54 | [U21]==F54*H54*1.1 | [V22]==O54*$E$139
R55: [A1]==IF(AU55=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K42:K54) | [M13]=Totals | [O15]==SUM(O42:O54) | [S19]==SUM(S42:S54) | [T20]==SUM(T42:T54) | [U21]==SUM(U42:U54) | [V22]==SUM(V42:V54)
R57: [A1]==IF(AU57=1,"X","") | [B2]=Cementitious tanking system | [M13]==B57 | [U21]==M57
R58: [A1]==IF(AU58=1,"X","") | [B2]=Dubbing out coat (sand/cement/SBR) | [F6]=0 | [G7]=M2 | [H8]==7*1.1 | [I9]==(H58/100)*(100+$F$62) | [J10]=0.3 | [K11]==F58*I58*(1+J58) | [M13]=Apply Sand cement dubbing coat | [N14]=0.3 | [O15]==F58*N58 | [P16]==$D$139 | [Q17]==(P58/100)*(100+$F$62) | [R18]=1 | [S19]==(O58*Q58*(1+R58)) | [T20]==K58+S58 | [U21]==F58*H58*1.1 | [V22]==O58*$E$139 | [AT46]==IF(F58<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F58=""),1,0)
R59: [A1]==IF(AU59=1,"X","") | [B2]=2 coat tanking slurry | [F6]=0 | [G7]=M2 | [H8]=3.78 | [I9]==(H59/100)*(100+$F$62) | [J10]=0.3 | [K11]==F59*I59*(1+J59) | [M13]=Brush apply tanking slurry | [N14]=0.35 | [O15]==F59*N59 | [P16]==$D$139 | [Q17]==(P59/100)*(100+$F$62) | [R18]=1 | [S19]==(O59*Q59*(1+R59)) | [T20]==K59+S59 | [U21]==F59*H59*1.1 | [V22]==O59*$E$139 | [AT46]==IF(F59<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F59=""),1,0)
R60: [A1]==IF(AU60=1,"X","") | [B2]=Renovating plaster | [F6]=0 | [G7]=M2 | [H8]==(16.25/3)*1.1 | [I9]==(H60/100)*(100+$F$62) | [J10]=0.3 | [K11]==F60*I60*(1+J60) | [M13]=Renovating plaster | [N14]=0.3 | [O15]==F60*N60 | [P16]==$D$139 | [Q17]==(P60/100)*(100+$F$62) | [R18]=1 | [S19]==(O60*Q60*(1+R60)) | [T20]==K60+S60 | [U21]==F60*H60*1.1 | [V22]==O60*$E$139 | [AT46]==IF(F60<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F60=""),1,0)
R61: [A1]==IF(AU61=1,"X","") | [B2]=Wall/floor fillet joint | [F6]=0 | [G7]=LM | [H8]=2 | [I9]==(H61/100)*(100+$F$62) | [J10]=0.3 | [K11]==F61*I61*(1+J61) | [M13]=Cut fillet to slab and apply fillet seal | [N14]=0.3 | [O15]==F61*N61 | [P16]==$D$139 | [Q17]==(P61/100)*(100+$F$62) | [R18]=1 | [S19]==(O61*Q61*(1+R61)) | [T20]==K61+S61 | [U21]==F61*H61*1.1 | [V22]==O61*$E$139 | [AT46]==IF(F61<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F61=""),1,0)
R62: [A1]==IF(AU62=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K58:K61) | [M13]=Totals | [O15]==SUM(O58:O61) | [S19]==SUM(S58:S61) | [T20]==SUM(T58:T61) | [U21]==SUM(U58:U61) | [V22]==SUM(V58:V61)
R64: [A1]==IF(AU64=1,"X","") | [B2]=Floor - Liquid Resin floor Membranes  | [M13]==B64 | [U21]==M64
R65: [A1]==IF(AU65=1,"X","") | [B2]=EP40 2 Pack resin Primer | [F6]=0 | [G7]=M2 | [H8]==56.7*1.1 | [I9]==(H65/100)*(100+$F$68) | [J10]=0.3 | [K11]==((ROUNDUP(F65/30,0))*I65)*(1+J59) | [M13]=Trimol 40  primer  | [N14]=0.04 | [O15]==F65*N65 | [P16]==$D$139 | [Q17]==(P65/100)*(100+$F$68) | [R18]=1 | [S19]==(O65*Q65*(1+R65)) | [T20]==K65+S65 | [U21]==ROUNDUP(F65/30,0)*H65*1.1 | [V22]==O65*$E$139 | [AT46]==IF(F65<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F65=""),1,0)
R66: [A1]==IF(AU66=1,"X","") | [B2]=EP40 2 Pack resin top coat | [F6]=8 | [G7]=M2 | [H8]==63.7*1.1 | [I9]==(H66/100)*(100+$F$68) | [J10]=0.3 | [K11]==((ROUNDUP(F66/30,0))*I66)*(1+J59) | [M13]=Trimol 40 Top Coat  | [N14]=0.04 | [O15]==F66*N66 | [P16]==$D$139 | [Q17]==(P66/100)*(100+$F$68) | [R18]=1 | [S19]==(O66*Q66*(1+R66)) | [T20]==K66+S66 | [U21]==ROUNDUP(F66/30,0)*H66*1.1 | [V22]==O66*$E$139 | [AT46]==IF(F66<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F66=""),1,0)
R67: [A1]==IF(AU67=1,"X","") | [B2]=Grip grit | [F6]=0 | [G7]=M2 | [H8]=2.6 | [I9]==(H67/100)*(100+$F$68) | [J10]=0.3 | [K11]==((ROUNDUP(F67/25,0))*I67)*(1+J59) | [M13]=Grip grit application | [N14]==F67 | [O15]==F67*0.01 | [P16]==$D$139 | [Q17]==(P67/100)*(100+$F$68) | [R18]=1 | [S19]==(O67*Q67*(1+R67)) | [T20]==K67+S67 | [U21]==ROUNDUP(F67/25,0)*H67*1.1 | [V22]==O67*$E$139 | [AT46]==IF(F67<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F67=""),1,0)
R68: [A1]==IF(AU68=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K65:K67) | [M13]=Totals | [O15]==SUM(O65:O67) | [S19]==SUM(S65:S67) | [T20]==SUM(T65:T67) | [U21]==SUM(U65:U67) | [V22]==SUM(V65:V67)
R70: [A1]==IF(AU70=1,"X","") | [B2]=Plastering & finishing | [M13]==B70 | [U21]==M70
R71: [A1]==IF(AU71=1,"X","") | [B2]=Construct stud wall to perimiter | [F6]=0 | [G7]=M2 | [H8]=14 | [I9]==(H71/100)*(100+$F$79) | [J10]=0.3 | [K11]==F71*I71*(1+J71) | [M13]==B71 | [N14]=0.4 | [O15]==F71*N71 | [P16]==$D$139 | [Q17]==(P71/100)*(100+$F$79) | [R18]=1 | [S19]==(O71*Q71*(1+R71)) | [T20]==K71+S71 | [U21]==F71*H71*1.1 | [V22]==O71*$E$139 | [AT46]==IF(F71<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F71=""),1,0)
R72: [A1]==IF(AU72=1,"X","") | [B2]=Plasterboarding (inc dab/screws) | [F6]=0 | [G7]=M2 | [H8]==(8.24/1.098)*1.3 | [I9]==(H72/100)*(100+$F$79) | [J10]=0.3 | [K11]==F72*I72*(1+J72) | [M13]==B72 | [N14]=0.4 | [O15]==F72*N72 | [P16]==$D$139 | [Q17]==(P72/100)*(100+$F$79) | [R18]=1 | [S19]==(O72*Q72*(1+R72)) | [T20]==K72+S72 | [U21]==F72*H72*1.1 | [V22]==O72*$E$139 | [AT46]==IF(F72<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F72=""),1,0)
R73: [A1]==IF(AU73=1,"X","") | [B2]=Warmline Internal Wall Insulation | [F6]=0 | [G7]=M2 | [H8]==IF(F73=0,0,((_xlfn.CEILING.MATH(F73,3.5625)*((196.67/7.125)*1.1))/F73)+((_xlfn.CEILING.MATH(F73,7.125)*((38.5/7.125)*1.1))/F73)) | [I9]==(H73/100)*(100+$F$79) | [J10]=0.3 | [K11]==F73*I73*(1+J73) | [M13]==B73 | [N14]==IF(OR(F73="",F73=0),0,IF(F73<7,2.5/F73,(20/60))) | [O15]==F73*N73 | [P16]==$D$139 | [Q17]==(P73/100)*(100+$F$79) | [R18]=1 | [S19]==(O73*Q73*(1+R73)) | [T20]==K73+S73 | [U21]==F73*H73*1.1 | [V22]==O73*$E$139 | [AT46]==IF(F73<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F73=""),1,0)
R74: [A1]==IF(AU74=1,"X","") | [B2]=Skimming walls (multi finish plaster) | [F6]=0 | [G7]=M2 | [H8]==IF(F74=0,0,(_xlfn.CEILING.MATH(F74,10)*((12.08/10)*1.1))/F74) | [I9]==(H74/100)*(100+$F$79) | [J10]=0.3 | [K11]==F74*I74*(1+J74) | [M13]==B74 | [N14]==4/15 | [O15]==ROUNDUP(F74/15,0)*4 | [P16]==$D$139 | [Q17]==(P74/100)*(100+$F$79) | [R18]=1 | [S19]==(O74*Q74*(1+R74)) | [T20]==K74+S74 | [U21]==F74*H74*1.1 | [V22]==O74*$E$139 | [AT46]==IF(F74<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F74=""),1,0)
R75: [A1]==IF(AU75=1,"X","") | [B2]=Plastering Stop Bead - 3m length | [F6]=0 | [G7]=M2 | [H8]==1*1.1 | [I9]==(H75/100)*(100+$F$79) | [J10]=0.3 | [K11]==F75*I75*(1+J75) | [M13]==B75 | [N14]=0 | [O15]==F75*N75 | [P16]==$D$139 | [Q17]==(P75/100)*(100+$F$79) | [R18]=1 | [S19]==(O75*Q75*(1+R75)) | [T20]==K75+S75 | [U21]==F75*H75*1.1 | [V22]==O75*$E$139 | [AT46]==IF(F75<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F75=""),1,0)
R76: [A1]==IF(AU76=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 2.4m length | [F6]=0 | [G7]=M2 | [H8]==1.66*1.1 | [I9]==(H76/100)*(100+$F$79) | [J10]=0.3 | [K11]==F76*I76*(1+J76) | [M13]==B76 | [N14]=0 | [O15]==F76*N76 | [P16]==$D$139 | [Q17]==(P76/100)*(100+$F$79) | [R18]=1 | [S19]==(O76*Q76*(1+R76)) | [T20]==K76+S76 | [U21]==F76*H76*1.1 | [V22]==O76*$E$139 | [AT46]==IF(F76<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F76=""),1,0)
R77: [A1]==IF(AU77=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 3m length | [F6]=0 | [G7]=M2 | [H8]==2.5*1.1 | [I9]==(H77/100)*(100+$F$79) | [J10]=0.3 | [K11]==F77*I77*(1+J77) | [M13]==B77 | [N14]=0 | [O15]==F77*N77 | [P16]==$D$139 | [Q17]==(P77/100)*(100+$F$79) | [R18]=1 | [S19]==(O77*Q77*(1+R77)) | [T20]==K77+S77 | [U21]==F77*H77*1.1 | [V22]==O77*$E$139 | [AT46]==IF(F77<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F77=""),1,0)
R78: [A1]==IF(AU78=1,"X","") | [B2]=Difficulty hours (fireplace, corners etc) | [F6]=0 | [G7]=Hours | [H8]=0 | [I9]==(H78/100)*(100+$F$79) | [J10]=0 | [K11]==F78*I78*(1+J78) | [M13]==B78 | [N14]=1 | [O15]==F78*N78 | [P16]==$D$139 | [Q17]==(P78/100)*(100+$F$79) | [R18]=1 | [S19]==(O78*Q78*(1+R78)) | [T20]==K78+S78 | [U21]==F78*H78*1.1 | [V22]==O78*$E$139 | [AT46]==IF(F78<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F78=""),1,0)
R79: [A1]==IF(AU79=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K71:K78) | [M13]=Totals | [O15]==SUM(O71:O78) | [S19]==SUM(S71:S78) | [T20]==SUM(T71:T78) | [U21]==SUM(U71:U78) | [V22]==SUM(V71:V78)
R81: [A1]==IF(AU81=1,"X","") | [B2]=Floor Joists LM @ 400mm centres | [F6]=Stock lengths 2.4, 3.0, 3.6, 4.2, 4.8, 5.4 | [M13]==B81 | [U21]==M81
R82: [A1]==IF(AU82=1,"X","") | [B2]=Joists Size | [D4]=Quantity  | [E5]=Length
R83: [A1]==IF(AU83=1,"X","") | [B2]=Joists, 100 x 50 | [D4]=4.3 | [E5]=11 | [F6]==D83*E83 | [G7]=LM | [H8]=5.46 | [I9]==(H83/100)*(100+$F$101) | [J10]=0.3 | [K11]==F83*I83*(1+J83) | [M13]==B83 | [N14]=0.25 | [O15]==F83*N83 | [P16]==$D$139 | [Q17]==(P83/100)*(100+$F$101) | [R18]=1 | [S19]==(O83*Q83*(1+R83)) | [T20]==K83+S83 | [U21]==F83*H83*1.1 | [V22]==O83*$E$139 | [AT46]==IF(OR(D83<>"",E83<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D83="",E83="")),1,0)
R84: [A1]==IF(AU84=1,"X","") | [B2]=Joists, 125 x 50 | [D4]=0 | [E5]=0 | [F6]==D84*E84 | [G7]=LM | [H8]=6.5 | [I9]==(H84/100)*(100+$F$101) | [J10]=0.3 | [K11]==F84*I84*(1+J84) | [M13]==B84 | [N14]=0.25 | [O15]==F84*N84 | [P16]==$D$139 | [Q17]==(P84/100)*(100+$F$101) | [R18]=1 | [S19]==(O84*Q84*(1+R84)) | [T20]==K84+S84 | [U21]==F84*H84*1.1 | [V22]==O84*$E$139 | [AT46]==IF(OR(D84<>"",E84<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D84="",E84="")),1,0)
R85: [A1]==IF(AU85=1,"X","") | [B2]=Joists, 150 x 50 | [D4]=0 | [E5]=0 | [F6]==D85*E85 | [G7]=LM | [H8]=7.7 | [I9]==(H85/100)*(100+$F$101) | [J10]=0.3 | [K11]==F85*I85*(1+J85) | [M13]==B85 | [N14]=0.25 | [O15]==F85*N85 | [P16]==$D$139 | [Q17]==(P85/100)*(100+$F$101) | [R18]=1 | [S19]==(O85*Q85*(1+R85)) | [T20]==K85+S85 | [U21]==F85*H85*1.1 | [V22]==O85*$E$139 | [AT46]==IF(OR(D85<>"",E85<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D85="",E85="")),1,0)
R86: [A1]==IF(AU86=1,"X","") | [B2]=Joists, 175 x 50 | [D4]=0 | [E5]=0 | [F6]==D86*E86 | [G7]=LM | [H8]=8 | [I9]==(H86/100)*(100+$F$101) | [J10]=0.3 | [K11]==F86*I86*(1+J86) | [M13]==B86 | [N14]=0.3 | [O15]==F86*N86 | [P16]==$D$139 | [Q17]==(P86/100)*(100+$F$101) | [R18]=1 | [S19]==(O86*Q86*(1+R86)) | [T20]==K86+S86 | [U21]==F86*H86*1.1 | [V22]==O86*$E$139 | [AT46]==IF(OR(D86<>"",E86<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D86="",E86="")),1,0)
R87: [A1]==IF(AU87=1,"X","") | [B2]=Joists, 200 x 50 | [D4]=0 | [E5]=0 | [F6]==D87*E87 | [G7]=LM | [H8]=8.9 | [I9]==(H87/100)*(100+$F$101) | [J10]=0.3 | [K11]==F87*I87*(1+J87) | [M13]==B87 | [N14]=0.3 | [O15]==F87*N87 | [P16]==$D$139 | [Q17]==(P87/100)*(100+$F$101) | [R18]=1 | [S19]==(O87*Q87*(1+R87)) | [T20]==K87+S87 | [U21]==F87*H87*1.1 | [V22]==O87*$E$139 | [AT46]==IF(OR(D87<>"",E87<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D87="",E87="")),1,0)
R88: [A1]==IF(AU88=1,"X","") | [B2]=Joists, 225 x 50 | [D4]=0 | [E5]=0 | [F6]==D88*E88 | [G7]=LM | [H8]=9.5 | [I9]==(H88/100)*(100+$F$101) | [J10]=0.3 | [K11]==F88*I88*(1+J88) | [M13]==B88 | [N14]=0.4 | [O15]==F88*N88 | [P16]==$D$139 | [Q17]==(P88/100)*(100+$F$101) | [R18]=1 | [S19]==(O88*Q88*(1+R88)) | [T20]==K88+S88 | [U21]==F88*H88*1.1 | [V22]==O88*$E$139 | [AT46]==IF(OR(D88<>"",E88<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D88="",E88="")),1,0)
R89: [A1]==IF(AU89=1,"X","") | [B2]=Treat and endwrap joist | [D4]=11 | [E5]=1 | [F6]==D89*E89 | [G7]=Each | [H8]=3 | [I9]==(H89/100)*(100+$F$101) | [J10]=0.3 | [K11]==F89*I89*(1+J89) | [M13]=Endwrap | [N14]=0.15 | [O15]==F89*N89 | [P16]==$D$139 | [Q17]==(P89/100)*(100+$F$101) | [R18]=1 | [S19]==(O89*Q89*(1+R89)) | [T20]==K89+S89 | [U21]==F89*H89*1.1 | [V22]==O89*$E$139 | [AT46]==IF(D89<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D89=""),1,0)
R90: [A1]==IF(AU90=1,"X","") | [B2]=Wall plate 100x25 | [D4]=2 | [E5]=1 | [F6]==D90*E90 | [G7]=Each | [H8]=4.84 | [I9]==(H90/100)*(100+$F$101) | [J10]=0.3 | [K11]==F90*I90*(1+J90) | [M13]=Install Wall plate | [N14]=0.4 | [O15]==F90*N90 | [P16]==$D$139 | [Q17]==(P90/100)*(100+$F$101) | [R18]=1 | [S19]==(O90*Q90*(1+R90)) | [T20]==K90+S90 | [U21]==F90*H90*1.1 | [V22]==O90*$E$139 | [AT46]==IF(D90<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D90=""),1,0)
R91: [A1]==IF(AU91=1,"X","") | [B2]=Bower beams (pair) | [D4]=0 | [E5]=1 | [F6]==D91*E91 | [G7]=Pairs | [H8]=36 | [I9]==(H91/100)*(100+$F$101) | [J10]=0.3 | [K11]==F91*I91*(1+J91) | [M13]==B91 | [N14]=1.5 | [O15]==F91*N91 | [P16]==$D$139 | [Q17]==(P91/100)*(100+$F$101) | [R18]=1 | [S19]==(O91*Q91*(1+R91)) | [T20]==K91+S91 | [U21]==F91*H91*1.1 | [V22]==O91*$E$139 | [AT46]==IF(D91<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D91=""),1,0)
R92: [A1]==IF(AU92=1,"X","") | [B2]=Flitch plates (pair) | [D4]=0 | [E5]=1 | [F6]==D92*E92 | [G7]=Pairs | [H8]=42 | [I9]==(H92/100)*(100+$F$101) | [J10]=0.3 | [K11]==F92*I92*(1+J92) | [M13]==B92 | [N14]=1.5 | [O15]==F92*N92 | [P16]==$D$139 | [Q17]==(P92/100)*(100+$F$101) | [R18]=1 | [S19]==(O92*Q92*(1+R92)) | [T20]==K92+S92 | [U21]==F92*H92*1.1 | [V22]==O92*$E$139 | [AT46]==IF(D92<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D92=""),1,0)
R93: [A1]==IF(AU93=1,"X","") | [B2]=Flooring deck type (M2) | [M13]==B93 | [U21]==M93
R94: [A1]==IF(AU94=1,"X","") | [B2]=Install Weyrock flooring 18mm (M2) | [F6]=0 | [G7]=M2 | [H8]=18 | [I9]==(H94/100)*(100+$F$101) | [J10]=0.3 | [K11]==F94*I94*(1+J94) | [M13]==B94 | [N14]=0.3 | [O15]==F94*N94 | [P16]==$D$139 | [Q17]==(P94/100)*(100+$F$101) | [R18]=1 | [S19]==(O94*Q94*(1+R94)) | [T20]==K94+S94 | [U21]==F94*H94*1.1 | [V22]==O94*$E$139 | [AT46]==IF(F94<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F94=""),1,0)
R95: [A1]==IF(AU95=1,"X","") | [B2]=Install Weyrock flooring 22mm (M2) | [F6]=16 | [G7]=M2 | [H8]=22 | [I9]==(H95/100)*(100+$F$101) | [J10]=0.3 | [K11]==F95*I95*(1+J95) | [M13]==B95 | [N14]=0.325 | [O15]==F95*N95 | [P16]==$D$139 | [Q17]==(P95/100)*(100+$F$101) | [R18]=1 | [S19]==(O95*Q95*(1+R95)) | [T20]==K95+S95 | [U21]==F95*H95*1.1 | [V22]==O95*$E$139 | [AT46]==IF(F95<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F95=""),1,0)
R96: [A1]==IF(AU96=1,"X","") | [B2]=Install std T&G Floorboards (M2) | [F6]=0 | [G7]=M2 | [H8]=46.3 | [I9]==(H96/100)*(100+$F$101) | [J10]=0.3 | [K11]==F96*I96*(1+J96) | [M13]==B96 | [N14]=0.2 | [O15]==F96*N96 | [P16]==$D$139 | [Q17]==(P96/100)*(100+$F$101) | [R18]=1 | [S19]==(O96*Q96*(1+R96)) | [T20]==K96+S96 | [U21]==F96*H96*1.1 | [V22]==O96*$E$139 | [AT46]==IF(F96<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F96=""),1,0)
R97: [A1]==IF(AU97=1,"X","") | [B2]=Install victorian T&G Floorboards (M2) | [F6]=0 | [G7]=M2 | [H8]=52.8 | [I9]==(H97/100)*(100+$F$101) | [J10]=0.3 | [K11]==F97*I97*(1+J97) | [M13]==B97 | [N14]=0.2 | [O15]==F97*N97 | [P16]==$D$139 | [Q17]==(P97/100)*(100+$F$101) | [R18]=1 | [S19]==(O97*Q97*(1+R97)) | [T20]==K97+S97 | [U21]==F97*H97*1.1 | [V22]==O97*$E$139 | [AT46]==IF(F97<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F97=""),1,0)
R98: [A1]==IF(AU98=1,"X","") | [B2]=Install Engineered Flooring sheet (M2) | [F6]=0 | [G7]=M2 | [H8]=49.99 | [I9]==(H98/100)*(100+$F$101) | [J10]=0.3 | [K11]==F98*I98*(1+J98) | [M13]==B98 | [N14]=0.2 | [O15]==F98*N98 | [P16]==$D$139 | [Q17]==(P98/100)*(100+$F$101) | [R18]=1 | [S19]==(O98*Q98*(1+R98)) | [T20]==K98+S98 | [U21]==F98*H98*1.1 | [V22]==O98*$E$139 | [AT46]==IF(F98<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F98=""),1,0)
R99: [A1]==IF(AU99=1,"X","") | [B2]=Provide insulation to suspended flooring | [F6]=0 | [G7]=M2 | [H8]=6.8 | [I9]==(H99/100)*(100+$F$101) | [J10]=0.3 | [K11]==F99*I99*(1+J99) | [M13]==B99 | [N14]=0.2 | [O15]==F99*N99 | [P16]==$D$139 | [Q17]==(P99/100)*(100+$F$101) | [R18]=1 | [S19]==(O99*Q99*(1+R99)) | [T20]==K99+S99 | [U21]==F99*H99*1.1 | [V22]==O99*$E$139 | [AT46]==IF(F99<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F99=""),1,0)
R100: [A1]==IF(AU100=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [F6]=0 | [G7]=Hours | [H8]=0 | [I9]==(H100/100)*(100+$F$101) | [J10]=0 | [K11]==F100*I100*(1+J100) | [M13]==B100 | [N14]=1 | [O15]==F100*N100 | [P16]==$D$139 | [Q17]==(P100/100)*(100+$F$101) | [R18]=1 | [S19]==(O100*Q100*(1+R100)) | [T20]==K100+S100 | [U21]==F100*H100*1.1 | [V22]==O100*$E$139 | [AT46]==IF(F100<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F100=""),1,0)
R101: [A1]==IF(AU101=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K83:K100) | [M13]=Totals | [O15]==SUM(O83:O100) | [S19]==SUM(S83:S100) | [T20]==SUM(T83:T100) | [U21]==SUM(U83:U100) | [V22]==SUM(V83:V100)
R103: [A1]==IF(AU103=1,"X","") | [B2]=Timber Treatments  | [M13]==B103 | [U21]==M103
R104: [A1]==IF(AU104=1,"X","") | [B2]=Clear debris from sub floor | [F6]=0 | [G7]=M2 | [H8]=0 | [I9]==(H104/100)*(100+$F$111) | [J10]=0.3 | [K11]==F104*I104*(1+J104) | [M13]=Clear debris from sub floor | [N14]=0.15 | [O15]==F104*N104 | [P16]==$D$139 | [Q17]==(P104/100)*(100+$F$111) | [R18]=1 | [S19]==(O104*Q104*(1+R104)) | [T20]==K104+S104 | [U21]==F104*H104*1.1 | [V22]==O104*$E$139 | [AT46]==IF(F104<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F104=""),1,0)
R105: [A1]==IF(AU105=1,"X","") | [B2]=Masonry sterilant (Wyakbor 20) - brush applied | [F6]=0 | [G7]=M2 | [H8]=35 | [I9]==(H105/100)*(100+$F$111) | [J10]=0.3 | [K11]==((ROUNDUP(F105/10,0))*I105)*(1+J104) | [M13]=Masonry sterilant - brush applied | [N14]=0.05 | [O15]==F105*N105 | [P16]==$D$139 | [Q17]==(P105/100)*(100+$F$111) | [R18]=1 | [S19]==(O105*Q105*(1+R105)) | [T20]==K105+S105 | [U21]==(ROUNDUP(F105/10,0)*H105*1.1) | [V22]==O105*$E$139 | [AT46]==IF(F105<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F105=""),1,0)
R106: [A1]==IF(AU106=1,"X","") | [B2]=Protective treatment following new timbers installation (DP or bug) | [F6]=0 | [G7]=M2 | [H8]=22 | [I9]==(H106/100)*(100+$F$111) | [J10]=0.3 | [K11]==((ROUNDUP(F106/25,0))*I106)*(1+J104) | [M13]=Protective treatment, new timbers  | [N14]=0.02 | [O15]==F106*N106 | [P16]==$D$139 | [Q17]==(P106/100)*(100+$F$111) | [R18]=1 | [S19]==(O106*Q106*(1+R106)) | [T20]==K106+S106 | [U21]==ROUNDUP(F106/25,0)*H106*1.1 | [V22]==O106*$E$139 | [AT46]==IF(F106<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F106=""),1,0)
R107: [A1]==IF(AU107=1,"X","") | [B2]=40.1 Gel injection @100mm centres, plug with dowel | [F6]=0 | [G7]=M2 | [H8]=2.22 | [I9]==(H107/100)*(100+$F$111) | [J10]=0.3 | [K11]==((ROUNDUP(F107/4,0))*I107)*(1+J104) | [M13]=Gel injection @100mm centres and plug  | [N14]=0.25 | [O15]==F107*N107 | [P16]==$D$139 | [Q17]==(P107/100)*(100+$F$111) | [R18]=1 | [S19]==(O107*Q107*(1+R107)) | [T20]==K107+S107 | [U21]==ROUNDUP(F107/4,0)*H107*1.1 | [V22]==O107*$E$139 | [AT46]==IF(F107<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F107=""),1,0)
R108: [A1]==IF(AU108=1,"X","") | [B2]=Fog subfloor void (M2) | [F6]=16 | [G7]=M2 | [H8]=1 | [I9]==(H108/100)*(100+$F$101) | [J10]=0.3 | [K11]==F108*I108*(1+J108) | [M13]=Fog subfloor void (M2) | [N14]=0.05 | [O15]==F108*N108 | [P16]==$D$139 | [Q17]==(P108/100)*(100+$F$101) | [R18]=1 | [S19]==(O108*Q108*(1+R108)) | [T20]==K108+S108 | [U21]==F108*H108*1.1 | [V22]==O108*$E$139 | [AT46]==IF(F108<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F108=""),1,0)
R109: [A1]==IF(AU109=1,"X","") | [B2]=Fogging staircase - open rear treads Per step | [F6]=0 | [G7]=Each | [H8]=0.2 | [I9]==(H109/100)*(100+$F$111) | [J10]=0.3 | [K11]==F109*I109*(1+J109) | [M13]=Fogging staircase - open rear treads  | [N14]=0.1 | [O15]==F109*N109 | [P16]==$D$139 | [Q17]==(P109/100)*(100+$F$111) | [R18]=1 | [S19]==(O109*Q109*(1+R109)) | [T20]==K109+S109 | [U21]==F109*H109*1.1 | [V22]==O109*$E$139 | [AT46]==IF(F109<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F109=""),1,0)
R110: [A1]==IF(AU110=1,"X","") | [B2]=Fogging staircase - rear closed, drill and plug per step | [F6]=0 | [G7]=Each | [H8]=2 | [I9]==(H110/100)*(100+$F$111) | [J10]=0.3 | [K11]==F110*I110*(1+J110) | [M13]=Fogging staircase - closed,  rear treads  | [N14]=0.2 | [O15]==F110*N110 | [P16]==$D$139 | [Q17]==(P110/100)*(100+$F$111) | [R18]=1 | [S19]==(O110*Q110*(1+R110)) | [T20]==K110+S110 | [U21]==F110*H110*1.1 | [V22]==O110*$E$139 | [AT46]==IF(F110<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F110=""),1,0)
R111: [A1]==IF(AU111=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K104:K110) | [M13]=Totals | [O15]==SUM(O104:O110) | [S19]==SUM(S104:S110) | [T20]==SUM(T104:T110) | [U21]==SUM(U104:U110) | [V22]==SUM(V104:V110)
R113: [A1]==IF(AU113=1,"X","") | [B2]=Airbricks | [M13]==B113 | [U21]==M113
R114: [A1]==IF(AU114=1,"X","") | [B2]=Clean out airbrick/fit new face | [F6]=4 | [G7]=Each | [H8]=16 | [I9]==(H114/100)*(100+$F$117) | [J10]=0.3 | [K11]==F114*I114*(1+J114) | [M13]=Clean out airbrick/fit new face | [N14]=0.5 | [O15]==F114*N114 | [P16]==$D$139 | [Q17]==(P114/100)*(100+$F$117) | [R18]=1 | [S19]==(O114*Q114*(1+R114)) | [T20]==K114+S114 | [U21]==F114*H114*1.1 | [V22]==O114*$E$139 | [AT46]==IF(F114<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F114=""),1,0)
R115: [A1]==IF(AU115=1,"X","") | [B2]=Lift/upgrade existing airbrick/fit new face | [F6]=0 | [G7]=Each | [H8]=16 | [I9]==(H115/100)*(100+$F$117) | [J10]=0.3 | [K11]==F115*I115*(1+J115) | [M13]=Lift existing airbrick/fit new face | [N14]=1 | [O15]==F115*N115 | [P16]==$D$139 | [Q17]==(P115/100)*(100+$F$117) | [R18]=1 | [S19]==(O115*Q115*(1+R115)) | [T20]==K115+S115 | [U21]==F115*H115*1.1 | [V22]==O115*$E$139 | [AT46]==IF(F115<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F115=""),1,0)
R116: [A1]==IF(AU116=1,"X","") | [B2]=Install additional  airbrick | [F6]=2 | [G7]=Each | [H8]=16 | [I9]==(H116/100)*(100+$F$117) | [J10]=0.3 | [K11]==F116*I116*(1+J116) | [M13]=Install additional  airbrick | [N14]=2 | [O15]==F116*N116 | [P16]==$D$139 | [Q17]==(P116/100)*(100+$F$117) | [R18]=1 | [S19]==(O116*Q116*(1+R116)) | [T20]==K116+S116 | [U21]==F116*H116*1.1 | [V22]==O116*$E$139 | [AT46]==IF(F116<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F116=""),1,0)
R117: [A1]==IF(AU117=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K114:K116) | [M13]=Totals | [O15]==SUM(O114:O116) | [S19]==SUM(S114:S116) | [T20]==SUM(T114:T116) | [U21]==SUM(U114:U116) | [V22]==SUM(V114:V116)
R119: [A1]==IF(AU119=1,"X","") | [B2]=Skip hire 8yd | [M13]==B119 | [U21]==M119
R120: [A1]==IF(AU120=1,"X","") | [B2]=Rubbish removal skips | [F6]=0 | [G7]=Each | [H8]=270 | [I9]==H120 | [J10]=0.3 | [K11]==F120*I120*(1+J120) | [M13]==B120 | [N14]=0 | [O15]=0 | [P16]==$D$139 | [Q17]==P120 | [R18]=1 | [S19]==(O120*Q120*(1+R120)) | [T20]==K120+S120 | [U21]=0 | [V22]==O120*$E$139 | [AT46]==IF(F120<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F120=""),1,0)
R122: [A1]==IF(AU122=1,"X","")
R123: [A1]==IF(AU123=1,"X","") | [E5]=Materials sub tot | [K11]==K26+K39+K55+K62+K68+K79+K101+K111+K117+K120 | [M13]=TT Totals | [U21]=Contractor Totals
R124: [A1]==IF(AU124=1,"X","") | [E5]=Labour sub tot | [H8]==O124 | [K11]==S26+S39+S55+S62+S68+S79+S101+S111+S117+S120 | [M13]=Labour hours sub total | [O15]==O26+O39+O55+O62+O111+O68+O79++O101+O117 | [U21]==U26+U39+U55+U62+U68+U79+U101+U111+U117 | [V22]==V26+V39+V55+V62+V68+V79+V101+V111+V117 | [AT46]=1
R125: [A1]==IF(AU125=1,"X","") | [H8]=Travel | [K11]==(F139*C139)+((K130*K131)*2)*J139 | [M13]=Hours travel | [O15]==K130*K131*2*K132/30
R126: [A1]==IF(AU126=1,"X","") | [H8]= Price | [K11]==SUM(K123:K125) | [M13]=Total hours | [O15]==SUM(O124:O125) | [U21]=Travel | [V22]==K130*(K131*2)*0.45
R127: [A1]==IF(AU127=1,"X","") | [H8]=Vat | [K11]==K126*0.2 | [U21]=Tot | [V22]==U124+V124+V126
R128: [A1]==IF(AU128=1,"X","") | [H8]=Total price inc vat | [K11]==SUM(K126:K127)
R129: [A1]==IF(AU129=1,"X","") | [M13]=For Office Only
R130: [A1]==IF(AU130=1,"X","") | [J10]=No of days | [K11]==(ROUNDUP((O124/6.5)/K132,0))
R131: [A1]==IF(AU131=1,"X","") | [J10]=Distance from office to job (one way) | [K11]==IF([1]Details!$C$12=0,"",[1]Details!$C$12) | [M13]=The value of the csv import on upload should match the figures to the right ↵(this may be less than the totals to the left as optional items are not calculated up on the import until the customer selects them) | [S19]=Sub Total | [U21]==SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!L:L,"No",'CF CSV Upload'!Q:Q,"Yes") | [AT46]==IF(K131<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K131=""),1,0)
R132: [A1]==IF(AU132=1,"X","") | [J10]=No of men travelling | [K11]=2 | [S19]=Tax: VAT (20%)	 | [U21]==U131*0.2 | [AT46]==IF(K132<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K132=""),1,0)
R133: [A1]==IF(AU133=1,"X","") | [S19]=Total | [U21]==U131+U132
R135: [A1]==IF(AU135=1,"X","") | [B2]=Choose Estimate Cover Sheet Image To Use (dropdown) | [F6]=Image 5: Single Female (Elderly) | [M13]=View Images (this link will take you to the the Estimates Coversheet Images Tab) | [AT46]==IF(F135<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F135=""),1,0)
R136: [B2]=Survey sheet end
R137: [C3]=Base Travel Hourly rate  | [D4]=Base Labour Hourly rate  | [E5]=Contractor Labour Hourly rate  | [F6]=Approx Travel cost | [V22]==U133-K128
R138: [F6]=Hours | [H8]=mens travel | [J10]=Vehicle cost | [K11]=Total
R139: [C3]==D139 | [D4]=30.63 | [E5]=28 | [F6]==O125 | [H8]==F139*D139 | [J10]=0.5 | [K11]==(F139*C139)+(K130*K131*2)*J139
```

## SECTION 4: CF CSV UPLOAD SHEET

**Total Rows:** 171  |  **Total Cols:** 20

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
R2: [A1]=Stripping out of items as required to proceed with works | [C3]==Costing!B21 & " - Materials" | [D4]==Costing!F21 | [E5]==Costing!I21 | [F6]==Costing!G21 | [G7]=Timber Materials | [H8]==Costing!J21*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=Yes | [M13]==IF(J2="MTL","Preservation Shop","") | [N14]==D2*E2 | [O15]=DELETE | [P16]==N2*(1+(H2/100)) | [Q17]=No
R3: [A1]==A2 | [C3]==Costing!B22 & " - Materials" | [D4]==Costing!F22 | [E5]==Costing!I22 | [F6]==Costing!G22 | [G7]=Timber Materials | [H8]==Costing!J22*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=Yes | [M13]==IF(J3="MTL","Preservation Shop","") | [N14]==D3*E3 | [O15]=DELETE | [P16]==N3*(1+(H3/100)) | [Q17]=No
R4: [A1]==A3 | [C3]==Costing!B23 & " - Materials" | [D4]==Costing!F23 | [E5]==Costing!I23 | [F6]==Costing!G23 | [G7]=Timber Materials | [H8]==Costing!J23*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J4="MTL","Preservation Shop","") | [N14]==D4*E4 | [O15]=DELETE | [P16]==N4*(1+(H4/100)) | [Q17]=No
R5: [A1]==A4 | [C3]==Costing!B24 & " - Materials" | [D4]==Costing!F24 | [E5]==Costing!I24 | [F6]==Costing!G24 | [G7]=Timber Materials | [H8]==Costing!J24*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J5="MTL","Preservation Shop","") | [N14]==D5*E5 | [O15]=DELETE | [P16]==N5*(1+(H5/100)) | [Q17]=No
R6: [A1]==A4 | [C3]==Costing!B25 & " - Materials" | [D4]==Costing!F25 | [E5]==Costing!I25 | [F6]==Costing!G25 | [G7]=Timber Materials | [H8]==Costing!J25*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J6="MTL","Preservation Shop","") | [N14]==D6*E6 | [O15]=DELETE | [P16]==N6*(1+(H6/100)) | [Q17]=No
R7: [A1]==A6 | [C3]==Costing!B29 | [D4]==Costing!F29 | [E5]==Costing!I29 | [F6]==Costing!G29 | [G7]=Timber Materials | [H8]==Costing!J29*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J7="MTL","Preservation Shop","") | [N14]==D7*E7 | [O15]=DELETE | [P16]==N7*(1+(H7/100)) | [Q17]=No
R8: [A1]==A7 | [C3]==Costing!B30 | [D4]==Costing!F30 | [E5]==Costing!I30 | [F6]==Costing!G30 | [G7]=Timber Materials | [H8]==Costing!J30*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J8="MTL","Preservation Shop","") | [N14]==D8*E8 | [O15]=DELETE | [P16]==N8*(1+(H8/100)) | [Q17]=No
R9: [A1]==A8 | [C3]==Costing!B31 | [D4]==Costing!F31 | [E5]==Costing!I31 | [F6]==Costing!G31 | [G7]=Timber Materials | [H8]==Costing!J31*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J9="MTL","Preservation Shop","") | [N14]==D9*E9 | [O15]=DELETE | [P16]==N9*(1+(H9/100)) | [Q17]=No
R10: [A1]==A9 | [C3]==Costing!B32 | [D4]==Costing!F32 | [E5]==Costing!I32 | [F6]==Costing!G32 | [G7]=Timber Materials | [H8]==Costing!J32*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J10="MTL","Preservation Shop","") | [N14]==D10*E10 | [O15]=DELETE | [P16]==N10*(1+(H10/100)) | [Q17]=No
R11: [A1]==A10 | [C3]==Costing!B33 | [D4]==Costing!F33 | [E5]==Costing!I33 | [F6]==Costing!G33 | [G7]=Timber Materials | [H8]==Costing!J33*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J11="MTL","Preservation Shop","") | [N14]==D11*E11 | [O15]=DELETE | [P16]==N11*(1+(H11/100)) | [Q17]=No
R12: [A1]==A11 | [C3]==Costing!B34 | [D4]==Costing!F34 | [E5]==Costing!I34 | [F6]==Costing!G34 | [G7]=Timber Materials | [H8]==Costing!J34*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J12="MTL","Preservation Shop","") | [N14]==D12*E12 | [O15]=DELETE | [P16]==N12*(1+(H12/100)) | [Q17]=No
R13: [A1]==A12 | [C3]==Costing!B35 | [D4]==Costing!F35 | [E5]==Costing!I35 | [F6]==Costing!G35 | [G7]=Timber Materials | [H8]==Costing!J35*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J13="MTL","Preservation Shop","") | [N14]==D13*E13 | [O15]=DELETE | [P16]==N13*(1+(H13/100)) | [Q17]=No
R14: [A1]==A13 | [C3]==Costing!B36 | [D4]==Costing!F36 | [E5]==Costing!I36 | [F6]==Costing!G36 | [G7]=Timber Materials | [H8]==Costing!J36*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J14="MTL","Preservation Shop","") | [N14]==D14*E14 | [O15]=DELETE | [P16]==N14*(1+(H14/100)) | [Q17]=No
R15: [A1]==A14 | [C3]==Costing!B37 | [D4]==Costing!F37 | [E5]==Costing!I37 | [F6]==Costing!G37 | [G7]=Timber Materials | [H8]==Costing!J37*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J15="MTL","Preservation Shop","") | [N14]==D15*E15 | [O15]=DELETE | [P16]==N15*(1+(H15/100)) | [Q17]=No
R16: [A1]==A15 | [C3]==Costing!B38 | [D4]==Costing!F38 | [E5]==Costing!I38 | [F6]==Costing!G38 | [G7]=Timber Materials | [H8]==Costing!J38*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J16="MTL","Preservation Shop","") | [N14]==D16*E16 | [O15]=DELETE | [P16]==N16*(1+(H16/100)) | [Q17]=No
R17: [A1]==A31 | [C3]==Costing!M21 & " - Labour" | [D4]==Costing!O21 | [E5]==Costing!Q21 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R21*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=Yes | [M13]==IF(J17="MTL","Preservation Shop","") | [N14]==D17*E17 | [O15]=DELETE | [P16]==N17*(1+(H17/100)) | [Q17]=No
R18: [A1]==A17 | [C3]==Costing!M22 & " - Labour" | [D4]==Costing!O22 | [E5]==Costing!Q22 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R22*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=Yes | [M13]==IF(J18="MTL","Preservation Shop","") | [N14]==D18*E18 | [O15]=DELETE | [P16]==N18*(1+(H18/100)) | [Q17]=No
R19: [A1]==A18 | [C3]==Costing!M23 & " - Labour" | [D4]==Costing!O23 | [E5]==Costing!Q23 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R23*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J19="MTL","Preservation Shop","") | [N14]==D19*E19 | [O15]=DELETE | [P16]==N19*(1+(H19/100)) | [Q17]=No
R20: [A1]==A19 | [C3]==Costing!M24 & " - Labour" | [D4]==Costing!O24 | [E5]==Costing!Q24 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R24*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J20="MTL","Preservation Shop","") | [N14]==D20*E20 | [O15]=DELETE | [P16]==N20*(1+(H20/100)) | [Q17]=No
R21: [A1]==A19 | [C3]==Costing!M25 & " - Labour" | [D4]==Costing!O25 | [E5]==Costing!Q25 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R25*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J21="MTL","Preservation Shop","") | [N14]==D21*E21 | [O15]=DELETE | [P16]==N21*(1+(H21/100)) | [Q17]=No
R22: [A1]==A16 | [C3]==Costing!M29 | [D4]==Costing!O29 | [E5]==Costing!Q29 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R29*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J22="MTL","Preservation Shop","") | [N14]==D22*E22 | [O15]=DELETE | [P16]==N22*(1+(H22/100)) | [Q17]=No
R23: [A1]==A22 | [C3]==Costing!M30 | [D4]==Costing!O30 | [E5]==Costing!Q30 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R30*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J23="MTL","Preservation Shop","") | [N14]==D23*E23 | [O15]=DELETE | [P16]==N23*(1+(H23/100)) | [Q17]=No
R24: [A1]==A23 | [C3]==Costing!M31 | [D4]==Costing!O31 | [E5]==Costing!Q31 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R31*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J24="MTL","Preservation Shop","") | [N14]==D24*E24 | [O15]=DELETE | [P16]==N24*(1+(H24/100)) | [Q17]=No
R25: [A1]==A24 | [C3]==Costing!M32 | [D4]==Costing!O32 | [E5]==Costing!Q32 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R32*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J25="MTL","Preservation Shop","") | [N14]==D25*E25 | [O15]=DELETE | [P16]==N25*(1+(H25/100)) | [Q17]=No
R26: [A1]==A25 | [C3]==Costing!M33 | [D4]==Costing!O33 | [E5]==Costing!Q33 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R33*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J26="MTL","Preservation Shop","") | [N14]==D26*E26 | [O15]=DELETE | [P16]==N26*(1+(H26/100)) | [Q17]=No
R27: [A1]==A26 | [C3]==Costing!M34 | [D4]==Costing!O34 | [E5]==Costing!Q34 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R34*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J27="MTL","Preservation Shop","") | [N14]==D27*E27 | [O15]=DELETE | [P16]==N27*(1+(H27/100)) | [Q17]=No
R28: [A1]==A27 | [C3]==Costing!M35 | [D4]==Costing!O35 | [E5]==Costing!Q35 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R35*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J28="MTL","Preservation Shop","") | [N14]==D28*E28 | [O15]=DELETE | [P16]==N28*(1+(H28/100)) | [Q17]=No
R29: [A1]==A28 | [C3]==Costing!M36 | [D4]==Costing!O36 | [E5]==Costing!Q36 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R36*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J29="MTL","Preservation Shop","") | [N14]==D29*E29 | [O15]=DELETE | [P16]==N29*(1+(H29/100)) | [Q17]=No
R30: [A1]==A29 | [C3]==Costing!M37 | [D4]==Costing!O37 | [E5]==Costing!Q37 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R37*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J30="MTL","Preservation Shop","") | [N14]==D30*E30 | [O15]=DELETE | [P16]==N30*(1+(H30/100)) | [Q17]=No
R31: [A1]==A30 | [C3]==Costing!M38 | [D4]==Costing!O38 | [E5]==Costing!Q38 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R38*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J31="MTL","Preservation Shop","") | [N14]==D31*E31 | [O15]=DELETE | [P16]==N31*(1+(H31/100)) | [Q17]=No
R32: [A1]==A21 | [C3]=Stripping out - Materials | [D4]=1 | [E5]==N32 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P32-N32)/N32)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J32="MTL","Preservation Shop","") | [N14]==SUM(N2:N16) | [O15]==IF(N32=0,"DELETE","LEAVE") | [P16]==SUM(P2:P16) | [Q17]=Yes
R33: [A1]==A32 | [C3]=Stripping out - Labour | [D4]==SUM(D22:D31) | [E5]==N33/D33 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P33-N33)/N33)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J33="MTL","Preservation Shop","") | [N14]==SUM(N17:N31) | [O15]==IF(N33=0,"DELETE","LEAVE") | [P16]==SUM(P17:P31) | [Q17]=Yes
R34: [O15]=DELETE
R35: [A1]=='Customer Summary'!C5 | [C3]==Costing!B42 | [D4]==Costing!F42 | [E5]==Costing!I42 | [F6]==Costing!G42 | [G7]=Timber Materials | [H8]==Costing!J42*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J35="MTL","Preservation Shop","") | [N14]==D35*E35 | [O15]=DELETE | [P16]==N35*(1+(H35/100)) | [Q17]=No
R36: [A1]==A35 | [C3]==Costing!B43 | [D4]==Costing!F43 | [E5]==Costing!I43 | [F6]==Costing!G43 | [G7]=Timber Materials | [H8]==Costing!J43*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J36="MTL","Preservation Shop","") | [N14]==D36*E36 | [O15]=DELETE | [P16]==N36*(1+(H36/100)) | [Q17]=No
R37: [A1]==A36 | [C3]==Costing!B44 | [D4]==Costing!F44 | [E5]==Costing!I44 | [F6]==Costing!G44 | [G7]=Timber Materials | [H8]==Costing!J44*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J37="MTL","Preservation Shop","") | [N14]==D37*E37 | [O15]=DELETE | [P16]==N37*(1+(H37/100)) | [Q17]=No
R38: [A1]==A37 | [C3]==Costing!B45 | [D4]==Costing!F45 | [E5]==Costing!I45 | [F6]==Costing!G45 | [G7]=Timber Materials | [H8]==Costing!J45*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J38="MTL","Preservation Shop","") | [N14]==D38*E38 | [O15]=DELETE | [P16]==N38*(1+(H38/100)) | [Q17]=No
R39: [A1]==A38 | [C3]==Costing!B46 | [D4]==Costing!F46 | [E5]==Costing!I46 | [F6]==Costing!G46 | [G7]=Timber Materials | [H8]==Costing!J46*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J39="MTL","Preservation Shop","") | [N14]==D39*E39 | [O15]=DELETE | [P16]==N39*(1+(H39/100)) | [Q17]=No
R40: [A1]==A39 | [C3]==Costing!B47 | [D4]==Costing!F47 | [E5]==Costing!I47 | [F6]==Costing!G47 | [G7]=Timber Materials | [H8]==Costing!J47*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J40="MTL","Preservation Shop","") | [N14]==D40*E40 | [O15]=DELETE | [P16]==N40*(1+(H40/100)) | [Q17]=No
R41: [A1]==A40 | [C3]==Costing!B48 | [D4]==Costing!F48 | [E5]==Costing!I48 | [F6]==Costing!G48 | [G7]=Timber Materials | [H8]==Costing!J48*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J41="MTL","Preservation Shop","") | [N14]==D41*E41 | [O15]=DELETE | [P16]==N41*(1+(H41/100)) | [Q17]=No
R42: [A1]==A41 | [C3]==Costing!B49 | [D4]==Costing!F49 | [E5]==Costing!I49 | [F6]==Costing!G49 | [G7]=Timber Materials | [H8]==Costing!J49*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J42="MTL","Preservation Shop","") | [N14]==D42*E42 | [O15]=DELETE | [P16]==N42*(1+(H42/100)) | [Q17]=No
R43: [A1]==A42 | [C3]==Costing!B50 | [D4]==Costing!F50 | [E5]==Costing!I50 | [F6]==Costing!G50 | [G7]=Timber Materials | [H8]==Costing!J50*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J43="MTL","Preservation Shop","") | [N14]==D43*E43 | [O15]=DELETE | [P16]==N43*(1+(H43/100)) | [Q17]=No
R44: [A1]==A43 | [C3]==Costing!B51 | [D4]==Costing!F51 | [E5]==Costing!I51 | [F6]==Costing!G51 | [G7]=Timber Materials | [H8]==Costing!J51*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J44="MTL","Preservation Shop","") | [N14]==D44*E44 | [O15]=DELETE | [P16]==N44*(1+(H44/100)) | [Q17]=No
R45: [A1]==A44 | [C3]==Costing!B53 | [D4]==Costing!F53 | [E5]==Costing!I53 | [F6]==Costing!G53 | [G7]=Timber Materials | [H8]==Costing!J53*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J45="MTL","Preservation Shop","") | [N14]==D45*E45 | [O15]=DELETE | [P16]==N45*(1+(H45/100)) | [Q17]=No
R46: [A1]==A45 | [C3]==Costing!B54 | [D4]==Costing!F54 | [E5]==Costing!I54 | [F6]==Costing!G54 | [G7]=Timber Materials | [H8]==Costing!J54*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J46="MTL","Preservation Shop","") | [N14]==D46*E46 | [O15]=DELETE | [P16]==N46*(1+(H46/100)) | [Q17]=No
R47: [A1]==A46 | [C3]==Costing!M42 | [D4]==Costing!O42 | [E5]==Costing!Q42 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R42*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J47="MTL","Preservation Shop","") | [N14]==D47*E47 | [O15]=DELETE | [P16]==N47*(1+(H47/100)) | [Q17]=No
R48: [A1]==A47 | [C3]==Costing!B43 | [D4]==Costing!O43 | [E5]==Costing!Q43 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R43*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J48="MTL","Preservation Shop","") | [N14]==D48*E48 | [O15]=DELETE | [P16]==N48*(1+(H48/100)) | [Q17]=No
R49: [A1]==A48 | [C3]==Costing!B44 | [D4]==Costing!O44 | [E5]==Costing!Q44 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R44*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J49="MTL","Preservation Shop","") | [N14]==D49*E49 | [O15]=DELETE | [P16]==N49*(1+(H49/100)) | [Q17]=No
R50: [A1]==A49 | [C3]==Costing!B45 | [D4]==Costing!O45 | [E5]==Costing!Q45 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R45*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J50="MTL","Preservation Shop","") | [N14]==D50*E50 | [O15]=DELETE | [P16]==N50*(1+(H50/100)) | [Q17]=No
R51: [A1]==A50 | [C3]==Costing!B46 | [D4]==Costing!O46 | [E5]==Costing!Q46 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R46*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J51="MTL","Preservation Shop","") | [N14]==D51*E51 | [O15]=DELETE | [P16]==N51*(1+(H51/100)) | [Q17]=No
R52: [A1]==A51 | [C3]==Costing!B47 | [D4]==Costing!O47 | [E5]==Costing!Q47 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R47*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J52="MTL","Preservation Shop","") | [N14]==D52*E52 | [O15]=DELETE | [P16]==N52*(1+(H52/100)) | [Q17]=No
R53: [A1]==A52 | [C3]==Costing!B48 | [D4]==Costing!O48 | [E5]==Costing!Q48 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R48*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J53="MTL","Preservation Shop","") | [N14]==D53*E53 | [O15]=DELETE | [P16]==N53*(1+(H53/100)) | [Q17]=No
R54: [A1]==A53 | [C3]==Costing!M49 | [D4]==Costing!O49 | [E5]==Costing!Q49 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R49*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J54="MTL","Preservation Shop","") | [N14]==D54*E54 | [O15]=DELETE | [P16]==N54*(1+(H54/100)) | [Q17]=No
R55: [A1]==A54 | [C3]==Costing!M50 | [D4]==Costing!O50 | [E5]==Costing!Q50 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R50*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J55="MTL","Preservation Shop","") | [N14]==D55*E55 | [O15]=DELETE | [P16]==N55*(1+(H55/100)) | [Q17]=No
R56: [A1]==A55 | [C3]==Costing!M51 | [D4]==Costing!O51 | [E5]==Costing!Q51 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R51*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J56="MTL","Preservation Shop","") | [N14]==D56*E56 | [O15]=DELETE | [P16]==N56*(1+(H56/100)) | [Q17]=No
R57: [A1]==A56 | [C3]==Costing!M53 | [D4]==Costing!O53 | [E5]==Costing!Q53 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R53*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J57="MTL","Preservation Shop","") | [N14]==D57*E57 | [O15]=DELETE | [P16]==N57*(1+(H57/100)) | [Q17]=No
R58: [A1]==A57 | [C3]==Costing!M54 | [D4]==Costing!O54 | [E5]==Costing!Q54 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R54*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J58="MTL","Preservation Shop","") | [N14]==D58*E58 | [O15]=DELETE | [P16]==N58*(1+(H58/100)) | [Q17]=No
R59: [A1]==A58 | [C3]=Walls (install membrane system) - Materials | [D4]=1 | [E5]==N59 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P59-N59)/N59)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D5 | [M13]==IF(J59="MTL","Preservation Shop","") | [N14]==SUM(N35:N46) | [O15]==IF(N59=0,"DELETE","LEAVE") | [P16]==SUM(P35:P46) | [Q17]=Yes
R60: [A1]==A59 | [C3]=Walls (install membrane system) - Labour | [D4]==SUM(D47:D58) | [E5]==N60/D60 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P60-N60)/N60)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L59 | [M13]==IF(J60="MTL","Preservation Shop","") | [N14]==SUM(N47:N58) | [O15]==IF(N60=0,"DELETE","LEAVE") | [P16]==SUM(P47:P58) | [Q17]=Yes
R61: [O15]=DELETE
R62: [A1]=='Customer Summary'!C6 | [C3]==Costing!B58 | [D4]==Costing!F58 | [E5]==Costing!I58 | [F6]==Costing!G58 | [G7]=Timber Materials | [H8]==Costing!J58*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J62="MTL","Preservation Shop","") | [N14]==D62*E62 | [O15]=DELETE | [P16]==N62*(1+(H62/100)) | [Q17]=No
R63: [A1]==A62 | [C3]==Costing!B59 | [D4]==Costing!F59 | [E5]==Costing!I59 | [F6]==Costing!G59 | [G7]=Timber Materials | [H8]==Costing!J59*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J63="MTL","Preservation Shop","") | [N14]==D63*E63 | [O15]=DELETE | [P16]==N63*(1+(H63/100)) | [Q17]=No
R64: [A1]==A63 | [C3]==Costing!B60 | [D4]==Costing!F60 | [E5]==Costing!I60 | [F6]==Costing!G60 | [G7]=Timber Materials | [H8]==Costing!J60*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J64="MTL","Preservation Shop","") | [N14]==D64*E64 | [O15]=DELETE | [P16]==N64*(1+(H64/100)) | [Q17]=No
R65: [A1]==A64 | [C3]==Costing!B61 | [D4]==Costing!F61 | [E5]==Costing!I61 | [F6]==Costing!G61 | [G7]=Timber Materials | [H8]==Costing!J61*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J65="MTL","Preservation Shop","") | [N14]==D65*E65 | [O15]=DELETE | [P16]==N65*(1+(H65/100)) | [Q17]=No
R66: [A1]==A65 | [C3]==Costing!M58 | [D4]==Costing!O58 | [E5]==Costing!Q58 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R58*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J66="MTL","Preservation Shop","") | [N14]==D66*E66 | [O15]=DELETE | [P16]==N66*(1+(H66/100)) | [Q17]=No
R67: [A1]==A66 | [C3]==Costing!M59 | [D4]==Costing!O59 | [E5]==Costing!Q59 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R59*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J67="MTL","Preservation Shop","") | [N14]==D67*E67 | [O15]=DELETE | [P16]==N67*(1+(H67/100)) | [Q17]=No
R68: [A1]==A67 | [C3]==Costing!M60 | [D4]==Costing!O60 | [E5]==Costing!Q60 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R60*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J68="MTL","Preservation Shop","") | [N14]==D68*E68 | [O15]=DELETE | [P16]==N68*(1+(H68/100)) | [Q17]=No
R69: [A1]==A68 | [C3]==Costing!M61 | [D4]==Costing!O61 | [E5]==Costing!Q61 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R61*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J69="MTL","Preservation Shop","") | [N14]==D69*E69 | [O15]=DELETE | [P16]==N69*(1+(H69/100)) | [Q17]=No
R70: [A1]==A69 | [C3]=Cementitious tanking system - Materials | [D4]=1 | [E5]==N70 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P70-N70)/N70)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D6 | [M13]==IF(J70="MTL","Preservation Shop","") | [N14]==SUM(N62:N65) | [O15]==IF(N70=0,"DELETE","LEAVE") | [P16]==SUM(P62:P65) | [Q17]=Yes
R71: [A1]==A70 | [C3]=Cementitious tanking system - Labour | [D4]==SUM(D66:D69) | [E5]==N71/D71 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P71-N71)/N71)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L70 | [M13]==IF(J71="MTL","Preservation Shop","") | [N14]==SUM(N66:N69) | [O15]==IF(N71=0,"DELETE","LEAVE") | [P16]==SUM(P66:P69) | [Q17]=Yes
R72: [O15]=DELETE
R73: [A1]=='Customer Summary'!C7 | [C3]==Costing!B65 | [D4]==ROUNDUP(Costing!F65/30,0) | [E5]==Costing!I65 | [F6]=Each | [G7]=Timber Materials | [H8]==Costing!J65*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J73="MTL","Preservation Shop","") | [N14]==D73*E73 | [O15]=DELETE | [P16]==N73*(1+(H73/100)) | [Q17]=No
R74: [A1]==A73 | [C3]==Costing!B66 | [D4]==ROUNDUP(Costing!F66/30,0) | [E5]==Costing!I66 | [F6]=Each | [G7]=Timber Materials | [H8]==Costing!J66*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J74="MTL","Preservation Shop","") | [N14]==D74*E74 | [O15]=DELETE | [P16]==N74*(1+(H74/100)) | [Q17]=No
R75: [A1]==A74 | [C3]==Costing!B67 | [D4]==ROUNDUP(Costing!F67/25,0) | [E5]==Costing!I67 | [F6]=Each | [G7]=Timber Materials | [H8]==Costing!J67*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J75="MTL","Preservation Shop","") | [N14]==D75*E75 | [O15]=DELETE | [P16]==N75*(1+(H75/100)) | [Q17]=No
R76: [A1]==A75 | [C3]==Costing!M65 | [D4]==Costing!O65 | [E5]==Costing!Q65 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R65*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J76="MTL","Preservation Shop","") | [N14]==D76*E76 | [O15]=DELETE | [P16]==N76*(1+(H76/100)) | [Q17]=No
R77: [A1]==A76 | [C3]==Costing!M66 | [D4]==Costing!O66 | [E5]==Costing!Q66 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R66*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J77="MTL","Preservation Shop","") | [N14]==D77*E77 | [O15]=DELETE | [P16]==N77*(1+(H77/100)) | [Q17]=No
R78: [A1]==A77 | [C3]==Costing!M67 | [D4]==Costing!O67 | [E5]==Costing!Q67 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R67*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J78="MTL","Preservation Shop","") | [N14]==D78*E78 | [O15]=DELETE | [P16]==N78*(1+(H78/100)) | [Q17]=No
R79: [A1]==A78 | [C3]=Floor - Liquid Resin floor Membranes  - Materials | [D4]=1 | [E5]==N79 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P79-N79)/N79)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D7 | [M13]==IF(J79="MTL","Preservation Shop","") | [N14]==SUM(N73:N75) | [O15]==IF(N79=0,"DELETE","LEAVE") | [P16]==SUM(P73:P75) | [Q17]=Yes
R80: [A1]==A79 | [C3]=Floor - Liquid Resin floor Membranes  - Labour | [D4]==SUM(D76:D78) | [E5]==N80/D80 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P80-N80)/N80)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L79 | [M13]==IF(J80="MTL","Preservation Shop","") | [N14]==SUM(N76:N78) | [O15]==IF(N80=0,"DELETE","LEAVE") | [P16]==SUM(P76:P78) | [Q17]=Yes
R81: [O15]=DELETE
R82: [A1]=='Customer Summary'!C8 | [C3]==Costing!B71 | [D4]==Costing!F71 | [E5]==Costing!I71 | [F6]==Costing!G71 | [G7]=Timber Materials | [H8]==Costing!J71*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J82="MTL","Preservation Shop","") | [N14]==D82*E82 | [O15]=DELETE | [P16]==N82*(1+(H82/100)) | [Q17]=No
R83: [A1]==A82 | [C3]==Costing!B72 | [D4]==Costing!F72 | [E5]==Costing!I72 | [F6]==Costing!G72 | [G7]=Timber Materials | [H8]==Costing!J72*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J83="MTL","Preservation Shop","") | [N14]==D83*E83 | [O15]=DELETE | [P16]==N83*(1+(H83/100)) | [Q17]=No
R84: [A1]==A83 | [C3]==Costing!B74 | [D4]==Costing!F74 | [E5]==Costing!I74 | [F6]==Costing!G74 | [G7]=Timber Materials | [H8]==Costing!J74*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J84="MTL","Preservation Shop","") | [N14]==D84*E84 | [O15]=DELETE | [P16]==N84*(1+(H84/100)) | [Q17]=No
R85: [A1]==A84 | [C3]==Costing!B75 | [D4]==Costing!F75 | [E5]==Costing!I75 | [F6]==Costing!G75 | [G7]=Timber Materials | [H8]==Costing!J75*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J85="MTL","Preservation Shop","") | [N14]==D85*E85 | [O15]=DELETE | [P16]==N85*(1+(H85/100)) | [Q17]=No
R86: [A1]==A85 | [C3]==Costing!B76 | [D4]==Costing!F76 | [E5]==Costing!I76 | [F6]==Costing!G76 | [G7]=Timber Materials | [H8]==Costing!J76*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J86="MTL","Preservation Shop","") | [N14]==D86*E86 | [O15]=DELETE | [P16]==N86*(1+(H86/100)) | [Q17]=No
R87: [A1]==A86 | [C3]==Costing!B77 | [D4]==Costing!F77 | [E5]==Costing!I77 | [F6]==Costing!G77 | [G7]=Timber Materials | [H8]==Costing!J77*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J87="MTL","Preservation Shop","") | [N14]==D87*E87 | [O15]=DELETE | [P16]==N87*(1+(H87/100)) | [Q17]=No
R88: [A1]==A87 | [C3]==Costing!B78 | [D4]==Costing!F78 | [E5]==Costing!I78 | [F6]==Costing!G78 | [G7]=Timber Materials | [H8]==Costing!J78*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J88="MTL","Preservation Shop","") | [N14]==D88*E88 | [O15]=DELETE | [P16]==N88*(1+(H88/100)) | [Q17]=No
R89: [A1]==A88 | [C3]==Costing!M71 | [D4]==Costing!O71 | [E5]==Costing!Q71 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R71*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J89="MTL","Preservation Shop","") | [N14]==D89*E89 | [O15]=DELETE | [P16]==N89*(1+(H89/100)) | [Q17]=No
R90: [A1]==A89 | [C3]==Costing!M72 | [D4]==Costing!O72 | [E5]==Costing!Q72 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R72*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J90="MTL","Preservation Shop","") | [N14]==D90*E90 | [O15]=DELETE | [P16]==N90*(1+(H90/100)) | [Q17]=No
R91: [A1]==A90 | [C3]==Costing!M74 | [D4]==Costing!O74 | [E5]==Costing!Q74 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R74*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J91="MTL","Preservation Shop","") | [N14]==D91*E91 | [O15]=DELETE | [P16]==N91*(1+(H91/100)) | [Q17]=No
R92: [A1]==A91 | [C3]==Costing!M75 | [D4]==Costing!O75 | [E5]==Costing!Q75 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R75*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J92="MTL","Preservation Shop","") | [N14]==D92*E92 | [O15]=DELETE | [P16]==N92*(1+(H92/100)) | [Q17]=No
R93: [A1]==A92 | [C3]==Costing!M76 | [D4]==Costing!O76 | [E5]==Costing!Q76 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R76*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J93="MTL","Preservation Shop","") | [N14]==D93*E93 | [O15]=DELETE | [P16]==N93*(1+(H93/100)) | [Q17]=No
R94: [A1]==A93 | [C3]==Costing!M77 | [D4]==Costing!O77 | [E5]==Costing!Q77 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R77*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J94="MTL","Preservation Shop","") | [N14]==D94*E94 | [O15]=DELETE | [P16]==N94*(1+(H94/100)) | [Q17]=No
R95: [A1]==A94 | [C3]==Costing!M78 | [D4]==Costing!O78 | [E5]==Costing!Q78 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R78*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J95="MTL","Preservation Shop","") | [N14]==D95*E95 | [O15]=DELETE | [P16]==N95*(1+(H95/100)) | [Q17]=No
R96: [A1]==A95 | [C3]=Plastering/finishing  - Materials | [D4]=1 | [E5]==N96 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P96-N96)/N96)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D8 | [M13]==IF(J96="MTL","Preservation Shop","") | [N14]==SUM(N82:N88) | [O15]==IF(N96=0,"DELETE","LEAVE") | [P16]==SUM(P82:P88) | [Q17]=Yes
R97: [A1]==A96 | [C3]=Plastering/finishing  - Labour | [D4]==SUM(D89:D95) | [E5]==N97/D97 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P97-N97)/N97)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L96 | [M13]==IF(J97="MTL","Preservation Shop","") | [N14]==SUM(N89:N95) | [O15]==IF(N97=0,"DELETE","LEAVE") | [P16]==SUM(P89:P95) | [Q17]=Yes
R98: [O15]=DELETE
R99: [A1]=='Customer Summary'!C9 | [C3]==Costing!B73 | [D4]==Costing!F73 | [E5]==Costing!I73 | [F6]==Costing!G73 | [G7]=Timber Materials | [H8]==Costing!J73*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J99="MTL","Preservation Shop","") | [N14]==D99*E99 | [O15]=DELETE | [P16]==N99*(1+(H99/100)) | [Q17]=No
R100: [A1]==A99 | [C3]==Costing!M73 | [D4]==Costing!O73 | [E5]==Costing!Q73 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R73*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J100="MTL","Preservation Shop","") | [N14]==D100*E100 | [O15]=DELETE | [P16]==N100*(1+(H100/100)) | [Q17]=No
R101: [A1]==A100 | [C3]=Plastering/finishing  - Materials | [D4]=1 | [E5]==N101 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P101-N101)/N101)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D9 | [M13]==IF(J101="MTL","Preservation Shop","") | [N14]==SUM(N99) | [O15]==IF(N101=0,"DELETE","LEAVE") | [P16]==SUM(P99) | [Q17]=Yes
R102: [A1]==A101 | [C3]=Plastering/finishing  - Labour | [D4]==SUM(D100) | [E5]==N102/D102 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P102-N102)/N102)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L101 | [M13]==IF(J102="MTL","Preservation Shop","") | [N14]==SUM(N100) | [O15]==IF(N102=0,"DELETE","LEAVE") | [P16]==SUM(P100) | [Q17]=Yes
R103: [O15]=DELETE
R104: [A1]=='Customer Summary'!C10 | [C3]==Costing!B83 | [D4]==Costing!F83 | [E5]==Costing!I83 | [F6]==Costing!G83 | [G7]=Timber Materials | [H8]==Costing!J83*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J104="MTL","Preservation Shop","") | [N14]==D104*E104 | [O15]=DELETE | [P16]==N104*(1+(H104/100)) | [Q17]=No
R105: [A1]==A104 | [C3]==Costing!B84 | [D4]==Costing!F84 | [E5]==Costing!I84 | [F6]==Costing!G84 | [G7]=Timber Materials | [H8]==Costing!J84*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J105="MTL","Preservation Shop","") | [N14]==D105*E105 | [O15]=DELETE | [P16]==N105*(1+(H105/100)) | [Q17]=No
R106: [A1]==A105 | [C3]==Costing!B85 | [D4]==Costing!F85 | [E5]==Costing!I85 | [F6]==Costing!G85 | [G7]=Timber Materials | [H8]==Costing!J85*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J106="MTL","Preservation Shop","") | [N14]==D106*E106 | [O15]=DELETE | [P16]==N106*(1+(H106/100)) | [Q17]=No
R107: [A1]==A106 | [C3]==Costing!B86 | [D4]==Costing!F86 | [E5]==Costing!I86 | [F6]==Costing!G86 | [G7]=Timber Materials | [H8]==Costing!J86*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J107="MTL","Preservation Shop","") | [N14]==D107*E107 | [O15]=DELETE | [P16]==N107*(1+(H107/100)) | [Q17]=No
R108: [A1]==A107 | [C3]==Costing!B87 | [D4]==Costing!F87 | [E5]==Costing!I87 | [F6]==Costing!G87 | [G7]=Timber Materials | [H8]==Costing!J87*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J108="MTL","Preservation Shop","") | [N14]==D108*E108 | [O15]=DELETE | [P16]==N108*(1+(H108/100)) | [Q17]=No
R109: [A1]==A108 | [C3]==Costing!B88 | [D4]==Costing!F88 | [E5]==Costing!I88 | [F6]==Costing!G88 | [G7]=Timber Materials | [H8]==Costing!J88*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J109="MTL","Preservation Shop","") | [N14]==D109*E109 | [O15]=DELETE | [P16]==N109*(1+(H109/100)) | [Q17]=No
R110: [A1]==A109 | [C3]==Costing!B89 | [D4]==Costing!F89 | [E5]==Costing!I89 | [F6]==Costing!G89 | [G7]=Timber Materials | [H8]==Costing!J89*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J110="MTL","Preservation Shop","") | [N14]==D110*E110 | [O15]=DELETE | [P16]==N110*(1+(H110/100)) | [Q17]=No
R111: [A1]==A110 | [C3]==Costing!B90 | [D4]==Costing!F90 | [E5]==Costing!I90 | [F6]==Costing!G90 | [G7]=Timber Materials | [H8]==Costing!J90*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J111="MTL","Preservation Shop","") | [N14]==D111*E111 | [O15]=DELETE | [P16]==N111*(1+(H111/100)) | [Q17]=No
R112: [A1]==A111 | [C3]==Costing!B91 | [D4]==Costing!F91 | [E5]==Costing!I91 | [F6]==Costing!G91 | [G7]=Timber Materials | [H8]==Costing!J91*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J112="MTL","Preservation Shop","") | [N14]==D112*E112 | [O15]=DELETE | [P16]==N112*(1+(H112/100)) | [Q17]=No
R113: [A1]==A112 | [C3]==Costing!B92 | [D4]==Costing!F92 | [E5]==Costing!I92 | [F6]==Costing!G92 | [G7]=Timber Materials | [H8]==Costing!J92*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J113="MTL","Preservation Shop","") | [N14]==D113*E113 | [O15]=DELETE | [P16]==N113*(1+(H113/100)) | [Q17]=No
R114: [A1]==A113 | [C3]==Costing!B94 | [D4]==Costing!F94 | [E5]==Costing!I94 | [F6]==Costing!G94 | [G7]=Timber Materials | [H8]==Costing!J94*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J114="MTL","Preservation Shop","") | [N14]==D114*E114 | [O15]=DELETE | [P16]==N114*(1+(H114/100)) | [Q17]=No
R115: [A1]==A114 | [C3]==Costing!B95 | [D4]==Costing!F95 | [E5]==Costing!I95 | [F6]==Costing!G95 | [G7]=Timber Materials | [H8]==Costing!J95*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J115="MTL","Preservation Shop","") | [N14]==D115*E115 | [O15]=DELETE | [P16]==N115*(1+(H115/100)) | [Q17]=No
R116: [A1]==A115 | [C3]==Costing!B96 | [D4]==Costing!F96 | [E5]==Costing!I96 | [F6]==Costing!G96 | [G7]=Timber Materials | [H8]==Costing!J96*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J116="MTL","Preservation Shop","") | [N14]==D116*E116 | [O15]=DELETE | [P16]==N116*(1+(H116/100)) | [Q17]=No
R117: [A1]==A116 | [C3]==Costing!B97 | [D4]==Costing!F97 | [E5]==Costing!I97 | [F6]==Costing!G97 | [G7]=Timber Materials | [H8]==Costing!J97*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J117="MTL","Preservation Shop","") | [N14]==D117*E117 | [O15]=DELETE | [P16]==N117*(1+(H117/100)) | [Q17]=No
R118: [A1]==A117 | [C3]==Costing!B98 | [D4]==Costing!F98 | [E5]==Costing!I98 | [F6]==Costing!G98 | [G7]=Timber Materials | [H8]==Costing!J98*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J118="MTL","Preservation Shop","") | [N14]==D118*E118 | [O15]=DELETE | [P16]==N118*(1+(H118/100)) | [Q17]=No
R119: [A1]==A117 | [C3]==Costing!B99 | [D4]==Costing!F99 | [E5]==Costing!I99 | [F6]==Costing!G99 | [G7]=Timber Materials | [H8]==Costing!J99*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J119="MTL","Preservation Shop","") | [N14]==D119*E119 | [O15]=DELETE | [P16]==N119*(1+(H119/100)) | [Q17]=No
R120: [A1]==A119 | [C3]==Costing!B100 | [D4]==Costing!F100 | [E5]==Costing!I100 | [F6]==Costing!G100 | [G7]=Timber Materials | [H8]==Costing!J100*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J120="MTL","Preservation Shop","") | [N14]==D120*E120 | [O15]=DELETE | [P16]==N120*(1+(H120/100)) | [Q17]=No
R121: [A1]==A120 | [C3]==Costing!M83 | [D4]==Costing!O83 | [E5]==Costing!Q83 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R83*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J121="MTL","Preservation Shop","") | [N14]==D121*E121 | [O15]=DELETE | [P16]==N121*(1+(H121/100)) | [Q17]=No
R122: [A1]==A121 | [C3]==Costing!M84 | [D4]==Costing!O84 | [E5]==Costing!Q84 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R84*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J122="MTL","Preservation Shop","") | [N14]==D122*E122 | [O15]=DELETE | [P16]==N122*(1+(H122/100)) | [Q17]=No
R123: [A1]==A122 | [C3]==Costing!M85 | [D4]==Costing!O85 | [E5]==Costing!Q85 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R85*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J123="MTL","Preservation Shop","") | [N14]==D123*E123 | [O15]=DELETE | [P16]==N123*(1+(H123/100)) | [Q17]=No
R124: [A1]==A123 | [C3]==Costing!M86 | [D4]==Costing!O86 | [E5]==Costing!Q86 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R86*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J124="MTL","Preservation Shop","") | [N14]==D124*E124 | [O15]=DELETE | [P16]==N124*(1+(H124/100)) | [Q17]=No
R125: [A1]==A124 | [C3]==Costing!M87 | [D4]==Costing!O87 | [E5]==Costing!Q87 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R87*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J125="MTL","Preservation Shop","") | [N14]==D125*E125 | [O15]=DELETE | [P16]==N125*(1+(H125/100)) | [Q17]=No
R126: [A1]==A125 | [C3]==Costing!M88 | [D4]==Costing!O88 | [E5]==Costing!Q88 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R88*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J126="MTL","Preservation Shop","") | [N14]==D126*E126 | [O15]=DELETE | [P16]==N126*(1+(H126/100)) | [Q17]=No
R127: [A1]==A126 | [C3]==Costing!M89 | [D4]==Costing!O89 | [E5]==Costing!Q89 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R89*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J127="MTL","Preservation Shop","") | [N14]==D127*E127 | [O15]=DELETE | [P16]==N127*(1+(H127/100)) | [Q17]=No
R128: [A1]==A127 | [C3]==Costing!M90 | [D4]==Costing!O90 | [E5]==Costing!Q90 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R90*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J128="MTL","Preservation Shop","") | [N14]==D128*E128 | [O15]=DELETE | [P16]==N128*(1+(H128/100)) | [Q17]=No
R129: [A1]==A128 | [C3]==Costing!M91 | [D4]==Costing!O91 | [E5]==Costing!Q91 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R91*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J129="MTL","Preservation Shop","") | [N14]==D129*E129 | [O15]=DELETE | [P16]==N129*(1+(H129/100)) | [Q17]=No
R130: [A1]==A129 | [C3]==Costing!M92 | [D4]==Costing!O92 | [E5]==Costing!Q92 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R92*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J130="MTL","Preservation Shop","") | [N14]==D130*E130 | [O15]=DELETE | [P16]==N130*(1+(H130/100)) | [Q17]=No
R131: [A1]==A130 | [C3]==Costing!M94 | [D4]==Costing!O94 | [E5]==Costing!Q94 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R94*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J131="MTL","Preservation Shop","") | [N14]==D131*E131 | [O15]=DELETE | [P16]==N131*(1+(H131/100)) | [Q17]=No
R132: [A1]==A131 | [C3]==Costing!M95 | [D4]==Costing!O95 | [E5]==Costing!Q95 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R95*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J132="MTL","Preservation Shop","") | [N14]==D132*E132 | [O15]=DELETE | [P16]==N132*(1+(H132/100)) | [Q17]=No
R133: [A1]==A132 | [C3]==Costing!M96 | [D4]==Costing!O96 | [E5]==Costing!Q96 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R96*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J133="MTL","Preservation Shop","") | [N14]==D133*E133 | [O15]=DELETE | [P16]==N133*(1+(H133/100)) | [Q17]=No
R134: [A1]==A133 | [C3]==Costing!M97 | [D4]==Costing!O97 | [E5]==Costing!Q97 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R97*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J134="MTL","Preservation Shop","") | [N14]==D134*E134 | [O15]=DELETE | [P16]==N134*(1+(H134/100)) | [Q17]=No
R135: [A1]==A134 | [C3]==Costing!M98 | [D4]==Costing!O98 | [E5]==Costing!Q98 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R98*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J135="MTL","Preservation Shop","") | [N14]==D135*E135 | [O15]=DELETE | [P16]==N135*(1+(H135/100)) | [Q17]=No
R136: [A1]==A134 | [C3]==Costing!M99 | [D4]==Costing!O99 | [E5]==Costing!Q99 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R99*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J136="MTL","Preservation Shop","") | [N14]==D136*E136 | [O15]=DELETE | [P16]==N136*(1+(H136/100)) | [Q17]=No
R137: [A1]==A136 | [C3]==Costing!M100 | [D4]==Costing!O100 | [E5]==Costing!Q100 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R100*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J137="MTL","Preservation Shop","") | [N14]==D137*E137 | [O15]=DELETE | [P16]==N137*(1+(H137/100)) | [Q17]=No
R138: [A1]==A137 | [C3]=Floor Joists & Floor Decking  - Materials | [D4]=1 | [E5]==N138 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P138-N138)/N138)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D10 | [M13]==IF(J138="MTL","Preservation Shop","") | [N14]==SUM(N104:N120) | [O15]==IF(N138=0,"DELETE","LEAVE") | [P16]==SUM(P104:P120) | [Q17]=Yes
R139: [A1]==A138 | [C3]=Floor Joists & Floor Decking  - Labour | [D4]==SUM(D121:D137) | [E5]==N139/D139 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P139-N139)/N139)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L138 | [M13]==IF(J139="MTL","Preservation Shop","") | [N14]==SUM(N121:N137) | [O15]==IF(N139=0,"DELETE","LEAVE") | [P16]==SUM(P121:P137) | [Q17]=Yes
R140: [O15]=DELETE
R141: [A1]=='Customer Summary'!C11 | [C3]==Costing!B104 | [D4]==Costing!F104 | [E5]==Costing!I104 | [F6]==Costing!G104 | [G7]=Timber Materials | [H8]==Costing!J104*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J141="MTL","Preservation Shop","") | [N14]==D141*E141 | [O15]=DELETE | [P16]==N141*(1+(H141/100)) | [Q17]=No
R142: [A1]==A141 | [C3]==Costing!B105 | [D4]==ROUNDUP(Costing!F105/10,0) | [E5]==Costing!I105 | [F6]=Container | [G7]=Timber Materials | [H8]==Costing!J105*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J142="MTL","Preservation Shop","") | [N14]==D142*E142 | [O15]=DELETE | [P16]==N142*(1+(H142/100)) | [Q17]=No
R143: [A1]==A142 | [C3]==Costing!B106 | [D4]==ROUNDUP(Costing!F106/25,0) | [E5]==Costing!I106 | [F6]=Bottle | [G7]=Timber Materials | [H8]==Costing!J106*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J143="MTL","Preservation Shop","") | [N14]==D143*E143 | [O15]=DELETE | [P16]==N143*(1+(H143/100)) | [Q17]=No
R144: [A1]==A143 | [C3]==Costing!B107 | [D4]==ROUNDUP(Costing!F107/4,0) | [E5]==Costing!I107 | [F6]=Tube | [G7]=Timber Materials | [H8]==Costing!J107*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J144="MTL","Preservation Shop","") | [N14]==D144*E144 | [O15]=DELETE | [P16]==N144*(1+(H144/100)) | [Q17]=No
R145: [A1]==A144 | [C3]==Costing!B108 | [D4]==Costing!F108 | [E5]==Costing!I108 | [F6]==Costing!G108 | [G7]=Timber Materials | [H8]==Costing!J108*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J145="MTL","Preservation Shop","") | [N14]==D145*E145 | [O15]=DELETE | [P16]==N145*(1+(H145/100)) | [Q17]=No
R146: [A1]==A145 | [C3]==Costing!B109 | [D4]==Costing!F109 | [E5]==Costing!I109 | [F6]==Costing!G109 | [G7]=Timber Materials | [H8]==Costing!J109*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J146="MTL","Preservation Shop","") | [N14]==D146*E146 | [O15]=DELETE | [P16]==N146*(1+(H146/100)) | [Q17]=No
R147: [A1]==A146 | [C3]==Costing!B110 | [D4]==Costing!F110 | [E5]==Costing!I110 | [F6]==Costing!G110 | [G7]=Timber Materials | [H8]==Costing!J110*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J147="MTL","Preservation Shop","") | [N14]==D147*E147 | [O15]=DELETE | [P16]==N147*(1+(H147/100)) | [Q17]=No
R148: [A1]==A147 | [C3]==Costing!M104 | [D4]==Costing!O104 | [E5]==Costing!Q104 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R104*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J148="MTL","Preservation Shop","") | [N14]==D148*E148 | [O15]=DELETE | [P16]==N148*(1+(H148/100)) | [Q17]=No
R149: [A1]==A148 | [C3]==Costing!M105 | [D4]==Costing!O105 | [E5]==Costing!Q105 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R105*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J149="MTL","Preservation Shop","") | [N14]==D149*E149 | [O15]=DELETE | [P16]==N149*(1+(H149/100)) | [Q17]=No
R150: [A1]==A149 | [C3]==Costing!M106 | [D4]==Costing!O106 | [E5]==Costing!Q106 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R106*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J150="MTL","Preservation Shop","") | [N14]==D150*E150 | [O15]=DELETE | [P16]==N150*(1+(H150/100)) | [Q17]=No
R151: [A1]==A150 | [C3]==Costing!M107 | [D4]==Costing!O107 | [E5]==Costing!Q107 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R107*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J151="MTL","Preservation Shop","") | [N14]==D151*E151 | [O15]=DELETE | [P16]==N151*(1+(H151/100)) | [Q17]=No
R152: [A1]==A151 | [C3]==Costing!M108 | [D4]==Costing!O108 | [E5]==Costing!Q108 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R108*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J152="MTL","Preservation Shop","") | [N14]==D152*E152 | [O15]=DELETE | [P16]==N152*(1+(H152/100)) | [Q17]=No
R153: [A1]==A152 | [C3]==Costing!M109 | [D4]==Costing!O109 | [E5]==Costing!Q109 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R109*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J153="MTL","Preservation Shop","") | [N14]==D153*E153 | [O15]=DELETE | [P16]==N153*(1+(H153/100)) | [Q17]=No
R154: [A1]==A153 | [C3]==Costing!M110 | [D4]==Costing!O110 | [E5]==Costing!Q110 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R110*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J154="MTL","Preservation Shop","") | [N14]==D154*E154 | [O15]=DELETE | [P16]==N154*(1+(H154/100)) | [Q17]=No
R155: [A1]==A154 | [C3]=Timber Treatments  - Materials | [D4]=1 | [E5]==N155 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P155-N155)/N155)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D11 | [M13]==IF(J155="MTL","Preservation Shop","") | [N14]==SUM(N141:N147) | [O15]==IF(N155=0,"DELETE","LEAVE") | [P16]==SUM(P141:P147) | [Q17]=Yes
R156: [A1]==A155 | [C3]=Timber Treatments  - Labour | [D4]==SUM(D148:D154) | [E5]==N156/D156 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P156-N156)/N156)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L155 | [M13]==IF(J156="MTL","Preservation Shop","") | [N14]==SUM(N148:N154) | [O15]==IF(N156=0,"DELETE","LEAVE") | [P16]==SUM(P148:P154) | [Q17]=Yes
R157: [O15]=DELETE
R158: [A1]=='Customer Summary'!C12 | [C3]==Costing!B114 | [D4]==Costing!F114 | [E5]==Costing!I114 | [F6]==Costing!G114 | [G7]=Timber Materials | [H8]==Costing!J114*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J158="MTL","Preservation Shop","") | [N14]==D158*E158 | [O15]=DELETE | [P16]==N158*(1+(H158/100)) | [Q17]=No
R159: [A1]==A158 | [C3]==Costing!B115 | [D4]==Costing!F115 | [E5]==Costing!I115 | [F6]==Costing!G115 | [G7]=Timber Materials | [H8]==Costing!J115*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J159="MTL","Preservation Shop","") | [N14]==D159*E159 | [O15]=DELETE | [P16]==N159*(1+(H159/100)) | [Q17]=No
R160: [A1]==A159 | [C3]==Costing!B116 | [D4]==Costing!F116 | [E5]==Costing!I116 | [F6]==Costing!G116 | [G7]=Timber Materials | [H8]==Costing!J116*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J160="MTL","Preservation Shop","") | [N14]==D160*E160 | [O15]=DELETE | [P16]==N160*(1+(H160/100)) | [Q17]=No
R161: [A1]==A160 | [C3]==Costing!M114 | [D4]==Costing!O114 | [E5]==Costing!Q114 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R114*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J161="MTL","Preservation Shop","") | [N14]==D161*E161 | [O15]=DELETE | [P16]==N161*(1+(H161/100)) | [Q17]=No
R162: [A1]==A161 | [C3]==Costing!M115 | [D4]==Costing!O115 | [E5]==Costing!Q115 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R115*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J162="MTL","Preservation Shop","") | [N14]==D162*E162 | [O15]=DELETE | [P16]==N162*(1+(H162/100)) | [Q17]=No
R163: [A1]==A162 | [C3]==Costing!M116 | [D4]==Costing!O116 | [E5]==Costing!Q116 | [F6]=Hours | [G7]=Timber Labour | [H8]==Costing!R116*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J163="MTL","Preservation Shop","") | [N14]==D163*E163 | [O15]=DELETE | [P16]==N163*(1+(H163/100)) | [Q17]=No
R164: [A1]==A163 | [C3]=Airbricks/Spray treatments  - Materials | [D4]=1 | [E5]==N164 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P164-N164)/N164)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D12 | [M13]==IF(J164="MTL","Preservation Shop","") | [N14]==SUM(N158:N160) | [O15]==IF(N164=0,"DELETE","LEAVE") | [P16]==SUM(P158:P160) | [Q17]=Yes
R165: [A1]==A164 | [C3]=Airbricks/Spray treatments  - Labour | [D4]==SUM(D161:D163) | [E5]==N165/D165 | [F6]=Hours | [G7]=Timber Labour | [H8]==((P165-N165)/N165)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L164 | [M13]==IF(J165="MTL","Preservation Shop","") | [N14]==SUM(N161:N163) | [O15]==IF(N165=0,"DELETE","LEAVE") | [P16]==SUM(P161:P163) | [Q17]=Yes
R166: [O15]=DELETE
R167: [A1]=='Customer Summary'!C13 | [C3]=Skips | [D4]==Costing!F120 | [E5]==Costing!I120 | [F6]==Costing!G120 | [G7]=Waste Removal | [H8]==Costing!J120*100 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J167="MTL","Preservation Shop","") | [N14]==D167*E167 | [O15]=DELETE | [P16]==N167*(1+(H167/100)) | [Q17]=No
R168: [A1]==A167 | [C3]=Vehicle Costs (Fuel) | [D4]==Costing!K130*Costing!K131*2 | [E5]==Costing!J139 | [F6]=Miles | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J168="MTL","Preservation Shop","") | [N14]==D168*E168 | [O15]=DELETE | [P16]==N168*(1+(H168/100)) | [Q17]=No
R169: [A1]==A168 | [C3]=Travel Costs for Tradesmen | [D4]==Costing!O125 | [E5]==Costing!C139 | [F6]=Hours | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J169="MTL","Preservation Shop","") | [N14]==D169*E169 | [O15]=DELETE | [P16]==N169*(1+(H169/100)) | [Q17]=No
R170: [A1]==A169 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A170," - Materials") | [D4]=1 | [E5]==N170 | [F6]=EACH | [G7]=Timber Materials | [H8]==((P170-N170)/N170)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J170="MTL","Preservation Shop","") | [N14]==SUM(N167:N168) | [O15]==IF(N170=0,"DELETE","LEAVE") | [P16]==SUM(P167:P168) | [Q17]=Yes
R171: [A1]==A170 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A171," - Labour") | [D4]==D169 | [E5]==E169 | [F6]==F169 | [G7]=Timber Labour | [H8]==H169 | [I9]=% | [J10]==J169 | [K11]==K169 | [L12]=No | [M13]==IF(J171="MTL","Preservation Shop","") | [N14]==N169 | [O15]==IF(N171=0,"DELETE","LEAVE") | [P16]==P169 | [Q17]=Yes
```

## SECTION 5: CUSTOMER SUMMARY SHEET

**Total Rows:** 22  |  **Total Cols:** 8

### Complete Row Data

```
R1: [B2]==IF(Costing!E1="SHEET NOT COMPLETE","PLEASE COMPLETE COSTING BEFORE SUPPLYING A PRICE","")
R2: [B2]=Customer Pricing Summary
R3: [B2]=# | [C3]=Area of Works | [D4]=Optional Item? | [E5]=Price ↵(Without Optional items) | [F6]=Price ↵(With Optional Items)
R4: [B2]=1 | [C3]=Stripping out of items as required to proceed with works | [D4]=No | [E5]==IF(D4="Yes","Optional",F4) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes"))
R5: [B2]==B4+1 | [C3]=Walls (Install membrane system) | [D4]=No | [E5]==IF(D5="Yes","Optional",F5) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes"))
R6: [B2]==B5+1 | [C3]=Cementitious tanking system | [D4]=No | [E5]==IF(D6="Yes","Optional",F6) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes"))
R7: [B2]==B6+1 | [C3]=Floor - Liquid Resin floor Membranes  | [D4]=No | [E5]==IF(D7="Yes","Optional",F7) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes"))
R8: [B2]==B7+1 | [C3]=Plastering & finishing | [D4]=No | [E5]==IF(D8="Yes","Optional",F8) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes"))
R9: [B2]==B8+1 | [C3]=Warmline Internal Wall Insulation | [D4]=No | [E5]==IF(D9="Yes","Optional",F9) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes"))
R10: [B2]==B9+1 | [C3]=Floor Joists & Floor Decking | [D4]=No | [E5]==IF(D10="Yes","Optional",F10) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes"))
R11: [B2]==B10+1 | [C3]=Timber Treatments | [D4]=No | [E5]==IF(D11="Yes","Optional",F11) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes"))
R12: [B2]==B11+1 | [C3]=Airbricks | [D4]=No | [E5]==IF(D12="Yes","Optional",F12) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes"))
R13: [B2]==B12+1 | [C3]=Project Specific Overheads | [D4]=No | [E5]==IF(D13="Yes","Optional",F13) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes"))
R14: [B2]=Totals
R15: [C3]=Sub Total | [E5]==SUM(E4:E13) | [F6]==SUM(F4:F13)
R16: [C3]=Vat at 20% | [E5]==E15*0.2 | [F6]==F15*0.2
R17: [C3]=Total | [E5]==SUM(E15:E16) | [F6]==SUM(F15:F16)
R19: [C3]=Start of works deposit at 30% | [D4]=Ex. VAT | [E5]==E20/6*5 | [F6]==F20/6*5
R20: [D4]=Inc. VAT | [E5]==E17*0.3 | [F6]==F17*0.3
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
R15: [A1]=Stripping out of items as required to proceed with works | [B2]=n/a
R16: [A1]=Walls (Install membrane system) | [B2]=n/a
R17: [A1]=Cementitious tanking system | [B2]=n/a
R18: [A1]=Floor - Liquid Resin floor Membranes  | [B2]=n/a
R19: [A1]=Plastering & finishing | [B2]=n/a
R20: [A1]=Warmline - Thin Wall Insulation | [B2]=n/a
R21: [A1]=Floor Joists & Floor Decking | [B2]=n/a
R22: [A1]=Timber Treatments | [B2]=n/a
R23: [A1]=Airbricks | [B2]=n/a
R24: [A1]=Project Specific Overheads | [B2]=n/a
R40: [A1]=This is used in the projects to determine costs by the 'Cost Code' category (lets you see which areas you are over or under budget on).
R41: [A1]=Cost Codes
R42: [A1]=Item | [B2]=Comments
R43: [A1]=Timber Equipment | [B2]=n/a
R44: [A1]=Timber Labour | [B2]=n/a
R45: [A1]=Timber Materials | [B2]=n/a
R46: [A1]=Timber Other | [B2]=n/a
R47: [A1]=Timber Sub Contractors | [B2]=n/a
R48: [A1]=Travel Costs | [B2]=n/a
R49: [A1]=Waste Removal | [B2]=n/a
R52: [A1]=This is used to on the items for costing reference
R53: [A1]=Unit of measures
R54: [A1]=Item | [B2]=Comments
R55: [A1]=Each | [B2]=n/a
R56: [A1]=M2 | [B2]=n/a
R57: [A1]=M3 | [B2]=n/a
R58: [A1]=Hours | [B2]=n/a
R59: [A1]=LM | [B2]=n/a
R60: [A1]=Miles | [B2]=n/a
R61: [A1]=Bags | [B2]=n/a
R62: [A1]=Pairs | [B2]=n/a
R65: [A1]=CSV Import File Name Creator
R66: [A1]=CSV File Name | [B2]=CF-Timber-
R67: [A1]=Current Date | [B2]=10-12-25-12-36-01
R68: [A1]=Full File Name | [B2]==CONCATENATE(B66,B67)
R70: [A1]=File Name Creator
R71: [A1]=PDF Report Name | [B2]==CONCATENATE(Costing!E4,"-TIMBER-REPORT-",B67)
R72: [A1]=Access Email Template Name | [B2]==CONCATENATE(Costing!E4,"-ACCESS-EMAIL-",B67)
R73: [A1]=Party Wall Letter Template Name | [B2]==CONCATENATE(Costing!E4,"-PARTY-WALL-LETTER-",B67)
R75: [A1]=Section Price Adjustment % Values
R76: [A1]=-5
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
R123: [A1]==A122+1
R124: [A1]==A123+1
R125: [A1]==A124+1
R126: [A1]==A125+1
R127: [A1]==A126+1
R128: [A1]==A127+1
R129: [A1]==A128+1
R130: [A1]==A129+1
R131: [A1]==A130+1
```

### 6B: Data Validation Rules Per Sheet

#### Sheet: Report (2 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D24:N24 D70:N70 D77:N77 D84:N84 D98:N98 D105:N105 D112:N112 D131:N131 D138:N138 D145:N145 D165:N165 D186:N186 D206:N206 D224:N224 D231:N231 D238:N238 D261:N261 D281:N281 D299:N299 D322:N322 D342:N342 D360:N360 D383:N383 D403:N403 D421:N421 D444:N444 D464:N464 D482:N482 D505:N505 D525:N525 D543:N543 D566:N566 D586:N586 D604:N604 D627:N627 D647:N647 D665:N665 D688:N688 D708:N708 D726:N726 D749:N749 D769:N769 D787:N787 Q24:Z24 Q70:Z70 Q77:Z77 Q84:Z84 Q98:Z98 Q105:Z105 Q112:Z112 Q131:Z131 Q138:Z138 Q145:Z145 Q165:Z165 Q186:Z186 Q206:Z206 Q224:Z224 Q231:Z231 Q238:Z238 Q261:Z261 Q281:Z281 Q299:Z299 Q322:Z322 Q342:Z342 Q360:Z360 Q383:Z383 Q403:Z403 Q421:Z421 Q444:Z444 Q464:Z464 Q482:Z482 Q505:Z505 Q525:Z525 Q543:Z543 Q566:Z566 Q586:Z586 Q604:Z604 Q627:Z627 Q647:Z647 Q665:Z665 Q688:Z688 Q708:Z708 Q726:Z726 Q749:Z749 Q769:Z769 Q787:Z787 | list |  | "Hide,Show" |  | True | False |
| 2 | Y244 Y305 Y366 Y427 Y488 Y549 Y610 Y671 Y732 | list |  | "No,Yes" |  | True | False |

#### Sheet: Costing (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | F135:L135 | list |  | "Image 1: Default or Miscellaneous, Image 2: Single Male (Young), Image 3: Single Male (Elderly), Image 4: Single Female (Young), Image 5: Single Female (Elderly), Image 6: Young Couple, Image 7: Elde… |  | True | False |

#### Sheet: Customer Summary (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D4:D13 | list |  | "No, Yes" |  | True | False |

#### Sheet: Sub Contractor Costs (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | B10:B13 B16:B22 B25:B31 B34:B37 B40:B42 B45:B49 B52:B61 B64:B67 B70:B76 B79:B81 B84:B86 D3 G5 | list |  | "No,Yes" |  | True | False |

#### Sheet: CF CSV Upload (2 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | Q2:Q33 Q35:Q60 Q62:Q71 Q73:Q80 Q82:Q97 Q99:Q102 Q104:Q141 Q143:Q156 Q158:Q165 Q167:Q171 | list |  | "No,Yes" |  | True | False |
| 2 | L2:L171 | list |  | "Yes,No" |  | True | False |

## SECTION 7: VBA CODE

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
ThisWorkbook.Sheets("Data Lists").Range("B67").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################


'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b68")

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
Private Sub Preparation_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F21:F26").Value = 0
End Sub
Private Sub Stripout_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F29:F36,F39").Value = 0
End Sub
Private Sub Walls_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F42,D43:D47,E45:E47,D53:E53,F55").Value = 0
End Sub
Private Sub Tanking_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F58:F62").Value = 0
End Sub
Private Sub Floor_Resin_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F65:F68").Value = 0
End Sub
Private Sub Plastering_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F71:F79").Value = 0
End Sub
Private Sub Floor_Joists_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("D83:D92,E83:E88").Value = 0
End Sub
Private Sub Floor_Deck_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F94:F101").Value = 0
End Sub
Private Sub Timber_Treatments_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F104:F111").Value = 0
End Sub
Private Sub Airbricks_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F114:F117").Value = 0
End Sub
Private Sub Skip_Hire_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F120").Value = 0
End Sub


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

### Module: Sheet_Report.cls

**Stream:** `VBA/Sheet_Report`

```vb
Attribute VB_Name = "Sheet_Report"
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
ThisWorkbook.Sheets("Data Lists").Range("B67").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################


'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b71")

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

Private Sub Worksheet_Change(ByVal Target As Range)
  
Dim section2_choice_range As String
Dim section2_range As String
Dim section3_choice_range As String
Dim section3_range As String
Dim section4_choice_range As String
Dim section5_range As String
Dim section6_choice_range As String
Dim section6_range As String
Dim section7_choice_range As String
Dim section7_range As String
Dim section8_choice_range As String
Dim section8_range As String
Dim section9_choice_range As String
Dim section9_range As String
Dim section10_choice_range As String
Dim section10_range As String



section2_choice_range = ThisWorkbook.Sheets("Cell References").Range("c6")
section2_range = ThisWorkbook.Sheets("Cell References").Range("F6")

section3_choice_range = ThisWorkbook.Sheets("Cell References").Range("c7")
section3_range = ThisWorkbook.Sheets("Cell References").Range("F7")

section4_choice_range = ThisWorkbook.Sheets("Cell References").Range("c8")
section4_range = ThisWorkbook.Sheets("Cell References").Range("F8")

section5_choice_range = ThisWorkbook.Sheets("Cell References").Range("c9")
section5_range = ThisWorkbook.Sheets("Cell References").Range("F9")

section6_choice_range = ThisWorkbook.Sheets("Cell References").Range("c10")
section6_range = ThisWorkbook.Sheets("Cell References").Range("F10")

section7_choice_range = ThisWorkbook.Sheets("Cell References").Range("c11")
section7_range = ThisWorkbook.Sheets("Cell References").Range("F11")

section8_choice_range = ThisWorkbook.Sheets("Cell References").Range("c12")
section8_range = ThisWorkbook.Sheets("Cell References").Range("F12")

section9_choice_range = ThisWorkbook.Sheets("Cell References").Range("c13")
section9_range = ThisWorkbook.Sheets("Cell References").Range("F13")

section10_choice_range = ThisWorkbook.Sheets("Cell References").Range("c14")
section10_range = ThisWorkbook.Sheets("Cell References").Range("f14")

    
' #######################
' Hide Area #2 Inspection
' #######################

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section2_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section2_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section2_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 2 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section2_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 2 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #3 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section3_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section3_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section3_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 3 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section3_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 3 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #4 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section4_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section4_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section4_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 4 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section4_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 4 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #5 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section5_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section5_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section5_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 5 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section5_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 5 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #6 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section6_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section6_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section6_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 6 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section6_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 6 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #7 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section7_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section7_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section7_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 7 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section7_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 7 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #8 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section8_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section8_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section8_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 8 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section8_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 8 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #9 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section9_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section9_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section9_range).EntireRow.Hidden = False
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 9 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section9_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 9 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


' #######################
' Hide Area #10 Inspection
' #######################

' Check value of cell which determimes the visibility of the room section
' https://www.extendoffice.com/documents/excel/4423-excel-run-macro-on-cell-change.html
If Not Intersect(Target, Range(section10_choice_range)) Is Nothing Then

' Check cell value
If ThisWorkbook.Sheets("Report").Range(section10_choice_range) = "Yes" Then
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is equal to Yes
ThisWorkbook.Sheets("Report").Range(section10_range).EntireRow.Hidden = False
' Re-calculate filter check cell
ThisWorkbook.Sheets("Report").Range("AI847").Calculate
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 10 section is now showing"
Else
' Remove password for hiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw
' Show cells if cell value is NOT EQUAL to Yes
ThisWorkbook.Sheets("Report").Range(section10_range).EntireRow.Hidden = True
' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
' Confirm to user the action
MsgBox "Room 10 section is now hidden"
'Close Inspection end if
End If

' Close cell change check if statement
End If


End Sub
' https://excel.tips.net/T003144_Spell-Checking_in_a_Protected_Worksheet.html
Sub SpellCheck_Sheet_Click()

Dim xPsw As String
    xPsw = "window"
    
    With ActiveSheet
        .Unprotect xPsw
        .Range("D16:Z905").CheckSpelling
        .Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
    End With
End Sub


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
ThisWorkbook.Sheets("Data Lists").Range("B67").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################


'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b72")

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
MsgBox "CANNOT CREATE EMAIL TEMPLATE - PLEASE COMPLETE THE REPORT FULLY"

End If
End Sub

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
Private Sub CommandButton1_Click()

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

'Remove Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
'Set new time to give a specific file name
ThisWorkbook.Sheets("Data Lists").Range("B67").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b73")

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
MsgBox "CANNOT CREATE EMAIL TEMPLATE - PLEASE COMPLETE THE REPORT FULLY"

End If
End Sub

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
'Check Filter change on report sheet code
' https://stackoverflow.com/questions/28979396/excel-vba-filter-change-event-handler
Private Sub Worksheet_Calculate()
    
      
' #######################
' Check if filter has been changed and if so hide areas again
' #######################


' Set Password
xPsw = "window"
' Remove password for unhiding rows
ThisWorkbook.Sheets("Report").Unprotect xPsw


    ' Check cell visibility value for Section 2
    If ThisWorkbook.Sheets("Report").Range("Y171") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("172:232").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 3
    If ThisWorkbook.Sheets("Report").Range("Y232") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("233:293").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 4
    If ThisWorkbook.Sheets("Report").Range("Y293") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("294:354").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 5
    If ThisWorkbook.Sheets("Report").Range("Y354") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("355:415").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 6
    If ThisWorkbook.Sheets("Report").Range("Y415") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("416:476").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 7
    If ThisWorkbook.Sheets("Report").Range("Y476") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("477:537").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 8
    If ThisWorkbook.Sheets("Report").Range("Y537") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("538:598").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 9
    If ThisWorkbook.Sheets("Report").Range("Y598") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("599:659").EntireRow.Hidden = True
    End If
    
    ' Check cell visibility value for Section 10
    If ThisWorkbook.Sheets("Report").Range("Y659") = "No" Then
    ' Show cells if cell value is NOT EQUAL to Yes
    ThisWorkbook.Sheets("Report").Range("660:719").EntireRow.Hidden = True
    End If
    

' Re-apply password
ThisWorkbook.Sheets("Report").Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True

' Confirm to user the action
' MsgBox "Your list has been filtered & sections set as 'no' have been re-hidden"

    
    
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

### Module: Sheet10.cls

**Stream:** `VBA/Sheet10`

```vb
Attribute VB_Name = "Sheet10"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet11.cls

**Stream:** `VBA/Sheet11`

```vb
Attribute VB_Name = "Sheet11"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet12.cls

**Stream:** `VBA/Sheet12`

```vb
Attribute VB_Name = "Sheet12"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True

```

### Module: Sheet13.cls

**Stream:** `VBA/Sheet13`

```vb
Attribute VB_Name = "Sheet13"
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
| Costing!E14 | Report!B874, Report!B877, Report!B880 |
| Costing!E4 | Report!I13 |
| Costing!E7 | Report!D8 |
| Costing!E8 | Report!D9 |
| Costing!E9 | Report!D10 |
| Details!$C$13 | Report!D34, Report!D34 |

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
| Details!$C$12 | Costing!K131, Costing!K131 |
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
| Customer Summary!C4 | Customer Summary!F4, Customer Summary!F4 |
| Customer Summary!C5 | Customer Summary!F5, Customer Summary!F5 |
| Customer Summary!C6 | Customer Summary!F6, Customer Summary!F6 |
| Customer Summary!C7 | Customer Summary!F7, Customer Summary!F7 |
| Customer Summary!C8 | Customer Summary!F8, Customer Summary!F8 |
| Customer Summary!C9 | Customer Summary!F9, Customer Summary!F9 |

### References FROM: Access Email Template

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Access Email Template!A13 |
| Costing!E11 | Access Email Template!A14 |
| Costing!E8 | Access Email Template!A11 |
| Costing!E9 | Access Email Template!A12 |

### References FROM: Party Wall Letter

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Party Wall Letter!A6 |
| Costing!E11 | Party Wall Letter!A7 |
| Costing!E8 | Party Wall Letter!A4 |
| Costing!E9 | Party Wall Letter!A5 |

### References FROM: Sub Contractor Costs

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Sub Contractor Costs!D8 |
| Costing!E11 | Sub Contractor Costs!D9 |
| Costing!E4 | Sub Contractor Costs!D4 |
| Costing!E7 | Sub Contractor Costs!D5 |
| Costing!E8 | Sub Contractor Costs!D6 |
| Costing!E9 | Sub Contractor Costs!D7 |
| Costing!O101 | Sub Contractor Costs!G17 |
| Costing!O111 | Sub Contractor Costs!G18 |
| Costing!O117 | Sub Contractor Costs!G19 |
| Costing!O26 | Sub Contractor Costs!G11 |
| Costing!O39 | Sub Contractor Costs!G11 |
| Costing!O55 | Sub Contractor Costs!G12 |
| Costing!O62 | Sub Contractor Costs!G13 |
| Costing!O68 | Sub Contractor Costs!G14 |
| Costing!O73 | Sub Contractor Costs!G16 |
| Costing!O79 | Sub Contractor Costs!G15 |
| Costing!V101 | Sub Contractor Costs!D17 |
| Costing!V111 | Sub Contractor Costs!D18 |
| Costing!V117 | Sub Contractor Costs!D19 |
| Costing!V26 | Sub Contractor Costs!D11 |
| Costing!V39 | Sub Contractor Costs!D11 |
| Costing!V55 | Sub Contractor Costs!D12 |
| Costing!V62 | Sub Contractor Costs!D13 |
| Costing!V68 | Sub Contractor Costs!D14 |
| Costing!V73 | Sub Contractor Costs!D16 |
| Costing!V79 | Sub Contractor Costs!D15 |
| Customer Summary!C10 | Sub Contractor Costs!C17 |
| Customer Summary!C11 | Sub Contractor Costs!C18 |
| Customer Summary!C12 | Sub Contractor Costs!C19 |
| Customer Summary!C4 | Sub Contractor Costs!C11 |
| Customer Summary!C5 | Sub Contractor Costs!C12 |
| Customer Summary!C6 | Sub Contractor Costs!C13 |
| Customer Summary!C7 | Sub Contractor Costs!C14 |
| Customer Summary!C8 | Sub Contractor Costs!C15 |
| Customer Summary!C9 | Sub Contractor Costs!C16 |

### References FROM: CF CSV Upload

| Target | Referenced By |
|--------|-------------|
| Costing!B100 | CF CSV Upload!C120 |
| Costing!B104 | CF CSV Upload!C141 |
| Costing!B105 | CF CSV Upload!C142 |
| Costing!B106 | CF CSV Upload!C143 |
| Costing!B107 | CF CSV Upload!C144 |
| Costing!B108 | CF CSV Upload!C145 |
| Costing!B109 | CF CSV Upload!C146 |
| Costing!B110 | CF CSV Upload!C147 |
| Costing!B114 | CF CSV Upload!C158 |
| Costing!B115 | CF CSV Upload!C159 |
| Costing!B116 | CF CSV Upload!C160 |
| Costing!B21 | CF CSV Upload!C2 |
| Costing!B22 | CF CSV Upload!C3 |
| Costing!B23 | CF CSV Upload!C4 |
| Costing!B24 | CF CSV Upload!C5 |
| Costing!B25 | CF CSV Upload!C6 |
| Costing!B29 | CF CSV Upload!C7 |
| Costing!B30 | CF CSV Upload!C8 |
| Costing!B31 | CF CSV Upload!C9 |
| Costing!B32 | CF CSV Upload!C10 |
| Costing!B33 | CF CSV Upload!C11 |
| Costing!B34 | CF CSV Upload!C12 |
| Costing!B35 | CF CSV Upload!C13 |
| Costing!B36 | CF CSV Upload!C14 |
| Costing!B37 | CF CSV Upload!C15 |
| Costing!B38 | CF CSV Upload!C16 |
| Costing!B42 | CF CSV Upload!C35 |
| Costing!B43 | CF CSV Upload!C36, CF CSV Upload!C48 |
| Costing!B44 | CF CSV Upload!C37, CF CSV Upload!C49 |
| Costing!B45 | CF CSV Upload!C38, CF CSV Upload!C50 |
| Costing!B46 | CF CSV Upload!C39, CF CSV Upload!C51 |
| Costing!B47 | CF CSV Upload!C40, CF CSV Upload!C52 |
| Costing!B48 | CF CSV Upload!C41, CF CSV Upload!C53 |
| Costing!B49 | CF CSV Upload!C42 |
| Costing!B50 | CF CSV Upload!C43 |
| Costing!B51 | CF CSV Upload!C44 |
| Costing!B53 | CF CSV Upload!C45 |
| Costing!B54 | CF CSV Upload!C46 |
| Costing!B58 | CF CSV Upload!C62 |
| Costing!B59 | CF CSV Upload!C63 |
| Costing!B60 | CF CSV Upload!C64 |
| Costing!B61 | CF CSV Upload!C65 |
| Costing!B65 | CF CSV Upload!C73 |
| Costing!B66 | CF CSV Upload!C74 |
| Costing!B67 | CF CSV Upload!C75 |
| Costing!B71 | CF CSV Upload!C82 |
| Costing!B72 | CF CSV Upload!C83 |
| Costing!B73 | CF CSV Upload!C99 |
| Costing!B74 | CF CSV Upload!C84 |
| Costing!B75 | CF CSV Upload!C85 |
| Costing!B76 | CF CSV Upload!C86 |
| Costing!B77 | CF CSV Upload!C87 |
| Costing!B78 | CF CSV Upload!C88 |
| Costing!B83 | CF CSV Upload!C104 |
| Costing!B84 | CF CSV Upload!C105 |
| Costing!B85 | CF CSV Upload!C106 |
| Costing!B86 | CF CSV Upload!C107 |
| Costing!B87 | CF CSV Upload!C108 |
| Costing!B88 | CF CSV Upload!C109 |
| Costing!B89 | CF CSV Upload!C110 |
| Costing!B90 | CF CSV Upload!C111 |
| Costing!B91 | CF CSV Upload!C112 |
| Costing!B92 | CF CSV Upload!C113 |
| Costing!B94 | CF CSV Upload!C114 |
| Costing!B95 | CF CSV Upload!C115 |
| Costing!B96 | CF CSV Upload!C116 |
| Costing!B97 | CF CSV Upload!C117 |
| Costing!B98 | CF CSV Upload!C118 |
| Costing!B99 | CF CSV Upload!C119 |
| Costing!C139 | CF CSV Upload!E169 |
| Costing!F100 | CF CSV Upload!D120 |
| Costing!F104 | CF CSV Upload!D141 |
| Costing!F105 | CF CSV Upload!D142 |
| Costing!F106 | CF CSV Upload!D143 |
| Costing!F107 | CF CSV Upload!D144 |
| Costing!F108 | CF CSV Upload!D145 |
| Costing!F109 | CF CSV Upload!D146 |
| Costing!F110 | CF CSV Upload!D147 |
| Costing!F114 | CF CSV Upload!D158 |
| Costing!F115 | CF CSV Upload!D159 |
| Costing!F116 | CF CSV Upload!D160 |
| Costing!F120 | CF CSV Upload!D167 |
| Costing!F21 | CF CSV Upload!D2 |
| Costing!F22 | CF CSV Upload!D3 |
| Costing!F23 | CF CSV Upload!D4 |
| Costing!F24 | CF CSV Upload!D5 |
| Costing!F25 | CF CSV Upload!D6 |
| Costing!F29 | CF CSV Upload!D7 |
| Costing!F30 | CF CSV Upload!D8 |
| Costing!F31 | CF CSV Upload!D9 |
| Costing!F32 | CF CSV Upload!D10 |
| Costing!F33 | CF CSV Upload!D11 |
| Costing!F34 | CF CSV Upload!D12 |
| Costing!F35 | CF CSV Upload!D13 |
| Costing!F36 | CF CSV Upload!D14 |
| Costing!F37 | CF CSV Upload!D15 |
| Costing!F38 | CF CSV Upload!D16 |
| Costing!F42 | CF CSV Upload!D35 |
| Costing!F43 | CF CSV Upload!D36 |
| Costing!F44 | CF CSV Upload!D37 |
| Costing!F45 | CF CSV Upload!D38 |
| Costing!F46 | CF CSV Upload!D39 |
| Costing!F47 | CF CSV Upload!D40 |
| Costing!F48 | CF CSV Upload!D41 |
| Costing!F49 | CF CSV Upload!D42 |
| Costing!F50 | CF CSV Upload!D43 |
| Costing!F51 | CF CSV Upload!D44 |
| Costing!F53 | CF CSV Upload!D45 |
| Costing!F54 | CF CSV Upload!D46 |
| Costing!F58 | CF CSV Upload!D62 |
| Costing!F59 | CF CSV Upload!D63 |
| Costing!F60 | CF CSV Upload!D64 |
| Costing!F61 | CF CSV Upload!D65 |
| Costing!F65 | CF CSV Upload!D73 |
| Costing!F66 | CF CSV Upload!D74 |
| Costing!F67 | CF CSV Upload!D75 |
| Costing!F71 | CF CSV Upload!D82 |
| Costing!F72 | CF CSV Upload!D83 |
| Costing!F73 | CF CSV Upload!D99 |
| Costing!F74 | CF CSV Upload!D84 |
| Costing!F75 | CF CSV Upload!D85 |
| Costing!F76 | CF CSV Upload!D86 |
| Costing!F77 | CF CSV Upload!D87 |
| Costing!F78 | CF CSV Upload!D88 |
| Costing!F83 | CF CSV Upload!D104 |
| Costing!F84 | CF CSV Upload!D105 |
| Costing!F85 | CF CSV Upload!D106 |
| Costing!F86 | CF CSV Upload!D107 |
| Costing!F87 | CF CSV Upload!D108 |
| Costing!F88 | CF CSV Upload!D109 |
| Costing!F89 | CF CSV Upload!D110 |
| Costing!F90 | CF CSV Upload!D111 |
| Costing!F91 | CF CSV Upload!D112 |
| Costing!F92 | CF CSV Upload!D113 |
| Costing!F94 | CF CSV Upload!D114 |
| Costing!F95 | CF CSV Upload!D115 |
| Costing!F96 | CF CSV Upload!D116 |
| Costing!F97 | CF CSV Upload!D117 |
| Costing!F98 | CF CSV Upload!D118 |
| Costing!F99 | CF CSV Upload!D119 |
| Costing!G100 | CF CSV Upload!F120 |
| Costing!G104 | CF CSV Upload!F141 |
| Costing!G108 | CF CSV Upload!F145 |
| Costing!G109 | CF CSV Upload!F146 |
| Costing!G110 | CF CSV Upload!F147 |
| Costing!G114 | CF CSV Upload!F158 |
| Costing!G115 | CF CSV Upload!F159 |
| Costing!G116 | CF CSV Upload!F160 |
| Costing!G120 | CF CSV Upload!F167 |
| Costing!G21 | CF CSV Upload!F2 |
| Costing!G22 | CF CSV Upload!F3 |
| Costing!G23 | CF CSV Upload!F4 |
| Costing!G24 | CF CSV Upload!F5 |
| Costing!G25 | CF CSV Upload!F6 |
| Costing!G29 | CF CSV Upload!F7 |
| Costing!G30 | CF CSV Upload!F8 |
| Costing!G31 | CF CSV Upload!F9 |
| Costing!G32 | CF CSV Upload!F10 |
| Costing!G33 | CF CSV Upload!F11 |
| Costing!G34 | CF CSV Upload!F12 |
| Costing!G35 | CF CSV Upload!F13 |
| Costing!G36 | CF CSV Upload!F14 |
| Costing!G37 | CF CSV Upload!F15 |
| Costing!G38 | CF CSV Upload!F16 |
| Costing!G42 | CF CSV Upload!F35 |
| Costing!G43 | CF CSV Upload!F36 |
| Costing!G44 | CF CSV Upload!F37 |
| Costing!G45 | CF CSV Upload!F38 |
| Costing!G46 | CF CSV Upload!F39 |
| Costing!G47 | CF CSV Upload!F40 |
| Costing!G48 | CF CSV Upload!F41 |
| Costing!G49 | CF CSV Upload!F42 |
| Costing!G50 | CF CSV Upload!F43 |
| Costing!G51 | CF CSV Upload!F44 |
| Costing!G53 | CF CSV Upload!F45 |
| Costing!G54 | CF CSV Upload!F46 |
| Costing!G58 | CF CSV Upload!F62 |
| Costing!G59 | CF CSV Upload!F63 |
| Costing!G60 | CF CSV Upload!F64 |
| Costing!G61 | CF CSV Upload!F65 |
| Costing!G71 | CF CSV Upload!F82 |
| Costing!G72 | CF CSV Upload!F83 |
| Costing!G73 | CF CSV Upload!F99 |
| Costing!G74 | CF CSV Upload!F84 |
| Costing!G75 | CF CSV Upload!F85 |
| Costing!G76 | CF CSV Upload!F86 |
| Costing!G77 | CF CSV Upload!F87 |
| Costing!G78 | CF CSV Upload!F88 |
| Costing!G83 | CF CSV Upload!F104 |
| Costing!G84 | CF CSV Upload!F105 |
| Costing!G85 | CF CSV Upload!F106 |
| Costing!G86 | CF CSV Upload!F107 |
| Costing!G87 | CF CSV Upload!F108 |
| Costing!G88 | CF CSV Upload!F109 |
| Costing!G89 | CF CSV Upload!F110 |
| Costing!G90 | CF CSV Upload!F111 |
| Costing!G91 | CF CSV Upload!F112 |
| Costing!G92 | CF CSV Upload!F113 |
| Costing!G94 | CF CSV Upload!F114 |
| Costing!G95 | CF CSV Upload!F115 |
| Costing!G96 | CF CSV Upload!F116 |
| Costing!G97 | CF CSV Upload!F117 |
| Costing!G98 | CF CSV Upload!F118 |
| Costing!G99 | CF CSV Upload!F119 |
| Costing!I100 | CF CSV Upload!E120 |
| Costing!I104 | CF CSV Upload!E141 |
| Costing!I105 | CF CSV Upload!E142 |
| Costing!I106 | CF CSV Upload!E143 |
| Costing!I107 | CF CSV Upload!E144 |
| Costing!I108 | CF CSV Upload!E145 |
| Costing!I109 | CF CSV Upload!E146 |
| Costing!I110 | CF CSV Upload!E147 |
| Costing!I114 | CF CSV Upload!E158 |
| Costing!I115 | CF CSV Upload!E159 |
| Costing!I116 | CF CSV Upload!E160 |
| Costing!I120 | CF CSV Upload!E167 |
| Costing!I21 | CF CSV Upload!E2 |
| Costing!I22 | CF CSV Upload!E3 |
| Costing!I23 | CF CSV Upload!E4 |
| Costing!I24 | CF CSV Upload!E5 |
| Costing!I25 | CF CSV Upload!E6 |
| Costing!I29 | CF CSV Upload!E7 |
| Costing!I30 | CF CSV Upload!E8 |
| Costing!I31 | CF CSV Upload!E9 |
| Costing!I32 | CF CSV Upload!E10 |
| Costing!I33 | CF CSV Upload!E11 |
| Costing!I34 | CF CSV Upload!E12 |
| Costing!I35 | CF CSV Upload!E13 |
| Costing!I36 | CF CSV Upload!E14 |
| Costing!I37 | CF CSV Upload!E15 |
| Costing!I38 | CF CSV Upload!E16 |
| Costing!I42 | CF CSV Upload!E35 |
| Costing!I43 | CF CSV Upload!E36 |
| Costing!I44 | CF CSV Upload!E37 |
| Costing!I45 | CF CSV Upload!E38 |
| Costing!I46 | CF CSV Upload!E39 |
| Costing!I47 | CF CSV Upload!E40 |
| Costing!I48 | CF CSV Upload!E41 |
| Costing!I49 | CF CSV Upload!E42 |
| Costing!I50 | CF CSV Upload!E43 |
| Costing!I51 | CF CSV Upload!E44 |
| Costing!I53 | CF CSV Upload!E45 |
| Costing!I54 | CF CSV Upload!E46 |
| Costing!I58 | CF CSV Upload!E62 |
| Costing!I59 | CF CSV Upload!E63 |
| Costing!I60 | CF CSV Upload!E64 |
| Costing!I61 | CF CSV Upload!E65 |
| Costing!I65 | CF CSV Upload!E73 |
| Costing!I66 | CF CSV Upload!E74 |
| Costing!I67 | CF CSV Upload!E75 |
| Costing!I71 | CF CSV Upload!E82 |
| Costing!I72 | CF CSV Upload!E83 |
| Costing!I73 | CF CSV Upload!E99 |
| Costing!I74 | CF CSV Upload!E84 |
| Costing!I75 | CF CSV Upload!E85 |
| Costing!I76 | CF CSV Upload!E86 |
| Costing!I77 | CF CSV Upload!E87 |
| Costing!I78 | CF CSV Upload!E88 |
| Costing!I83 | CF CSV Upload!E104 |
| Costing!I84 | CF CSV Upload!E105 |
| Costing!I85 | CF CSV Upload!E106 |
| Costing!I86 | CF CSV Upload!E107 |
| Costing!I87 | CF CSV Upload!E108 |
| Costing!I88 | CF CSV Upload!E109 |
| Costing!I89 | CF CSV Upload!E110 |
| Costing!I90 | CF CSV Upload!E111 |
| Costing!I91 | CF CSV Upload!E112 |
| Costing!I92 | CF CSV Upload!E113 |
| Costing!I94 | CF CSV Upload!E114 |
| Costing!I95 | CF CSV Upload!E115 |
| Costing!I96 | CF CSV Upload!E116 |
| Costing!I97 | CF CSV Upload!E117 |
| Costing!I98 | CF CSV Upload!E118 |
| Costing!I99 | CF CSV Upload!E119 |
| Costing!J100 | CF CSV Upload!H120 |
| Costing!J104 | CF CSV Upload!H141 |
| Costing!J105 | CF CSV Upload!H142 |
| Costing!J106 | CF CSV Upload!H143 |
| Costing!J107 | CF CSV Upload!H144 |
| Costing!J108 | CF CSV Upload!H145 |
| Costing!J109 | CF CSV Upload!H146 |
| Costing!J110 | CF CSV Upload!H147 |
| Costing!J114 | CF CSV Upload!H158 |
| Costing!J115 | CF CSV Upload!H159 |
| Costing!J116 | CF CSV Upload!H160 |
| Costing!J120 | CF CSV Upload!H167 |
| Costing!J139 | CF CSV Upload!E168 |
| Costing!J21 | CF CSV Upload!H2 |
| Costing!J22 | CF CSV Upload!H3 |
| Costing!J23 | CF CSV Upload!H4 |
| Costing!J24 | CF CSV Upload!H5 |
| Costing!J25 | CF CSV Upload!H6 |
| Costing!J29 | CF CSV Upload!H7 |
| Costing!J30 | CF CSV Upload!H8 |
| Costing!J31 | CF CSV Upload!H9 |
| Costing!J32 | CF CSV Upload!H10 |
| Costing!J33 | CF CSV Upload!H11 |
| Costing!J34 | CF CSV Upload!H12 |
| Costing!J35 | CF CSV Upload!H13 |
| Costing!J36 | CF CSV Upload!H14 |
| Costing!J37 | CF CSV Upload!H15 |
| Costing!J38 | CF CSV Upload!H16 |
| Costing!J42 | CF CSV Upload!H35 |
| Costing!J43 | CF CSV Upload!H36 |
| Costing!J44 | CF CSV Upload!H37 |
| Costing!J45 | CF CSV Upload!H38 |
| Costing!J46 | CF CSV Upload!H39 |
| Costing!J47 | CF CSV Upload!H40 |
| Costing!J48 | CF CSV Upload!H41 |
| Costing!J49 | CF CSV Upload!H42 |
| Costing!J50 | CF CSV Upload!H43 |
| Costing!J51 | CF CSV Upload!H44 |
| Costing!J53 | CF CSV Upload!H45 |
| Costing!J54 | CF CSV Upload!H46 |
| Costing!J58 | CF CSV Upload!H62 |
| Costing!J59 | CF CSV Upload!H63 |
| Costing!J60 | CF CSV Upload!H64 |
| Costing!J61 | CF CSV Upload!H65 |
| Costing!J65 | CF CSV Upload!H73 |
| Costing!J66 | CF CSV Upload!H74 |
| Costing!J67 | CF CSV Upload!H75 |
| Costing!J71 | CF CSV Upload!H82 |
| Costing!J72 | CF CSV Upload!H83 |
| Costing!J73 | CF CSV Upload!H99 |
| Costing!J74 | CF CSV Upload!H84 |
| Costing!J75 | CF CSV Upload!H85 |
| Costing!J76 | CF CSV Upload!H86 |
| Costing!J77 | CF CSV Upload!H87 |
| Costing!J78 | CF CSV Upload!H88 |
| Costing!J83 | CF CSV Upload!H104 |
| Costing!J84 | CF CSV Upload!H105 |
| Costing!J85 | CF CSV Upload!H106 |
| Costing!J86 | CF CSV Upload!H107 |
| Costing!J87 | CF CSV Upload!H108 |
| Costing!J88 | CF CSV Upload!H109 |
| Costing!J89 | CF CSV Upload!H110 |
| Costing!J90 | CF CSV Upload!H111 |
| Costing!J91 | CF CSV Upload!H112 |
| Costing!J92 | CF CSV Upload!H113 |
| Costing!J94 | CF CSV Upload!H114 |
| Costing!J95 | CF CSV Upload!H115 |
| Costing!J96 | CF CSV Upload!H116 |
| Costing!J97 | CF CSV Upload!H117 |
| Costing!J98 | CF CSV Upload!H118 |
| Costing!J99 | CF CSV Upload!H119 |
| Costing!K130 | CF CSV Upload!D168 |
| Costing!K131 | CF CSV Upload!D168 |
| Costing!M100 | CF CSV Upload!C137 |
| Costing!M104 | CF CSV Upload!C148 |
| Costing!M105 | CF CSV Upload!C149 |
| Costing!M106 | CF CSV Upload!C150 |
| Costing!M107 | CF CSV Upload!C151 |
| Costing!M108 | CF CSV Upload!C152 |
| Costing!M109 | CF CSV Upload!C153 |
| Costing!M110 | CF CSV Upload!C154 |
| Costing!M114 | CF CSV Upload!C161 |
| Costing!M115 | CF CSV Upload!C162 |
| Costing!M116 | CF CSV Upload!C163 |
| Costing!M21 | CF CSV Upload!C17 |
| Costing!M22 | CF CSV Upload!C18 |
| Costing!M23 | CF CSV Upload!C19 |
| Costing!M24 | CF CSV Upload!C20 |
| Costing!M25 | CF CSV Upload!C21 |
| Costing!M29 | CF CSV Upload!C22 |
| Costing!M30 | CF CSV Upload!C23 |
| Costing!M31 | CF CSV Upload!C24 |
| Costing!M32 | CF CSV Upload!C25 |
| Costing!M33 | CF CSV Upload!C26 |
| Costing!M34 | CF CSV Upload!C27 |
| Costing!M35 | CF CSV Upload!C28 |
| Costing!M36 | CF CSV Upload!C29 |
| Costing!M37 | CF CSV Upload!C30 |
| Costing!M38 | CF CSV Upload!C31 |
| Costing!M42 | CF CSV Upload!C47 |
| Costing!M49 | CF CSV Upload!C54 |
| Costing!M50 | CF CSV Upload!C55 |
| Costing!M51 | CF CSV Upload!C56 |
| Costing!M53 | CF CSV Upload!C57 |
| Costing!M54 | CF CSV Upload!C58 |
| Costing!M58 | CF CSV Upload!C66 |
| Costing!M59 | CF CSV Upload!C67 |
| Costing!M60 | CF CSV Upload!C68 |
| Costing!M61 | CF CSV Upload!C69 |
| Costing!M65 | CF CSV Upload!C76 |
| Costing!M66 | CF CSV Upload!C77 |
| Costing!M67 | CF CSV Upload!C78 |
| Costing!M71 | CF CSV Upload!C89 |
| Costing!M72 | CF CSV Upload!C90 |
| Costing!M73 | CF CSV Upload!C100 |
| Costing!M74 | CF CSV Upload!C91 |
| Costing!M75 | CF CSV Upload!C92 |
| Costing!M76 | CF CSV Upload!C93 |
| Costing!M77 | CF CSV Upload!C94 |
| Costing!M78 | CF CSV Upload!C95 |
| Costing!M83 | CF CSV Upload!C121 |
| Costing!M84 | CF CSV Upload!C122 |
| Costing!M85 | CF CSV Upload!C123 |
| Costing!M86 | CF CSV Upload!C124 |
| Costing!M87 | CF CSV Upload!C125 |
| Costing!M88 | CF CSV Upload!C126 |
| Costing!M89 | CF CSV Upload!C127 |
| Costing!M90 | CF CSV Upload!C128 |
| Costing!M91 | CF CSV Upload!C129 |
| Costing!M92 | CF CSV Upload!C130 |
| Costing!M94 | CF CSV Upload!C131 |
| Costing!M95 | CF CSV Upload!C132 |
| Costing!M96 | CF CSV Upload!C133 |
| Costing!M97 | CF CSV Upload!C134 |
| Costing!M98 | CF CSV Upload!C135 |
| Costing!M99 | CF CSV Upload!C136 |
| Costing!O100 | CF CSV Upload!D137 |
| Costing!O104 | CF CSV Upload!D148 |
| Costing!O105 | CF CSV Upload!D149 |
| Costing!O106 | CF CSV Upload!D150 |
| Costing!O107 | CF CSV Upload!D151 |
| Costing!O108 | CF CSV Upload!D152 |
| Costing!O109 | CF CSV Upload!D153 |
| Costing!O110 | CF CSV Upload!D154 |
| Costing!O114 | CF CSV Upload!D161 |
| Costing!O115 | CF CSV Upload!D162 |
| Costing!O116 | CF CSV Upload!D163 |
| Costing!O125 | CF CSV Upload!D169 |
| Costing!O21 | CF CSV Upload!D17 |
| Costing!O22 | CF CSV Upload!D18 |
| Costing!O23 | CF CSV Upload!D19 |
| Costing!O24 | CF CSV Upload!D20 |
| Costing!O25 | CF CSV Upload!D21 |
| Costing!O29 | CF CSV Upload!D22 |
| Costing!O30 | CF CSV Upload!D23 |
| Costing!O31 | CF CSV Upload!D24 |
| Costing!O32 | CF CSV Upload!D25 |
| Costing!O33 | CF CSV Upload!D26 |
| Costing!O34 | CF CSV Upload!D27 |
| Costing!O35 | CF CSV Upload!D28 |
| Costing!O36 | CF CSV Upload!D29 |
| Costing!O37 | CF CSV Upload!D30 |
| Costing!O38 | CF CSV Upload!D31 |
| Costing!O42 | CF CSV Upload!D47 |
| Costing!O43 | CF CSV Upload!D48 |
| Costing!O44 | CF CSV Upload!D49 |
| Costing!O45 | CF CSV Upload!D50 |
| Costing!O46 | CF CSV Upload!D51 |
| Costing!O47 | CF CSV Upload!D52 |
| Costing!O48 | CF CSV Upload!D53 |
| Costing!O49 | CF CSV Upload!D54 |
| Costing!O50 | CF CSV Upload!D55 |
| Costing!O51 | CF CSV Upload!D56 |
| Costing!O53 | CF CSV Upload!D57 |
| Costing!O54 | CF CSV Upload!D58 |
| Costing!O58 | CF CSV Upload!D66 |
| Costing!O59 | CF CSV Upload!D67 |
| Costing!O60 | CF CSV Upload!D68 |
| Costing!O61 | CF CSV Upload!D69 |
| Costing!O65 | CF CSV Upload!D76 |
| Costing!O66 | CF CSV Upload!D77 |
| Costing!O67 | CF CSV Upload!D78 |
| Costing!O71 | CF CSV Upload!D89 |
| Costing!O72 | CF CSV Upload!D90 |
| Costing!O73 | CF CSV Upload!D100 |
| Costing!O74 | CF CSV Upload!D91 |
| Costing!O75 | CF CSV Upload!D92 |
| Costing!O76 | CF CSV Upload!D93 |
| Costing!O77 | CF CSV Upload!D94 |
| Costing!O78 | CF CSV Upload!D95 |
| Costing!O83 | CF CSV Upload!D121 |
| Costing!O84 | CF CSV Upload!D122 |
| Costing!O85 | CF CSV Upload!D123 |
| Costing!O86 | CF CSV Upload!D124 |
| Costing!O87 | CF CSV Upload!D125 |
| Costing!O88 | CF CSV Upload!D126 |
| Costing!O89 | CF CSV Upload!D127 |
| Costing!O90 | CF CSV Upload!D128 |
| Costing!O91 | CF CSV Upload!D129 |
| Costing!O92 | CF CSV Upload!D130 |
| Costing!O94 | CF CSV Upload!D131 |
| Costing!O95 | CF CSV Upload!D132 |
| Costing!O96 | CF CSV Upload!D133 |
| Costing!O97 | CF CSV Upload!D134 |
| Costing!O98 | CF CSV Upload!D135 |
| Costing!O99 | CF CSV Upload!D136 |
| Costing!Q100 | CF CSV Upload!E137 |
| Costing!Q104 | CF CSV Upload!E148 |
| Costing!Q105 | CF CSV Upload!E149 |
| Costing!Q106 | CF CSV Upload!E150 |
| Costing!Q107 | CF CSV Upload!E151 |
| Costing!Q108 | CF CSV Upload!E152 |
| Costing!Q109 | CF CSV Upload!E153 |
| Costing!Q110 | CF CSV Upload!E154 |
| Costing!Q114 | CF CSV Upload!E161 |
| Costing!Q115 | CF CSV Upload!E162 |
| Costing!Q116 | CF CSV Upload!E163 |
| Costing!Q21 | CF CSV Upload!E17 |
| Costing!Q22 | CF CSV Upload!E18 |
| Costing!Q23 | CF CSV Upload!E19 |
| Costing!Q24 | CF CSV Upload!E20 |
| Costing!Q25 | CF CSV Upload!E21 |
| Costing!Q29 | CF CSV Upload!E22 |
| Costing!Q30 | CF CSV Upload!E23 |
| Costing!Q31 | CF CSV Upload!E24 |
| Costing!Q32 | CF CSV Upload!E25 |
| Costing!Q33 | CF CSV Upload!E26 |
| Costing!Q34 | CF CSV Upload!E27 |
| Costing!Q35 | CF CSV Upload!E28 |
| Costing!Q36 | CF CSV Upload!E29 |
| Costing!Q37 | CF CSV Upload!E30 |
| Costing!Q38 | CF CSV Upload!E31 |
| Costing!Q42 | CF CSV Upload!E47 |
| Costing!Q43 | CF CSV Upload!E48 |
| Costing!Q44 | CF CSV Upload!E49 |
| Costing!Q45 | CF CSV Upload!E50 |
| Costing!Q46 | CF CSV Upload!E51 |
| Costing!Q47 | CF CSV Upload!E52 |
| Costing!Q48 | CF CSV Upload!E53 |
| Costing!Q49 | CF CSV Upload!E54 |
| Costing!Q50 | CF CSV Upload!E55 |
| Costing!Q51 | CF CSV Upload!E56 |
| Costing!Q53 | CF CSV Upload!E57 |
| Costing!Q54 | CF CSV Upload!E58 |
| Costing!Q58 | CF CSV Upload!E66 |
| Costing!Q59 | CF CSV Upload!E67 |
| Costing!Q60 | CF CSV Upload!E68 |
| Costing!Q61 | CF CSV Upload!E69 |
| Costing!Q65 | CF CSV Upload!E76 |
| Costing!Q66 | CF CSV Upload!E77 |
| Costing!Q67 | CF CSV Upload!E78 |
| Costing!Q71 | CF CSV Upload!E89 |
| Costing!Q72 | CF CSV Upload!E90 |
| Costing!Q73 | CF CSV Upload!E100 |
| Costing!Q74 | CF CSV Upload!E91 |
| Costing!Q75 | CF CSV Upload!E92 |
| Costing!Q76 | CF CSV Upload!E93 |
| Costing!Q77 | CF CSV Upload!E94 |
| Costing!Q78 | CF CSV Upload!E95 |
| Costing!Q83 | CF CSV Upload!E121 |
| Costing!Q84 | CF CSV Upload!E122 |
| Costing!Q85 | CF CSV Upload!E123 |
| Costing!Q86 | CF CSV Upload!E124 |
| Costing!Q87 | CF CSV Upload!E125 |
| Costing!Q88 | CF CSV Upload!E126 |
| Costing!Q89 | CF CSV Upload!E127 |
| Costing!Q90 | CF CSV Upload!E128 |
| Costing!Q91 | CF CSV Upload!E129 |
| Costing!Q92 | CF CSV Upload!E130 |
| Costing!Q94 | CF CSV Upload!E131 |
| Costing!Q95 | CF CSV Upload!E132 |
| Costing!Q96 | CF CSV Upload!E133 |
| Costing!Q97 | CF CSV Upload!E134 |
| Costing!Q98 | CF CSV Upload!E135 |
| Costing!Q99 | CF CSV Upload!E136 |
| Costing!R100 | CF CSV Upload!H137 |
| Costing!R104 | CF CSV Upload!H148 |
| Costing!R105 | CF CSV Upload!H149 |
| Costing!R106 | CF CSV Upload!H150 |
| Costing!R107 | CF CSV Upload!H151 |
| Costing!R108 | CF CSV Upload!H152 |
| Costing!R109 | CF CSV Upload!H153 |
| Costing!R110 | CF CSV Upload!H154 |
| Costing!R114 | CF CSV Upload!H161 |
| Costing!R115 | CF CSV Upload!H162 |
| Costing!R116 | CF CSV Upload!H163 |
| Costing!R21 | CF CSV Upload!H17 |
| Costing!R22 | CF CSV Upload!H18 |
| Costing!R23 | CF CSV Upload!H19 |
| Costing!R24 | CF CSV Upload!H20 |
| Costing!R25 | CF CSV Upload!H21 |
| Costing!R29 | CF CSV Upload!H22 |
| Costing!R30 | CF CSV Upload!H23 |
| Costing!R31 | CF CSV Upload!H24 |
| Costing!R32 | CF CSV Upload!H25 |
| Costing!R33 | CF CSV Upload!H26 |
| Costing!R34 | CF CSV Upload!H27 |
| Costing!R35 | CF CSV Upload!H28 |
| Costing!R36 | CF CSV Upload!H29 |
| Costing!R37 | CF CSV Upload!H30 |
| Costing!R38 | CF CSV Upload!H31 |
| Costing!R42 | CF CSV Upload!H47 |
| Costing!R43 | CF CSV Upload!H48 |
| Costing!R44 | CF CSV Upload!H49 |
| Costing!R45 | CF CSV Upload!H50 |
| Costing!R46 | CF CSV Upload!H51 |
| Costing!R47 | CF CSV Upload!H52 |
| Costing!R48 | CF CSV Upload!H53 |
| Costing!R49 | CF CSV Upload!H54 |
| Costing!R50 | CF CSV Upload!H55 |
| Costing!R51 | CF CSV Upload!H56 |
| Costing!R53 | CF CSV Upload!H57 |
| Costing!R54 | CF CSV Upload!H58 |
| Costing!R58 | CF CSV Upload!H66 |
| Costing!R59 | CF CSV Upload!H67 |
| Costing!R60 | CF CSV Upload!H68 |
| Costing!R61 | CF CSV Upload!H69 |
| Costing!R65 | CF CSV Upload!H76 |
| Costing!R66 | CF CSV Upload!H77 |
| Costing!R67 | CF CSV Upload!H78 |
| Costing!R71 | CF CSV Upload!H89 |
| Costing!R72 | CF CSV Upload!H90 |
| Costing!R73 | CF CSV Upload!H100 |
| Costing!R74 | CF CSV Upload!H91 |
| Costing!R75 | CF CSV Upload!H92 |
| Costing!R76 | CF CSV Upload!H93 |
| Costing!R77 | CF CSV Upload!H94 |
| Costing!R78 | CF CSV Upload!H95 |
| Costing!R83 | CF CSV Upload!H121 |
| Costing!R84 | CF CSV Upload!H122 |
| Costing!R85 | CF CSV Upload!H123 |
| Costing!R86 | CF CSV Upload!H124 |
| Costing!R87 | CF CSV Upload!H125 |
| Costing!R88 | CF CSV Upload!H126 |
| Costing!R89 | CF CSV Upload!H127 |
| Costing!R90 | CF CSV Upload!H128 |
| Costing!R91 | CF CSV Upload!H129 |
| Costing!R92 | CF CSV Upload!H130 |
| Costing!R94 | CF CSV Upload!H131 |
| Costing!R95 | CF CSV Upload!H132 |
| Costing!R96 | CF CSV Upload!H133 |
| Costing!R97 | CF CSV Upload!H134 |
| Costing!R98 | CF CSV Upload!H135 |
| Costing!R99 | CF CSV Upload!H136 |
| Customer Summary!C10 | CF CSV Upload!A104 |
| Customer Summary!C11 | CF CSV Upload!A141 |
| Customer Summary!C12 | CF CSV Upload!A158 |
| Customer Summary!C13 | CF CSV Upload!A167 |
| Customer Summary!C5 | CF CSV Upload!A35 |
| Customer Summary!C6 | CF CSV Upload!A62 |
| Customer Summary!C7 | CF CSV Upload!A73 |
| Customer Summary!C8 | CF CSV Upload!A82 |
| Customer Summary!C9 | CF CSV Upload!A99 |
| Customer Summary!D10 | CF CSV Upload!L138 |
| Customer Summary!D11 | CF CSV Upload!L155 |
| Customer Summary!D12 | CF CSV Upload!L164 |
| Customer Summary!D5 | CF CSV Upload!L59 |
| Customer Summary!D6 | CF CSV Upload!L70 |
| Customer Summary!D7 | CF CSV Upload!L79 |
| Customer Summary!D8 | CF CSV Upload!L96 |
| Customer Summary!D9 | CF CSV Upload!L101 |

### References FROM: Data Lists

| Target | Referenced By |
|--------|-------------|
| Costing!E4 | Data Lists!B71, Data Lists!B72, Data Lists!B73 |

### References FROM: Filter-Check

| Target | Referenced By |
|--------|-------------|
| Report!AI912 | Filter-Check!B1 |

## SECTION 9: NAMED RANGES

*No named ranges defined.*

## SECTION 10: CONDITIONAL FORMATTING

### Sheet: Report (686 rules)

**Rule 1** — Range: `<ConditionalFormatting J1>`

- Type: `cellIs`
  Priority: 1253
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
  Priority: 1254
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

**Rule 2** — Range: `<ConditionalFormatting B810:B868 D175:D176 D192:D193 D212:D213 E194:Z198 E214:Z215 K17:K19 M29:M31>`

- Type: `containsBlanks`
  Priority: 1252
  Formula: `['LEN(TRIM(B17))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 3** — Range: `<ConditionalFormatting D34 D36>`

- Type: `containsBlanks`
  Priority: 1248
  Formula: `['LEN(TRIM(D34))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 4** — Range: `<ConditionalFormatting B91:B94>`

- Type: `containsBlanks`
  Priority: 1245
  Formula: `['LEN(TRIM(B91))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 5** — Range: `<ConditionalFormatting P93>`

- Type: `containsBlanks`
  Priority: 1244
  Formula: `['LEN(TRIM(P93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 6** — Range: `<ConditionalFormatting O94>`

- Type: `containsBlanks`
  Priority: 1243
  Formula: `['LEN(TRIM(O94))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 7** — Range: `<ConditionalFormatting B117:B119>`

- Type: `containsBlanks`
  Priority: 1242
  Formula: `['LEN(TRIM(B117))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 8** — Range: `<ConditionalFormatting B70>`

- Type: `containsBlanks`
  Priority: 1229
  Formula: `['LEN(TRIM(B70))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 9** — Range: `<ConditionalFormatting D70:N70 Q70:Z70>`

- Type: `cellIs`
  Priority: 1224
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
  Priority: 1226
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
  Priority: 1228
  Formula: `['LEN(TRIM(D70))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 10** — Range: `<ConditionalFormatting D72:N73>`

- Type: `expression`
  Priority: 1227
  Formula: `['AND(D70="Show",D72="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 11** — Range: `<ConditionalFormatting Q72:Z73>`

- Type: `expression`
  Priority: 1225
  Formula: `['AND(Q70="Show",Q72="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 12** — Range: `<ConditionalFormatting D70:N70>`

- Type: `expression`
  Priority: 1223
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

**Rule 13** — Range: `<ConditionalFormatting D71:N71>`

- Type: `expression`
  Priority: 1222
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

**Rule 14** — Range: `<ConditionalFormatting D72:N72>`

- Type: `expression`
  Priority: 1221
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

**Rule 15** — Range: `<ConditionalFormatting Q70:Z70>`

- Type: `expression`
  Priority: 1220
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

**Rule 16** — Range: `<ConditionalFormatting Q71:Z71>`

- Type: `expression`
  Priority: 1219
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

**Rule 17** — Range: `<ConditionalFormatting Q72:Z72>`

- Type: `expression`
  Priority: 1218
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

**Rule 18** — Range: `<ConditionalFormatting D80:N80>`

- Type: `expression`
  Priority: 1217
  Formula: `['AND(D78="Show",D80="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 19** — Range: `<ConditionalFormatting Q80:Z80>`

- Type: `expression`
  Priority: 1216
  Formula: `['AND(Q78="Show",Q80="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 20** — Range: `<ConditionalFormatting D77:N77 Q77:Z77>`

- Type: `cellIs`
  Priority: 1210
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
  Priority: 1212
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
  Priority: 1214
  Formula: `['LEN(TRIM(D77))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 21** — Range: `<ConditionalFormatting D79:N79>`

- Type: `expression`
  Priority: 1213
  Formula: `['AND(D77="Show",D79="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1207
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

**Rule 22** — Range: `<ConditionalFormatting Q79:Z79>`

- Type: `expression`
  Priority: 1211
  Formula: `['AND(Q77="Show",Q79="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1204
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

**Rule 23** — Range: `<ConditionalFormatting D77:N77>`

- Type: `expression`
  Priority: 1209
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

**Rule 24** — Range: `<ConditionalFormatting D78:N78>`

- Type: `expression`
  Priority: 1208
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

**Rule 25** — Range: `<ConditionalFormatting Q77:Z77>`

- Type: `expression`
  Priority: 1206
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

**Rule 26** — Range: `<ConditionalFormatting Q78:Z78>`

- Type: `expression`
  Priority: 1205
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

**Rule 27** — Range: `<ConditionalFormatting D87:N87>`

- Type: `expression`
  Priority: 1203
  Formula: `['AND(D85="Show",D87="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 28** — Range: `<ConditionalFormatting Q87:Z87>`

- Type: `expression`
  Priority: 1202
  Formula: `['AND(Q85="Show",Q87="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 29** — Range: `<ConditionalFormatting D84:N84 Q84:Z84>`

- Type: `cellIs`
  Priority: 1196
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
  Priority: 1198
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
  Priority: 1200
  Formula: `['LEN(TRIM(D84))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 30** — Range: `<ConditionalFormatting D86:N86>`

- Type: `expression`
  Priority: 1199
  Formula: `['AND(D84="Show",D86="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1193
  Formula: `['OR(D84="Show",D84="Hide")']`
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

**Rule 31** — Range: `<ConditionalFormatting Q86:Z86>`

- Type: `expression`
  Priority: 1197
  Formula: `['AND(Q84="Show",Q86="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1190
  Formula: `['OR(Q84="Show",Q84="Hide")']`
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

**Rule 32** — Range: `<ConditionalFormatting D84:N84>`

- Type: `expression`
  Priority: 1195
  Formula: `['OR(D84="Show",D84="Hide")']`
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

**Rule 33** — Range: `<ConditionalFormatting D85:N85>`

- Type: `expression`
  Priority: 1194
  Formula: `['OR(D84="Show",D84="Hide")']`
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

**Rule 34** — Range: `<ConditionalFormatting Q84:Z84>`

- Type: `expression`
  Priority: 1192
  Formula: `['OR(Q84="Show",Q84="Hide")']`
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

**Rule 35** — Range: `<ConditionalFormatting Q85:Z85>`

- Type: `expression`
  Priority: 1191
  Formula: `['OR(Q84="Show",Q84="Hide")']`
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

**Rule 36** — Range: `<ConditionalFormatting D101:N101>`

- Type: `expression`
  Priority: 1105
  Formula: `['AND(D99="Show",D101="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 37** — Range: `<ConditionalFormatting Q101:Z101>`

- Type: `expression`
  Priority: 1104
  Formula: `['AND(Q99="Show",Q101="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 38** — Range: `<ConditionalFormatting D98:N98 Q98:Z98>`

- Type: `cellIs`
  Priority: 1098
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
  Priority: 1100
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
  Priority: 1102
  Formula: `['LEN(TRIM(D98))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 39** — Range: `<ConditionalFormatting D100:N100>`

- Type: `expression`
  Priority: 1101
  Formula: `['AND(D98="Show",D100="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1095
  Formula: `['OR(D98="Show",D98="Hide")']`
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

**Rule 40** — Range: `<ConditionalFormatting Q100:Z100>`

- Type: `expression`
  Priority: 1099
  Formula: `['AND(Q98="Show",Q100="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1092
  Formula: `['OR(Q98="Show",Q98="Hide")']`
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

**Rule 41** — Range: `<ConditionalFormatting D98:N98>`

- Type: `expression`
  Priority: 1097
  Formula: `['OR(D98="Show",D98="Hide")']`
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

**Rule 42** — Range: `<ConditionalFormatting D99:N99>`

- Type: `expression`
  Priority: 1096
  Formula: `['OR(D98="Show",D98="Hide")']`
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

**Rule 43** — Range: `<ConditionalFormatting Q98:Z98>`

- Type: `expression`
  Priority: 1094
  Formula: `['OR(Q98="Show",Q98="Hide")']`
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

**Rule 44** — Range: `<ConditionalFormatting Q99:Z99>`

- Type: `expression`
  Priority: 1093
  Formula: `['OR(Q98="Show",Q98="Hide")']`
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

**Rule 45** — Range: `<ConditionalFormatting D108:N108>`

- Type: `expression`
  Priority: 1091
  Formula: `['AND(D106="Show",D108="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 46** — Range: `<ConditionalFormatting Q108:Z108>`

- Type: `expression`
  Priority: 1090
  Formula: `['AND(Q106="Show",Q108="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 47** — Range: `<ConditionalFormatting D105:N105 Q105:Z105>`

- Type: `cellIs`
  Priority: 1084
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
  Priority: 1086
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
  Priority: 1088
  Formula: `['LEN(TRIM(D105))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 48** — Range: `<ConditionalFormatting D107:N107>`

- Type: `expression`
  Priority: 1087
  Formula: `['AND(D105="Show",D107="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1081
  Formula: `['OR(D105="Show",D105="Hide")']`
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

**Rule 49** — Range: `<ConditionalFormatting Q107:Z107>`

- Type: `expression`
  Priority: 1085
  Formula: `['AND(Q105="Show",Q107="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1078
  Formula: `['OR(Q105="Show",Q105="Hide")']`
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

**Rule 50** — Range: `<ConditionalFormatting D105:N105>`

- Type: `expression`
  Priority: 1083
  Formula: `['OR(D105="Show",D105="Hide")']`
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

**Rule 51** — Range: `<ConditionalFormatting D106:N106>`

- Type: `expression`
  Priority: 1082
  Formula: `['OR(D105="Show",D105="Hide")']`
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

**Rule 52** — Range: `<ConditionalFormatting Q105:Z105>`

- Type: `expression`
  Priority: 1080
  Formula: `['OR(Q105="Show",Q105="Hide")']`
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

**Rule 53** — Range: `<ConditionalFormatting Q106:Z106>`

- Type: `expression`
  Priority: 1079
  Formula: `['OR(Q105="Show",Q105="Hide")']`
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

**Rule 54** — Range: `<ConditionalFormatting D115:N115>`

- Type: `expression`
  Priority: 1077
  Formula: `['AND(D113="Show",D115="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 55** — Range: `<ConditionalFormatting Q115:Z115>`

- Type: `expression`
  Priority: 1076
  Formula: `['AND(Q113="Show",Q115="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 56** — Range: `<ConditionalFormatting D112:N112 Q112:Z112>`

- Type: `cellIs`
  Priority: 1070
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
  Priority: 1072
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
  Priority: 1074
  Formula: `['LEN(TRIM(D112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 57** — Range: `<ConditionalFormatting D114:N114>`

- Type: `expression`
  Priority: 1073
  Formula: `['AND(D112="Show",D114="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1067
  Formula: `['OR(D112="Show",D112="Hide")']`
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

**Rule 58** — Range: `<ConditionalFormatting Q114:Z114>`

- Type: `expression`
  Priority: 1071
  Formula: `['AND(Q112="Show",Q114="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 1064
  Formula: `['OR(Q112="Show",Q112="Hide")']`
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

**Rule 59** — Range: `<ConditionalFormatting D112:N112>`

- Type: `expression`
  Priority: 1069
  Formula: `['OR(D112="Show",D112="Hide")']`
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

**Rule 60** — Range: `<ConditionalFormatting D113:N113>`

- Type: `expression`
  Priority: 1068
  Formula: `['OR(D112="Show",D112="Hide")']`
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

**Rule 61** — Range: `<ConditionalFormatting Q112:Z112>`

- Type: `expression`
  Priority: 1066
  Formula: `['OR(Q112="Show",Q112="Hide")']`
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

**Rule 62** — Range: `<ConditionalFormatting Q113:Z113>`

- Type: `expression`
  Priority: 1065
  Formula: `['OR(Q112="Show",Q112="Hide")']`
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

**Rule 63** — Range: `<ConditionalFormatting B89:B90>`

- Type: `containsBlanks`
  Priority: 979
  Formula: `['LEN(TRIM(B89))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 64** — Range: `<ConditionalFormatting B807:B809>`

- Type: `containsBlanks`
  Priority: 891
  Formula: `['LEN(TRIM(B807))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 65** — Range: `<ConditionalFormatting E64:Z66>`

- Type: `containsBlanks`
  Priority: 889
  Formula: `['LEN(TRIM(E64))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 66** — Range: `<ConditionalFormatting I172:I173>`

- Type: `containsBlanks`
  Priority: 887
  Formula: `['LEN(TRIM(I172))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 67** — Range: `<ConditionalFormatting D120:N120>`

- Type: `expression`
  Priority: 885
  Formula: `['AND(D119="Show",D120="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 68** — Range: `<ConditionalFormatting Q120:Z120>`

- Type: `expression`
  Priority: 884
  Formula: `['AND(Q119="Show",Q120="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 69** — Range: `<ConditionalFormatting E177:Z178>`

- Type: `containsBlanks`
  Priority: 881
  Formula: `['LEN(TRIM(E177))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 70** — Range: `<ConditionalFormatting B175 B177:B178>`

- Type: `containsBlanks`
  Priority: 880
  Formula: `['LEN(TRIM(B175))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 71** — Range: `<ConditionalFormatting B192:B198>`

- Type: `containsBlanks`
  Priority: 878
  Formula: `['LEN(TRIM(B192))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 72** — Range: `<ConditionalFormatting B212:B215>`

- Type: `containsBlanks`
  Priority: 876
  Formula: `['LEN(TRIM(B212))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 73** — Range: `<ConditionalFormatting E180:Z182>`

- Type: `containsBlanks`
  Priority: 875
  Formula: `['LEN(TRIM(E180))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 74** — Range: `<ConditionalFormatting B180:B182>`

- Type: `containsBlanks`
  Priority: 874
  Formula: `['LEN(TRIM(B180))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 75** — Range: `<ConditionalFormatting E200:Z202>`

- Type: `containsBlanks`
  Priority: 871
  Formula: `['LEN(TRIM(E200))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 76** — Range: `<ConditionalFormatting B200:B202>`

- Type: `containsBlanks`
  Priority: 870
  Formula: `['LEN(TRIM(B200))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 77** — Range: `<ConditionalFormatting E217:Z219 R220>`

- Type: `containsBlanks`
  Priority: 868
  Formula: `['LEN(TRIM(E217))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 78** — Range: `<ConditionalFormatting B217:B220>`

- Type: `containsBlanks`
  Priority: 867
  Formula: `['LEN(TRIM(B217))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 79** — Range: `<ConditionalFormatting D189:N189>`

- Type: `expression`
  Priority: 866
  Formula: `['AND(D187="Show",D189="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 80** — Range: `<ConditionalFormatting Q189:Z189>`

- Type: `expression`
  Priority: 865
  Formula: `['AND(Q187="Show",Q189="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 81** — Range: `<ConditionalFormatting D186:N186 Q186:Z186>`

- Type: `cellIs`
  Priority: 859
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
  Priority: 861
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
  Priority: 863
  Formula: `['LEN(TRIM(D186))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 82** — Range: `<ConditionalFormatting D188:N188>`

- Type: `expression`
  Priority: 862
  Formula: `['AND(D186="Show",D188="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 856
  Formula: `['OR(D186="Show",D186="Hide")']`
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

**Rule 83** — Range: `<ConditionalFormatting Q188:Z188>`

- Type: `expression`
  Priority: 860
  Formula: `['AND(Q186="Show",Q188="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 853
  Formula: `['OR(Q186="Show",Q186="Hide")']`
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

**Rule 84** — Range: `<ConditionalFormatting D186:N186>`

- Type: `expression`
  Priority: 858
  Formula: `['OR(D186="Show",D186="Hide")']`
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

**Rule 85** — Range: `<ConditionalFormatting D187:N187>`

- Type: `expression`
  Priority: 857
  Formula: `['OR(D186="Show",D186="Hide")']`
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

**Rule 86** — Range: `<ConditionalFormatting Q186:Z186>`

- Type: `expression`
  Priority: 855
  Formula: `['OR(Q186="Show",Q186="Hide")']`
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

**Rule 87** — Range: `<ConditionalFormatting Q187:Z187>`

- Type: `expression`
  Priority: 854
  Formula: `['OR(Q186="Show",Q186="Hide")']`
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

**Rule 88** — Range: `<ConditionalFormatting D209:N209>`

- Type: `expression`
  Priority: 824
  Formula: `['AND(D207="Show",D209="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 89** — Range: `<ConditionalFormatting Q209:Z209>`

- Type: `expression`
  Priority: 823
  Formula: `['AND(Q207="Show",Q209="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 90** — Range: `<ConditionalFormatting D206:N206 Q206:Z206>`

- Type: `cellIs`
  Priority: 817
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
  Priority: 819
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
  Priority: 821
  Formula: `['LEN(TRIM(D206))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 91** — Range: `<ConditionalFormatting D208:N208>`

- Type: `expression`
  Priority: 820
  Formula: `['AND(D206="Show",D208="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 814
  Formula: `['OR(D206="Show",D206="Hide")']`
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

**Rule 92** — Range: `<ConditionalFormatting Q208:Z208>`

- Type: `expression`
  Priority: 818
  Formula: `['AND(Q206="Show",Q208="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 811
  Formula: `['OR(Q206="Show",Q206="Hide")']`
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

**Rule 93** — Range: `<ConditionalFormatting D206:N206>`

- Type: `expression`
  Priority: 816
  Formula: `['OR(D206="Show",D206="Hide")']`
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

**Rule 94** — Range: `<ConditionalFormatting D207:N207>`

- Type: `expression`
  Priority: 815
  Formula: `['OR(D206="Show",D206="Hide")']`
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

**Rule 95** — Range: `<ConditionalFormatting Q206:Z206>`

- Type: `expression`
  Priority: 813
  Formula: `['OR(Q206="Show",Q206="Hide")']`
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

**Rule 96** — Range: `<ConditionalFormatting Q207:Z207>`

- Type: `expression`
  Priority: 812
  Formula: `['OR(Q206="Show",Q206="Hide")']`
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

**Rule 97** — Range: `<ConditionalFormatting D227:N227>`

- Type: `expression`
  Priority: 810
  Formula: `['AND(D225="Show",D227="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 98** — Range: `<ConditionalFormatting Q227:Z227>`

- Type: `expression`
  Priority: 809
  Formula: `['AND(Q225="Show",Q227="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 99** — Range: `<ConditionalFormatting D224:N224 Q224:Z224>`

- Type: `cellIs`
  Priority: 803
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
  Priority: 805
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
  Priority: 807
  Formula: `['LEN(TRIM(D224))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 100** — Range: `<ConditionalFormatting D226:N226>`

- Type: `expression`
  Priority: 806
  Formula: `['AND(D224="Show",D226="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 800
  Formula: `['OR(D224="Show",D224="Hide")']`
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

**Rule 101** — Range: `<ConditionalFormatting Q226:Z226>`

- Type: `expression`
  Priority: 804
  Formula: `['AND(Q224="Show",Q226="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 797
  Formula: `['OR(Q224="Show",Q224="Hide")']`
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

**Rule 102** — Range: `<ConditionalFormatting D224:N224>`

- Type: `expression`
  Priority: 802
  Formula: `['OR(D224="Show",D224="Hide")']`
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

**Rule 103** — Range: `<ConditionalFormatting D225:N225>`

- Type: `expression`
  Priority: 801
  Formula: `['OR(D224="Show",D224="Hide")']`
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

**Rule 104** — Range: `<ConditionalFormatting Q224:Z224>`

- Type: `expression`
  Priority: 799
  Formula: `['OR(Q224="Show",Q224="Hide")']`
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

**Rule 105** — Range: `<ConditionalFormatting Q225:Z225>`

- Type: `expression`
  Priority: 798
  Formula: `['OR(Q224="Show",Q224="Hide")']`
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

**Rule 106** — Range: `<ConditionalFormatting E801:Z805>`

- Type: `containsBlanks`
  Priority: 795
  Formula: `['LEN(TRIM(E801))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 107** — Range: `<ConditionalFormatting B801:B805>`

- Type: `containsBlanks`
  Priority: 794
  Formula: `['LEN(TRIM(B801))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 108** — Range: `<ConditionalFormatting B794 B800>`

- Type: `containsBlanks`
  Priority: 793
  Formula: `['LEN(TRIM(B794))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 109** — Range: `<ConditionalFormatting E798:Z799>`

- Type: `containsBlanks`
  Priority: 792
  Formula: `['LEN(TRIM(E798))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 110** — Range: `<ConditionalFormatting B796:B799>`

- Type: `containsBlanks`
  Priority: 791
  Formula: `['LEN(TRIM(B796))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 111** — Range: `<ConditionalFormatting E796:Z797>`

- Type: `containsBlanks`
  Priority: 790
  Formula: `['LEN(TRIM(E796))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 112** — Range: `<ConditionalFormatting B806>`

- Type: `containsBlanks`
  Priority: 789
  Formula: `['LEN(TRIM(B806))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 113** — Range: `<ConditionalFormatting D933:Z933>`

- Type: `expression`
  Priority: 787
  Formula: `['$B$816=0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme', bold=False

**Rule 114** — Range: `<ConditionalFormatting D934:Z934>`

- Type: `expression`
  Priority: 786
  Formula: `['$B$808=0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme', bold=False

**Rule 115** — Range: `<ConditionalFormatting I247:I248>`

- Type: `containsBlanks`
  Priority: 785
  Formula: `['LEN(TRIM(I247))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 116** — Range: `<ConditionalFormatting B246:B249>`

- Type: `containsBlanks`
  Priority: 783
  Formula: `['LEN(TRIM(B246))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 117** — Range: `<ConditionalFormatting E252:Z253>`

- Type: `containsBlanks`
  Priority: 781
  Formula: `['LEN(TRIM(E252))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 118** — Range: `<ConditionalFormatting B252:B253>`

- Type: `containsBlanks`
  Priority: 780
  Formula: `['LEN(TRIM(B252))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 119** — Range: `<ConditionalFormatting B269:B273>`

- Type: `containsBlanks`
  Priority: 779
  Formula: `['LEN(TRIM(B269))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 120** — Range: `<ConditionalFormatting B289:B290>`

- Type: `containsBlanks`
  Priority: 778
  Formula: `['LEN(TRIM(B289))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 121** — Range: `<ConditionalFormatting E255:Z257>`

- Type: `containsBlanks`
  Priority: 777
  Formula: `['LEN(TRIM(E255))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 122** — Range: `<ConditionalFormatting B255:B257>`

- Type: `containsBlanks`
  Priority: 776
  Formula: `['LEN(TRIM(B255))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 123** — Range: `<ConditionalFormatting E269:Z273>`

- Type: `containsBlanks`
  Priority: 775
  Formula: `['LEN(TRIM(E269))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 124** — Range: `<ConditionalFormatting E275:Z277>`

- Type: `containsBlanks`
  Priority: 773
  Formula: `['LEN(TRIM(E275))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 125** — Range: `<ConditionalFormatting B275:B277>`

- Type: `containsBlanks`
  Priority: 772
  Formula: `['LEN(TRIM(B275))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 126** — Range: `<ConditionalFormatting E289:Z290>`

- Type: `containsBlanks`
  Priority: 771
  Formula: `['LEN(TRIM(E289))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 127** — Range: `<ConditionalFormatting E292:Z294 R295>`

- Type: `containsBlanks`
  Priority: 770
  Formula: `['LEN(TRIM(E292))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 128** — Range: `<ConditionalFormatting B292:B295>`

- Type: `containsBlanks`
  Priority: 769
  Formula: `['LEN(TRIM(B292))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 129** — Range: `<ConditionalFormatting D264:N264>`

- Type: `expression`
  Priority: 768
  Formula: `['AND(D262="Show",D264="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 130** — Range: `<ConditionalFormatting Q264:Z264>`

- Type: `expression`
  Priority: 767
  Formula: `['AND(Q262="Show",Q264="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 131** — Range: `<ConditionalFormatting D261:N261 Q261:Z261>`

- Type: `cellIs`
  Priority: 761
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
  Priority: 763
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
  Priority: 765
  Formula: `['LEN(TRIM(D261))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 132** — Range: `<ConditionalFormatting D263:N263>`

- Type: `expression`
  Priority: 764
  Formula: `['AND(D261="Show",D263="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 758
  Formula: `['OR(D261="Show",D261="Hide")']`
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

**Rule 133** — Range: `<ConditionalFormatting Q263:Z263>`

- Type: `expression`
  Priority: 762
  Formula: `['AND(Q261="Show",Q263="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 755
  Formula: `['OR(Q261="Show",Q261="Hide")']`
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

**Rule 134** — Range: `<ConditionalFormatting D261:N261>`

- Type: `expression`
  Priority: 760
  Formula: `['OR(D261="Show",D261="Hide")']`
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

**Rule 135** — Range: `<ConditionalFormatting D262:N262>`

- Type: `expression`
  Priority: 759
  Formula: `['OR(D261="Show",D261="Hide")']`
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

**Rule 136** — Range: `<ConditionalFormatting Q261:Z261>`

- Type: `expression`
  Priority: 757
  Formula: `['OR(Q261="Show",Q261="Hide")']`
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

**Rule 137** — Range: `<ConditionalFormatting Q262:Z262>`

- Type: `expression`
  Priority: 756
  Formula: `['OR(Q261="Show",Q261="Hide")']`
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

**Rule 138** — Range: `<ConditionalFormatting D284:N284>`

- Type: `expression`
  Priority: 754
  Formula: `['AND(D282="Show",D284="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 139** — Range: `<ConditionalFormatting Q284:Z284>`

- Type: `expression`
  Priority: 753
  Formula: `['AND(Q282="Show",Q284="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 140** — Range: `<ConditionalFormatting D281:N281 Q281:Z281>`

- Type: `cellIs`
  Priority: 747
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
  Priority: 749
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
  Priority: 751
  Formula: `['LEN(TRIM(D281))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 141** — Range: `<ConditionalFormatting D283:N283>`

- Type: `expression`
  Priority: 750
  Formula: `['AND(D281="Show",D283="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 744
  Formula: `['OR(D281="Show",D281="Hide")']`
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

**Rule 142** — Range: `<ConditionalFormatting Q283:Z283>`

- Type: `expression`
  Priority: 748
  Formula: `['AND(Q281="Show",Q283="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 741
  Formula: `['OR(Q281="Show",Q281="Hide")']`
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

**Rule 143** — Range: `<ConditionalFormatting D281:N281>`

- Type: `expression`
  Priority: 746
  Formula: `['OR(D281="Show",D281="Hide")']`
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

**Rule 144** — Range: `<ConditionalFormatting D282:N282>`

- Type: `expression`
  Priority: 745
  Formula: `['OR(D281="Show",D281="Hide")']`
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

**Rule 145** — Range: `<ConditionalFormatting Q281:Z281>`

- Type: `expression`
  Priority: 743
  Formula: `['OR(Q281="Show",Q281="Hide")']`
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

**Rule 146** — Range: `<ConditionalFormatting Q282:Z282>`

- Type: `expression`
  Priority: 742
  Formula: `['OR(Q281="Show",Q281="Hide")']`
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

**Rule 147** — Range: `<ConditionalFormatting D302:N302>`

- Type: `expression`
  Priority: 740
  Formula: `['AND(D300="Show",D302="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 148** — Range: `<ConditionalFormatting Q302:Z302>`

- Type: `expression`
  Priority: 739
  Formula: `['AND(Q300="Show",Q302="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 149** — Range: `<ConditionalFormatting D299:N299 Q299:Z299>`

- Type: `cellIs`
  Priority: 733
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
  Priority: 735
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
  Priority: 737
  Formula: `['LEN(TRIM(D299))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 150** — Range: `<ConditionalFormatting D301:N301>`

- Type: `expression`
  Priority: 736
  Formula: `['AND(D299="Show",D301="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 730
  Formula: `['OR(D299="Show",D299="Hide")']`
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

**Rule 151** — Range: `<ConditionalFormatting Q301:Z301>`

- Type: `expression`
  Priority: 734
  Formula: `['AND(Q299="Show",Q301="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 727
  Formula: `['OR(Q299="Show",Q299="Hide")']`
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

**Rule 152** — Range: `<ConditionalFormatting D299:N299>`

- Type: `expression`
  Priority: 732
  Formula: `['OR(D299="Show",D299="Hide")']`
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

**Rule 153** — Range: `<ConditionalFormatting D300:N300>`

- Type: `expression`
  Priority: 731
  Formula: `['OR(D299="Show",D299="Hide")']`
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

**Rule 154** — Range: `<ConditionalFormatting Q299:Z299>`

- Type: `expression`
  Priority: 729
  Formula: `['OR(Q299="Show",Q299="Hide")']`
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

**Rule 155** — Range: `<ConditionalFormatting Q300:Z300>`

- Type: `expression`
  Priority: 728
  Formula: `['OR(Q299="Show",Q299="Hide")']`
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

**Rule 156** — Range: `<ConditionalFormatting Y244>`

- Type: `containsBlanks`
  Priority: 726
  Formula: `['LEN(TRIM(Y244))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 157** — Range: `<ConditionalFormatting I308:I309>`

- Type: `containsBlanks`
  Priority: 724
  Formula: `['LEN(TRIM(I308))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 158** — Range: `<ConditionalFormatting E313:Z314>`

- Type: `containsBlanks`
  Priority: 720
  Formula: `['LEN(TRIM(E313))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 159** — Range: `<ConditionalFormatting B313:B314>`

- Type: `containsBlanks`
  Priority: 719
  Formula: `['LEN(TRIM(B313))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 160** — Range: `<ConditionalFormatting B330:B334>`

- Type: `containsBlanks`
  Priority: 718
  Formula: `['LEN(TRIM(B330))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 161** — Range: `<ConditionalFormatting B350:B351>`

- Type: `containsBlanks`
  Priority: 717
  Formula: `['LEN(TRIM(B350))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 162** — Range: `<ConditionalFormatting E316:Z318>`

- Type: `containsBlanks`
  Priority: 716
  Formula: `['LEN(TRIM(E316))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 163** — Range: `<ConditionalFormatting B316:B318>`

- Type: `containsBlanks`
  Priority: 715
  Formula: `['LEN(TRIM(B316))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 164** — Range: `<ConditionalFormatting E330:Z334>`

- Type: `containsBlanks`
  Priority: 714
  Formula: `['LEN(TRIM(E330))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 165** — Range: `<ConditionalFormatting E336:Z338>`

- Type: `containsBlanks`
  Priority: 712
  Formula: `['LEN(TRIM(E336))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 166** — Range: `<ConditionalFormatting B336:B338>`

- Type: `containsBlanks`
  Priority: 711
  Formula: `['LEN(TRIM(B336))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 167** — Range: `<ConditionalFormatting E350:Z351>`

- Type: `containsBlanks`
  Priority: 710
  Formula: `['LEN(TRIM(E350))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 168** — Range: `<ConditionalFormatting E353:Z355 R356>`

- Type: `containsBlanks`
  Priority: 709
  Formula: `['LEN(TRIM(E353))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 169** — Range: `<ConditionalFormatting B353:B356>`

- Type: `containsBlanks`
  Priority: 708
  Formula: `['LEN(TRIM(B353))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 170** — Range: `<ConditionalFormatting D325:N325>`

- Type: `expression`
  Priority: 707
  Formula: `['AND(D323="Show",D325="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 171** — Range: `<ConditionalFormatting Q325:Z325>`

- Type: `expression`
  Priority: 706
  Formula: `['AND(Q323="Show",Q325="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 172** — Range: `<ConditionalFormatting D322:N322 Q322:Z322>`

- Type: `cellIs`
  Priority: 700
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
  Priority: 702
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
  Priority: 704
  Formula: `['LEN(TRIM(D322))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 173** — Range: `<ConditionalFormatting D324:N324>`

- Type: `expression`
  Priority: 703
  Formula: `['AND(D322="Show",D324="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 697
  Formula: `['OR(D322="Show",D322="Hide")']`
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

**Rule 174** — Range: `<ConditionalFormatting Q324:Z324>`

- Type: `expression`
  Priority: 701
  Formula: `['AND(Q322="Show",Q324="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 694
  Formula: `['OR(Q322="Show",Q322="Hide")']`
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

**Rule 175** — Range: `<ConditionalFormatting D322:N322>`

- Type: `expression`
  Priority: 699
  Formula: `['OR(D322="Show",D322="Hide")']`
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

**Rule 176** — Range: `<ConditionalFormatting D323:N323>`

- Type: `expression`
  Priority: 698
  Formula: `['OR(D322="Show",D322="Hide")']`
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

**Rule 177** — Range: `<ConditionalFormatting Q322:Z322>`

- Type: `expression`
  Priority: 696
  Formula: `['OR(Q322="Show",Q322="Hide")']`
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

**Rule 178** — Range: `<ConditionalFormatting Q323:Z323>`

- Type: `expression`
  Priority: 695
  Formula: `['OR(Q322="Show",Q322="Hide")']`
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

**Rule 179** — Range: `<ConditionalFormatting D345:N345>`

- Type: `expression`
  Priority: 693
  Formula: `['AND(D343="Show",D345="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 180** — Range: `<ConditionalFormatting Q345:Z345>`

- Type: `expression`
  Priority: 692
  Formula: `['AND(Q343="Show",Q345="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 181** — Range: `<ConditionalFormatting D342:N342 Q342:Z342>`

- Type: `cellIs`
  Priority: 686
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
  Priority: 688
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
  Priority: 690
  Formula: `['LEN(TRIM(D342))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 182** — Range: `<ConditionalFormatting D344:N344>`

- Type: `expression`
  Priority: 689
  Formula: `['AND(D342="Show",D344="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 683
  Formula: `['OR(D342="Show",D342="Hide")']`
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

**Rule 183** — Range: `<ConditionalFormatting Q344:Z344>`

- Type: `expression`
  Priority: 687
  Formula: `['AND(Q342="Show",Q344="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 680
  Formula: `['OR(Q342="Show",Q342="Hide")']`
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

**Rule 184** — Range: `<ConditionalFormatting D342:N342>`

- Type: `expression`
  Priority: 685
  Formula: `['OR(D342="Show",D342="Hide")']`
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

**Rule 185** — Range: `<ConditionalFormatting D343:N343>`

- Type: `expression`
  Priority: 684
  Formula: `['OR(D342="Show",D342="Hide")']`
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

**Rule 186** — Range: `<ConditionalFormatting Q342:Z342>`

- Type: `expression`
  Priority: 682
  Formula: `['OR(Q342="Show",Q342="Hide")']`
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

**Rule 187** — Range: `<ConditionalFormatting Q343:Z343>`

- Type: `expression`
  Priority: 681
  Formula: `['OR(Q342="Show",Q342="Hide")']`
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

**Rule 188** — Range: `<ConditionalFormatting D363:N363>`

- Type: `expression`
  Priority: 679
  Formula: `['AND(D361="Show",D363="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 189** — Range: `<ConditionalFormatting Q363:Z363>`

- Type: `expression`
  Priority: 678
  Formula: `['AND(Q361="Show",Q363="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 190** — Range: `<ConditionalFormatting D360:N360 Q360:Z360>`

- Type: `cellIs`
  Priority: 672
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
  Priority: 674
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
  Priority: 676
  Formula: `['LEN(TRIM(D360))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 191** — Range: `<ConditionalFormatting D362:N362>`

- Type: `expression`
  Priority: 675
  Formula: `['AND(D360="Show",D362="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 669
  Formula: `['OR(D360="Show",D360="Hide")']`
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

**Rule 192** — Range: `<ConditionalFormatting Q362:Z362>`

- Type: `expression`
  Priority: 673
  Formula: `['AND(Q360="Show",Q362="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 666
  Formula: `['OR(Q360="Show",Q360="Hide")']`
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

**Rule 193** — Range: `<ConditionalFormatting D360:N360>`

- Type: `expression`
  Priority: 671
  Formula: `['OR(D360="Show",D360="Hide")']`
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

**Rule 194** — Range: `<ConditionalFormatting D361:N361>`

- Type: `expression`
  Priority: 670
  Formula: `['OR(D360="Show",D360="Hide")']`
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

**Rule 195** — Range: `<ConditionalFormatting Q360:Z360>`

- Type: `expression`
  Priority: 668
  Formula: `['OR(Q360="Show",Q360="Hide")']`
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

**Rule 196** — Range: `<ConditionalFormatting Q361:Z361>`

- Type: `expression`
  Priority: 667
  Formula: `['OR(Q360="Show",Q360="Hide")']`
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

**Rule 197** — Range: `<ConditionalFormatting Y305>`

- Type: `containsBlanks`
  Priority: 664
  Formula: `['LEN(TRIM(Y305))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 198** — Range: `<ConditionalFormatting I369:I370>`

- Type: `containsBlanks`
  Priority: 663
  Formula: `['LEN(TRIM(I369))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 199** — Range: `<ConditionalFormatting E374:Z375>`

- Type: `containsBlanks`
  Priority: 660
  Formula: `['LEN(TRIM(E374))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 200** — Range: `<ConditionalFormatting B374:B375>`

- Type: `containsBlanks`
  Priority: 659
  Formula: `['LEN(TRIM(B374))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 201** — Range: `<ConditionalFormatting B391:B395>`

- Type: `containsBlanks`
  Priority: 658
  Formula: `['LEN(TRIM(B391))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 202** — Range: `<ConditionalFormatting B411:B412>`

- Type: `containsBlanks`
  Priority: 657
  Formula: `['LEN(TRIM(B411))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 203** — Range: `<ConditionalFormatting E377:Z379>`

- Type: `containsBlanks`
  Priority: 656
  Formula: `['LEN(TRIM(E377))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 204** — Range: `<ConditionalFormatting B377:B379>`

- Type: `containsBlanks`
  Priority: 655
  Formula: `['LEN(TRIM(B377))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 205** — Range: `<ConditionalFormatting E391:Z395>`

- Type: `containsBlanks`
  Priority: 654
  Formula: `['LEN(TRIM(E391))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 206** — Range: `<ConditionalFormatting E397:Z399>`

- Type: `containsBlanks`
  Priority: 652
  Formula: `['LEN(TRIM(E397))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 207** — Range: `<ConditionalFormatting B397:B399>`

- Type: `containsBlanks`
  Priority: 651
  Formula: `['LEN(TRIM(B397))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 208** — Range: `<ConditionalFormatting E411:Z412>`

- Type: `containsBlanks`
  Priority: 650
  Formula: `['LEN(TRIM(E411))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 209** — Range: `<ConditionalFormatting E414:Z416 R417>`

- Type: `containsBlanks`
  Priority: 649
  Formula: `['LEN(TRIM(E414))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 210** — Range: `<ConditionalFormatting B414:B417>`

- Type: `containsBlanks`
  Priority: 648
  Formula: `['LEN(TRIM(B414))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 211** — Range: `<ConditionalFormatting D386:N386>`

- Type: `expression`
  Priority: 647
  Formula: `['AND(D384="Show",D386="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 212** — Range: `<ConditionalFormatting Q386:Z386>`

- Type: `expression`
  Priority: 646
  Formula: `['AND(Q384="Show",Q386="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 213** — Range: `<ConditionalFormatting D383:N383 Q383:Z383>`

- Type: `cellIs`
  Priority: 640
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
  Priority: 642
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
  Priority: 644
  Formula: `['LEN(TRIM(D383))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 214** — Range: `<ConditionalFormatting D385:N385>`

- Type: `expression`
  Priority: 643
  Formula: `['AND(D383="Show",D385="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 637
  Formula: `['OR(D383="Show",D383="Hide")']`
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

**Rule 215** — Range: `<ConditionalFormatting Q385:Z385>`

- Type: `expression`
  Priority: 641
  Formula: `['AND(Q383="Show",Q385="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 634
  Formula: `['OR(Q383="Show",Q383="Hide")']`
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

**Rule 216** — Range: `<ConditionalFormatting D383:N383>`

- Type: `expression`
  Priority: 639
  Formula: `['OR(D383="Show",D383="Hide")']`
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

**Rule 217** — Range: `<ConditionalFormatting D384:N384>`

- Type: `expression`
  Priority: 638
  Formula: `['OR(D383="Show",D383="Hide")']`
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

**Rule 218** — Range: `<ConditionalFormatting Q383:Z383>`

- Type: `expression`
  Priority: 636
  Formula: `['OR(Q383="Show",Q383="Hide")']`
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

**Rule 219** — Range: `<ConditionalFormatting Q384:Z384>`

- Type: `expression`
  Priority: 635
  Formula: `['OR(Q383="Show",Q383="Hide")']`
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

**Rule 220** — Range: `<ConditionalFormatting D406:N406>`

- Type: `expression`
  Priority: 633
  Formula: `['AND(D404="Show",D406="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 221** — Range: `<ConditionalFormatting Q406:Z406>`

- Type: `expression`
  Priority: 632
  Formula: `['AND(Q404="Show",Q406="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 222** — Range: `<ConditionalFormatting D403:N403 Q403:Z403>`

- Type: `cellIs`
  Priority: 626
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
  Priority: 628
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
  Priority: 630
  Formula: `['LEN(TRIM(D403))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 223** — Range: `<ConditionalFormatting D405:N405>`

- Type: `expression`
  Priority: 629
  Formula: `['AND(D403="Show",D405="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 623
  Formula: `['OR(D403="Show",D403="Hide")']`
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

**Rule 224** — Range: `<ConditionalFormatting Q405:Z405>`

- Type: `expression`
  Priority: 627
  Formula: `['AND(Q403="Show",Q405="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 620
  Formula: `['OR(Q403="Show",Q403="Hide")']`
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

**Rule 225** — Range: `<ConditionalFormatting D403:N403>`

- Type: `expression`
  Priority: 625
  Formula: `['OR(D403="Show",D403="Hide")']`
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

**Rule 226** — Range: `<ConditionalFormatting D404:N404>`

- Type: `expression`
  Priority: 624
  Formula: `['OR(D403="Show",D403="Hide")']`
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

**Rule 227** — Range: `<ConditionalFormatting Q403:Z403>`

- Type: `expression`
  Priority: 622
  Formula: `['OR(Q403="Show",Q403="Hide")']`
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

**Rule 228** — Range: `<ConditionalFormatting Q404:Z404>`

- Type: `expression`
  Priority: 621
  Formula: `['OR(Q403="Show",Q403="Hide")']`
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

**Rule 229** — Range: `<ConditionalFormatting D424:N424>`

- Type: `expression`
  Priority: 619
  Formula: `['AND(D422="Show",D424="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 230** — Range: `<ConditionalFormatting Q424:Z424>`

- Type: `expression`
  Priority: 618
  Formula: `['AND(Q422="Show",Q424="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 231** — Range: `<ConditionalFormatting D421:N421 Q421:Z421>`

- Type: `cellIs`
  Priority: 612
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
  Priority: 614
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
  Priority: 616
  Formula: `['LEN(TRIM(D421))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 232** — Range: `<ConditionalFormatting D423:N423>`

- Type: `expression`
  Priority: 615
  Formula: `['AND(D421="Show",D423="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 609
  Formula: `['OR(D421="Show",D421="Hide")']`
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

**Rule 233** — Range: `<ConditionalFormatting Q423:Z423>`

- Type: `expression`
  Priority: 613
  Formula: `['AND(Q421="Show",Q423="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 606
  Formula: `['OR(Q421="Show",Q421="Hide")']`
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

**Rule 234** — Range: `<ConditionalFormatting D421:N421>`

- Type: `expression`
  Priority: 611
  Formula: `['OR(D421="Show",D421="Hide")']`
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

**Rule 235** — Range: `<ConditionalFormatting D422:N422>`

- Type: `expression`
  Priority: 610
  Formula: `['OR(D421="Show",D421="Hide")']`
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

**Rule 236** — Range: `<ConditionalFormatting Q421:Z421>`

- Type: `expression`
  Priority: 608
  Formula: `['OR(Q421="Show",Q421="Hide")']`
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

**Rule 237** — Range: `<ConditionalFormatting Q422:Z422>`

- Type: `expression`
  Priority: 607
  Formula: `['OR(Q421="Show",Q421="Hide")']`
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

**Rule 238** — Range: `<ConditionalFormatting Y366>`

- Type: `containsBlanks`
  Priority: 604
  Formula: `['LEN(TRIM(Y366))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 239** — Range: `<ConditionalFormatting I430:I431>`

- Type: `containsBlanks`
  Priority: 603
  Formula: `['LEN(TRIM(I430))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 240** — Range: `<ConditionalFormatting E435:Z436>`

- Type: `containsBlanks`
  Priority: 600
  Formula: `['LEN(TRIM(E435))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 241** — Range: `<ConditionalFormatting B435:B436>`

- Type: `containsBlanks`
  Priority: 599
  Formula: `['LEN(TRIM(B435))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 242** — Range: `<ConditionalFormatting B452:B456>`

- Type: `containsBlanks`
  Priority: 598
  Formula: `['LEN(TRIM(B452))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 243** — Range: `<ConditionalFormatting B472:B473>`

- Type: `containsBlanks`
  Priority: 597
  Formula: `['LEN(TRIM(B472))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 244** — Range: `<ConditionalFormatting E438:Z440>`

- Type: `containsBlanks`
  Priority: 596
  Formula: `['LEN(TRIM(E438))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 245** — Range: `<ConditionalFormatting B438:B440>`

- Type: `containsBlanks`
  Priority: 595
  Formula: `['LEN(TRIM(B438))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 246** — Range: `<ConditionalFormatting E452:Z456>`

- Type: `containsBlanks`
  Priority: 594
  Formula: `['LEN(TRIM(E452))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 247** — Range: `<ConditionalFormatting E458:Z460>`

- Type: `containsBlanks`
  Priority: 592
  Formula: `['LEN(TRIM(E458))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 248** — Range: `<ConditionalFormatting B458:B460>`

- Type: `containsBlanks`
  Priority: 591
  Formula: `['LEN(TRIM(B458))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 249** — Range: `<ConditionalFormatting E472:Z473>`

- Type: `containsBlanks`
  Priority: 590
  Formula: `['LEN(TRIM(E472))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 250** — Range: `<ConditionalFormatting E475:Z477 R478>`

- Type: `containsBlanks`
  Priority: 589
  Formula: `['LEN(TRIM(E475))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 251** — Range: `<ConditionalFormatting B475:B478>`

- Type: `containsBlanks`
  Priority: 588
  Formula: `['LEN(TRIM(B475))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 252** — Range: `<ConditionalFormatting D447:N447>`

- Type: `expression`
  Priority: 587
  Formula: `['AND(D445="Show",D447="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 253** — Range: `<ConditionalFormatting Q447:Z447>`

- Type: `expression`
  Priority: 586
  Formula: `['AND(Q445="Show",Q447="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 254** — Range: `<ConditionalFormatting D444:N444 Q444:Z444>`

- Type: `cellIs`
  Priority: 580
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
  Priority: 582
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
  Priority: 584
  Formula: `['LEN(TRIM(D444))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 255** — Range: `<ConditionalFormatting D446:N446>`

- Type: `expression`
  Priority: 583
  Formula: `['AND(D444="Show",D446="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 577
  Formula: `['OR(D444="Show",D444="Hide")']`
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

**Rule 256** — Range: `<ConditionalFormatting Q446:Z446>`

- Type: `expression`
  Priority: 581
  Formula: `['AND(Q444="Show",Q446="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 574
  Formula: `['OR(Q444="Show",Q444="Hide")']`
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

**Rule 257** — Range: `<ConditionalFormatting D444:N444>`

- Type: `expression`
  Priority: 579
  Formula: `['OR(D444="Show",D444="Hide")']`
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

**Rule 258** — Range: `<ConditionalFormatting D445:N445>`

- Type: `expression`
  Priority: 578
  Formula: `['OR(D444="Show",D444="Hide")']`
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

**Rule 259** — Range: `<ConditionalFormatting Q444:Z444>`

- Type: `expression`
  Priority: 576
  Formula: `['OR(Q444="Show",Q444="Hide")']`
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

**Rule 260** — Range: `<ConditionalFormatting Q445:Z445>`

- Type: `expression`
  Priority: 575
  Formula: `['OR(Q444="Show",Q444="Hide")']`
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

**Rule 261** — Range: `<ConditionalFormatting D467:N467>`

- Type: `expression`
  Priority: 573
  Formula: `['AND(D465="Show",D467="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 262** — Range: `<ConditionalFormatting Q467:Z467>`

- Type: `expression`
  Priority: 572
  Formula: `['AND(Q465="Show",Q467="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 263** — Range: `<ConditionalFormatting D464:N464 Q464:Z464>`

- Type: `cellIs`
  Priority: 566
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
  Priority: 568
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
  Priority: 570
  Formula: `['LEN(TRIM(D464))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 264** — Range: `<ConditionalFormatting D466:N466>`

- Type: `expression`
  Priority: 569
  Formula: `['AND(D464="Show",D466="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 563
  Formula: `['OR(D464="Show",D464="Hide")']`
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

**Rule 265** — Range: `<ConditionalFormatting Q466:Z466>`

- Type: `expression`
  Priority: 567
  Formula: `['AND(Q464="Show",Q466="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 560
  Formula: `['OR(Q464="Show",Q464="Hide")']`
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

**Rule 266** — Range: `<ConditionalFormatting D464:N464>`

- Type: `expression`
  Priority: 565
  Formula: `['OR(D464="Show",D464="Hide")']`
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

**Rule 267** — Range: `<ConditionalFormatting D465:N465>`

- Type: `expression`
  Priority: 564
  Formula: `['OR(D464="Show",D464="Hide")']`
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

**Rule 268** — Range: `<ConditionalFormatting Q464:Z464>`

- Type: `expression`
  Priority: 562
  Formula: `['OR(Q464="Show",Q464="Hide")']`
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

**Rule 269** — Range: `<ConditionalFormatting Q465:Z465>`

- Type: `expression`
  Priority: 561
  Formula: `['OR(Q464="Show",Q464="Hide")']`
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

**Rule 270** — Range: `<ConditionalFormatting D485:N485>`

- Type: `expression`
  Priority: 559
  Formula: `['AND(D483="Show",D485="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 271** — Range: `<ConditionalFormatting Q485:Z485>`

- Type: `expression`
  Priority: 558
  Formula: `['AND(Q483="Show",Q485="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 272** — Range: `<ConditionalFormatting D482:N482 Q482:Z482>`

- Type: `cellIs`
  Priority: 552
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
  Priority: 554
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
  Priority: 556
  Formula: `['LEN(TRIM(D482))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 273** — Range: `<ConditionalFormatting D484:N484>`

- Type: `expression`
  Priority: 555
  Formula: `['AND(D482="Show",D484="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 549
  Formula: `['OR(D482="Show",D482="Hide")']`
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

**Rule 274** — Range: `<ConditionalFormatting Q484:Z484>`

- Type: `expression`
  Priority: 553
  Formula: `['AND(Q482="Show",Q484="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 546
  Formula: `['OR(Q482="Show",Q482="Hide")']`
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

**Rule 275** — Range: `<ConditionalFormatting D482:N482>`

- Type: `expression`
  Priority: 551
  Formula: `['OR(D482="Show",D482="Hide")']`
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

**Rule 276** — Range: `<ConditionalFormatting D483:N483>`

- Type: `expression`
  Priority: 550
  Formula: `['OR(D482="Show",D482="Hide")']`
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

**Rule 277** — Range: `<ConditionalFormatting Q482:Z482>`

- Type: `expression`
  Priority: 548
  Formula: `['OR(Q482="Show",Q482="Hide")']`
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

**Rule 278** — Range: `<ConditionalFormatting Q483:Z483>`

- Type: `expression`
  Priority: 547
  Formula: `['OR(Q482="Show",Q482="Hide")']`
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

**Rule 279** — Range: `<ConditionalFormatting Y427>`

- Type: `containsBlanks`
  Priority: 544
  Formula: `['LEN(TRIM(Y427))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 280** — Range: `<ConditionalFormatting I491:I492>`

- Type: `containsBlanks`
  Priority: 543
  Formula: `['LEN(TRIM(I491))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 281** — Range: `<ConditionalFormatting E496:Z497>`

- Type: `containsBlanks`
  Priority: 540
  Formula: `['LEN(TRIM(E496))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 282** — Range: `<ConditionalFormatting B496:B497>`

- Type: `containsBlanks`
  Priority: 539
  Formula: `['LEN(TRIM(B496))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 283** — Range: `<ConditionalFormatting B513:B517>`

- Type: `containsBlanks`
  Priority: 538
  Formula: `['LEN(TRIM(B513))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 284** — Range: `<ConditionalFormatting B533:B534>`

- Type: `containsBlanks`
  Priority: 537
  Formula: `['LEN(TRIM(B533))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 285** — Range: `<ConditionalFormatting E499:Z501>`

- Type: `containsBlanks`
  Priority: 536
  Formula: `['LEN(TRIM(E499))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 286** — Range: `<ConditionalFormatting B499:B501>`

- Type: `containsBlanks`
  Priority: 535
  Formula: `['LEN(TRIM(B499))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 287** — Range: `<ConditionalFormatting E513:Z517>`

- Type: `containsBlanks`
  Priority: 534
  Formula: `['LEN(TRIM(E513))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 288** — Range: `<ConditionalFormatting E519:Z521>`

- Type: `containsBlanks`
  Priority: 532
  Formula: `['LEN(TRIM(E519))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 289** — Range: `<ConditionalFormatting B519:B521>`

- Type: `containsBlanks`
  Priority: 531
  Formula: `['LEN(TRIM(B519))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 290** — Range: `<ConditionalFormatting E533:Z534>`

- Type: `containsBlanks`
  Priority: 530
  Formula: `['LEN(TRIM(E533))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 291** — Range: `<ConditionalFormatting E536:Z538 R539>`

- Type: `containsBlanks`
  Priority: 529
  Formula: `['LEN(TRIM(E536))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 292** — Range: `<ConditionalFormatting B536:B539>`

- Type: `containsBlanks`
  Priority: 528
  Formula: `['LEN(TRIM(B536))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 293** — Range: `<ConditionalFormatting D508:N508>`

- Type: `expression`
  Priority: 527
  Formula: `['AND(D506="Show",D508="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 294** — Range: `<ConditionalFormatting Q508:Z508>`

- Type: `expression`
  Priority: 526
  Formula: `['AND(Q506="Show",Q508="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 295** — Range: `<ConditionalFormatting D505:N505 Q505:Z505>`

- Type: `cellIs`
  Priority: 520
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
  Priority: 522
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
  Priority: 524
  Formula: `['LEN(TRIM(D505))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 296** — Range: `<ConditionalFormatting D507:N507>`

- Type: `expression`
  Priority: 523
  Formula: `['AND(D505="Show",D507="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 517
  Formula: `['OR(D505="Show",D505="Hide")']`
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

**Rule 297** — Range: `<ConditionalFormatting Q507:Z507>`

- Type: `expression`
  Priority: 521
  Formula: `['AND(Q505="Show",Q507="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 514
  Formula: `['OR(Q505="Show",Q505="Hide")']`
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

**Rule 298** — Range: `<ConditionalFormatting D505:N505>`

- Type: `expression`
  Priority: 519
  Formula: `['OR(D505="Show",D505="Hide")']`
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

**Rule 299** — Range: `<ConditionalFormatting D506:N506>`

- Type: `expression`
  Priority: 518
  Formula: `['OR(D505="Show",D505="Hide")']`
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

**Rule 300** — Range: `<ConditionalFormatting Q505:Z505>`

- Type: `expression`
  Priority: 516
  Formula: `['OR(Q505="Show",Q505="Hide")']`
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

**Rule 301** — Range: `<ConditionalFormatting Q506:Z506>`

- Type: `expression`
  Priority: 515
  Formula: `['OR(Q505="Show",Q505="Hide")']`
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

**Rule 302** — Range: `<ConditionalFormatting D528:N528>`

- Type: `expression`
  Priority: 513
  Formula: `['AND(D526="Show",D528="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 303** — Range: `<ConditionalFormatting Q528:Z528>`

- Type: `expression`
  Priority: 512
  Formula: `['AND(Q526="Show",Q528="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 304** — Range: `<ConditionalFormatting D525:N525 Q525:Z525>`

- Type: `cellIs`
  Priority: 506
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
  Priority: 508
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
  Priority: 510
  Formula: `['LEN(TRIM(D525))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 305** — Range: `<ConditionalFormatting D527:N527>`

- Type: `expression`
  Priority: 509
  Formula: `['AND(D525="Show",D527="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 503
  Formula: `['OR(D525="Show",D525="Hide")']`
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

**Rule 306** — Range: `<ConditionalFormatting Q527:Z527>`

- Type: `expression`
  Priority: 507
  Formula: `['AND(Q525="Show",Q527="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 500
  Formula: `['OR(Q525="Show",Q525="Hide")']`
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

**Rule 307** — Range: `<ConditionalFormatting D525:N525>`

- Type: `expression`
  Priority: 505
  Formula: `['OR(D525="Show",D525="Hide")']`
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

**Rule 308** — Range: `<ConditionalFormatting D526:N526>`

- Type: `expression`
  Priority: 504
  Formula: `['OR(D525="Show",D525="Hide")']`
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

**Rule 309** — Range: `<ConditionalFormatting Q525:Z525>`

- Type: `expression`
  Priority: 502
  Formula: `['OR(Q525="Show",Q525="Hide")']`
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

**Rule 310** — Range: `<ConditionalFormatting Q526:Z526>`

- Type: `expression`
  Priority: 501
  Formula: `['OR(Q525="Show",Q525="Hide")']`
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

**Rule 311** — Range: `<ConditionalFormatting D546:N546>`

- Type: `expression`
  Priority: 499
  Formula: `['AND(D544="Show",D546="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 312** — Range: `<ConditionalFormatting Q546:Z546>`

- Type: `expression`
  Priority: 498
  Formula: `['AND(Q544="Show",Q546="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 313** — Range: `<ConditionalFormatting D543:N543 Q543:Z543>`

- Type: `cellIs`
  Priority: 492
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
  Priority: 494
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
  Priority: 496
  Formula: `['LEN(TRIM(D543))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 314** — Range: `<ConditionalFormatting D545:N545>`

- Type: `expression`
  Priority: 495
  Formula: `['AND(D543="Show",D545="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 489
  Formula: `['OR(D543="Show",D543="Hide")']`
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

**Rule 315** — Range: `<ConditionalFormatting Q545:Z545>`

- Type: `expression`
  Priority: 493
  Formula: `['AND(Q543="Show",Q545="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 486
  Formula: `['OR(Q543="Show",Q543="Hide")']`
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

**Rule 316** — Range: `<ConditionalFormatting D543:N543>`

- Type: `expression`
  Priority: 491
  Formula: `['OR(D543="Show",D543="Hide")']`
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

**Rule 317** — Range: `<ConditionalFormatting D544:N544>`

- Type: `expression`
  Priority: 490
  Formula: `['OR(D543="Show",D543="Hide")']`
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

**Rule 318** — Range: `<ConditionalFormatting Q543:Z543>`

- Type: `expression`
  Priority: 488
  Formula: `['OR(Q543="Show",Q543="Hide")']`
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

**Rule 319** — Range: `<ConditionalFormatting Q544:Z544>`

- Type: `expression`
  Priority: 487
  Formula: `['OR(Q543="Show",Q543="Hide")']`
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

**Rule 320** — Range: `<ConditionalFormatting Y488>`

- Type: `containsBlanks`
  Priority: 484
  Formula: `['LEN(TRIM(Y488))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 321** — Range: `<ConditionalFormatting I552:I553>`

- Type: `containsBlanks`
  Priority: 483
  Formula: `['LEN(TRIM(I552))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 322** — Range: `<ConditionalFormatting E557:Z558>`

- Type: `containsBlanks`
  Priority: 480
  Formula: `['LEN(TRIM(E557))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 323** — Range: `<ConditionalFormatting B557:B558>`

- Type: `containsBlanks`
  Priority: 479
  Formula: `['LEN(TRIM(B557))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 324** — Range: `<ConditionalFormatting B574:B578>`

- Type: `containsBlanks`
  Priority: 478
  Formula: `['LEN(TRIM(B574))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 325** — Range: `<ConditionalFormatting B594:B595>`

- Type: `containsBlanks`
  Priority: 477
  Formula: `['LEN(TRIM(B594))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 326** — Range: `<ConditionalFormatting E560:Z562>`

- Type: `containsBlanks`
  Priority: 476
  Formula: `['LEN(TRIM(E560))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 327** — Range: `<ConditionalFormatting B560:B562>`

- Type: `containsBlanks`
  Priority: 475
  Formula: `['LEN(TRIM(B560))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 328** — Range: `<ConditionalFormatting E574:Z578>`

- Type: `containsBlanks`
  Priority: 474
  Formula: `['LEN(TRIM(E574))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 329** — Range: `<ConditionalFormatting E580:Z582>`

- Type: `containsBlanks`
  Priority: 472
  Formula: `['LEN(TRIM(E580))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 330** — Range: `<ConditionalFormatting B580:B582>`

- Type: `containsBlanks`
  Priority: 471
  Formula: `['LEN(TRIM(B580))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 331** — Range: `<ConditionalFormatting E594:Z595>`

- Type: `containsBlanks`
  Priority: 470
  Formula: `['LEN(TRIM(E594))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 332** — Range: `<ConditionalFormatting E597:Z599 R600>`

- Type: `containsBlanks`
  Priority: 469
  Formula: `['LEN(TRIM(E597))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 333** — Range: `<ConditionalFormatting B597:B600>`

- Type: `containsBlanks`
  Priority: 468
  Formula: `['LEN(TRIM(B597))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 334** — Range: `<ConditionalFormatting D569:N569>`

- Type: `expression`
  Priority: 467
  Formula: `['AND(D567="Show",D569="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 335** — Range: `<ConditionalFormatting Q569:Z569>`

- Type: `expression`
  Priority: 466
  Formula: `['AND(Q567="Show",Q569="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 336** — Range: `<ConditionalFormatting D566:N566 Q566:Z566>`

- Type: `cellIs`
  Priority: 460
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
  Priority: 462
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
  Priority: 464
  Formula: `['LEN(TRIM(D566))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 337** — Range: `<ConditionalFormatting D568:N568>`

- Type: `expression`
  Priority: 463
  Formula: `['AND(D566="Show",D568="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 457
  Formula: `['OR(D566="Show",D566="Hide")']`
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

**Rule 338** — Range: `<ConditionalFormatting Q568:Z568>`

- Type: `expression`
  Priority: 461
  Formula: `['AND(Q566="Show",Q568="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 454
  Formula: `['OR(Q566="Show",Q566="Hide")']`
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

**Rule 339** — Range: `<ConditionalFormatting D566:N566>`

- Type: `expression`
  Priority: 459
  Formula: `['OR(D566="Show",D566="Hide")']`
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

**Rule 340** — Range: `<ConditionalFormatting D567:N567>`

- Type: `expression`
  Priority: 458
  Formula: `['OR(D566="Show",D566="Hide")']`
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

**Rule 341** — Range: `<ConditionalFormatting Q566:Z566>`

- Type: `expression`
  Priority: 456
  Formula: `['OR(Q566="Show",Q566="Hide")']`
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

**Rule 342** — Range: `<ConditionalFormatting Q567:Z567>`

- Type: `expression`
  Priority: 455
  Formula: `['OR(Q566="Show",Q566="Hide")']`
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

**Rule 343** — Range: `<ConditionalFormatting D589:N589>`

- Type: `expression`
  Priority: 453
  Formula: `['AND(D587="Show",D589="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 344** — Range: `<ConditionalFormatting Q589:Z589>`

- Type: `expression`
  Priority: 452
  Formula: `['AND(Q587="Show",Q589="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 345** — Range: `<ConditionalFormatting D586:N586 Q586:Z586>`

- Type: `cellIs`
  Priority: 446
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
  Priority: 448
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
  Priority: 450
  Formula: `['LEN(TRIM(D586))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 346** — Range: `<ConditionalFormatting D588:N588>`

- Type: `expression`
  Priority: 449
  Formula: `['AND(D586="Show",D588="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 443
  Formula: `['OR(D586="Show",D586="Hide")']`
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

**Rule 347** — Range: `<ConditionalFormatting Q588:Z588>`

- Type: `expression`
  Priority: 447
  Formula: `['AND(Q586="Show",Q588="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 440
  Formula: `['OR(Q586="Show",Q586="Hide")']`
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

**Rule 348** — Range: `<ConditionalFormatting D586:N586>`

- Type: `expression`
  Priority: 445
  Formula: `['OR(D586="Show",D586="Hide")']`
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

**Rule 349** — Range: `<ConditionalFormatting D587:N587>`

- Type: `expression`
  Priority: 444
  Formula: `['OR(D586="Show",D586="Hide")']`
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

**Rule 350** — Range: `<ConditionalFormatting Q586:Z586>`

- Type: `expression`
  Priority: 442
  Formula: `['OR(Q586="Show",Q586="Hide")']`
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

**Rule 351** — Range: `<ConditionalFormatting Q587:Z587>`

- Type: `expression`
  Priority: 441
  Formula: `['OR(Q586="Show",Q586="Hide")']`
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

**Rule 352** — Range: `<ConditionalFormatting D607:N607>`

- Type: `expression`
  Priority: 439
  Formula: `['AND(D605="Show",D607="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 353** — Range: `<ConditionalFormatting Q607:Z607>`

- Type: `expression`
  Priority: 438
  Formula: `['AND(Q605="Show",Q607="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 354** — Range: `<ConditionalFormatting D604:N604 Q604:Z604>`

- Type: `cellIs`
  Priority: 432
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
  Priority: 434
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
  Priority: 436
  Formula: `['LEN(TRIM(D604))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 355** — Range: `<ConditionalFormatting D606:N606>`

- Type: `expression`
  Priority: 435
  Formula: `['AND(D604="Show",D606="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 429
  Formula: `['OR(D604="Show",D604="Hide")']`
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

**Rule 356** — Range: `<ConditionalFormatting Q606:Z606>`

- Type: `expression`
  Priority: 433
  Formula: `['AND(Q604="Show",Q606="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 426
  Formula: `['OR(Q604="Show",Q604="Hide")']`
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

**Rule 357** — Range: `<ConditionalFormatting D604:N604>`

- Type: `expression`
  Priority: 431
  Formula: `['OR(D604="Show",D604="Hide")']`
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

**Rule 358** — Range: `<ConditionalFormatting D605:N605>`

- Type: `expression`
  Priority: 430
  Formula: `['OR(D604="Show",D604="Hide")']`
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

**Rule 359** — Range: `<ConditionalFormatting Q604:Z604>`

- Type: `expression`
  Priority: 428
  Formula: `['OR(Q604="Show",Q604="Hide")']`
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

**Rule 360** — Range: `<ConditionalFormatting Q605:Z605>`

- Type: `expression`
  Priority: 427
  Formula: `['OR(Q604="Show",Q604="Hide")']`
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

**Rule 361** — Range: `<ConditionalFormatting Y549>`

- Type: `containsBlanks`
  Priority: 424
  Formula: `['LEN(TRIM(Y549))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 362** — Range: `<ConditionalFormatting I613:I614>`

- Type: `containsBlanks`
  Priority: 423
  Formula: `['LEN(TRIM(I613))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 363** — Range: `<ConditionalFormatting E618:Z619>`

- Type: `containsBlanks`
  Priority: 420
  Formula: `['LEN(TRIM(E618))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 364** — Range: `<ConditionalFormatting B618:B619>`

- Type: `containsBlanks`
  Priority: 419
  Formula: `['LEN(TRIM(B618))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 365** — Range: `<ConditionalFormatting B635:B639>`

- Type: `containsBlanks`
  Priority: 418
  Formula: `['LEN(TRIM(B635))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 366** — Range: `<ConditionalFormatting B655:B656>`

- Type: `containsBlanks`
  Priority: 417
  Formula: `['LEN(TRIM(B655))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 367** — Range: `<ConditionalFormatting E621:Z623>`

- Type: `containsBlanks`
  Priority: 416
  Formula: `['LEN(TRIM(E621))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 368** — Range: `<ConditionalFormatting B621:B623>`

- Type: `containsBlanks`
  Priority: 415
  Formula: `['LEN(TRIM(B621))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 369** — Range: `<ConditionalFormatting E635:Z639>`

- Type: `containsBlanks`
  Priority: 414
  Formula: `['LEN(TRIM(E635))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 370** — Range: `<ConditionalFormatting E641:Z643>`

- Type: `containsBlanks`
  Priority: 412
  Formula: `['LEN(TRIM(E641))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 371** — Range: `<ConditionalFormatting B641:B643>`

- Type: `containsBlanks`
  Priority: 411
  Formula: `['LEN(TRIM(B641))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 372** — Range: `<ConditionalFormatting E655:Z656>`

- Type: `containsBlanks`
  Priority: 410
  Formula: `['LEN(TRIM(E655))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 373** — Range: `<ConditionalFormatting E658:Z660 R661>`

- Type: `containsBlanks`
  Priority: 409
  Formula: `['LEN(TRIM(E658))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 374** — Range: `<ConditionalFormatting B658:B661>`

- Type: `containsBlanks`
  Priority: 408
  Formula: `['LEN(TRIM(B658))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 375** — Range: `<ConditionalFormatting D630:N630>`

- Type: `expression`
  Priority: 407
  Formula: `['AND(D628="Show",D630="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 376** — Range: `<ConditionalFormatting Q630:Z630>`

- Type: `expression`
  Priority: 406
  Formula: `['AND(Q628="Show",Q630="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 377** — Range: `<ConditionalFormatting D627:N627 Q627:Z627>`

- Type: `cellIs`
  Priority: 400
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
  Priority: 402
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
  Priority: 404
  Formula: `['LEN(TRIM(D627))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 378** — Range: `<ConditionalFormatting D629:N629>`

- Type: `expression`
  Priority: 403
  Formula: `['AND(D627="Show",D629="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 397
  Formula: `['OR(D627="Show",D627="Hide")']`
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

**Rule 379** — Range: `<ConditionalFormatting Q629:Z629>`

- Type: `expression`
  Priority: 401
  Formula: `['AND(Q627="Show",Q629="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 394
  Formula: `['OR(Q627="Show",Q627="Hide")']`
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

**Rule 380** — Range: `<ConditionalFormatting D627:N627>`

- Type: `expression`
  Priority: 399
  Formula: `['OR(D627="Show",D627="Hide")']`
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

**Rule 381** — Range: `<ConditionalFormatting D628:N628>`

- Type: `expression`
  Priority: 398
  Formula: `['OR(D627="Show",D627="Hide")']`
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

**Rule 382** — Range: `<ConditionalFormatting Q627:Z627>`

- Type: `expression`
  Priority: 396
  Formula: `['OR(Q627="Show",Q627="Hide")']`
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

**Rule 383** — Range: `<ConditionalFormatting Q628:Z628>`

- Type: `expression`
  Priority: 395
  Formula: `['OR(Q627="Show",Q627="Hide")']`
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

**Rule 384** — Range: `<ConditionalFormatting D650:N650>`

- Type: `expression`
  Priority: 393
  Formula: `['AND(D648="Show",D650="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 385** — Range: `<ConditionalFormatting Q650:Z650>`

- Type: `expression`
  Priority: 392
  Formula: `['AND(Q648="Show",Q650="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 386** — Range: `<ConditionalFormatting D647:N647 Q647:Z647>`

- Type: `cellIs`
  Priority: 386
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
  Priority: 388
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
  Priority: 390
  Formula: `['LEN(TRIM(D647))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 387** — Range: `<ConditionalFormatting D649:N649>`

- Type: `expression`
  Priority: 389
  Formula: `['AND(D647="Show",D649="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 383
  Formula: `['OR(D647="Show",D647="Hide")']`
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

**Rule 388** — Range: `<ConditionalFormatting Q649:Z649>`

- Type: `expression`
  Priority: 387
  Formula: `['AND(Q647="Show",Q649="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 380
  Formula: `['OR(Q647="Show",Q647="Hide")']`
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

**Rule 389** — Range: `<ConditionalFormatting D647:N647>`

- Type: `expression`
  Priority: 385
  Formula: `['OR(D647="Show",D647="Hide")']`
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

**Rule 390** — Range: `<ConditionalFormatting D648:N648>`

- Type: `expression`
  Priority: 384
  Formula: `['OR(D647="Show",D647="Hide")']`
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

**Rule 391** — Range: `<ConditionalFormatting Q647:Z647>`

- Type: `expression`
  Priority: 382
  Formula: `['OR(Q647="Show",Q647="Hide")']`
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

**Rule 392** — Range: `<ConditionalFormatting Q648:Z648>`

- Type: `expression`
  Priority: 381
  Formula: `['OR(Q647="Show",Q647="Hide")']`
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

**Rule 393** — Range: `<ConditionalFormatting D668:N668>`

- Type: `expression`
  Priority: 379
  Formula: `['AND(D666="Show",D668="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 394** — Range: `<ConditionalFormatting Q668:Z668>`

- Type: `expression`
  Priority: 378
  Formula: `['AND(Q666="Show",Q668="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 395** — Range: `<ConditionalFormatting D665:N665 Q665:Z665>`

- Type: `cellIs`
  Priority: 372
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
  Priority: 374
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
  Priority: 376
  Formula: `['LEN(TRIM(D665))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 396** — Range: `<ConditionalFormatting D667:N667>`

- Type: `expression`
  Priority: 375
  Formula: `['AND(D665="Show",D667="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 369
  Formula: `['OR(D665="Show",D665="Hide")']`
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

**Rule 397** — Range: `<ConditionalFormatting Q667:Z667>`

- Type: `expression`
  Priority: 373
  Formula: `['AND(Q665="Show",Q667="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 366
  Formula: `['OR(Q665="Show",Q665="Hide")']`
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

**Rule 398** — Range: `<ConditionalFormatting D665:N665>`

- Type: `expression`
  Priority: 371
  Formula: `['OR(D665="Show",D665="Hide")']`
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

**Rule 399** — Range: `<ConditionalFormatting D666:N666>`

- Type: `expression`
  Priority: 370
  Formula: `['OR(D665="Show",D665="Hide")']`
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

**Rule 400** — Range: `<ConditionalFormatting Q665:Z665>`

- Type: `expression`
  Priority: 368
  Formula: `['OR(Q665="Show",Q665="Hide")']`
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

**Rule 401** — Range: `<ConditionalFormatting Q666:Z666>`

- Type: `expression`
  Priority: 367
  Formula: `['OR(Q665="Show",Q665="Hide")']`
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

**Rule 402** — Range: `<ConditionalFormatting Y610>`

- Type: `containsBlanks`
  Priority: 364
  Formula: `['LEN(TRIM(Y610))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 403** — Range: `<ConditionalFormatting I674:I675>`

- Type: `containsBlanks`
  Priority: 363
  Formula: `['LEN(TRIM(I674))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 404** — Range: `<ConditionalFormatting E679:Z680>`

- Type: `containsBlanks`
  Priority: 360
  Formula: `['LEN(TRIM(E679))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 405** — Range: `<ConditionalFormatting B679:B680>`

- Type: `containsBlanks`
  Priority: 359
  Formula: `['LEN(TRIM(B679))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 406** — Range: `<ConditionalFormatting B696:B700>`

- Type: `containsBlanks`
  Priority: 358
  Formula: `['LEN(TRIM(B696))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 407** — Range: `<ConditionalFormatting B716:B717>`

- Type: `containsBlanks`
  Priority: 357
  Formula: `['LEN(TRIM(B716))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 408** — Range: `<ConditionalFormatting E682:Z684>`

- Type: `containsBlanks`
  Priority: 356
  Formula: `['LEN(TRIM(E682))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 409** — Range: `<ConditionalFormatting B682:B684>`

- Type: `containsBlanks`
  Priority: 355
  Formula: `['LEN(TRIM(B682))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 410** — Range: `<ConditionalFormatting E696:Z700>`

- Type: `containsBlanks`
  Priority: 354
  Formula: `['LEN(TRIM(E696))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 411** — Range: `<ConditionalFormatting E702:Z704>`

- Type: `containsBlanks`
  Priority: 352
  Formula: `['LEN(TRIM(E702))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 412** — Range: `<ConditionalFormatting B702:B704>`

- Type: `containsBlanks`
  Priority: 351
  Formula: `['LEN(TRIM(B702))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 413** — Range: `<ConditionalFormatting E716:Z717>`

- Type: `containsBlanks`
  Priority: 350
  Formula: `['LEN(TRIM(E716))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 414** — Range: `<ConditionalFormatting E719:Z721 R722>`

- Type: `containsBlanks`
  Priority: 349
  Formula: `['LEN(TRIM(E719))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 415** — Range: `<ConditionalFormatting B719:B722>`

- Type: `containsBlanks`
  Priority: 348
  Formula: `['LEN(TRIM(B719))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 416** — Range: `<ConditionalFormatting D691:N691>`

- Type: `expression`
  Priority: 347
  Formula: `['AND(D689="Show",D691="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 417** — Range: `<ConditionalFormatting Q691:Z691>`

- Type: `expression`
  Priority: 346
  Formula: `['AND(Q689="Show",Q691="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 418** — Range: `<ConditionalFormatting D688:N688 Q688:Z688>`

- Type: `cellIs`
  Priority: 340
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
  Priority: 342
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
  Priority: 344
  Formula: `['LEN(TRIM(D688))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 419** — Range: `<ConditionalFormatting D690:N690>`

- Type: `expression`
  Priority: 343
  Formula: `['AND(D688="Show",D690="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 337
  Formula: `['OR(D688="Show",D688="Hide")']`
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

**Rule 420** — Range: `<ConditionalFormatting Q690:Z690>`

- Type: `expression`
  Priority: 341
  Formula: `['AND(Q688="Show",Q690="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 334
  Formula: `['OR(Q688="Show",Q688="Hide")']`
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

**Rule 421** — Range: `<ConditionalFormatting D688:N688>`

- Type: `expression`
  Priority: 339
  Formula: `['OR(D688="Show",D688="Hide")']`
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

**Rule 422** — Range: `<ConditionalFormatting D689:N689>`

- Type: `expression`
  Priority: 338
  Formula: `['OR(D688="Show",D688="Hide")']`
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

**Rule 423** — Range: `<ConditionalFormatting Q688:Z688>`

- Type: `expression`
  Priority: 336
  Formula: `['OR(Q688="Show",Q688="Hide")']`
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

**Rule 424** — Range: `<ConditionalFormatting Q689:Z689>`

- Type: `expression`
  Priority: 335
  Formula: `['OR(Q688="Show",Q688="Hide")']`
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

**Rule 425** — Range: `<ConditionalFormatting D711:N711>`

- Type: `expression`
  Priority: 333
  Formula: `['AND(D709="Show",D711="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 426** — Range: `<ConditionalFormatting Q711:Z711>`

- Type: `expression`
  Priority: 332
  Formula: `['AND(Q709="Show",Q711="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 427** — Range: `<ConditionalFormatting D708:N708 Q708:Z708>`

- Type: `cellIs`
  Priority: 326
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
  Priority: 328
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
  Priority: 330
  Formula: `['LEN(TRIM(D708))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 428** — Range: `<ConditionalFormatting D710:N710>`

- Type: `expression`
  Priority: 329
  Formula: `['AND(D708="Show",D710="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 323
  Formula: `['OR(D708="Show",D708="Hide")']`
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

**Rule 429** — Range: `<ConditionalFormatting Q710:Z710>`

- Type: `expression`
  Priority: 327
  Formula: `['AND(Q708="Show",Q710="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 320
  Formula: `['OR(Q708="Show",Q708="Hide")']`
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

**Rule 430** — Range: `<ConditionalFormatting D708:N708>`

- Type: `expression`
  Priority: 325
  Formula: `['OR(D708="Show",D708="Hide")']`
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

**Rule 431** — Range: `<ConditionalFormatting D709:N709>`

- Type: `expression`
  Priority: 324
  Formula: `['OR(D708="Show",D708="Hide")']`
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

**Rule 432** — Range: `<ConditionalFormatting Q708:Z708>`

- Type: `expression`
  Priority: 322
  Formula: `['OR(Q708="Show",Q708="Hide")']`
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

**Rule 433** — Range: `<ConditionalFormatting Q709:Z709>`

- Type: `expression`
  Priority: 321
  Formula: `['OR(Q708="Show",Q708="Hide")']`
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

**Rule 434** — Range: `<ConditionalFormatting D729:N729>`

- Type: `expression`
  Priority: 319
  Formula: `['AND(D727="Show",D729="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 435** — Range: `<ConditionalFormatting Q729:Z729>`

- Type: `expression`
  Priority: 318
  Formula: `['AND(Q727="Show",Q729="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 436** — Range: `<ConditionalFormatting D726:N726 Q726:Z726>`

- Type: `cellIs`
  Priority: 312
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
  Priority: 314
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
  Priority: 316
  Formula: `['LEN(TRIM(D726))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 437** — Range: `<ConditionalFormatting D728:N728>`

- Type: `expression`
  Priority: 315
  Formula: `['AND(D726="Show",D728="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 309
  Formula: `['OR(D726="Show",D726="Hide")']`
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

**Rule 438** — Range: `<ConditionalFormatting Q728:Z728>`

- Type: `expression`
  Priority: 313
  Formula: `['AND(Q726="Show",Q728="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 306
  Formula: `['OR(Q726="Show",Q726="Hide")']`
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

**Rule 439** — Range: `<ConditionalFormatting D726:N726>`

- Type: `expression`
  Priority: 311
  Formula: `['OR(D726="Show",D726="Hide")']`
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

**Rule 440** — Range: `<ConditionalFormatting D727:N727>`

- Type: `expression`
  Priority: 310
  Formula: `['OR(D726="Show",D726="Hide")']`
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

**Rule 441** — Range: `<ConditionalFormatting Q726:Z726>`

- Type: `expression`
  Priority: 308
  Formula: `['OR(Q726="Show",Q726="Hide")']`
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

**Rule 442** — Range: `<ConditionalFormatting Q727:Z727>`

- Type: `expression`
  Priority: 307
  Formula: `['OR(Q726="Show",Q726="Hide")']`
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

**Rule 443** — Range: `<ConditionalFormatting Y671>`

- Type: `containsBlanks`
  Priority: 304
  Formula: `['LEN(TRIM(Y671))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 444** — Range: `<ConditionalFormatting I735:I736>`

- Type: `containsBlanks`
  Priority: 303
  Formula: `['LEN(TRIM(I735))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 445** — Range: `<ConditionalFormatting E740:Z741>`

- Type: `containsBlanks`
  Priority: 300
  Formula: `['LEN(TRIM(E740))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 446** — Range: `<ConditionalFormatting B740:B741>`

- Type: `containsBlanks`
  Priority: 299
  Formula: `['LEN(TRIM(B740))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 447** — Range: `<ConditionalFormatting B757:B761>`

- Type: `containsBlanks`
  Priority: 298
  Formula: `['LEN(TRIM(B757))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 448** — Range: `<ConditionalFormatting B777:B778>`

- Type: `containsBlanks`
  Priority: 297
  Formula: `['LEN(TRIM(B777))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 449** — Range: `<ConditionalFormatting E743:Z745>`

- Type: `containsBlanks`
  Priority: 296
  Formula: `['LEN(TRIM(E743))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 450** — Range: `<ConditionalFormatting B743:B745>`

- Type: `containsBlanks`
  Priority: 295
  Formula: `['LEN(TRIM(B743))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 451** — Range: `<ConditionalFormatting E757:Z761>`

- Type: `containsBlanks`
  Priority: 294
  Formula: `['LEN(TRIM(E757))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 452** — Range: `<ConditionalFormatting E763:Z765>`

- Type: `containsBlanks`
  Priority: 292
  Formula: `['LEN(TRIM(E763))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 453** — Range: `<ConditionalFormatting B763:B765>`

- Type: `containsBlanks`
  Priority: 291
  Formula: `['LEN(TRIM(B763))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 454** — Range: `<ConditionalFormatting E777:Z778>`

- Type: `containsBlanks`
  Priority: 290
  Formula: `['LEN(TRIM(E777))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 455** — Range: `<ConditionalFormatting E780:Z782 R783>`

- Type: `containsBlanks`
  Priority: 289
  Formula: `['LEN(TRIM(E780))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 456** — Range: `<ConditionalFormatting B780:B783>`

- Type: `containsBlanks`
  Priority: 288
  Formula: `['LEN(TRIM(B780))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 457** — Range: `<ConditionalFormatting D752:N752>`

- Type: `expression`
  Priority: 287
  Formula: `['AND(D750="Show",D752="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 458** — Range: `<ConditionalFormatting Q752:Z752>`

- Type: `expression`
  Priority: 286
  Formula: `['AND(Q750="Show",Q752="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 459** — Range: `<ConditionalFormatting D749:N749 Q749:Z749>`

- Type: `cellIs`
  Priority: 280
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
  Priority: 282
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
  Priority: 284
  Formula: `['LEN(TRIM(D749))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 460** — Range: `<ConditionalFormatting D751:N751>`

- Type: `expression`
  Priority: 283
  Formula: `['AND(D749="Show",D751="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 277
  Formula: `['OR(D749="Show",D749="Hide")']`
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

**Rule 461** — Range: `<ConditionalFormatting Q751:Z751>`

- Type: `expression`
  Priority: 281
  Formula: `['AND(Q749="Show",Q751="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 274
  Formula: `['OR(Q749="Show",Q749="Hide")']`
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

**Rule 462** — Range: `<ConditionalFormatting D749:N749>`

- Type: `expression`
  Priority: 279
  Formula: `['OR(D749="Show",D749="Hide")']`
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

**Rule 463** — Range: `<ConditionalFormatting D750:N750>`

- Type: `expression`
  Priority: 278
  Formula: `['OR(D749="Show",D749="Hide")']`
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

**Rule 464** — Range: `<ConditionalFormatting Q749:Z749>`

- Type: `expression`
  Priority: 276
  Formula: `['OR(Q749="Show",Q749="Hide")']`
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

**Rule 465** — Range: `<ConditionalFormatting Q750:Z750>`

- Type: `expression`
  Priority: 275
  Formula: `['OR(Q749="Show",Q749="Hide")']`
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

**Rule 466** — Range: `<ConditionalFormatting D772:N772>`

- Type: `expression`
  Priority: 273
  Formula: `['AND(D770="Show",D772="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 467** — Range: `<ConditionalFormatting Q772:Z772>`

- Type: `expression`
  Priority: 272
  Formula: `['AND(Q770="Show",Q772="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 468** — Range: `<ConditionalFormatting D769:N769 Q769:Z769>`

- Type: `cellIs`
  Priority: 266
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
  Priority: 268
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
  Priority: 270
  Formula: `['LEN(TRIM(D769))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 469** — Range: `<ConditionalFormatting D771:N771>`

- Type: `expression`
  Priority: 269
  Formula: `['AND(D769="Show",D771="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 263
  Formula: `['OR(D769="Show",D769="Hide")']`
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

**Rule 470** — Range: `<ConditionalFormatting Q771:Z771>`

- Type: `expression`
  Priority: 267
  Formula: `['AND(Q769="Show",Q771="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 260
  Formula: `['OR(Q769="Show",Q769="Hide")']`
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

**Rule 471** — Range: `<ConditionalFormatting D769:N769>`

- Type: `expression`
  Priority: 265
  Formula: `['OR(D769="Show",D769="Hide")']`
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

**Rule 472** — Range: `<ConditionalFormatting D770:N770>`

- Type: `expression`
  Priority: 264
  Formula: `['OR(D769="Show",D769="Hide")']`
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

**Rule 473** — Range: `<ConditionalFormatting Q769:Z769>`

- Type: `expression`
  Priority: 262
  Formula: `['OR(Q769="Show",Q769="Hide")']`
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

**Rule 474** — Range: `<ConditionalFormatting Q770:Z770>`

- Type: `expression`
  Priority: 261
  Formula: `['OR(Q769="Show",Q769="Hide")']`
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

**Rule 475** — Range: `<ConditionalFormatting D790:N790>`

- Type: `expression`
  Priority: 259
  Formula: `['AND(D788="Show",D790="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 476** — Range: `<ConditionalFormatting Q790:Z790>`

- Type: `expression`
  Priority: 258
  Formula: `['AND(Q788="Show",Q790="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 477** — Range: `<ConditionalFormatting D787:N787 Q787:Z787>`

- Type: `cellIs`
  Priority: 252
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
  Priority: 254
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
  Priority: 256
  Formula: `['LEN(TRIM(D787))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 478** — Range: `<ConditionalFormatting D789:N789>`

- Type: `expression`
  Priority: 255
  Formula: `['AND(D787="Show",D789="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 249
  Formula: `['OR(D787="Show",D787="Hide")']`
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

**Rule 479** — Range: `<ConditionalFormatting Q789:Z789>`

- Type: `expression`
  Priority: 253
  Formula: `['AND(Q787="Show",Q789="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 246
  Formula: `['OR(Q787="Show",Q787="Hide")']`
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

**Rule 480** — Range: `<ConditionalFormatting D787:N787>`

- Type: `expression`
  Priority: 251
  Formula: `['OR(D787="Show",D787="Hide")']`
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

**Rule 481** — Range: `<ConditionalFormatting D788:N788>`

- Type: `expression`
  Priority: 250
  Formula: `['OR(D787="Show",D787="Hide")']`
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

**Rule 482** — Range: `<ConditionalFormatting Q787:Z787>`

- Type: `expression`
  Priority: 248
  Formula: `['OR(Q787="Show",Q787="Hide")']`
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

**Rule 483** — Range: `<ConditionalFormatting Q788:Z788>`

- Type: `expression`
  Priority: 247
  Formula: `['OR(Q787="Show",Q787="Hide")']`
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

**Rule 484** — Range: `<ConditionalFormatting Y732>`

- Type: `containsBlanks`
  Priority: 244
  Formula: `['LEN(TRIM(Y732))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 485** — Range: `<ConditionalFormatting B176>`

- Type: `containsBlanks`
  Priority: 243
  Formula: `['LEN(TRIM(B176))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 486** — Range: `<ConditionalFormatting D250:D251>`

- Type: `containsBlanks`
  Priority: 238
  Formula: `['LEN(TRIM(D250))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 487** — Range: `<ConditionalFormatting B250>`

- Type: `containsBlanks`
  Priority: 237
  Formula: `['LEN(TRIM(B250))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 488** — Range: `<ConditionalFormatting B251>`

- Type: `containsBlanks`
  Priority: 236
  Formula: `['LEN(TRIM(B251))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 489** — Range: `<ConditionalFormatting D311:D312>`

- Type: `containsBlanks`
  Priority: 235
  Formula: `['LEN(TRIM(D311))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 490** — Range: `<ConditionalFormatting B311>`

- Type: `containsBlanks`
  Priority: 234
  Formula: `['LEN(TRIM(B311))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 491** — Range: `<ConditionalFormatting B312>`

- Type: `containsBlanks`
  Priority: 233
  Formula: `['LEN(TRIM(B312))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 492** — Range: `<ConditionalFormatting D372:D373>`

- Type: `containsBlanks`
  Priority: 232
  Formula: `['LEN(TRIM(D372))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 493** — Range: `<ConditionalFormatting B372>`

- Type: `containsBlanks`
  Priority: 231
  Formula: `['LEN(TRIM(B372))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 494** — Range: `<ConditionalFormatting B373>`

- Type: `containsBlanks`
  Priority: 230
  Formula: `['LEN(TRIM(B373))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 495** — Range: `<ConditionalFormatting D433:D434>`

- Type: `containsBlanks`
  Priority: 229
  Formula: `['LEN(TRIM(D433))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 496** — Range: `<ConditionalFormatting B433>`

- Type: `containsBlanks`
  Priority: 228
  Formula: `['LEN(TRIM(B433))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 497** — Range: `<ConditionalFormatting B434>`

- Type: `containsBlanks`
  Priority: 227
  Formula: `['LEN(TRIM(B434))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 498** — Range: `<ConditionalFormatting D494:D495>`

- Type: `containsBlanks`
  Priority: 226
  Formula: `['LEN(TRIM(D494))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 499** — Range: `<ConditionalFormatting B494>`

- Type: `containsBlanks`
  Priority: 225
  Formula: `['LEN(TRIM(B494))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 500** — Range: `<ConditionalFormatting B495>`

- Type: `containsBlanks`
  Priority: 224
  Formula: `['LEN(TRIM(B495))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 501** — Range: `<ConditionalFormatting D555:D556>`

- Type: `containsBlanks`
  Priority: 223
  Formula: `['LEN(TRIM(D555))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 502** — Range: `<ConditionalFormatting B555>`

- Type: `containsBlanks`
  Priority: 222
  Formula: `['LEN(TRIM(B555))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 503** — Range: `<ConditionalFormatting B556>`

- Type: `containsBlanks`
  Priority: 221
  Formula: `['LEN(TRIM(B556))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 504** — Range: `<ConditionalFormatting D616:D617>`

- Type: `containsBlanks`
  Priority: 220
  Formula: `['LEN(TRIM(D616))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 505** — Range: `<ConditionalFormatting B616>`

- Type: `containsBlanks`
  Priority: 219
  Formula: `['LEN(TRIM(B616))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 506** — Range: `<ConditionalFormatting B617>`

- Type: `containsBlanks`
  Priority: 218
  Formula: `['LEN(TRIM(B617))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 507** — Range: `<ConditionalFormatting D677:D678>`

- Type: `containsBlanks`
  Priority: 217
  Formula: `['LEN(TRIM(D677))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 508** — Range: `<ConditionalFormatting B677>`

- Type: `containsBlanks`
  Priority: 216
  Formula: `['LEN(TRIM(B677))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 509** — Range: `<ConditionalFormatting B678>`

- Type: `containsBlanks`
  Priority: 215
  Formula: `['LEN(TRIM(B678))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 510** — Range: `<ConditionalFormatting D738:D739>`

- Type: `containsBlanks`
  Priority: 214
  Formula: `['LEN(TRIM(D738))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 511** — Range: `<ConditionalFormatting B738>`

- Type: `containsBlanks`
  Priority: 213
  Formula: `['LEN(TRIM(B738))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 512** — Range: `<ConditionalFormatting B739>`

- Type: `containsBlanks`
  Priority: 212
  Formula: `['LEN(TRIM(B739))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 513** — Range: `<ConditionalFormatting D267:D268>`

- Type: `containsBlanks`
  Priority: 211
  Formula: `['LEN(TRIM(D267))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 514** — Range: `<ConditionalFormatting B267:B268>`

- Type: `containsBlanks`
  Priority: 210
  Formula: `['LEN(TRIM(B267))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 515** — Range: `<ConditionalFormatting D328:D329>`

- Type: `containsBlanks`
  Priority: 209
  Formula: `['LEN(TRIM(D328))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 516** — Range: `<ConditionalFormatting B328:B329>`

- Type: `containsBlanks`
  Priority: 208
  Formula: `['LEN(TRIM(B328))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 517** — Range: `<ConditionalFormatting D389:D390>`

- Type: `containsBlanks`
  Priority: 207
  Formula: `['LEN(TRIM(D389))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 518** — Range: `<ConditionalFormatting B389:B390>`

- Type: `containsBlanks`
  Priority: 206
  Formula: `['LEN(TRIM(B389))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 519** — Range: `<ConditionalFormatting D450:D451>`

- Type: `containsBlanks`
  Priority: 205
  Formula: `['LEN(TRIM(D450))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 520** — Range: `<ConditionalFormatting B450:B451>`

- Type: `containsBlanks`
  Priority: 204
  Formula: `['LEN(TRIM(B450))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 521** — Range: `<ConditionalFormatting D511:D512>`

- Type: `containsBlanks`
  Priority: 203
  Formula: `['LEN(TRIM(D511))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 522** — Range: `<ConditionalFormatting B511:B512>`

- Type: `containsBlanks`
  Priority: 202
  Formula: `['LEN(TRIM(B511))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 523** — Range: `<ConditionalFormatting D572:D573>`

- Type: `containsBlanks`
  Priority: 201
  Formula: `['LEN(TRIM(D572))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 524** — Range: `<ConditionalFormatting B572:B573>`

- Type: `containsBlanks`
  Priority: 200
  Formula: `['LEN(TRIM(B572))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 525** — Range: `<ConditionalFormatting D633:D634>`

- Type: `containsBlanks`
  Priority: 199
  Formula: `['LEN(TRIM(D633))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 526** — Range: `<ConditionalFormatting B633:B634>`

- Type: `containsBlanks`
  Priority: 198
  Formula: `['LEN(TRIM(B633))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 527** — Range: `<ConditionalFormatting D694:D695>`

- Type: `containsBlanks`
  Priority: 197
  Formula: `['LEN(TRIM(D694))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 528** — Range: `<ConditionalFormatting B694:B695>`

- Type: `containsBlanks`
  Priority: 196
  Formula: `['LEN(TRIM(B694))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 529** — Range: `<ConditionalFormatting D755:D756>`

- Type: `containsBlanks`
  Priority: 195
  Formula: `['LEN(TRIM(D755))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 530** — Range: `<ConditionalFormatting B755:B756>`

- Type: `containsBlanks`
  Priority: 194
  Formula: `['LEN(TRIM(B755))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 531** — Range: `<ConditionalFormatting D287:D288>`

- Type: `containsBlanks`
  Priority: 193
  Formula: `['LEN(TRIM(D287))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 532** — Range: `<ConditionalFormatting B287:B288>`

- Type: `containsBlanks`
  Priority: 192
  Formula: `['LEN(TRIM(B287))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 533** — Range: `<ConditionalFormatting D348:D349>`

- Type: `containsBlanks`
  Priority: 191
  Formula: `['LEN(TRIM(D348))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 534** — Range: `<ConditionalFormatting B348:B349>`

- Type: `containsBlanks`
  Priority: 190
  Formula: `['LEN(TRIM(B348))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 535** — Range: `<ConditionalFormatting D409:D410>`

- Type: `containsBlanks`
  Priority: 189
  Formula: `['LEN(TRIM(D409))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 536** — Range: `<ConditionalFormatting B409:B410>`

- Type: `containsBlanks`
  Priority: 188
  Formula: `['LEN(TRIM(B409))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 537** — Range: `<ConditionalFormatting D470:D471>`

- Type: `containsBlanks`
  Priority: 187
  Formula: `['LEN(TRIM(D470))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 538** — Range: `<ConditionalFormatting B470:B471>`

- Type: `containsBlanks`
  Priority: 186
  Formula: `['LEN(TRIM(B470))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 539** — Range: `<ConditionalFormatting D531:D532>`

- Type: `containsBlanks`
  Priority: 185
  Formula: `['LEN(TRIM(D531))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 540** — Range: `<ConditionalFormatting B531:B532>`

- Type: `containsBlanks`
  Priority: 184
  Formula: `['LEN(TRIM(B531))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 541** — Range: `<ConditionalFormatting D592:D593>`

- Type: `containsBlanks`
  Priority: 183
  Formula: `['LEN(TRIM(D592))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 542** — Range: `<ConditionalFormatting B592:B593>`

- Type: `containsBlanks`
  Priority: 182
  Formula: `['LEN(TRIM(B592))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 543** — Range: `<ConditionalFormatting D653:D654>`

- Type: `containsBlanks`
  Priority: 181
  Formula: `['LEN(TRIM(D653))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 544** — Range: `<ConditionalFormatting B653:B654>`

- Type: `containsBlanks`
  Priority: 180
  Formula: `['LEN(TRIM(B653))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 545** — Range: `<ConditionalFormatting D714:D715>`

- Type: `containsBlanks`
  Priority: 179
  Formula: `['LEN(TRIM(D714))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 546** — Range: `<ConditionalFormatting B714:B715>`

- Type: `containsBlanks`
  Priority: 178
  Formula: `['LEN(TRIM(B714))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 547** — Range: `<ConditionalFormatting D775:D776>`

- Type: `containsBlanks`
  Priority: 177
  Formula: `['LEN(TRIM(D775))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 548** — Range: `<ConditionalFormatting B775:B776>`

- Type: `containsBlanks`
  Priority: 176
  Formula: `['LEN(TRIM(B775))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 549** — Range: `<ConditionalFormatting B46 B48:B62>`

- Type: `containsBlanks`
  Priority: 174
  Formula: `['LEN(TRIM(B46))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 550** — Range: `<ConditionalFormatting B48:B62>`

- Type: `expression`
  Priority: 173
  Formula: `['B48=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 551** — Range: `<ConditionalFormatting B77>`

- Type: `containsBlanks`
  Priority: 168
  Formula: `['LEN(TRIM(B77))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 552** — Range: `<ConditionalFormatting B84>`

- Type: `containsBlanks`
  Priority: 167
  Formula: `['LEN(TRIM(B84))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 553** — Range: `<ConditionalFormatting B98>`

- Type: `containsBlanks`
  Priority: 166
  Formula: `['LEN(TRIM(B98))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 554** — Range: `<ConditionalFormatting B105>`

- Type: `containsBlanks`
  Priority: 165
  Formula: `['LEN(TRIM(B105))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 555** — Range: `<ConditionalFormatting B112>`

- Type: `containsBlanks`
  Priority: 164
  Formula: `['LEN(TRIM(B112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 556** — Range: `<ConditionalFormatting B186>`

- Type: `containsBlanks`
  Priority: 163
  Formula: `['LEN(TRIM(B186))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 557** — Range: `<ConditionalFormatting B206>`

- Type: `containsBlanks`
  Priority: 162
  Formula: `['LEN(TRIM(B206))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 558** — Range: `<ConditionalFormatting B224>`

- Type: `containsBlanks`
  Priority: 161
  Formula: `['LEN(TRIM(B224))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 559** — Range: `<ConditionalFormatting B261>`

- Type: `containsBlanks`
  Priority: 160
  Formula: `['LEN(TRIM(B261))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 560** — Range: `<ConditionalFormatting B281>`

- Type: `containsBlanks`
  Priority: 159
  Formula: `['LEN(TRIM(B281))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 561** — Range: `<ConditionalFormatting B299>`

- Type: `containsBlanks`
  Priority: 158
  Formula: `['LEN(TRIM(B299))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 562** — Range: `<ConditionalFormatting B322>`

- Type: `containsBlanks`
  Priority: 157
  Formula: `['LEN(TRIM(B322))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 563** — Range: `<ConditionalFormatting B342>`

- Type: `containsBlanks`
  Priority: 156
  Formula: `['LEN(TRIM(B342))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 564** — Range: `<ConditionalFormatting B360>`

- Type: `containsBlanks`
  Priority: 155
  Formula: `['LEN(TRIM(B360))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 565** — Range: `<ConditionalFormatting B383>`

- Type: `containsBlanks`
  Priority: 154
  Formula: `['LEN(TRIM(B383))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 566** — Range: `<ConditionalFormatting B403>`

- Type: `containsBlanks`
  Priority: 153
  Formula: `['LEN(TRIM(B403))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 567** — Range: `<ConditionalFormatting B421>`

- Type: `containsBlanks`
  Priority: 152
  Formula: `['LEN(TRIM(B421))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 568** — Range: `<ConditionalFormatting B444>`

- Type: `containsBlanks`
  Priority: 151
  Formula: `['LEN(TRIM(B444))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 569** — Range: `<ConditionalFormatting B464>`

- Type: `containsBlanks`
  Priority: 150
  Formula: `['LEN(TRIM(B464))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 570** — Range: `<ConditionalFormatting B482>`

- Type: `containsBlanks`
  Priority: 149
  Formula: `['LEN(TRIM(B482))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 571** — Range: `<ConditionalFormatting B505>`

- Type: `containsBlanks`
  Priority: 148
  Formula: `['LEN(TRIM(B505))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 572** — Range: `<ConditionalFormatting B525>`

- Type: `containsBlanks`
  Priority: 147
  Formula: `['LEN(TRIM(B525))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 573** — Range: `<ConditionalFormatting B543>`

- Type: `containsBlanks`
  Priority: 146
  Formula: `['LEN(TRIM(B543))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 574** — Range: `<ConditionalFormatting B566>`

- Type: `containsBlanks`
  Priority: 145
  Formula: `['LEN(TRIM(B566))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 575** — Range: `<ConditionalFormatting B586>`

- Type: `containsBlanks`
  Priority: 144
  Formula: `['LEN(TRIM(B586))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 576** — Range: `<ConditionalFormatting B604>`

- Type: `containsBlanks`
  Priority: 143
  Formula: `['LEN(TRIM(B604))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 577** — Range: `<ConditionalFormatting B627>`

- Type: `containsBlanks`
  Priority: 142
  Formula: `['LEN(TRIM(B627))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 578** — Range: `<ConditionalFormatting B647>`

- Type: `containsBlanks`
  Priority: 141
  Formula: `['LEN(TRIM(B647))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 579** — Range: `<ConditionalFormatting B665>`

- Type: `containsBlanks`
  Priority: 140
  Formula: `['LEN(TRIM(B665))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 580** — Range: `<ConditionalFormatting B688>`

- Type: `containsBlanks`
  Priority: 139
  Formula: `['LEN(TRIM(B688))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 581** — Range: `<ConditionalFormatting B708>`

- Type: `containsBlanks`
  Priority: 138
  Formula: `['LEN(TRIM(B708))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 582** — Range: `<ConditionalFormatting B726>`

- Type: `containsBlanks`
  Priority: 137
  Formula: `['LEN(TRIM(B726))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 583** — Range: `<ConditionalFormatting B749>`

- Type: `containsBlanks`
  Priority: 136
  Formula: `['LEN(TRIM(B749))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 584** — Range: `<ConditionalFormatting B769>`

- Type: `containsBlanks`
  Priority: 135
  Formula: `['LEN(TRIM(B769))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 585** — Range: `<ConditionalFormatting B787>`

- Type: `containsBlanks`
  Priority: 134
  Formula: `['LEN(TRIM(B787))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 586** — Range: `<ConditionalFormatting B64:B66>`

- Type: `containsBlanks`
  Priority: 128
  Formula: `['LEN(TRIM(B64))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 127
  Formula: `['B64=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 587** — Range: `<ConditionalFormatting B121>`

- Type: `containsBlanks`
  Priority: 126
  Formula: `['LEN(TRIM(B121))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 588** — Range: `<ConditionalFormatting B122 B150:B155>`

- Type: `containsBlanks`
  Priority: 125
  Formula: `['LEN(TRIM(B122))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 589** — Range: `<ConditionalFormatting E151:F151>`

- Type: `containsBlanks`
  Priority: 124
  Formula: `['LEN(TRIM(E151))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 590** — Range: `<ConditionalFormatting E152:F155>`

- Type: `containsBlanks`
  Priority: 123
  Formula: `['LEN(TRIM(E152))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 591** — Range: `<ConditionalFormatting B123:B127>`

- Type: `containsBlanks`
  Priority: 122
  Formula: `['LEN(TRIM(B123))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 592** — Range: `<ConditionalFormatting E125:Z127>`

- Type: `containsBlanks`
  Priority: 121
  Formula: `['LEN(TRIM(E125))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 593** — Range: `<ConditionalFormatting B125:B127>`

- Type: `containsBlanks`
  Priority: 120
  Formula: `['LEN(TRIM(B125))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 594** — Range: `<ConditionalFormatting D134:N134>`

- Type: `expression`
  Priority: 119
  Formula: `['AND(D132="Show",D134="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 595** — Range: `<ConditionalFormatting Q134:Z134>`

- Type: `expression`
  Priority: 118
  Formula: `['AND(Q132="Show",Q134="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 596** — Range: `<ConditionalFormatting D131:N131 Q131:Z131>`

- Type: `cellIs`
  Priority: 113
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
  Priority: 115
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
  Priority: 117
  Formula: `['LEN(TRIM(D131))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 597** — Range: `<ConditionalFormatting D133:N133>`

- Type: `expression`
  Priority: 116
  Formula: `['AND(D131="Show",D133="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 110
  Formula: `['OR(D131="Show",D131="Hide")']`
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

**Rule 598** — Range: `<ConditionalFormatting Q133:Z133>`

- Type: `expression`
  Priority: 114
  Formula: `['AND(Q131="Show",Q133="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 107
  Formula: `['OR(Q131="Show",Q131="Hide")']`
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

**Rule 599** — Range: `<ConditionalFormatting D131:N131>`

- Type: `expression`
  Priority: 112
  Formula: `['OR(D131="Show",D131="Hide")']`
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

**Rule 600** — Range: `<ConditionalFormatting D132:N132>`

- Type: `expression`
  Priority: 111
  Formula: `['OR(D131="Show",D131="Hide")']`
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

**Rule 601** — Range: `<ConditionalFormatting Q131:Z131>`

- Type: `expression`
  Priority: 109
  Formula: `['OR(Q131="Show",Q131="Hide")']`
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

**Rule 602** — Range: `<ConditionalFormatting Q132:Z132>`

- Type: `expression`
  Priority: 108
  Formula: `['OR(Q131="Show",Q131="Hide")']`
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

**Rule 603** — Range: `<ConditionalFormatting D141:N141>`

- Type: `expression`
  Priority: 106
  Formula: `['AND(D139="Show",D141="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 604** — Range: `<ConditionalFormatting Q141:Z141>`

- Type: `expression`
  Priority: 105
  Formula: `['AND(Q139="Show",Q141="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 605** — Range: `<ConditionalFormatting D138:N138 Q138:Z138>`

- Type: `cellIs`
  Priority: 100
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
  Priority: 102
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
  Priority: 104
  Formula: `['LEN(TRIM(D138))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 606** — Range: `<ConditionalFormatting D140:N140>`

- Type: `expression`
  Priority: 103
  Formula: `['AND(D138="Show",D140="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 97
  Formula: `['OR(D138="Show",D138="Hide")']`
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

**Rule 607** — Range: `<ConditionalFormatting Q140:Z140>`

- Type: `expression`
  Priority: 101
  Formula: `['AND(Q138="Show",Q140="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 94
  Formula: `['OR(Q138="Show",Q138="Hide")']`
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

**Rule 608** — Range: `<ConditionalFormatting D138:N138>`

- Type: `expression`
  Priority: 99
  Formula: `['OR(D138="Show",D138="Hide")']`
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

**Rule 609** — Range: `<ConditionalFormatting D139:N139>`

- Type: `expression`
  Priority: 98
  Formula: `['OR(D138="Show",D138="Hide")']`
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

**Rule 610** — Range: `<ConditionalFormatting Q138:Z138>`

- Type: `expression`
  Priority: 96
  Formula: `['OR(Q138="Show",Q138="Hide")']`
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

**Rule 611** — Range: `<ConditionalFormatting Q139:Z139>`

- Type: `expression`
  Priority: 95
  Formula: `['OR(Q138="Show",Q138="Hide")']`
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

**Rule 612** — Range: `<ConditionalFormatting D148:N148>`

- Type: `expression`
  Priority: 93
  Formula: `['AND(D146="Show",D148="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 613** — Range: `<ConditionalFormatting Q148:Z148>`

- Type: `expression`
  Priority: 92
  Formula: `['AND(Q146="Show",Q148="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 614** — Range: `<ConditionalFormatting D145:N145 Q145:Z145>`

- Type: `cellIs`
  Priority: 87
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
  Priority: 89
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
  Priority: 91
  Formula: `['LEN(TRIM(D145))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 615** — Range: `<ConditionalFormatting D147:N147>`

- Type: `expression`
  Priority: 90
  Formula: `['AND(D145="Show",D147="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 84
  Formula: `['OR(D145="Show",D145="Hide")']`
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

**Rule 616** — Range: `<ConditionalFormatting Q147:Z147>`

- Type: `expression`
  Priority: 88
  Formula: `['AND(Q145="Show",Q147="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 81
  Formula: `['OR(Q145="Show",Q145="Hide")']`
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

**Rule 617** — Range: `<ConditionalFormatting D145:N145>`

- Type: `expression`
  Priority: 86
  Formula: `['OR(D145="Show",D145="Hide")']`
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

**Rule 618** — Range: `<ConditionalFormatting D146:N146>`

- Type: `expression`
  Priority: 85
  Formula: `['OR(D145="Show",D145="Hide")']`
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

**Rule 619** — Range: `<ConditionalFormatting Q145:Z145>`

- Type: `expression`
  Priority: 83
  Formula: `['OR(Q145="Show",Q145="Hide")']`
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

**Rule 620** — Range: `<ConditionalFormatting Q146:Z146>`

- Type: `expression`
  Priority: 82
  Formula: `['OR(Q145="Show",Q145="Hide")']`
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

**Rule 621** — Range: `<ConditionalFormatting B131>`

- Type: `containsBlanks`
  Priority: 80
  Formula: `['LEN(TRIM(B131))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 622** — Range: `<ConditionalFormatting B138>`

- Type: `containsBlanks`
  Priority: 79
  Formula: `['LEN(TRIM(B138))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 623** — Range: `<ConditionalFormatting B145>`

- Type: `containsBlanks`
  Priority: 78
  Formula: `['LEN(TRIM(B145))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 624** — Range: `<ConditionalFormatting B156:B162>`

- Type: `containsBlanks`
  Priority: 77
  Formula: `['LEN(TRIM(B156))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 625** — Range: `<ConditionalFormatting E160 F158 G157>`

- Type: `containsBlanks`
  Priority: 76
  Formula: `['LEN(TRIM(E157))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 626** — Range: `<ConditionalFormatting B266 B286>`

- Type: `containsBlanks`
  Priority: 75
  Formula: `['LEN(TRIM(B266))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 627** — Range: `<ConditionalFormatting B307:B310>`

- Type: `containsBlanks`
  Priority: 74
  Formula: `['LEN(TRIM(B307))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 628** — Range: `<ConditionalFormatting B327 B347>`

- Type: `containsBlanks`
  Priority: 73
  Formula: `['LEN(TRIM(B327))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 629** — Range: `<ConditionalFormatting B368:B371>`

- Type: `containsBlanks`
  Priority: 72
  Formula: `['LEN(TRIM(B368))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 630** — Range: `<ConditionalFormatting B388 B408>`

- Type: `containsBlanks`
  Priority: 71
  Formula: `['LEN(TRIM(B388))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 631** — Range: `<ConditionalFormatting B429:B432>`

- Type: `containsBlanks`
  Priority: 70
  Formula: `['LEN(TRIM(B429))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 632** — Range: `<ConditionalFormatting B449 B469>`

- Type: `containsBlanks`
  Priority: 69
  Formula: `['LEN(TRIM(B449))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 633** — Range: `<ConditionalFormatting B490:B493>`

- Type: `containsBlanks`
  Priority: 68
  Formula: `['LEN(TRIM(B490))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 634** — Range: `<ConditionalFormatting B510 B530>`

- Type: `containsBlanks`
  Priority: 67
  Formula: `['LEN(TRIM(B510))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 635** — Range: `<ConditionalFormatting B551:B554>`

- Type: `containsBlanks`
  Priority: 66
  Formula: `['LEN(TRIM(B551))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 636** — Range: `<ConditionalFormatting B571>`

- Type: `containsBlanks`
  Priority: 65
  Formula: `['LEN(TRIM(B571))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 637** — Range: `<ConditionalFormatting B591>`

- Type: `containsBlanks`
  Priority: 64
  Formula: `['LEN(TRIM(B591))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 638** — Range: `<ConditionalFormatting B612:B615>`

- Type: `containsBlanks`
  Priority: 63
  Formula: `['LEN(TRIM(B612))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 639** — Range: `<ConditionalFormatting B632 B652>`

- Type: `containsBlanks`
  Priority: 62
  Formula: `['LEN(TRIM(B632))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 640** — Range: `<ConditionalFormatting B673:B676>`

- Type: `containsBlanks`
  Priority: 61
  Formula: `['LEN(TRIM(B673))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 641** — Range: `<ConditionalFormatting B693 B713>`

- Type: `containsBlanks`
  Priority: 60
  Formula: `['LEN(TRIM(B693))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 642** — Range: `<ConditionalFormatting B734:B737>`

- Type: `containsBlanks`
  Priority: 59
  Formula: `['LEN(TRIM(B734))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 643** — Range: `<ConditionalFormatting B754 B774>`

- Type: `containsBlanks`
  Priority: 58
  Formula: `['LEN(TRIM(B754))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 644** — Range: `<ConditionalFormatting B883>`

- Type: `containsBlanks`
  Priority: 57
  Formula: `['LEN(TRIM(B883))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 645** — Range: `<ConditionalFormatting B24>`

- Type: `containsBlanks`
  Priority: 56
  Formula: `['LEN(TRIM(B24))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 646** — Range: `<ConditionalFormatting D24:N24 Q24:Z24>`

- Type: `cellIs`
  Priority: 51
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
  Priority: 53
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
  Priority: 55
  Formula: `['LEN(TRIM(D24))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 647** — Range: `<ConditionalFormatting D26:N27>`

- Type: `expression`
  Priority: 54
  Formula: `['AND(D24="Show",D26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 648** — Range: `<ConditionalFormatting Q26:Z27>`

- Type: `expression`
  Priority: 52
  Formula: `['AND(Q24="Show",Q26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 649** — Range: `<ConditionalFormatting D24:N24>`

- Type: `expression`
  Priority: 50
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

**Rule 650** — Range: `<ConditionalFormatting D25:N25>`

- Type: `expression`
  Priority: 49
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

**Rule 651** — Range: `<ConditionalFormatting D26:N26>`

- Type: `expression`
  Priority: 48
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

**Rule 652** — Range: `<ConditionalFormatting Q24:Z24>`

- Type: `expression`
  Priority: 47
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

**Rule 653** — Range: `<ConditionalFormatting Q25:Z25>`

- Type: `expression`
  Priority: 46
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

**Rule 654** — Range: `<ConditionalFormatting Q26:Z26>`

- Type: `expression`
  Priority: 45
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

**Rule 655** — Range: `<ConditionalFormatting D870>`

- Type: `containsBlanks`
  Priority: 44
  Formula: `['LEN(TRIM(D870))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 656** — Range: `<ConditionalFormatting B870>`

- Type: `containsBlanks`
  Priority: 43
  Formula: `['LEN(TRIM(B870))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 657** — Range: `<ConditionalFormatting D168:N168>`

- Type: `expression`
  Priority: 42
  Formula: `['AND(D166="Show",D168="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 658** — Range: `<ConditionalFormatting Q168:Z168>`

- Type: `expression`
  Priority: 41
  Formula: `['AND(Q166="Show",Q168="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 659** — Range: `<ConditionalFormatting D165:N165 Q165:Z165>`

- Type: `cellIs`
  Priority: 36
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
  Priority: 38
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
  Priority: 40
  Formula: `['LEN(TRIM(D165))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 660** — Range: `<ConditionalFormatting D167:N167>`

- Type: `expression`
  Priority: 39
  Formula: `['AND(D165="Show",D167="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 33
  Formula: `['OR(D165="Show",D165="Hide")']`
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

**Rule 661** — Range: `<ConditionalFormatting Q167:Z167>`

- Type: `expression`
  Priority: 37
  Formula: `['AND(Q165="Show",Q167="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 30
  Formula: `['OR(Q165="Show",Q165="Hide")']`
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

**Rule 662** — Range: `<ConditionalFormatting D165:N165>`

- Type: `expression`
  Priority: 35
  Formula: `['OR(D165="Show",D165="Hide")']`
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

**Rule 663** — Range: `<ConditionalFormatting D166:N166>`

- Type: `expression`
  Priority: 34
  Formula: `['OR(D165="Show",D165="Hide")']`
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

**Rule 664** — Range: `<ConditionalFormatting Q165:Z165>`

- Type: `expression`
  Priority: 32
  Formula: `['OR(Q165="Show",Q165="Hide")']`
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

**Rule 665** — Range: `<ConditionalFormatting Q166:Z166>`

- Type: `expression`
  Priority: 31
  Formula: `['OR(Q165="Show",Q165="Hide")']`
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

**Rule 666** — Range: `<ConditionalFormatting B165>`

- Type: `containsBlanks`
  Priority: 29
  Formula: `['LEN(TRIM(B165))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 667** — Range: `<ConditionalFormatting D234:N234>`

- Type: `expression`
  Priority: 28
  Formula: `['AND(D232="Show",D234="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 668** — Range: `<ConditionalFormatting Q234:Z234>`

- Type: `expression`
  Priority: 27
  Formula: `['AND(Q232="Show",Q234="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 669** — Range: `<ConditionalFormatting D231:N231 Q231:Z231>`

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
  Formula: `['LEN(TRIM(D231))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 670** — Range: `<ConditionalFormatting D233:N233>`

- Type: `expression`
  Priority: 25
  Formula: `['AND(D231="Show",D233="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 19
  Formula: `['OR(D231="Show",D231="Hide")']`
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

**Rule 671** — Range: `<ConditionalFormatting Q233:Z233>`

- Type: `expression`
  Priority: 23
  Formula: `['AND(Q231="Show",Q233="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 16
  Formula: `['OR(Q231="Show",Q231="Hide")']`
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

**Rule 672** — Range: `<ConditionalFormatting D231:N231>`

- Type: `expression`
  Priority: 21
  Formula: `['OR(D231="Show",D231="Hide")']`
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

**Rule 673** — Range: `<ConditionalFormatting D232:N232>`

- Type: `expression`
  Priority: 20
  Formula: `['OR(D231="Show",D231="Hide")']`
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

**Rule 674** — Range: `<ConditionalFormatting Q231:Z231>`

- Type: `expression`
  Priority: 18
  Formula: `['OR(Q231="Show",Q231="Hide")']`
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

**Rule 675** — Range: `<ConditionalFormatting Q232:Z232>`

- Type: `expression`
  Priority: 17
  Formula: `['OR(Q231="Show",Q231="Hide")']`
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

**Rule 676** — Range: `<ConditionalFormatting B231>`

- Type: `containsBlanks`
  Priority: 15
  Formula: `['LEN(TRIM(B231))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 677** — Range: `<ConditionalFormatting D241:N241>`

- Type: `expression`
  Priority: 14
  Formula: `['AND(D239="Show",D241="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 678** — Range: `<ConditionalFormatting Q241:Z241>`

- Type: `expression`
  Priority: 13
  Formula: `['AND(Q239="Show",Q241="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 679** — Range: `<ConditionalFormatting D238:N238 Q238:Z238>`

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
  Formula: `['LEN(TRIM(D238))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 680** — Range: `<ConditionalFormatting D240:N240>`

- Type: `expression`
  Priority: 11
  Formula: `['AND(D238="Show",D240="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 5
  Formula: `['OR(D238="Show",D238="Hide")']`
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

**Rule 681** — Range: `<ConditionalFormatting Q240:Z240>`

- Type: `expression`
  Priority: 9
  Formula: `['AND(Q238="Show",Q240="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 2
  Formula: `['OR(Q238="Show",Q238="Hide")']`
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

**Rule 682** — Range: `<ConditionalFormatting D238:N238>`

- Type: `expression`
  Priority: 7
  Formula: `['OR(D238="Show",D238="Hide")']`
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

**Rule 683** — Range: `<ConditionalFormatting D239:N239>`

- Type: `expression`
  Priority: 6
  Formula: `['OR(D238="Show",D238="Hide")']`
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

**Rule 684** — Range: `<ConditionalFormatting Q238:Z238>`

- Type: `expression`
  Priority: 4
  Formula: `['OR(Q238="Show",Q238="Hide")']`
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

**Rule 685** — Range: `<ConditionalFormatting Q239:Z239>`

- Type: `expression`
  Priority: 3
  Formula: `['OR(Q238="Show",Q238="Hide")']`
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

**Rule 686** — Range: `<ConditionalFormatting B238>`

- Type: `containsBlanks`
  Priority: 1
  Formula: `['LEN(TRIM(B238))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'


### Sheet: Costing (21 rules)

**Rule 1** — Range: `<ConditionalFormatting E1>`

- Type: `cellIs`
  Priority: 47
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
  Priority: 48
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

**Rule 3** — Range: `<ConditionalFormatting F27>`

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

**Rule 4** — Range: `<ConditionalFormatting F40>`

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

**Rule 5** — Range: `<ConditionalFormatting F56>`

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

**Rule 6** — Range: `<ConditionalFormatting F63>`

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

**Rule 7** — Range: `<ConditionalFormatting F69>`

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

**Rule 8** — Range: `<ConditionalFormatting F80>`

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

**Rule 9** — Range: `<ConditionalFormatting F102>`

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

**Rule 10** — Range: `<ConditionalFormatting F112>`

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

**Rule 11** — Range: `<ConditionalFormatting F118>`

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

**Rule 12** — Range: `<ConditionalFormatting F121>`

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

**Rule 13** — Range: `<ConditionalFormatting F26>`

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

**Rule 14** — Range: `<ConditionalFormatting F39>`

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

**Rule 15** — Range: `<ConditionalFormatting F55>`

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

**Rule 16** — Range: `<ConditionalFormatting F62>`

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

**Rule 17** — Range: `<ConditionalFormatting F68>`

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

**Rule 18** — Range: `<ConditionalFormatting F79>`

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

**Rule 19** — Range: `<ConditionalFormatting F101>`

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

**Rule 20** — Range: `<ConditionalFormatting F111>`

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

**Rule 21** — Range: `<ConditionalFormatting F117>`

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

**Rule 2** — Range: `<ConditionalFormatting D4:D13>`

- Type: `cellIs`
  Priority: 4
  Operator: equal
  Formula: `['"Yes"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bold=False

**Rule 3** — Range: `<ConditionalFormatting E4:E13>`

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

**Rule 4** — Range: `<ConditionalFormatting F4:F13>`

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

**Rule 1** — Range: `<ConditionalFormatting D11:D19>`

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

**Rule 2** — Range: `<ConditionalFormatting G11:G19>`

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

**Rule 3** — Range: `<ConditionalFormatting G21>`

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

### Sheet: Access Email Template

**Rows:** 25  |  **Cols:** 11

```
R1: [A1]=ACCESS PERMISSION EMAIL TEMPLATE
R2: [A1]=Email Subject Line:
R3: [A1]=RE: CREATION OF ACCESS POINTS FOR FURTHER INSPECTION
R5: [A1]=Email Content:
R6: [A1]=Dear property owner,
R8: [A1]=We have carried out a survey of your property (property details below) 
R10: [A1]=Site:
R11: [A1]==Costing!E8
R12: [A1]==Costing!E9
R13: [A1]==Costing!E10
R14: [A1]==Costing!E11
R16: [A1]=During the survey it was not possible for the surveyor to inspect the floor timbers in certain areas, this was due to lack of access because of overlays/stained polished floors/fitted carpets.
R17: [A1]=To complete the survey, permission is needed to access sub-floor voids etc. On completion of the inspection the access points will be closed up and made safe. All work will be carried out as carefully…
R18: [A1]=The cost of any re-fitting/repair/replacement will have to be bourn by yourself post completion of the required access work .
R19: [A1]=Acceptance and Permission to Proceed
R20: [A1]=By allowing a surveyor/ technician to open up access points as required, you will be confirming acceptance of the above consequences and agreeing not to hold the company responsible for the cost of an…
R21: [A1]=To confirm that you have read and understood the above and agree to allow a surveyor/ technician to open up access points as required please respond to this email granting permission. 
R23: [A1]=Kind Regards,
R24: [A1]=Tyne Tees Damp Proofing Ltd
R25: [A1]=0191 8141613 | [E5]=https://www.tyneteesdampproofing.co.uk/
```

### Sheet: Party Wall Letter

**Rows:** 33  |  **Cols:** 11

```
R1: [A1]=Party Wall Notification
R3: [A1]=Address:
R4: [A1]==Costing!E8
R5: [A1]==Costing!E9
R6: [A1]==Costing!E10
R7: [A1]==Costing!E11
R9: [A1]=Dear sir or madam,
R11: [A1]=We have identified an attack of Dry Rot to the adjoining property (listed above). This attack affects the party wall (the wall between your property and your neighbours). The fungi involved is Dry Rot…
R13: [A1]=It is therefore important that we treat the whole of the attack, at this stage we do not know if the attack is also in your property, this fungi will travel through brick walls, timber, across earth o…
R15: [A1]=You may have already seen signs of attack which you may not have recognised, these include spore deposits, these are rust/orange coloured dust appearing on floors, under skirtings. Smell of damp mushr…
R17: [A1]=We will be happy to inspect the relevant areas of your property so we can identify any visible signs of the fungal attack.
R19: [A1]=This will involve our surveyor lifting (if and where possible) floorboards to check beneath the floor and a quick look at the joinery timbers.
R21: [A1]=We realise this may be inconvenient, however we must stress that it is extremely important to stop any attack as early as possible. 
R23: [A1]=The inspection will not take long, we will tidy/make good as we go and afterwards you will probably not even be able to tell we have been.
R25: [A1]=Whilst our surveyor is in attendance he will be happy to check out any other concerns you may have, Damp, Woodworm, Basements, Condensation and Mould etc. Just ask.
R27: [A1]=Following the inspection we will (with your permission) send you a detailed written report of our findings.
R29: [A1]=Yours faithfully,
R30: [A1]=Mike Davison CSSW, M.Inst.SSE
R31: [A1]=Managing Director
R32: [A1]=Tyne Tees Damp Proofing Ltd
R33: [A1]=0191 8141613 | [E5]=https://www.tyneteesdampproofing.co.uk/
```

### Sheet: Sub Contractor Costs

**Rows:** 22  |  **Cols:** 8

```
R2: [B2]=Sub Contractor Costs
R3: [B2]=Project Details
R4: [B2]=Enquiry number | [D4]==Costing!E4
R5: [B2]=Client Name | [D4]==Costing!E7
R6: [B2]=First Line of site address | [D4]==Costing!E8
R7: [B2]=Town / City | [D4]==Costing!E9
R8: [B2]=County | [D4]==Costing!E10
R9: [B2]=Site Post Code | [D4]==Costing!E11
R10: [B2]=# | [C3]=Area of Works  | [D4]=Costs↵(Ex VAT) | [E5]=Assigned to / Comments: | [G7]=Total Projected Hours
R11: [B2]=1 | [C3]=='Customer Summary'!C4 | [D4]==Costing!V26+Costing!V39 | [G7]==Costing!O26+Costing!O39
R12: [B2]==B11+1 | [C3]=='Customer Summary'!C5 | [D4]==Costing!V55 | [G7]==Costing!O55
R13: [B2]==B12+1 | [C3]=='Customer Summary'!C6 | [D4]==Costing!V62 | [G7]==Costing!O62
R14: [B2]==B13+1 | [C3]=='Customer Summary'!C7 | [D4]==Costing!V68 | [G7]==Costing!O68
R15: [B2]==B14+1 | [C3]=='Customer Summary'!C8 | [D4]==Costing!V79-D16 | [G7]==Costing!O79-G16
R16: [B2]==B15+1 | [C3]=='Customer Summary'!C9 | [D4]==Costing!V73 | [G7]==Costing!O73
R17: [B2]==B16+1 | [C3]=='Customer Summary'!C10 | [D4]==Costing!V101 | [G7]==Costing!O101
R18: [B2]==B17+1 | [C3]=='Customer Summary'!C11 | [D4]==Costing!V111 | [G7]==Costing!O111
R19: [B2]==B18+1 | [C3]=='Customer Summary'!C12 | [D4]==Costing!V117 | [G7]==Costing!O117
R21: [C3]=Total | [D4]==SUM(D11:D20) | [G7]==SUM(G11:G20)
```

### Sheet: Sub Contractor Mats

**Rows:** 53  |  **Cols:** 9

```
R1: [B2]=Sub Contractor Materials
R3: [B2]=TBC
```

### Sheet: Filter-Check

**Rows:** 1  |  **Cols:** 2

```
R1: [A1]=This is used to check if a filter has changed on the report sheet for VBA to rehide rows | [B2]==Report!AI912
```

### Sheet: Cell References

**Rows:** 14  |  **Cols:** 6

```
R1: [A1]=Cell References for Room Sections for VBA Code
R5: [A1]=Room | [B2]=Visibilty Choice Cell (Full Reference) | [C3]=Visibilty Choice Cell ↵(Short Reference) | [D4]=Hide Row Start | [E5]=Hide Row End | [F6]=Cell Range for VBA
R6: [A1]=2 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x106897850> | [C3]==SUBSTITUTE(RIGHT(B6,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C6,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C6,"Y","")+61) | [F6]==CONCATENATE(D6,":",E6)
R7: [A1]==A6+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x119230410> | [C3]==SUBSTITUTE(RIGHT(B7,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C7,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C7,"Y","")+61) | [F6]==CONCATENATE(D7,":",E7)
R8: [A1]==A7+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x119230500> | [C3]==SUBSTITUTE(RIGHT(B8,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C8,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C8,"Y","")+61) | [F6]==CONCATENATE(D8,":",E8)
R9: [A1]==A8+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x118f9ba10> | [C3]==SUBSTITUTE(RIGHT(B9,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C9,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C9,"Y","")+61) | [F6]==CONCATENATE(D9,":",E9)
R10: [A1]==A9+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x118fa84b0> | [C3]==SUBSTITUTE(RIGHT(B10,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C10,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C10,"Y","")+61) | [F6]==CONCATENATE(D10,":",E10)
R11: [A1]==A10+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x105827790> | [C3]==SUBSTITUTE(RIGHT(B11,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C11,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C11,"Y","")+61) | [F6]==CONCATENATE(D11,":",E11)
R12: [A1]==A11+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x106d4d010> | [C3]==SUBSTITUTE(RIGHT(B12,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C12,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C12,"Y","")+61) | [F6]==CONCATENATE(D12,":",E12)
R13: [A1]==A12+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x106d4d190> | [C3]==SUBSTITUTE(RIGHT(B13,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C13,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C13,"Y","")+61) | [F6]==CONCATENATE(D13,":",E13)
R14: [A1]==A13+1 | [B2]=<openpyxl.worksheet.formula.ArrayFormula object at 0x106e7eba0> | [C3]==SUBSTITUTE(RIGHT(B14,6),"$","") | [D4]==CONCATENATE("Y",SUBSTITUTE(C14,"Y","")+1) | [E5]==CONCATENATE("Y",SUBSTITUTE(C14,"Y","")+60) | [F6]==CONCATENATE(D14,":",E14)
```

### Sheet: Changes

**Rows:** 25  |  **Cols:** 4

```
R1: [A1]=Date | [B2]=Version From | [C3]=Version To | [D4]=Change
R2: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Added stripping wall paper to costing.
R3: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Added Sub Contractor 'clarity' section on costing sheet - Vat registered and non vat registered
R4: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Changed the refitting of ancilliaries (refit sockets, radiator and skirting boards) to be costed in chunks of 3 hours (approx half day).  E.g. If the total calculated hours equaled 2 hours then this w…
R5: [A1]=2024-04-11 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Add VBA to updated the file name (date) on each click as the file names only changed on open so if clicking multiple times it was trying to save the same file again which is confusing)
R6: [A1]=2024-05-28 00:00:00 | [B2]=18 | [C3]=19 | [D4]=Added deposit value ex vat and inc vat for card readers.
R7: [A1]=2024-06-19 00:00:00 | [B2]=19 | [C3]=20 | [D4]=Costing: Added in percentage adjuster to sections.↵Costing: Added in questions and conditional logic for skirting boards refit.
R8: [A1]=2024-09-05 00:00:00 | [B2]=20 | [C3]=21 | [D4]=Removed the Office comments section at the bottom of the report as it is hiiden when the filter is applied so this is replaced with an 'Office Notes' tab.
R9: [A1]=2024-09-11 00:00:00 | [B2]=21 | [C3]=22 | [D4]=Added Sub Contractor Costs and Sub Contractor Mats Tabs
R10: [A1]=2024-09-30 00:00:00 | [B2]=22 | [C3]=23 | [D4]=Changed wording on Projects Specific Overheads to make it look more generic and to cover more areas and removed the vehicle costs statement.↵Added the On Site Approval Form Tab.
R11: [A1]=2024-10-01 00:00:00 | [B2]=23 | [C3]=24 | [D4]=Costing sheet - removed fogging under floor in Decking section to the Timber Treatments section.
R12: [A1]=2024-11-04 00:00:00 | [B2]=24 | [C3]=25 | [D4]=Updated material pricing on:↵Dubbing out coat, Renovating Plaster, EP40 Top Coat, EP40 Primer, Plasterboards, Isotherm rolls and adhesive.↵Updated hourly rate from £30.00 to £30.63 to cover the Employ…
R13: [A1]=2024-12-20 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Updated Contractor cost sheet with hours.↵Amalgamated the strip out costs to one line.↵Allowed the editing of the customer summary lines for the surveyors including being able to set something as opti…
R14: [A1]=2024-12-20 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Added extra line in on costing for CM3 20 metre rolls
R15: [A1]=2024-12-20 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Updated the wording etc on the 'Overheads' sections to only show as Lab and Mats and added the description field to the csv upload as the wording was being cut off in the title.
R16: [A1]=2025-01-17 00:00:00 | [B2]=26 | [C3]=27 | [D4]=Added the following note to the report: ↵Non-guaranteed work: The work in this quotation is carried out as per your instructions and not as per our recommendations, we have no way of knowing if the at…
R17: [A1]=2025-01-27 00:00:00 | [B2]=27 | [C3]=28 | [D4]=Added Estimate Coversheet Selections To Cost Sheet.↵Updated material pricing for HandyBoards and Multi Finish Plaster↵Re-named Warmline Thin Wall Insulation to Warmline Internal Wall Insulation as per…
R18: [A1]=2025-02-10 00:00:00 | [B2]=28 | [C3]=29 | [D4]=Added more coversheet images
R19: [A1]=2025-06-06 00:00:00 | [B2]=29 | [C3]=30 | [D4]=Project Specifics Overhead description amended on csv upload for change to CF estimate to make it clear that the overheads may contain all or some of the items mentioned.↵Added floor insulation line a…
R20: [A1]=2025-09-26 00:00:00 | [B2]=30 | [C3]=31 | [D4]=Added line in for Engineered flooring
R21: [A1]=2025-10-02 00:00:00 | [B2]=31 | [C3]=32 | [D4]="Fixed margin value column on csv import for beta estimates.↵Applied filter to costing sheet for the headers."
R22: [A1]=2025-11-13 00:00:00 | [B2]=32 | [C3]=33 | [D4]=Updated master password.
```
