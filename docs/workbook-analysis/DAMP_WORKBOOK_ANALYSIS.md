# DAMP Workbook — Forensic Analysis

**Source:** `Copy of Damp Costing v48 CF - 220126.xlsm`  
**Extracted:** 2026-02-18 00:38:38  
**Tool:** extract_workbook.py v1.0

---

## SECTION 1: WORKBOOK OVERVIEW

**File:** `Copy of Damp Costing v48 CF - 220126.xlsm`

**Extracted:** 2026-02-18T00:38:38.137652

**Survey Type:** DAMP

**Sheet Count:** 11


| # | Sheet Name | Rows | Cols | State |
|---|-----------|------|------|-------|
| 1 | Report | 544 | 35 | visible |
| 2 | Costing | 229 | 47 | visible |
| 3 | Customer Summary | 25 | 8 | visible |
| 4 | Office Notes | 1 | 9 | visible |
| 5 | CAF1 Form | 29 | 11 | visible |
| 6 | Access Email Template | 25 | 11 | visible |
| 7 | Sub Contractor Costs | 24 | 8 | visible |
| 8 | CF CSV Upload | 188 | 17 | visible |
| 9 | Material-List | 71 | 18 | visible |
| 10 | Data Lists | 131 | 2 | visible |
| 11 | Changes | 33 | 4 | visible |

## SECTION 2: REPORT SHEET — Complete Row-by-Row Map

**Total Rows:** 544  |  **Total Cols:** 35

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
R15: [A1]==IF(AG15=1,"X","") | [B2]=1 | [D4]=Weather Conditions | [AB28]=Will always show | [AD30]=Always show
R16: [A1]==IF(AG16=1,"X","") | [B2]=1 | [D4]=Date of Inspection: | [AB28]=← Enter date | [AD30]=Always show | [AF32]==IF(K16<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K16=""),1,0)
R17: [A1]==IF(AG17=1,"X","") | [B2]=1 | [D4]=The weather conditions were:  | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K17<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K17=""),1,0)
R18: [A1]==IF(AG18=1,"X","") | [B2]=1 | [D4]=The weather temperature was:  | [L12]=(°C). | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(K18<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,K18=""),1,0)
R19: [A1]==IF(AG19=1,"X","") | [B2]=1 | [D4]=The Property | [AB28]=Will always show | [AD30]=Always show
R20: [A1]==IF(AG20=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R21: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R22: [A1]==IF(AG22=1,"X","") | [B2]==IF(OR(D23="Show",Q23="Show"),1,0) | [AD30]=Always show
R23: [A1]==IF(AG23=1,"X","") | [B2]=0 | [D4]=Show | [Q17]=Show | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D23="Show",D23="",Q23="Show",Q23=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D23="",Q23="")),1,0)
R24: [A1]==IF(AG24=1,"X","") | [B2]==B22 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R25: [A1]==IF(AG25=1,"X","") | [B2]==B24 | [D4]=Front Elevation | [Q17]=Rear Elevation | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D23="Show",D23="",Q23="Show",Q23=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D23="Show",D25=""),AND(Q23="Show",Q25=""))),1,0)
R26: [A1]==IF(AG26=1,"X","") | [B2]==B25 | [AD30]=Always show
R27: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R28: [A1]==IF(AG28=1,"X","") | [B2]=1 | [D4]=The property is a: | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M28<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M28=""),1,0)
R29: [A1]==IF(AG29=1,"X","") | [B2]=1 | [D4]=The property is constructed of : | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M29<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M29=""),1,0)
R30: [A1]==IF(AG30=1,"X","") | [B2]=1 | [D4]=The property was built approximately : | [AB28]=← Enter Data Here | [AD30]=Always show | [AF32]==IF(M30<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,M30=""),1,0)
R31: [A1]==IF(AG31=1,"X","") | [B2]=1 | [D4]=The Survey/Specific Defects Inspection | [AB28]=Will always show | [AD30]=Always show
R32: [A1]==IF(AG32=1,"X","") | [B2]=1 | [D4]=In accordance with your instructions, we carried out a survey/specific defects inspection to the above property for the reported problem which was:   | [AB28]=Will always show | [AD30]=Always show
R33: [A1]==IF(AG33=1,"X","") | [B2]=1 | [D4]==IF(D35<>"",D35,IF([1]Details!$C$13=0,"",[1]Details!$C$13)) | [AB28]=Will always show (pre-populated) | [AD30]=Always show | [AF32]==IF(D33<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D33="",D33=0)),1,0)
R34: [A1]==IF(AG34=1,"X","") | [B2]=0 | [D4]=If the reported defect above, which pulls through from the master document, is no longer appropriate you can overwrite it by inputting a new one below otherwise leave it blank.   | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R35: [A1]==IF(AG35=1,"X","") | [B2]=0 | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R36: [A1]==IF(AG36=1,"X","") | [B2]=1 | [AD30]=Always show
R37: [A1]==IF(AG37=1,"X","") | [B2]=1 | [D4]=Our findings and proposals are set out below and should be read in conjunction with the enclosed document 'General Notes for clients and Health and Safety precautions'.  | [AB28]=Will always show | [AD30]=Always show
R38: [A1]==IF(AG38=1,"X","") | [B2]=1 | [D4]=Orientation | [AB28]=Will always show | [AD30]=Always show
R39: [A1]==IF(AG39=1,"X","") | [B2]=1 | [D4]=The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building. | [AB28]=Will always show | [AD30]=Always show
R40: [A1]==IF(AG40=1,"X","") | [B2]=1 | [D4]=The Scope | [AB28]=Will always show | [AD30]=Always show
R41: [A1]==IF(AG41=1,"X","") | [B2]=1 | [D4]=We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which… | [AB28]=Will always show | [AD30]=Always show
R42: [A1]==IF(AG42=1,"X","") | [B2]=1 | [D4]=Abbreviations Used In Report | [AB28]=Will always show | [AD30]=Always show
R43: [A1]==IF(AG43=1,"X","") | [B2]=1 | [D4]=DPC = Damp Proof Course, DPM = Damp proof membrane, USCC = Under separate contract and costs, ACM's = Asbestos containing materials, W/W = Water Weight. | [AB28]=Will always show | [AD30]=Always show
R44: [A1]==IF(AG44=1,"X","") | [B2]=1 | [D4]=EXTERNAL INSPECTION | [AB28]=Will always show | [AD30]=Always show
R45: [A1]==IF(AG45=1,"X","") | [B2]=1 | [D4]=Building Defects | [AB28]=Will always show | [AD30]=Always show
R46: [A1]==IF(AG46=1,"X","") | [D4]=No building defects were noted at the time of our inspection. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B46<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=""),1,0)
R47: [A1]==IF(AG47=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,1)) | [D4]=We noted the following building defects: | [AB28]=Will be visible based on above input. | [AD30]=Determined by surveyor | [AF32]==IF(B47<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B47=FALSE,B47="")),1,0)
R48: [A1]==IF(AG48=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective pointing to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B48<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B48=FALSE,B48="")),1,0)
R49: [A1]==IF(AG49=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective flashings to chimney stack | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B49<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B49=FALSE,B49="")),1,0)
R50: [A1]==IF(AG50=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective pointing to ridge tiles | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B50<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B50=FALSE,B50="")),1,0)
R51: [A1]==IF(AG51=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective pointing to verge | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B51<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B51=FALSE,B51="")),1,0)
R52: [A1]==IF(AG52=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective pointing to hips | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B52<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B52=FALSE,B52="")),1,0)
R53: [A1]==IF(AG53=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Slipped roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B53<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B53=FALSE,B53="")),1,0)
R54: [A1]==IF(AG54=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Loose roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B54<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B54=FALSE,B54="")),1,0)
R55: [A1]==IF(AG55=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Missing roof slates | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B55<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B55=FALSE,B55="")),1,0)
R56: [A1]==IF(AG56=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B56<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B56=FALSE,B56="")),1,0)
R57: [A1]==IF(AG57=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Blockage/vegetation to rainwater goods | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B57<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B57=FALSE,B57="")),1,0)
R58: [A1]==IF(AG58=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective pointing to external walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B58<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B58=FALSE,B58="")),1,0)
R59: [A1]==IF(AG59=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Perished external paintwork | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B59<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B59=FALSE,B59="")),1,0)
R60: [A1]==IF(AG60=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Wet rot noted to external joinery timbers | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B60<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B60=FALSE,B60="")),1,0)
R61: [A1]==IF(AG61=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Perished external brickwork | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B61<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B61=FALSE,B61="")),1,0)
R62: [A1]==IF(AG62=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Defective perimeter joint | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B62<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B62=FALSE,B62="")),1,0)
R63: [A1]==IF(AG63=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Cracks/movement to walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B63<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B63=FALSE,B63="")),1,0)
R64: [A1]==IF(AG64=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [E5]=Cracks/movement to lintels | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B64<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B64=FALSE,B64="")),1,0)
R65: [A1]==IF(AG65=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other not covered by above - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R66: [A1]==IF(AG66=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B66<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B66=FALSE,AND(B66=1,E66=""),AND(B66="",E66=""),AND(B66="",E66<>""),AND(B66=0,E66<>""))),1,0)
R67: [A1]==IF(AG67=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B67<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B67=FALSE,AND(B67=1,E67=""),AND(B67="",E67=""),AND(B67="",E67<>""),AND(B67=0,E67<>""))),1,0)
R68: [A1]==IF(AG68=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B68<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,$B$46=0,OR(B68=FALSE,AND(B68=1,E68=""),AND(B68="",E68=""),AND(B68="",E68<>""),AND(B68=0,E68<>""))),1,0)
R69: [A1]==IF(AG69=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R70: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R71: [A1]==IF(AG71=1,"X","") | [B2]==IF(OR(D72="Show",Q72="Show"),1,0) | [AD30]=Always show
R72: [A1]==IF(AG72=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D72="Show",D72="",Q72="Show",Q72=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D72="",Q72="")),1,0)
R73: [A1]==IF(AG73=1,"X","") | [B2]==B71 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R74: [A1]==IF(AG74=1,"X","") | [B2]==B73 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D72="Show",D72="",Q72="Show",Q72=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D72="Show",D74=""),AND(Q72="Show",Q74=""))),1,0)
R75: [A1]==IF(AG75=1,"X","") | [B2]==B74 | [AD30]=Always show
R76: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R77: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R78: [A1]==IF(AG78=1,"X","") | [B2]==IF(OR(D79="Show",Q79="Show"),1,0) | [AD30]=Always show
R79: [A1]==IF(AG79=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D79="Show",D79="",Q79="Show",Q79=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D79="",Q79="")),1,0)
R80: [A1]==IF(AG80=1,"X","") | [B2]==B78 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R81: [A1]==IF(AG81=1,"X","") | [B2]==B80 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D79="Show",D79="",Q79="Show",Q79=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D79="Show",D81=""),AND(Q79="Show",Q81=""))),1,0)
R82: [A1]==IF(AG82=1,"X","") | [B2]==B81 | [AD30]=Always show
R83: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R84: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R85: [A1]==IF(AG85=1,"X","") | [B2]==IF(OR(D86="Show",Q86="Show"),1,0) | [AD30]=Always show
R86: [A1]==IF(AG86=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D86="Show",D86="",Q86="Show",Q86=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D86="",Q86="")),1,0)
R87: [A1]==IF(AG87=1,"X","") | [B2]==B85 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R88: [A1]==IF(AG88=1,"X","") | [B2]==B87 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D86="Show",D86="",Q86="Show",Q86=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D86="Show",D88=""),AND(Q86="Show",Q88=""))),1,0)
R89: [A1]==IF(AG89=1,"X","") | [B2]==B88 | [AD30]=Always show
R90: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R91: [B2]=0 | [D4]=↓ Image Section 4 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R92: [A1]==IF(AG92=1,"X","") | [B2]==IF(OR(D93="Show",Q93="Show"),1,0) | [AD30]=Always show
R93: [A1]==IF(AG93=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D93="Show",D93="",Q93="Show",Q93=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D93="",Q93="")),1,0)
R94: [A1]==IF(AG94=1,"X","") | [B2]==B92 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R95: [A1]==IF(AG95=1,"X","") | [B2]==B94 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D93="Show",D93="",Q93="Show",Q93=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D93="Show",D95=""),AND(Q93="Show",Q95=""))),1,0)
R96: [A1]==IF(AG96=1,"X","") | [B2]==B95 | [AD30]=Always show
R97: [B2]=0 | [D4]=↑ Image Section 4 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R98: [B2]=0 | [D4]=↓ Image Section 5 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R99: [A1]==IF(AG99=1,"X","") | [B2]==IF(OR(D100="Show",Q100="Show"),1,0) | [AD30]=Always show
R100: [A1]==IF(AG100=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D100="Show",D100="",Q100="Show",Q100=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D100="",Q100="")),1,0)
R101: [A1]==IF(AG101=1,"X","") | [B2]==B99 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R102: [A1]==IF(AG102=1,"X","") | [B2]==B101 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D100="Show",D100="",Q100="Show",Q100=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D100="Show",D102=""),AND(Q100="Show",Q102=""))),1,0)
R103: [A1]==IF(AG103=1,"X","") | [B2]==B102 | [AD30]=Always show
R104: [B2]=0 | [D4]=↑ Image Section 5 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R105: [B2]=0 | [D4]=↓ Image Section 6 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R106: [A1]==IF(AG106=1,"X","") | [B2]==IF(OR(D107="Show",Q107="Show"),1,0) | [AD30]=Always show
R107: [A1]==IF(AG107=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D107="Show",D107="",Q107="Show",Q107=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D107="",Q107="")),1,0)
R108: [A1]==IF(AG108=1,"X","") | [B2]==B106 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R109: [A1]==IF(AG109=1,"X","") | [B2]==B108 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D107="Show",D107="",Q107="Show",Q107=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D107="Show",D109=""),AND(Q107="Show",Q109=""))),1,0)
R110: [A1]==IF(AG110=1,"X","") | [B2]==B109 | [AD30]=Always show
R111: [B2]=0 | [D4]=↑ Image Section 6 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R112: [A1]==IF(AG112=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, failure to corre… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B112<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B112=""),1,0)
R113: [A1]==IF(AG113=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B113<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B113=""),1,0)
R114: [A1]==IF(AG114=1,"X","") | [B2]==IF($B$46="","",IF($B$46=1,0,"")) | [D4]=You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repai… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B114<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B114=""),1,0)
R115: [A1]==IF(AG115=1,"X","") | [D4]=Wall Ties | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B115<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B115=""),1,0)
R116: [A1]==IF(AG116=1,"X","") | [B2]==IF($B$115="","",IF($B$115=0,0,"")) | [D4]=Our surveyor noted lateral cracks within the render/mortar beds, this is often a sign of decayed wall ties. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B116<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B116=""),1,0)
R117: [A1]==IF(AG117=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R118: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R119: [A1]==IF(AG119=1,"X","") | [B2]==IF(OR(D120="Show",Q120="Show"),1,0) | [AD30]=Always show
R120: [A1]==IF(AG120=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D120="Show",D120="",Q120="Show",Q120=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D120="",Q120="")),1,0)
R121: [A1]==IF(AG121=1,"X","") | [B2]==B119 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R122: [A1]==IF(AG122=1,"X","") | [B2]==B121 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D120="Show",D120="",Q120="Show",Q120=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D120="Show",D122=""),AND(Q120="Show",Q122=""))),1,0)
R123: [A1]==IF(AG123=1,"X","") | [B2]==B122 | [AD30]=Always show
R124: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R125: [A1]==IF(AG125=1,"X","") | [B2]==B116 | [D4]=Recommendation | [AB28]=Will be visible if issues detected. | [AD30]=Determined by surveyor
R126: [A1]==IF(AG126=1,"X","") | [B2]==IF($B$115="","",IF($B$115=0,0,"")) | [D4]=You should instruct our survey department to arrange a wall tie survey USCC. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B126<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B126=""),1,0)
R127: [A1]==IF(AG127=1,"X","") | [B2]==IF($B$115="","",IF($B$115=0,0,"")) | [D4]=We would suggest you arrange a wall tie inspection from a reputable specialist under separate contract and costs. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B127<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B127=""),1,0)
R128: [A1]==IF(AG128=1,"X","") | [B2]==IF($B$115="","",IF($B$115=0,0,"")) | [D4]=Cracking To Walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B128<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B128=""),1,0)
R129: [A1]==IF(AG129=1,"X","") | [B2]==IF($B$115="","",IF($B$115=0,0,"")) | [D4]=Our surveyor noted lateral/stepped cracks within the render/mortar beds, this is often a sign of movement within the structure of a building. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B129<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B129=""),1,0)
R130: [A1]==IF(AG130=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R131: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R132: [A1]==IF(AG132=1,"X","") | [B2]==IF(OR(D133="Show",Q133="Show"),1,0) | [AD30]=Always show
R133: [A1]==IF(AG133=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D133="Show",D133="",Q133="Show",Q133=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D133="",Q133="")),1,0)
R134: [A1]==IF(AG134=1,"X","") | [B2]==B132 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R135: [A1]==IF(AG135=1,"X","") | [B2]==B134 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D133="Show",D133="",Q133="Show",Q133=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D133="Show",D135=""),AND(Q133="Show",Q135=""))),1,0)
R136: [A1]==IF(AG136=1,"X","") | [B2]==B135 | [AD30]=Always show
R137: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R138: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R139: [A1]==IF(AG139=1,"X","") | [B2]==IF(OR(D140="Show",Q140="Show"),1,0) | [AD30]=Always show
R140: [A1]==IF(AG140=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D140="Show",D140="",Q140="Show",Q140=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D140="",Q140="")),1,0)
R141: [A1]==IF(AG141=1,"X","") | [B2]==B139 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R142: [A1]==IF(AG142=1,"X","") | [B2]==B141 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D140="Show",D140="",Q140="Show",Q140=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D140="Show",D142=""),AND(Q140="Show",Q142=""))),1,0)
R143: [A1]==IF(AG143=1,"X","") | [B2]==B142 | [AD30]=Always show
R144: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R145: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R146: [A1]==IF(AG146=1,"X","") | [B2]==IF(OR(D147="Show",Q147="Show"),1,0) | [AD30]=Always show
R147: [A1]==IF(AG147=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D147="Show",D147="",Q147="Show",Q147=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D147="",Q147="")),1,0)
R148: [A1]==IF(AG148=1,"X","") | [B2]==B146 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R149: [A1]==IF(AG149=1,"X","") | [B2]==B148 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D147="Show",D147="",Q147="Show",Q147=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D147="Show",D149=""),AND(Q147="Show",Q149=""))),1,0)
R150: [A1]==IF(AG150=1,"X","") | [B2]==B149 | [AD30]=Always show
R151: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R152: [A1]==IF(AG152=1,"X","") | [B2]==B129 | [D4]=Recommendation | [AB28]=Will be visible if issues detected. | [AD30]=Determined by surveyor
R153: [A1]==IF(AG153=1,"X","") | [D4]=You should instruct our survey department to arrange a structural repair survey USCC. | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(B153<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B153=""),1,0)
R154: [A1]==IF(AG154=1,"X","") | [D4]=The cracking is quite pronounced and we recommend you advise for a structural engineer to assess the integrity of the building, under separate contract and costs. | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(B154<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B154=""),1,0)
R155: [A1]==IF(AG155=1,"X","") | [D4]=External Ground Levels | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B155<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B155=""),1,0)
R156: [A1]==IF(AG156=1,"X","") | [D4]=There were no apparent ground level issues. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B156<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B156=""),1,0)
R157: [A1]==IF(AG157=1,"X","") | [B2]==IF($B$156="","",IF($B$156=1,0,"")) | [D4]=We noted high ground levels to the following areas: | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B157<>"",P157<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B157=1,P157=""),AND(B157="",P157=""),AND(B157="",P157<>""),AND(B157=0,P157<>""))),1,0)
R158: [A1]==IF(AG158=1,"X","") | [B2]==IF($B$156="","",IF($B$156=1,0,"")) | [D4]=External ground was falling towards building at: | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B158<>"",P158<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B158=1,P158=""),AND(B158="",P158=""),AND(B158="",P158<>""),AND(B158=0,P158<>""))),1,0)
R159: [A1]==IF(AG159=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R160: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R161: [A1]==IF(AG161=1,"X","") | [B2]==IF(OR(D162="Show",Q162="Show"),1,0) | [AD30]=Always show
R162: [A1]==IF(AG162=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D162="Show",D162="",Q162="Show",Q162=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D162="",Q162="")),1,0)
R163: [A1]==IF(AG163=1,"X","") | [B2]==B161 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R164: [A1]==IF(AG164=1,"X","") | [B2]==B163 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D162="Show",D162="",Q162="Show",Q162=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D162="Show",D164=""),AND(Q162="Show",Q164=""))),1,0)
R165: [A1]==IF(AG165=1,"X","") | [B2]==B164 | [AD30]=Always show
R166: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R167: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R168: [A1]==IF(AG168=1,"X","") | [B2]==IF(OR(D169="Show",Q169="Show"),1,0) | [AD30]=Always show
R169: [A1]==IF(AG169=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D169="Show",D169="",Q169="Show",Q169=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D169="",Q169="")),1,0)
R170: [A1]==IF(AG170=1,"X","") | [B2]==B168 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R171: [A1]==IF(AG171=1,"X","") | [B2]==B170 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D169="Show",D169="",Q169="Show",Q169=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D169="Show",D171=""),AND(Q169="Show",Q171=""))),1,0)
R172: [A1]==IF(AG172=1,"X","") | [B2]==B171 | [AD30]=Always show
R173: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R174: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R175: [A1]==IF(AG175=1,"X","") | [B2]==IF(OR(D176="Show",Q176="Show"),1,0) | [AD30]=Always show
R176: [A1]==IF(AG176=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D176="Show",D176="",Q176="Show",Q176=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D176="",Q176="")),1,0)
R177: [A1]==IF(AG177=1,"X","") | [B2]==B175 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R178: [A1]==IF(AG178=1,"X","") | [B2]==B177 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D176="Show",D176="",Q176="Show",Q176=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D176="Show",D178=""),AND(Q176="Show",Q178=""))),1,0)
R179: [A1]==IF(AG179=1,"X","") | [B2]==B178 | [AD30]=Always show
R180: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R181: [A1]==IF(AG181=1,"X","") | [B2]=1 | [D4]=Recommendation | [AB28]=Will always show | [AD30]=Always show
R182: [A1]==IF(AG182=1,"X","") | [B2]=1 | [D4]=All ground levels to be maintained at a minimum of 150mm below DPC level, paths, drives, yards etc should not cause rainwater etc to run against your property walls. You should  arrange work to correc… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B182<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B182=""),1,0)
R183: [A1]==IF(AG183=1,"X","") | [D4]=The following areas would benefit from the installation of an aco drain channel to carry water to the drain. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B183<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B183=""),1,0)
R184: [A1]==IF(AG184=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B184<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B183=1,SUM(B184:B186)=0),AND(B184=1,E184=""),AND(B184="",E184=""),AND(B184="",E184<>""),AND(B184=0,E184<>""))),1,0)
R185: [A1]==IF(AG185=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B185<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B183=1,SUM(B184:B186)=0),AND(B185=1,E185=""),AND(B185="",E185=""),AND(B185="",E185<>""),AND(B185=0,E185<>""))),1,0)
R186: [A1]==IF(AG186=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B186<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B183=1,SUM(B184:B186)=0),AND(B186=1,E186=""),AND(B186="",E186=""),AND(B186="",E186<>""),AND(B186=0,E186<>""))),1,0)
R187: [A1]==IF(AG187=1,"X","") | [D4]=Lower the ground levels to | [N14]=of the property to create sufficient clearance below the DPC. | [AB28]=← Enter Visibility & Area Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B187<>"",P187<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B187=1,I187=""),AND(B187="",I187=""),AND(B187="",I187<>""),AND(B187=0,I187<>""))),1,0)
R188: [A1]==IF(AG188=1,"X","") | [D4]=Form a french drain by installing gravel to promote breathing of the walls to reduce damp levels. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B188<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B188=""),1,0)
R189: [A1]==IF(AG189=1,"X","") | [D4]=Damp Proof Course | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B189<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B189=""),1,0)
R190: [A1]==IF(AG190=1,"X","") | [D4]=There is evidence of an original damp proof course in the mortar bed of the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B190<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B190=""),1,0)
R191: [A1]==IF(AG191=1,"X","") | [D4]=There is evidence of a chemical injection damp proof course to the property. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B191<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B191=""),1,0)
R192: [A1]==IF(AG192=1,"X","") | [D4]=The area where the damp proof course should be located, was not visible and we can neither confirm or deny the existence of a damp proof course installation. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B192<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B192=""),1,0)
R193: [A1]==IF(AG193=1,"X","") | [D4]=It is possible that work may have been carried out by another company in the past. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B193<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B193=""),1,0)
R194: [A1]==IF(AG194=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R195: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R196: [A1]==IF(AG196=1,"X","") | [B2]==IF(OR(D197="Show",Q197="Show"),1,0) | [AD30]=Always show
R197: [A1]==IF(AG197=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D197="Show",D197="",Q197="Show",Q197=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D197="",Q197="")),1,0)
R198: [A1]==IF(AG198=1,"X","") | [B2]==B196 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R199: [A1]==IF(AG199=1,"X","") | [B2]==B198 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D197="Show",D197="",Q197="Show",Q197=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D197="Show",D199=""),AND(Q197="Show",Q199=""))),1,0)
R200: [A1]==IF(AG200=1,"X","") | [B2]==B199 | [AD30]=Always show
R201: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R202: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R203: [A1]==IF(AG203=1,"X","") | [B2]==IF(OR(D204="Show",Q204="Show"),1,0) | [AD30]=Always show
R204: [A1]==IF(AG204=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D204="Show",D204="",Q204="Show",Q204=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D204="",Q204="")),1,0)
R205: [A1]==IF(AG205=1,"X","") | [B2]==B203 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R206: [A1]==IF(AG206=1,"X","") | [B2]==B205 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D204="Show",D204="",Q204="Show",Q204=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D204="Show",D206=""),AND(Q204="Show",Q206=""))),1,0)
R207: [A1]==IF(AG207=1,"X","") | [B2]==B206 | [AD30]=Always show
R208: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R209: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R210: [A1]==IF(AG210=1,"X","") | [B2]==IF(OR(D211="Show",Q211="Show"),1,0) | [AD30]=Always show
R211: [A1]==IF(AG211=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D211="Show",D211="",Q211="Show",Q211=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D211="",Q211="")),1,0)
R212: [A1]==IF(AG212=1,"X","") | [B2]==B210 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R213: [A1]==IF(AG213=1,"X","") | [B2]==B212 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D211="Show",D211="",Q211="Show",Q211=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D211="Show",D213=""),AND(Q211="Show",Q213=""))),1,0)
R214: [A1]==IF(AG214=1,"X","") | [B2]==B213 | [AD30]=Always show
R215: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R216: [A1]==IF(AG216=1,"X","") | [D4]=Recommendation | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B216<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B216=""),1,0)
R217: [A1]==IF(AG217=1,"X","") | [D4]=You should check if any guarantee exists and if the work now required is covered by that guarantee as any work carried out by ourselves may invalidate existing guarantees. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B217<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B217=""),1,0)
R218: [A1]==IF(AG218=1,"X","") | [D4]=Proposal | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B218<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B218=""),1,0)
R219: [A1]==IF(AG219=1,"X","") | [D4]=Install a low pressure injection damp proof course system, into the mortar courses of the walls as indicated on the attached sketch plan.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B219<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B219=""),1,0)
R220: [A1]==IF(AG220=1,"X","") | [D4]=Sub Floor Ventilation | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B220<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B220=""),1,0)
R221: [A1]==IF(AG221=1,"X","") | [D4]=There were no airbricks installed. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B221<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B221=""),1,0)
R222: [A1]==IF(AG222=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=It was not possible to inspect the airbricks due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B222<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B222=""),1,0)
R223: [A1]==IF(AG223=1,"X","") | [B2]=0 | [D4]=• | [E5]=State below - ensure that images are taken of the obstructions to be added to the report. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R224: [A1]==IF(AG224=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B224<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B224=1,E224=""),AND(B224="",E224=""),AND(B224="",E224<>""),AND(B224=0,E224<>""))),1,0)
R225: [A1]==IF(AG225=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B225<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B225=1,E225=""),AND(B225="",E225=""),AND(B225="",E225<>""),AND(B225=0,E225<>""))),1,0)
R226: [A1]==IF(AG226=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B226<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B226=1,E226=""),AND(B226="",E226=""),AND(B226="",E226<>""),AND(B226=0,E226<>""))),1,0)
R227: [A1]==IF(AG227=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R228: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R229: [A1]==IF(AG229=1,"X","") | [B2]==IF(OR(D230="Show",Q230="Show"),1,0) | [AD30]=Always show
R230: [A1]==IF(AG230=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D230="Show",D230="",Q230="Show",Q230=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D230="",Q230="")),1,0)
R231: [A1]==IF(AG231=1,"X","") | [B2]==B229 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R232: [A1]==IF(AG232=1,"X","") | [B2]==B231 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D230="Show",D230="",Q230="Show",Q230=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D230="Show",D232=""),AND(Q230="Show",Q232=""))),1,0)
R233: [A1]==IF(AG233=1,"X","") | [B2]==B232 | [AD30]=Always show
R234: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R235: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R236: [A1]==IF(AG236=1,"X","") | [B2]==IF(OR(D237="Show",Q237="Show"),1,0) | [AD30]=Always show
R237: [A1]==IF(AG237=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D237="Show",D237="",Q237="Show",Q237=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D237="",Q237="")),1,0)
R238: [A1]==IF(AG238=1,"X","") | [B2]==B236 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R239: [A1]==IF(AG239=1,"X","") | [B2]==B238 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D237="Show",D237="",Q237="Show",Q237=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D237="Show",D239=""),AND(Q237="Show",Q239=""))),1,0)
R240: [A1]==IF(AG240=1,"X","") | [B2]==B239 | [AD30]=Always show
R241: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R242: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R243: [A1]==IF(AG243=1,"X","") | [B2]==IF(OR(D244="Show",Q244="Show"),1,0) | [AD30]=Always show
R244: [A1]==IF(AG244=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D244="Show",D244="",Q244="Show",Q244=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D244="",Q244="")),1,0)
R245: [A1]==IF(AG245=1,"X","") | [B2]==B243 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R246: [A1]==IF(AG246=1,"X","") | [B2]==B245 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D244="Show",D244="",Q244="Show",Q244=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D244="Show",D246=""),AND(Q244="Show",Q246=""))),1,0)
R247: [A1]==IF(AG247=1,"X","") | [B2]==B246 | [AD30]=Always show
R248: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R249: [A1]==IF(AG249=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=The sub floor voids were ventilated by the following 'visible' number of airbricks: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B249<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B249=""),1,0)
R250: [A1]==IF(AG250=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [G7]=To the front elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B250<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B250=1,E250=""),AND(B250="",E250=""),AND(B250="",E250<>""),AND(B250=0,E250<>0))),1,0)
R251: [A1]==IF(AG251=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [G7]=To the left elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B251<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B251=1,E251=""),AND(B251="",E251=""),AND(B251="",E251<>""),AND(B251=0,E251<>0))),1,0)
R252: [A1]==IF(AG252=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [G7]=To the right elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B252<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B252=1,E252=""),AND(B252="",E252=""),AND(B252="",E252<>""),AND(B252=0,E252<>0))),1,0)
R253: [A1]==IF(AG253=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [G7]=To the rear elevations | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B253<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B253=1,E253=""),AND(B253="",E253=""),AND(B253="",E253<>""),AND(B253=0,E253<>0))),1,0)
R254: [A1]==IF(AG254=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [G7]=To the rear offshoot | [AB28]=← Enter number of air bricks. | [AD30]=Determined by surveyor | [AF32]==IF(B254<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B254=1,E254=""),AND(B254="",E254=""),AND(B254="",E254<>""),AND(B254=0,E254<>0))),1,0)
R255: [A1]==IF(AG255=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Sub floor timbers | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B255<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B255=""),1,0)
R256: [A1]==IF(AG256=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=It was not possible to inspect the sub floor moisture content due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B256<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B256=""),1,0)
R257: [A1]==IF(AG257=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Polished solid wood flooring | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B257<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B257=""),1,0)
R258: [A1]==IF(AG258=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Laminate, vinyl, Lino or cushion-floor overlay | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B258<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B258=""),1,0)
R259: [A1]==IF(AG259=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Carpets heavily tacked and in danger of tearing whilst lifting | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B259<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B259=""),1,0)
R260: [A1]==IF(AG260=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Ceramic tiling | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B260<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B260=""),1,0)
R261: [A1]==IF(AG261=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Furniture obstructing access | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B261<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B261=""),1,0)
R262: [A1]==IF(AG262=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R263: [A1]==IF(AG263=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B263<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B263=1,E263=""),AND(B263="",E263=""),AND(B263="",E263<>""),AND(B263=0,E263<>""))),1,0)
R264: [A1]==IF(AG264=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B264<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B264=1,E264=""),AND(B264="",E264=""),AND(B264="",E264<>""),AND(B264=0,E264<>""))),1,0)
R265: [A1]==IF(AG265=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B265<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B265=1,E265=""),AND(B265="",E265=""),AND(B265="",E265<>""),AND(B265=0,E265<>""))),1,0)
R266: [A1]==IF(AG266=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R267: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R268: [A1]==IF(AG268=1,"X","") | [B2]==IF(OR(D269="Show",Q269="Show"),1,0) | [AD30]=Always show
R269: [A1]==IF(AG269=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D269="Show",D269="",Q269="Show",Q269=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D269="",Q269="")),1,0)
R270: [A1]==IF(AG270=1,"X","") | [B2]==B268 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R271: [A1]==IF(AG271=1,"X","") | [B2]==B270 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D269="Show",D269="",Q269="Show",Q269=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D269="Show",D271=""),AND(Q269="Show",Q271=""))),1,0)
R272: [A1]==IF(AG272=1,"X","") | [B2]==B271 | [AD30]=Always show
R273: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R274: [A1]==IF(AG274=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=A check of the sub floor timbers revealed a W/W moisture content of   | [V22]=% W/W. | [AB28]=← Enter W/W Data Here | [AD30]=Determined by surveyor | [AF32]==IF(OR(B274<>"",P274<>""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B274=1,T274=""),AND(B274="",T274=""),AND(B274="",T274<>""),AND(B274=0,T274<>""))),1,0)
R275: [A1]==IF(AG275=1,"X","") | [B2]==IF(T274="",0,IF(T274<20,1,0)) | [D4]=It is our opinion that the above airbricks are providing sufficient airflow to the sub floor voids as the above reading is below 20% W/W. | [AB28]=Will be visible dependant on W/W % above. | [AD30]=Determined by surveyor
R276: [A1]==IF(AG276=1,"X","") | [B2]==IF(T274>=20,1,0) | [D4]=It is our opinion that the above airbricks do not provide sufficient airflow to the sub floor voids as this moisture reading is equal to or above 20% W/W. | [AB28]=Will be visible dependant on W/W % above. | [AD30]=Determined by surveyor
R277: [A1]==IF(AG277=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=During our inspection it was noted that some of the existing airbricks appeared to be blocked and may be providing insufficient airflow to the sub floor voids. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B277<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B277=""),1,0)
R278: [A1]==IF(AG278=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=During our inspection it was noted that some of the existing airbricks were installed too low to the external ground levels and may permit water ingress to the sub floor voids. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B278<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B278=""),1,0)
R279: [A1]==IF(AG279=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R280: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R281: [A1]==IF(AG281=1,"X","") | [B2]==IF(OR(D282="Show",Q282="Show"),1,0) | [AD30]=Always show
R282: [A1]==IF(AG282=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D282="Show",D282="",Q282="Show",Q282=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D282="",Q282="")),1,0)
R283: [A1]==IF(AG283=1,"X","") | [B2]==B281 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R284: [A1]==IF(AG284=1,"X","") | [B2]==B283 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D282="Show",D282="",Q282="Show",Q282=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D282="Show",D284=""),AND(Q282="Show",Q284=""))),1,0)
R285: [A1]==IF(AG285=1,"X","") | [B2]==B284 | [AD30]=Always show
R286: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R287: [A1]==IF(AG287=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Proposal (Airbricks) | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B287<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B287=""),1,0)
R288: [A1]==IF(AG288=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Remove | [H8]= air bricks, check airflow, adjust as necessary, clean debris & reinstall. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B288<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B288=1,G288=""),AND(B288="",G288=""),AND(B288="",G288<>""),AND(B288=0,G288<>""))),1,0)
R289: [A1]==IF(AG289=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Upgrade | [H8]= air bricks to 225 x 150 airbricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B289<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B289=1,G289=""),AND(B289="",G289=""),AND(B289="",G289<>""),AND(B289=0,G289<>""))),1,0)
R290: [A1]==IF(AG290=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Install | [G7]=x | [H8]=new 225 x 150 additional airbricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B290<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B290=1,F290=""),AND(B290="",F290=""),AND(B290="",F290<>""),AND(B290=0,F290<>""))),1,0)
R291: [A1]==IF(AG291=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=This will increase the airflow through the floor voids, reduce the humidity and the moisture content of linked timbers, which will greatly reduce the chances of attack by wood rotting fungi such as dr… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B291<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B291=""),1,0)
R292: [A1]==IF(AG292=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Lift | [F6]=of the existing air bricks. | [AB28]=← Enter number of air bricks | [AD30]=Determined by surveyor | [AF32]==IF(B292<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B292=1,E292=""),AND(B292="",E292=""),AND(B292="",E292<>""),AND(B292=0,E292<>""))),1,0)
R293: [A1]==IF(AG293=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Lifting the airbricks will help to prevent water ponding and snow melting, causing water to run into the sub floor void, elevating the moisture levels of the timbers within. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B293<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B293=""),1,0)
R294: [A1]==IF(AG294=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=No further works required. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B294<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B294=""),1,0)
R295: [A1]==IF(AG295=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Timbers at risk | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B295<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B295=""),1,0)
R296: [A1]==IF(AG296=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Timbers equal to or above 20% W/W are classed as being 'at risk'.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B296<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B296=""),1,0)
R297: [A1]==IF(AG297=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Proposal (Timbers) | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B297<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B297=""),1,0)
R298: [A1]==IF(AG298=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=We propose that these timbers are treated with an anti fungal fogging application. This is a short term precaution (non-guaranteed) to protect the timbers from attack whilst the improved airflow dries… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B298<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B298=""),1,0)
R299: [A1]==IF(AG299=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=No further works required. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B299<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B299=""),1,0)
R300: [A1]==IF(AG300=1,"X","") | [B2]=1 | [D4]=INTERNAL INSPECTION | [AB28]=Will always show | [AD30]=Always show
R301: [A1]==IF(AG301=1,"X","") | [D4]=Floors | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B301<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B301=""),1,0)
R302: [A1]==IF(AG302=1,"X","") | [D4]=Timber floors | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B302<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B302=""),1,0)
R303: [A1]==IF(AG303=1,"X","") | [D4]=An inspection of timbers adjacent to damp masonry did not reveal any timber defects at the time of inspection. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B303<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B303=""),1,0)
R304: [A1]==IF(AG304=1,"X","") | [D4]=An inspection of the floor timbers adjacent to the damp masonry, revealed issues with wood rot, please see attached timber inspection report for details.  | [AB28]=← Will be visible based on above. | [AD30]=Determined by surveyor | [AF32]==IF(B304<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B304=""),1,0)
R305: [A1]==IF(AG305=1,"X","") | [D4]=An inspection of the floor timbers adjacent to the damp masonry, revealed issues with wood rot.  | [AB28]=← Will be visible based on above. | [AD30]=Determined by surveyor | [AF32]==IF(B305<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B305=""),1,0)
R306: [A1]==IF(AG306=1,"X","") | [D4]=Non accessible areas | [AB28]=← Visibility dependant on below answers | [AD30]=Determined by surveyor | [AF32]==IF(B306<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B306=""),1,0)
R307: [A1]==IF(AG307=1,"X","") | [D4]=It was not possible to inspect the sub floor timbers adjacent to the damp masonry due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B307<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B307=""),1,0)
R308: [A1]==IF(AG308=1,"X","") | [D4]=• | [E5]=Polished solid wood flooring | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B308<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B308=""),1,0)
R309: [A1]==IF(AG309=1,"X","") | [D4]=• | [E5]=Laminate, vinyl, Lino or cushion-floor overlay | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B309<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B309=""),1,0)
R310: [A1]==IF(AG310=1,"X","") | [D4]=• | [E5]=Carpets heavily tacked and in danger of tearing whilst lifting | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B310<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B310=""),1,0)
R311: [A1]==IF(AG311=1,"X","") | [D4]=• | [E5]=Ceramic tiling | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B311<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B311=""),1,0)
R312: [A1]==IF(AG312=1,"X","") | [D4]=• | [E5]=Furniture obstructing access | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B312<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B312=""),1,0)
R313: [A1]==IF(AG313=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R314: [A1]==IF(AG314=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B314<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B314=1,E314=""),AND(B314="",E314=""),AND(B314="",E314<>""),AND(B314=0,E314<>""))),1,0)
R315: [A1]==IF(AG315=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B315<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B315=1,E315=""),AND(B315="",E315=""),AND(B315="",E315<>""),AND(B315=0,E315<>""))),1,0)
R316: [A1]==IF(AG316=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B316<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B316=1,E316=""),AND(B316="",E316=""),AND(B316="",E316<>""),AND(B316=0,E316<>""))),1,0)
R317: [A1]==IF(AG317=1,"X","") | [B2]==IF(SUM(B318:B329)>0,1,0) | [D4]=Summary | [AB28]=Will always show | [AD30]=Always show
R318: [A1]==IF(AG318=1,"X","") | [D4]=It was noted that you had issues in the following timbers: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B318<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B318=""),1,0)
R319: [A1]==IF(AG319=1,"X","") | [B2]=0 | [D4]=Notes for the surveyor: Write where problem is e.g., joists 1,2 and 3 counting from left of front elevation. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R320: [A1]==IF(AG320=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B320<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B320=1,E320=""),AND(B320="",E320=""),AND(B320="",E320<>""),AND(B320=0,E320<>""))),1,0)
R321: [A1]==IF(AG321=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B321<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B321=1,E321=""),AND(B321="",E321=""),AND(B321="",E321<>""),AND(B321=0,E321<>""))),1,0)
R322: [A1]==IF(AG322=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B322<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B322=1,E322=""),AND(B322="",E322=""),AND(B322="",E322<>""),AND(B322=0,E322<>""))),1,0)
R323: [A1]==IF(AG323=1,"X","") | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B323<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B323=1,E323=""),AND(B323="",E323=""),AND(B323="",E323<>""),AND(B323=0,E323<>""))),1,0)
R324: [A1]==IF(AG324=1,"X","") | [D4]=The timbers were suffering from the following issues: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B324<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B324=""),1,0)
R325: [A1]==IF(AG325=1,"X","") | [D4]=• | [E5]=A woodworm infestation, the attack was of common furniture beetle (anobium punctatum) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B325<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B325=""),1,0)
R326: [A1]==IF(AG326=1,"X","") | [D4]=• | [E5]=An attack of wood rotting fungi, this was identified as wet rot | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B326<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B326=""),1,0)
R327: [A1]==IF(AG327=1,"X","") | [D4]=• | [E5]=Rotting timbers were also suffering from an infestation of woodboring weevil (Pentarthrum Huttoni) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B327<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B327=""),1,0)
R328: [A1]==IF(AG328=1,"X","") | [D4]=• | [E5]=An attack of wood rotting fungi, this was identified as dry rot (sepulae lacrymans) | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B328<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B328=""),1,0)
R329: [A1]==IF(AG329=1,"X","") | [D4]=• | [E5]=A high W/W moisture level to the floor timbers, this was due to a lack of ventilation to the sub floor voids | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B329<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B329=""),1,0)
R330: [A1]==IF(AG330=1,"X","") | [D4]=Proposals below | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B330<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B330=""),1,0)
R331: [A1]==IF(AG331=1,"X","") | [D4]=We would propose for the following works to be carried out: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B331<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B331=""),1,0)
R332: [A1]==IF(AG332=1,"X","") | [D4]=• | [E5]=Timber replacement and treatment for wood rot, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B332<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B332=""),1,0)
R333: [A1]==IF(AG333=1,"X","") | [D4]=• | [E5]=Timber replacement and treatment for wood rot and woodboring insects, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B333<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B333=""),1,0)
R334: [A1]==IF(AG334=1,"X","") | [D4]=• | [E5]=Treatment for woodworm infestation, as per the schedule specified below. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B334<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B334=""),1,0)
R335: [A1]==IF(AG335=1,"X","") | [D4]=• | [E5]=Obtain permission from the vendor to carry out a destructive survey. For your convenience we have included a pre-filled email template for you to request permission from the property owner. You can us… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AE31]=ffsdf | [AF32]==IF(B335<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B335=""),1,0)
R336: [A1]==IF(AG336=1,"X","") | [D4]=Schedule For Treatment Of Wet Rot | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B336<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B336=""),1,0)
R337: [A1]==IF(AG337=1,"X","") | [D4]=Schedule For Treatment Of Wet Rot And Woodboring Weevil | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B337<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B337=""),1,0)
R338: [A1]==IF(AG338=1,"X","") | [D4]=• | [E5]=Open up affected area. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B338<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B338=""),1,0)
R339: [A1]==IF(AG339=1,"X","") | [D4]=• | [E5]=Support any structural bearing timbers for duration of works. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B339<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B339=""),1,0)
R340: [A1]==IF(AG340=1,"X","") | [D4]=• | [E5]=Cut out affected timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B340<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B340=""),1,0)
R341: [A1]==IF(AG341=1,"X","") | [D4]=• | [E5]=Treat all remaining timber cut ends as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B341<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B341=""),1,0)
R342: [A1]==IF(AG342=1,"X","") | [D4]=• | [E5]=Prepare and place new timbers, do not fix. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B342<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B342=""),1,0)
R343: [A1]==IF(AG343=1,"X","") | [D4]=• | [E5]=Remove new timbers. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B343<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B343=""),1,0)
R344: [A1]==IF(AG344=1,"X","") | [D4]=• | [E5]=Treat all masonry as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B344<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B344=""),1,0)
R345: [A1]==IF(AG345=1,"X","") | [D4]=• | [E5]=Clean out and sterilise joist wall socket holes as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B345<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B345=""),1,0)
R346: [A1]==IF(AG346=1,"X","") | [D4]=• | [E5]=Treat all surfaces of new timbers with dual purpose application. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B346<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B346=""),1,0)
R347: [A1]==IF(AG347=1,"X","") | [D4]=• | [E5]=Install bower beam metal plating system. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B347<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B347=""),1,0)
R348: [A1]==IF(AG348=1,"X","") | [D4]=• | [E5]=Treat and end wrap joists as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B348<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B348=""),1,0)
R349: [A1]==IF(AG349=1,"X","") | [D4]=• | [E5]=Install and fix new timbers as per SOP. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B349<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B349=""),1,0)
R350: [A1]==IF(AG350=1,"X","") | [D4]=• | [E5]=Bag up and remove debris to safe external area.  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B350<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B350=""),1,0)
R351: [A1]==IF(AG351=1,"X","") | [D4]=• | [E5]=Clean and tidy site. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B351<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B351=""),1,0)
R352: [A1]==IF(AG352=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R353: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R354: [A1]==IF(AG354=1,"X","") | [B2]==IF(OR(D355="Show",Q355="Show"),1,0) | [AD30]=Always show
R355: [A1]==IF(AG355=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D355="Show",D355="",Q355="Show",Q355=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D355="",Q355="")),1,0)
R356: [A1]==IF(AG356=1,"X","") | [B2]==B354 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R357: [A1]==IF(AG357=1,"X","") | [B2]==B356 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D355="Show",D355="",Q355="Show",Q355=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D355="Show",D357=""),AND(Q355="Show",Q357=""))),1,0)
R358: [A1]==IF(AG358=1,"X","") | [B2]==B357 | [AD30]=Always show
R359: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R360: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R361: [A1]==IF(AG361=1,"X","") | [B2]==IF(OR(D362="Show",Q362="Show"),1,0) | [AD30]=Always show
R362: [A1]==IF(AG362=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D362="Show",D362="",Q362="Show",Q362=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D362="",Q362="")),1,0)
R363: [A1]==IF(AG363=1,"X","") | [B2]==B361 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R364: [A1]==IF(AG364=1,"X","") | [B2]==B363 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D362="Show",D362="",Q362="Show",Q362=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D362="Show",D364=""),AND(Q362="Show",Q364=""))),1,0)
R365: [A1]==IF(AG365=1,"X","") | [B2]==B364 | [AD30]=Always show
R366: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R367: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R368: [A1]==IF(AG368=1,"X","") | [B2]==IF(OR(D369="Show",Q369="Show"),1,0) | [AD30]=Always show
R369: [A1]==IF(AG369=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D369="Show",D369="",Q369="Show",Q369=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D369="",Q369="")),1,0)
R370: [A1]==IF(AG370=1,"X","") | [B2]==B368 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R371: [A1]==IF(AG371=1,"X","") | [B2]==B370 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D369="Show",D369="",Q369="Show",Q369=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D369="Show",D371=""),AND(Q369="Show",Q371=""))),1,0)
R372: [A1]==IF(AG372=1,"X","") | [B2]==B371 | [AD30]=Always show
R373: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R374: [A1]==IF(AG374=1,"X","") | [D4]=Walls | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B374<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B374=""),1,0)
R375: [A1]==IF(AG375=1,"X","") | [D4]=Our surveyor has carried out an inspection of the solid walls as requested. The inspection was carried out with the aid of an electronic moisture meter, a digital laser thermometer and a tactile exami… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B375<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B375=""),1,0)
R376: [A1]==IF(AG376=1,"X","") | [D4]=Our surveyor has carried out an inspection of the solid walls as requested. The inspection was carried out with the aid of an electronic moisture meter, a digital laser thermometer and a tactile exami… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B376<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B376=""),1,0)
R377: [A1]==IF(AG377=1,"X","") | [D4]=Our surveyor has carried out an inspection of the solid walls as requested. The inspection was carried out with the aid of an electronic moisture meter, a digital laser thermometer and a tactile exami… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B377<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B377=""),1,0)
R378: [A1]==IF(AG378=1,"X","") | [D4]=Our surveyor has carried out an inspection for dampness to the solid walls as requested. The inspection was carried out with the aid of an electronic moisture meter, a digital laser thermometer and a … | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B378<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B378=""),1,0)
R379: [A1]==IF(AG379=1,"X","") | [D4]=It is apparent that the wall plastering has suffered degradation due to the effects of dampness. We noted defects to various areas of the plaster surface: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B379<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B379=""),1,0)
R380: [A1]==IF(AG380=1,"X","") | [D4]=• | [E5]=Shadow bands (where damp areas appear darker - resembles a shadow) | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B380<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B380=""),1,0)
R381: [A1]==IF(AG381=1,"X","") | [D4]=• | [E5]=Signs of salting | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B381<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B381=""),1,0)
R382: [A1]==IF(AG382=1,"X","") | [D4]=• | [E5]=Loss of key | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B382<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B382=""),1,0)
R383: [A1]==IF(AG383=1,"X","") | [D4]=At the time of our inspection, there was no apparent degradation to the internal plaster/render surfaces. | [AB28]=← Visibility dependant on above answers | [AD30]=Determined by surveyor | [AF32]==IF(B383<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B383=""),1,0)
R384: [A1]==IF(AG384=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R385: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R386: [A1]==IF(AG386=1,"X","") | [B2]==IF(OR(D387="Show",Q387="Show"),1,0) | [AD30]=Always show
R387: [A1]==IF(AG387=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D387="Show",D387="",Q387="Show",Q387=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D387="",Q387="")),1,0)
R388: [A1]==IF(AG388=1,"X","") | [B2]==B386 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R389: [A1]==IF(AG389=1,"X","") | [B2]==B388 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D387="Show",D387="",Q387="Show",Q387=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D387="Show",D389=""),AND(Q387="Show",Q389=""))),1,0)
R390: [A1]==IF(AG390=1,"X","") | [B2]==B389 | [AD30]=Always show
R391: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R392: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R393: [A1]==IF(AG393=1,"X","") | [B2]==IF(OR(D394="Show",Q394="Show"),1,0) | [AD30]=Always show
R394: [A1]==IF(AG394=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D394="Show",D394="",Q394="Show",Q394=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D394="",Q394="")),1,0)
R395: [A1]==IF(AG395=1,"X","") | [B2]==B393 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R396: [A1]==IF(AG396=1,"X","") | [B2]==B395 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D394="Show",D394="",Q394="Show",Q394=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D394="Show",D396=""),AND(Q394="Show",Q396=""))),1,0)
R397: [A1]==IF(AG397=1,"X","") | [B2]==B396 | [AD30]=Always show
R398: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R399: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R400: [A1]==IF(AG400=1,"X","") | [B2]==IF(OR(D401="Show",Q401="Show"),1,0) | [AD30]=Always show
R401: [A1]==IF(AG401=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D401="Show",D401="",Q401="Show",Q401=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D401="",Q401="")),1,0)
R402: [A1]==IF(AG402=1,"X","") | [B2]==B400 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R403: [A1]==IF(AG403=1,"X","") | [B2]==B402 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D401="Show",D401="",Q401="Show",Q401=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D401="Show",D403=""),AND(Q401="Show",Q403=""))),1,0)
R404: [A1]==IF(AG404=1,"X","") | [B2]==B403 | [AD30]=Always show
R405: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R406: [A1]==IF(AG406=1,"X","") | [D4]=Proposal | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B406<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B406=""),1,0)
R407: [A1]==IF(AG407=1,"X","") | [D4]=We would propose for the following works to be carried out: | [AB28]=← Visibility dependant on below answers | [AD30]=Determined by surveyor | [AF32]==IF(B407<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B407=""),1,0)
R408: [A1]==IF(AG408=1,"X","") | [D4]=• | [E5]=Remove and set aside radiators as required | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B408<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B408=""),1,0)
R409: [A1]==IF(AG409=1,"X","") | [D4]=• | [E5]=Remove, make safe electric supply and set aside socket fronts as required | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B409<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B409=""),1,0)
R410: [A1]==IF(AG410=1,"X","") | [D4]=• | [E5]=Remove skirting boards/boxing as required and set aside for re-use (please refer to general notes on skirting boards)  | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B410<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B410=""),1,0)
R411: [A1]==IF(AG411=1,"X","") | [D4]=• | [E5]=Strip off existing plaster/render | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B411<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B411=""),1,0)
R412: [A1]==IF(AG412=1,"X","") | [D4]=• | [E5]=Strip back wallpaper as required | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B412<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B412=""),1,0)
R413: [A1]==IF(AG413=1,"X","") | [D4]=• | [E5]=Install a damp proofing system as per the attached sketch plan. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B413<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B413=""),1,0)
R414: [A1]==IF(AG414=1,"X","") | [D4]=• | [E5]=Install a wall floor fillet seal to join with installed membrane | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B414<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B414=""),1,0)
R415: [A1]==IF(AG415=1,"X","") | [D4]=• | [E5]=Bag up debris and dispose of debris via a licensed transfer facility | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B415<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B415=""),1,0)
R416: [A1]==IF(AG416=1,"X","") | [D4]=• | [E5]=Asbestos testing:  The ceiling/areas designated for the above installations is covered in Artex/decorative plasterwork. These applications can be Asbestos containing materials (ACMs). It will therefor… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B416<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B416=""),1,0)
R417: [A1]==IF(AG417=1,"X","") | [D4]=No further works required. | [AB28]=← Will be visible based on above. | [AD30]=Determined by surveyor | [AF32]==IF(B417<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B417=""),1,0)
R418: [A1]==IF(AG418=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=Walls Unable To Inspect | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B418<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B418=""),1,0)
R419: [A1]==IF(AG419=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=It was not possible to inspect the moisture content of some walls due to the following: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B419<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B419=""),1,0)
R420: [A1]==IF(AG420=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Ceramic tiling | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B420<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B420=""),1,0)
R421: [A1]==IF(AG421=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [E5]=Furniture obstructing access | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B421<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B421=""),1,0)
R422: [A1]==IF(AG422=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other - (state below) | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R423: [A1]==IF(AG423=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B423<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B423=1,E423=""),AND(B423="",E423=""),AND(B423="",E423<>""),AND(B423=0,E423<>""))),1,0)
R424: [A1]==IF(AG424=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B424<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B424=1,E424=""),AND(B424="",E424=""),AND(B424="",E424<>""),AND(B424=0,E424<>""))),1,0)
R425: [A1]==IF(AG425=1,"X","") | [B2]==IF($B$221="","",IF($B$221=1,0,"")) | [D4]=• | [AB28]=← Enter Visibility & Data | [AD30]=Determined by surveyor | [AF32]==IF(B425<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B425=1,E425=""),AND(B425="",E425=""),AND(B425="",E425<>""),AND(B425=0,E425<>""))),1,0)
R426: [A1]==IF(AG426=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R427: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R428: [A1]==IF(AG428=1,"X","") | [B2]==IF(OR(D429="Show",Q429="Show"),1,0) | [AD30]=Always show
R429: [A1]==IF(AG429=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D429="Show",D429="",Q429="Show",Q429=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D429="",Q429="")),1,0)
R430: [A1]==IF(AG430=1,"X","") | [B2]==B428 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R431: [A1]==IF(AG431=1,"X","") | [B2]==B430 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D429="Show",D429="",Q429="Show",Q429=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D429="Show",D431=""),AND(Q429="Show",Q431=""))),1,0)
R432: [A1]==IF(AG432=1,"X","") | [B2]==B431 | [AD30]=Always show
R433: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R434: [A1]==IF(AG434=1,"X","") | [B2]=1 | [D4]=Note: This is a non-destructive inspection. You may wish to accept this report as is or you may wish to arrange for further inspection and checks, should this be the case the options available are out… | [AB28]=Will always show | [AD30]=Always show
R435: [A1]==IF(AG435=1,"X","") | [B2]=1 | [D4]=Whilst this is arranged as a non-destructive inspection, properties with dampness often have problems with timbers in contact with damp masonry (such as wet rot or dry rot) leaving them at risk. If da… | [AB28]=Will always show | [AD30]=Always show
R436: [A1]==IF(AG436=1,"X","") | [D4]=We have attached a pre-filled email template to request permission for a destructive inspection, to create further access as required to complete the report. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B436<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B436=""),1,0)
R437: [A1]==IF(AG437=1,"X","") | [D4]=Should you not be able to obtain permission for a destructive inspection, you may wish to negotiate  a discount to the purchase price to allow for the fact there may be treatments, or even timber repl… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B437<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B437=""),1,0)
R438: [A1]==IF(AG438=1,"X","") | [D4]=Should you not be able to obtain permission for a destructive inspection, once you own the property, we can arrange for technicians to create access points (this will be quoted for separately, in addi… | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B438<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B438=""),1,0)
R439: [A1]==IF(AG439=1,"X","") | [D4]=Solid floors | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B439<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B439=""),1,0)
R440: [A1]==IF(AG440=1,"X","") | [D4]=Solid floors are not included in our inspection. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B440<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B440=""),1,0)
R441: [A1]==IF(AG441=1,"X","") | [B2]==IF($B$440="","",IF($B$440=1,0,"")) | [D4]=Our surveyor noted dampness within the concrete floor(s) marked 'DC' on the attached sketch plan. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B441<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B441=""),1,0)
R442: [A1]==IF(AG442=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R443: [B2]=0 | [D4]=↓ Image Section 1 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R444: [A1]==IF(AG444=1,"X","") | [B2]==IF(OR(D445="Show",Q445="Show"),1,0) | [AD30]=Always show
R445: [A1]==IF(AG445=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D445="Show",D445="",Q445="Show",Q445=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D445="",Q445="")),1,0)
R446: [A1]==IF(AG446=1,"X","") | [B2]==B444 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R447: [A1]==IF(AG447=1,"X","") | [B2]==B446 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D445="Show",D445="",Q445="Show",Q445=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D445="Show",D447=""),AND(Q445="Show",Q447=""))),1,0)
R448: [A1]==IF(AG448=1,"X","") | [B2]==B447 | [AD30]=Always show
R449: [B2]=0 | [D4]=↑ Image Section 1 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R450: [B2]=0 | [D4]=↓ Image Section 2 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R451: [A1]==IF(AG451=1,"X","") | [B2]==IF(OR(D452="Show",Q452="Show"),1,0) | [AD30]=Always show
R452: [A1]==IF(AG452=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D452="Show",D452="",Q452="Show",Q452=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D452="",Q452="")),1,0)
R453: [A1]==IF(AG453=1,"X","") | [B2]==B451 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R454: [A1]==IF(AG454=1,"X","") | [B2]==B453 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D452="Show",D452="",Q452="Show",Q452=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D452="Show",D454=""),AND(Q452="Show",Q454=""))),1,0)
R455: [A1]==IF(AG455=1,"X","") | [B2]==B454 | [AD30]=Always show
R456: [B2]=0 | [D4]=↑ Image Section 2 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R457: [B2]=0 | [D4]=↓ Image Section 3 ↓ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R458: [A1]==IF(AG458=1,"X","") | [B2]==IF(OR(D459="Show",Q459="Show"),1,0) | [AD30]=Always show
R459: [A1]==IF(AG459=1,"X","") | [B2]=0 | [D4]=Hide | [Q17]=Hide | [AB28]=← Enter Image Visibility | [AD30]=Determined by surveyor | [AF32]==IF(OR(D459="Show",D459="",Q459="Show",Q459=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(D459="",Q459="")),1,0)
R460: [A1]==IF(AG460=1,"X","") | [B2]==B458 | [AB28]=← Add Images | [AD30]=Determined by surveyor
R461: [A1]==IF(AG461=1,"X","") | [B2]==B460 | [AB28]=← Enter Images Descriptions | [AD30]=Determined by surveyor | [AF32]==IF(OR(D459="Show",D459="",Q459="Show",Q459=""),1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(D459="Show",D461=""),AND(Q459="Show",Q461=""))),1,0)
R462: [A1]==IF(AG462=1,"X","") | [B2]==B461 | [AD30]=Always show
R463: [B2]=0 | [D4]=↑ Image Section 3 ↑ | [AB28]=This line will NOT show on the report | [AD30]=Always Hide
R464: [A1]==IF(AG464=1,"X","") | [B2]==IF($B$440="","",IF($B$440=1,0,"")) | [D4]=Proposal | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B464<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B464=""),1,0)
R465: [A1]==IF(AG465=1,"X","") | [B2]==IF($B$440="","",IF($B$440=1,0,"")) | [D4]=We would propose for the following works to be carried out: | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B465<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B465=""),1,0)
R466: [A1]==IF(AG466=1,"X","") | [B2]==IF($B$440="","",IF($B$440=1,0,"")) | [D4]=• | [E5]=Install a resin bonded membrane system to the top surface of the concrete floors marked 'DC' on the sketch plan. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B466<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B466=""),1,0)
R467: [A1]==IF(AG467=1,"X","") | [B2]==IF($B$440="","",IF($B$440=1,0,"")) | [D4]=• | [E5]=Install a wall floor fillet seal to join with installed membrane. | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B467<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B467=""),1,0)
R468: [A1]==IF(AG468=1,"X","") | [B2]==B469 | [D4]=Additional Supporting Comments From Surveyor | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B468<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,B468=""),1,0)
R469: [A1]==IF(AG469=1,"X","") | [AB28]=← Enter Visibility | [AD30]=Determined by surveyor | [AF32]==IF(B469<>"",1,0) | [AG33]==IF(AND(SUM(AF:AF)>0,OR(AND(B469=1,D469=""),AND(B469="",D469=""),AND(B469="",D469<>""),AND(B469=0,D469<>""))),1,0)
R470: [A1]==IF(AG470=1,"X","") | [B2]=1 | [AD30]=Always show
R471: [A1]==IF(AG471=1,"X","") | [B2]=1 | [D4]=Report produced under the guidance of Tyne Tees Damp Proofing Ltd by: | [AD30]=Always show
R472: [A1]==IF(AG472=1,"X","") | [B2]=1 | [AD30]=Always show
R473: [A1]==IF(AG473=1,"X","") | [B2]==IF(Costing!E14="Steven Robinson",1,0) | [D4]=Steven Robinson | [AD30]=Show dependant on Surveyor
R474: [A1]==IF(AG474=1,"X","") | [B2]==B473 | [D4]=Steve Robinson A.Inst.SSE. | [AD30]=Show dependant on Surveyor
R475: [A1]==IF(AG475=1,"X","") | [B2]==B474 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor
R476: [A1]==IF(AG476=1,"X","") | [B2]==IF(Costing!E14="Graeme Hazel",1,0) | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor
R477: [A1]==IF(AG477=1,"X","") | [B2]==B476 | [D4]=Graeme Hazel | [AD30]=Show dependant on Surveyor
R478: [A1]==IF(AG478=1,"X","") | [B2]==B477 | [D4]=Remedial Consultant | [AD30]=Show dependant on Surveyor
R479: [A1]==IF(AG479=1,"X","") | [B2]==IF(Costing!E14="Mike Davison",1,0) | [D4]=Mike Davison | [AD30]=Show dependant on Surveyor
R480: [A1]==IF(AG480=1,"X","") | [B2]==B479 | [D4]=Mike Davison CSSW  M.inst.SSE  | [AD30]=Show dependant on Surveyor
R481: [A1]==IF(AG481=1,"X","") | [B2]==B480 | [D4]=Technical Director | [AD30]=Show dependant on Surveyor
R482: [A1]==IF(AG482=1,"X","") | [B2]=1 | [D4]=Sketch Plan | [AB28]=← Enter Visibility | [AD30]=Determined by if we have a sketch
R483: [B2]==B482 | [AB28]=Determined by above | [AD30]=Determined by above
R484: [B2]==B483 | [AB28]=Determined by above | [AD30]=Determined by above
R485: [B2]==B484 | [AB28]=Determined by above | [AD30]=Determined by above
R486: [B2]==B485 | [AB28]=Determined by above | [AD30]=Determined by above
R487: [B2]==B486 | [AB28]=Determined by above | [AD30]=Determined by above
R488: [B2]==B487 | [AB28]=Determined by above | [AD30]=Determined by above
R489: [B2]==B488 | [AB28]=Determined by above | [AD30]=Determined by above
R490: [B2]==B489 | [AB28]=Determined by above | [AD30]=Determined by above
R491: [B2]==B490 | [AB28]=Determined by above | [AD30]=Determined by above
R492: [B2]==B491 | [AB28]=Determined by above | [AD30]=Determined by above
R493: [B2]==B492 | [AB28]=Determined by above | [AD30]=Determined by above
R494: [B2]==B493 | [AB28]=Determined by above | [AD30]=Determined by above
R495: [B2]==B494 | [AB28]=Determined by above | [AD30]=Determined by above
R496: [B2]==B495 | [AB28]=Determined by above | [AD30]=Determined by above
R497: [B2]==B496 | [AB28]=Determined by above | [AD30]=Determined by above
R498: [B2]==B497 | [AB28]=Determined by above | [AD30]=Determined by above
R499: [B2]==B498 | [AB28]=Determined by above | [AD30]=Determined by above
R500: [B2]==B499 | [AB28]=Determined by above | [AD30]=Determined by above
R501: [B2]==B500 | [AB28]=Determined by above | [AD30]=Determined by above
R502: [B2]==B501 | [AB28]=Determined by above | [AD30]=Determined by above
R503: [B2]==B502 | [AB28]=Determined by above | [AD30]=Determined by above
R504: [B2]==B503 | [AB28]=Determined by above | [AD30]=Determined by above
R505: [B2]==B504 | [AB28]=Determined by above | [AD30]=Determined by above
R506: [B2]==B505 | [AB28]=Determined by above | [AD30]=Determined by above
R507: [B2]==B506 | [AB28]=Determined by above | [AD30]=Determined by above
R508: [B2]==B507 | [AB28]=Determined by above | [AD30]=Determined by above
R509: [B2]==B508 | [AB28]=Determined by above | [AD30]=Determined by above
R510: [B2]==B509 | [AB28]=Determined by above | [AD30]=Determined by above
R511: [B2]==B510 | [AB28]=Determined by above | [AD30]=Determined by above
R512: [B2]==B511 | [AB28]=Determined by above | [AD30]=Determined by above
R513: [B2]==B512 | [AB28]=Determined by above | [AD30]=Determined by above
R514: [B2]==B513 | [AB28]=Determined by above | [AD30]=Determined by above
R515: [B2]==B514 | [AB28]=Determined by above | [AD30]=Determined by above
R516: [B2]==B515 | [AB28]=Determined by above | [AD30]=Determined by above
R517: [B2]==B516 | [AB28]=Determined by above | [AD30]=Determined by above
R518: [B2]==B517 | [AB28]=Determined by above | [AD30]=Determined by above
R519: [B2]==B518 | [AB28]=Determined by above | [AD30]=Determined by above
R520: [B2]==B519 | [AB28]=Determined by above | [AD30]=Determined by above
R521: [B2]==B520 | [AB28]=Determined by above | [AD30]=Determined by above
R522: [B2]==B521 | [AB28]=Determined by above | [AD30]=Determined by above
R523: [B2]==B522 | [AB28]=Determined by above | [AD30]=Determined by above
R524: [B2]==B523 | [AB28]=Determined by above | [AD30]=Determined by above
R525: [B2]==B524 | [AB28]=Determined by above | [AD30]=Determined by above
R527: [D4]=Office tasks when submitting an estimate 
R528: [D4]=You need to attach the following items to the estimate:
R529: [D4]=• The Survey Inspection Report (generated from the Report tab in this document).
R530: [D4]=• Our Terms and Conditions (latest version always found in the folder '1.Current Documentation'). 
R531: [D4]=• General Notes for clients and Health and Safety precautions (latest version always found in the folder '1.Current Documentation'). 
R532: [D4]=• Access Permission Email Template (generated from the Access Email Template tab in this document). | [AB28]=Email Template: Will show if access permission is needed
R535: [D4]=Notes for office
R536: [D4]=Page Breaks:
R537: [D4]=To understand page breaks the link below will be of assistance:
R538: [D4]=https://support.microsoft.com/en-gb/office/insert-move-or-delete-page-breaks-in-a-worksheet-ad3dc726-beec-4a4c-861f-ed640612bdc2
R539: [D4]=Image Best Practices:
R540: [D4]=• Use the 'Alt' key to align an image to the bottom of the cell.
R541: [D4]=• To format an image right click on it to set the height and/or crop ( a good starting height is 6cm).
R542: [D4]=• Try to keep images the same height especially if on the same row and ensure you use the 'alt' key to align the image to the bottom of the cell.
R543: [D4]=• Try and keep the images a fraction smaller than the cell height to prevent overspill if the image cell falls on a page break.
R544: [D4]=• Try and keep the images centrally above their descriptions.
```

## SECTION 3: COSTING SHEET — Complete Pricing Engine

**Total Rows:** 229  |  **Total Cols:** 47

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
R16: [A1]==IF(AU16=1,"X","") | [B2]=DAMP SHEET
R17: [A1]==IF(AU17=1,"X","") | [B2]=Materials | [F6]=Area/No. | [G7]=UOM | [H8]=Default ↵Mats Cost | [I9]=Adjusted ↵Mats Cost | [J10]=M/U | [K11]=Mats Tot | [M13]=Labour | [N14]=Hour Mult | [O15]=Total Hours | [P16]=Default ↵Lab Cost | [Q17]=Adjusted ↵Lab Cost | [R18]=LMU | [S19]=Lab Total | [T20]=Line total | [U21]=Contractor Materials | [V22]=Contractor hours pay
R18: [A1]==IF(AU18=1,"X","")
R20: [A1]==IF(AU20=1,"X","") | [B2]=Preparatory work | [M13]==B20 | [U21]==B20
R21: [A1]==IF(AU21=1,"X","") | [B2]=Remove radiators & cap valves | [G7]=Each | [H8]=7 | [I9]==(H21/100)*(100+$F$26) | [J10]=0.3 | [K11]==F21*I21*(1+J21) | [M13]==B21 | [N14]==(1/60)*20 | [O15]==F21*N21 | [P16]==$D$155 | [Q17]==(P21/100)*(100+$F$26) | [R18]=1 | [S19]==(O21*Q21*(1+R21)) | [T20]==K21+S21 | [U21]==F21*H21*1.1 | [V22]==O21*$E$155 | [AT46]==IF(F21<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F21=""),1,0)
R22: [A1]==IF(AU22=1,"X","") | [B2]=Remove socket fronts and isolate | [G7]=Each | [H8]=2 | [I9]==(H22/100)*(100+$F$26) | [J10]=0.3 | [K11]==F22*I22*(1+J22) | [M13]==B22 | [N14]==(1/60)*12 | [O15]==F22*N22 | [P16]==$D$155 | [Q17]==(P22/100)*(100+$F$26) | [R18]=1 | [S19]==(O22*Q22*(1+R22)) | [T20]==K22+S22 | [U21]==F22*H22*1.1 | [V22]==O22*$E$155 | [AT46]==IF(F22<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F22=""),1,0)
R23: [A1]==IF(AU23=1,"X","") | [B2]=Skirting board removal & set aside | [G7]=LM | [H8]=0.1 | [I9]==(H23/100)*(100+$F$26) | [J10]=0.3 | [K11]==F23*I23*(1+J23) | [M13]==B23 | [N14]=0.07 | [O15]==F23*N23 | [P16]==$D$155 | [Q17]==(P23/100)*(100+$F$26) | [R18]=1 | [S19]==(O23*Q23*(1+R23)) | [T20]==K23+S23 | [U21]==F23*H23*1.1 | [V22]==O23*$E$155 | [AT46]==IF(F23<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F23=""),1,0)
R24: [A1]==IF(AU24=1,"X","") | [B2]=Strip Wall Paper | [G7]=M2 | [H8]=0.5 | [I9]==(H24/100)*(100+$F$26) | [J10]=0.3 | [K11]==F24*I24*(1+J24) | [M13]==B24 | [N14]=0.5 | [O15]==F24*N24 | [P16]==$D$155 | [Q17]==(P24/100)*(100+$F$26) | [R18]=1 | [S19]==(O24*Q24*(1+R24)) | [T20]==K24+S24 | [U21]==F24*H24*1.1 | [V22]==O24*$E$155 | [AT46]==IF(F24<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F24=""),1,0)
R25: [A1]==IF(AU25=1,"X","") | [B2]=Antinox HD Floor Protection Boards – 2.4m x 1.2m | [G7]=Each | [H8]==4.16*1.1 | [I9]==(H25/100)*(100+$F$26) | [J10]=0.3 | [K11]==F25*I25*(1+J25) | [M13]==B25 | [N14]==(1/60)*2 | [O15]==F25*N25 | [P16]==$D$155 | [Q17]==(P25/100)*(100+$F$26) | [R18]=1 | [S19]==(O25*Q25*(1+R25)) | [T20]==K25+S25 | [U21]==F25*H25*1.1 | [V22]==O25*$E$155 | [AT46]==IF(F25<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F25=""),1,0)
R26: [A1]==IF(AU26=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K21:K25) | [M13]=Totals | [O15]==SUM(O21:O25) | [S19]==SUM(S21:S25) | [T20]==SUM(T21:T25) | [U21]==SUM(U21:U25) | [V22]==SUM(V21:V25)
R28: [A1]==IF(AU28=1,"X","") | [B2]=Strip out | [M13]==B28 | [U21]==B28
R29: [A1]==IF(AU29=1,"X","") | [B2]=Remove plaster/render (Walls) | [G7]=M2 | [H8]=0 | [I9]==(H29/100)*(100+$F$36) | [J10]=0 | [K11]==F29*I29*(1+J29) | [M13]==B29 | [N14]=0.3 | [O15]==F29*N29 | [P16]==$D$155 | [Q17]==(P29/100)*(100+$F$36) | [R18]=1 | [S19]==(O29*Q29*(1+R29)) | [T20]==K29+S29 | [U21]==F29*H29*1.1 | [V22]==O29*$E$155 | [AT46]==IF(F29<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F29=""),1,0)
R30: [A1]==IF(AU30=1,"X","") | [B2]=Removal of stud walls etc (Bag & cart away) | [G7]=M2 | [H8]=0 | [I9]==(H30/100)*(100+$F$36) | [J10]=0 | [K11]==F30*I30*(1+J30) | [M13]==B30 | [N14]=0.4 | [O15]==F30*N30 | [P16]==$D$155 | [Q17]==(P30/100)*(100+$F$36) | [R18]=1 | [S19]==(O30*Q30*(1+R30)) | [T20]==K30+S30 | [U21]==F30*H30*1.1 | [V22]==O30*$E$155 | [AT46]==IF(F30<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F30=""),1,0)
R31: [A1]==IF(AU31=1,"X","") | [B2]=Plaster & stud Removal (Ceilings) | [G7]=M2 | [H8]=0 | [I9]==(H31/100)*(100+$F$36) | [J10]=0 | [K11]==F31*I31*(1+J31) | [M13]==B31 | [N14]=0.8 | [O15]==F31*N31 | [P16]==$D$155 | [Q17]==(P31/100)*(100+$F$36) | [R18]=1 | [S19]==(O31*Q31*(1+R31)) | [T20]==K31+S31 | [U21]==F31*H31*1.1 | [V22]==O31*$E$155 | [AT46]==IF(F31<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F31=""),1,0)
R32: [A1]==IF(AU32=1,"X","") | [B2]=Strip out existing timber floor (GF) | [G7]=M2 | [H8]=0 | [I9]==(H32/100)*(100+$F$36) | [J10]=0 | [K11]==F32*I32*(1+J32) | [M13]==B32 | [N14]=0.5 | [O15]==F32*N32 | [P16]==$D$155 | [Q17]==(P32/100)*(100+$F$36) | [R18]=1 | [S19]==(O32*Q32*(1+R32)) | [T20]==K32+S32 | [U21]==F32*H32*1.1 | [V22]==O32*$E$155 | [AT46]==IF(F32<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F32=""),1,0)
R33: [A1]==IF(AU33=1,"X","") | [B2]=Scrape back/clear sub floors | [G7]=M2 | [H8]=0 | [I9]==(H33/100)*(100+$F$36) | [J10]=0 | [K11]==F33*I33*(1+J33) | [M13]==B33 | [N14]=0.25 | [O15]==F33*N33 | [P16]==$D$155 | [Q17]==(P33/100)*(100+$F$36) | [R18]=1 | [S19]==(O33*Q33*(1+R33)) | [T20]==K33+S33 | [U21]==F33*H33*1.1 | [V22]==O33*$E$155 | [AT46]==IF(F33<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F33=""),1,0)
R34: [A1]==IF(AU34=1,"X","") | [B2]=Bag up debris & cart outside  | [F6]==SUM(F29:F33)*2 | [G7]=Bags | [H8]=1 | [I9]==(H34/100)*(100+$F$36) | [J10]=0.3 | [K11]==F34*I34*(1+J34) | [M13]==B34 | [N14]=0.01 | [O15]==F34*N34 | [P16]==$D$155 | [Q17]==(P34/100)*(100+$F$36) | [R18]=1 | [S19]==(O34*Q34*(1+R34)) | [T20]==K34+S34 | [U21]==F34*H34*1.1 | [V22]==O34*$E$155
R35: [A1]==IF(AU35=1,"X","") | [B2]=Disposal via licensed transfer agent | [F6]==F34 | [G7]=Bags | [H8]==IF(F35=0,0,IF(F35<=20,40/F35,2)) | [I9]==(H35/100)*(100+$F$36) | [J10]=0.3 | [K11]==F35*I35*(1+J35) | [M13]==B35 | [N14]=0 | [O15]=0 | [P16]==$D$155 | [Q17]==(P35/100)*(100+$F$36) | [R18]=1 | [S19]==(O35*Q35*(1+R35)) | [T20]==K35+S35 | [U21]=0 | [V22]==O35*$E$155
R36: [A1]==IF(AU36=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K29:K35) | [M13]=Totals | [O15]==SUM(O29:O35) | [S19]==SUM(S29:S35) | [T20]==SUM(T29:T35) | [U21]==SUM(U29:U35) | [V22]==SUM(V29:V35)
R38: [A1]==IF(AU38=1,"X","") | [B2]=Walls | [M13]==B38 | [U21]==B38
R39: [A1]==IF(AU39=1,"X","") | [B2]=DPC Traditional Option | [D4]=Length | [E5]=Thickness
R40: [A1]==IF(AU40=1,"X","") | [B2]=DPC Installation - Traditional | [F6]==D40*E40 | [G7]=LM | [H8]==IF(D40+E40=0,0,(13.93/1.15)+(6/D40*4.29)) | [I9]==(H40/100)*(100+$F$58) | [J10]=0.3 | [K11]==F40*I40*(1+J40) | [M13]==B40 | [N14]=0.35 | [O15]==D40*N40 | [P16]==$D$155 | [Q17]==(P40/100)*(100+$F$58) | [R18]=1 | [S19]==(O40*Q40*(1+R40)) | [T20]==K40+S40 | [U21]==F40*H40*1.1 | [V22]==O40*$E$155 | [AT46]==IF(OR(D40<>"",E40<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D40="",E40="")),1,0)
R41: [A1]==IF(AU41=1,"X","") | [B2]=Digital DPC Upsell Option | [D4]=Type | [E5]=Radius (mtr) | [F6]=Upsell Note to surveyor: You choose the final price to upsell by adjusting the MU percentage box below.  ↵Do not go below the minimum selling price of £750 per unit.
R42: [A1]==IF(AU42=1,"X","") | [B2]=DPC Installation - Digital | [F6]==IF(OR(AND(D42="N/A",E42="N/A"),AND(D42=0,E42=0)),0,1) | [G7]=Each | [H8]==IF(OR(AND(D42="N/A",E42="N/A"),AND(D42=0,E42=0)),0,650) | [I9]==(H42/100)*(100+$F$58) | [J10]=0.154 | [K11]==F42*I42*(1+J42) | [M13]==B42 | [N14]=1 | [O15]==F42*N42 | [P16]==$D$155 | [Q17]==(P42/100)*(100+$F$58) | [R18]=1 | [S19]==(O42*Q42*(1+R42)) | [T20]==K42+S42 | [U21]==F42*H42*1.1 | [V22]==O42*$E$155 | [AT46]==IF(OR(D42<>"",E42<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D42="",E42="",IFERROR(H42,1)=1)),1,0)
R43: [D4]=Length | [E5]=Height
R44: [A1]==IF(AU44=1,"X","") | [B2]=Wall membrane CM3  - 1mtr | [E5]=1 | [F6]==D44*E44 | [G7]=M2 | [H8]==IF(F44=0,0,(_xlfn.CEILING.MATH(F44,5)*((20.83/5)*1.1))/F44) | [I9]==(H44/100)*(100+$F$58) | [J10]=0.3 | [K11]==F44*I44*(1+J44) | [M13]==B44 | [N14]=0.3 | [O15]==F44*N44 | [P16]==$D$155 | [Q17]==(P44/100)*(100+$F$58) | [R18]=1 | [S19]==(O44*Q44*(1+R44)) | [T20]==K44+S44 | [U21]==F44*H44*1.1 | [V22]==O44*$E$155 | [AT46]==IF(D44<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D44=""),1,0)
R45: [A1]==IF(AU45=1,"X","") | [B2]=Wall membrane CM3  - 1.2mtr | [E5]=1.2 | [F6]==D45*E45 | [G7]=M2 | [H8]==IF(F45=0,0,(_xlfn.CEILING.MATH(F45,5)*((26.67/6)*1.1))/F45) | [I9]==(H45/100)*(100+$F$58) | [J10]=0.3 | [K11]==F45*I45*(1+J45) | [M13]==B45 | [N14]=0.3 | [O15]==F45*N45 | [P16]==$D$155 | [Q17]==(P45/100)*(100+$F$58) | [R18]=1 | [S19]==(O45*Q45*(1+R45)) | [T20]==K45+S45 | [U21]==F45*H45*1.1 | [V22]==O45*$E$155 | [AT46]==IF(D45<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D45=""),1,0)
R46: [A1]==IF(AU46=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #1 | [F6]==D46*E46 | [G7]=M2 | [H8]=0 | [I9]==(H46/100)*(100+$F$58) | [J10]=0.3 | [K11]==F46*I46*(1+J46) | [M13]==B46 | [N14]=0 | [O15]==F46*N46 | [P16]==$D$155 | [Q17]==(P46/100)*(100+$F$58) | [R18]=1 | [S19]==(O46*Q46*(1+R46)) | [T20]==K46+S46 | [U21]==F46*H46*1.1 | [V22]==O46*$E$155 | [AT46]==IF(OR(D46<>"",E46<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D46="",E46="")),1,0)
R47: [A1]==IF(AU47=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #2 | [F6]==D47*E47 | [G7]=M2 | [H8]=0 | [I9]==(H47/100)*(100+$F$58) | [J10]=0.3 | [K11]==F47*I47*(1+J47) | [M13]==B47 | [N14]=0 | [O15]==F47*N47 | [P16]==$D$155 | [Q17]==(P47/100)*(100+$F$58) | [R18]=1 | [S19]==(O47*Q47*(1+R47)) | [T20]==K47+S47 | [U21]==F47*H47*1.1 | [V22]==O47*$E$155 | [AT46]==IF(OR(D47<>"",E47<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D47="",E47="")),1,0)
R48: [A1]==IF(AU48=1,"X","") | [B2]=Wall membrane CM3  - 2mtr #3 | [F6]==D48*E48 | [G7]=M2 | [H8]=0 | [I9]==(H48/100)*(100+$F$58) | [J10]=0.3 | [K11]==F48*I48*(1+J48) | [M13]==B48 | [N14]=0 | [O15]==F48*N48 | [P16]==$D$155 | [Q17]==(P48/100)*(100+$F$58) | [R18]=1 | [S19]==(O48*Q48*(1+R48)) | [T20]==K48+S48 | [U21]==F48*H48*1.1 | [V22]==O48*$E$155 | [AT46]==IF(OR(D48<>"",E48<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D48="",E48="")),1,0)
R49: [A1]==IF(AU49=1,"X","") | [B2]=Wall membrane CM3 - Subtotals for above 3 lines | [F6]==SUM(F46:F48) | [G7]=M2 | [H8]==IF(F49=0,0,(_xlfn.CEILING.MATH(F49,5)*((44.17/10)*1.1))/F49) | [I9]==(H49/100)*(100+$F$58) | [J10]=0.3 | [K11]==F49*I49*(1+J49) | [M13]==B49 | [N14]=0.3 | [O15]==F49*N49 | [P16]==$D$155 | [Q17]==(P49/100)*(100+$F$58) | [R18]=1 | [S19]==(O49*Q49*(1+R49)) | [T20]==K49+S49 | [U21]==F49*H49*1.1 | [V22]==O49*$E$155 | [AT46]==IF(F49<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F49=""),1,0)
R50: [A1]==IF(AU50=1,"X","") | [B2]=Membrane plugs for m2 listed | [F6]==SUM(F44:F48) | [G7]=M2 | [H8]==IF(F50=0,0,(_xlfn.CEILING.MATH(F50,2)*((9.33/10)*1.1))/F50) | [I9]==(H50/100)*(100+$F$58) | [J10]=0.3 | [K11]==F50*I50*(1+J50) | [M13]==B50 | [N14]=0.25 | [O15]==F50*N50 | [P16]==$D$155 | [Q17]==(P50/100)*(100+$F$58) | [R18]=1 | [S19]==(O50*Q50*(1+R50)) | [T20]==K50+S50 | [U21]==F50*H50*1.1 | [V22]==O50*$E$155
R51: [A1]==IF(AU51=1,"X","") | [B2]=Sealing Tape Lm | [F6]==SUM(F44:F48)/2.5 | [G7]=LM | [H8]==IF(F51=0,0,(_xlfn.CEILING.MATH(F51,22)*((19.16/22)*1.1))/F51) | [I9]==(H51/100)*(100+$F$58) | [J10]=0.3 | [K11]==F51*I51*(1+J51) | [M13]==B51 | [N14]=0.1 | [O15]==F51*N51 | [P16]==$D$155 | [Q17]==(P51/100)*(100+$F$58) | [R18]=1 | [S19]==(O51*Q51*(1+R51)) | [T20]==K51+S51 | [U21]==F51*H51*1.1 | [V22]==O51*$E$155
R52: [A1]==IF(AU52=1,"X","") | [B2]=Technoseal Lm | [F6]==F55 | [G7]=LM | [H8]==80/80 | [I9]==(H52/100)*(100+$F$58) | [J10]=0.3 | [K11]==F52*I52*(1+J52) | [M13]==B52 | [N14]==1/60 | [O15]==F52*N52 | [P16]==$D$155 | [Q17]==(P52/100)*(100+$F$58) | [R18]=1 | [S19]==(O52*Q52*(1+R52)) | [T20]==K52+S52 | [U21]==F52*H52*1.1 | [V22]==O52*$E$155
R53: [A1]==IF(AU53=1,"X","") | [B2]=Wall/floor fillet joint | [G7]=LM | [H8]==IF(F53=0,0,(_xlfn.CEILING.MATH(F53,12)*((24.51/12)*1.1))/F53) | [I9]==(H53/100)*(100+$F$58) | [J10]=0.3 | [K11]==F53*I53*(1+J53) | [M13]==B53 | [N14]=0.3 | [O15]==F53*N53 | [P16]==$D$155 | [Q17]==(P53/100)*(100+$F$58) | [R18]=1 | [S19]==(O53*Q53*(1+R53)) | [T20]==K53+S53 | [U21]==F53*H53*1.1 | [V22]==O53*$E$155 | [AT46]==IF(F53<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F53=""),1,0)
R54: [D4]=Length | [E5]=Height
R55: [A1]==IF(AU55=1,"X","") | [B2]=Overtape Lm | [F6]==D55+(E55*2) | [G7]=LM | [H8]==IF(F55=0,0,(_xlfn.CEILING.MATH(F55,5)*((10.83/5)*1.1))/F55) | [I9]==(H55/100)*(100+$F$58) | [J10]=0.3 | [K11]==F55*I55*(1+J55) | [M13]==B55 | [N14]=0.1 | [O15]==F55*N55 | [P16]==$D$155 | [Q17]==(P55/100)*(100+$F$58) | [R18]=1 | [S19]==(O55*Q55*(1+R55)) | [T20]==K55+S55 | [U21]==F55*H55*1.1 | [V22]==O55*$E$155 | [AT46]==IF(OR(D55<>"",E55<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D55="",E55="")),1,0)
R56: [A1]==IF(AU56=1,"X","") | [B2]=Fixing Rope Lm | [F6]==SUM(F44:F48)*0.2 | [G7]=LM | [H8]==IF(F56=0,0,(_xlfn.CEILING.MATH(F56,5)*((10.33/5)*1.1))/F56) | [I9]==(H56/100)*(100+$F$58) | [J10]=0.3 | [K11]==F56*I56*(1+J56) | [M13]==B56 | [N14]=0.1 | [O15]==F56*N56 | [P16]==$D$155 | [Q17]==(P56/100)*(100+$F$58) | [R18]=1 | [S19]==(O56*Q56*(1+R56)) | [T20]==K56+S56 | [U21]==F56*H56*1.1 | [V22]==O56*$E$155
R57: [A1]==IF(AU57=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H57/100)*(100+$F$58) | [J10]=0 | [K11]==F57*I57*(1+J57) | [M13]==B57 | [N14]=1 | [O15]==F57*N57 | [P16]==$D$155 | [Q17]==(P57/100)*(100+$F$58) | [R18]=1 | [S19]==(O57*Q57*(1+R57)) | [T20]==K57+S57 | [U21]==F57*H57*1.1 | [V22]==O57*$E$155 | [AT46]==IF(F57<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F57=""),1,0)
R58: [A1]==IF(AU58=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K40:K57) | [M13]=Totals | [O15]==SUM(O40:O57) | [S19]==SUM(S40:S57) | [T20]==SUM(T40:T57) | [U21]==SUM(U40:U57) | [V22]==SUM(V40:V57)
R60: [A1]==IF(AU60=1,"X","") | [B2]=Cementitious tanking system | [M13]==B60 | [U21]==B60
R61: [A1]==IF(AU61=1,"X","") | [B2]=Dubbing out coat (sand/cement/SBR) | [G7]=M2 | [H8]==IF(F61=0,0,_xlfn.CEILING.MATH(F61,2)*(((1*16.66/8)+(4*2.79/4)+(1*7.69/4))*1.1)/F61) | [I9]==(H61/100)*(100+$F$66) | [J10]=0.3 | [K11]==F61*I61*(1+J61) | [M13]==B61 | [N14]=0.3 | [O15]==F61*N61 | [P16]==$D$155 | [Q17]==(P61/100)*(100+$F$66) | [R18]=1 | [S19]==(O61*Q61*(1+R61)) | [T20]==K61+S61 | [U21]==F61*H61*1.1 | [V22]==O61*$E$155 | [AT46]==IF(F61<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F61=""),1,0)
R62: [A1]==IF(AU62=1,"X","") | [B2]=2 coat tanking slurry | [G7]=M2 | [H8]==IF(F62=0,0,(_xlfn.CEILING.MATH(F62,7)*((21.7/7)*1.1))/F62) | [I9]==(H62/100)*(100+$F$66) | [J10]=0.3 | [K11]==F62*I62*(1+J62) | [M13]==B62 | [N14]=0.35 | [O15]==F62*N62 | [P16]==$D$155 | [Q17]==(P62/100)*(100+$F$66) | [R18]=1 | [S19]==(O62*Q62*(1+R62)) | [T20]==K62+S62 | [U21]==F62*H62*1.1 | [V22]==O62*$E$155 | [AT46]==IF(F62<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F62=""),1,0)
R63: [A1]==IF(AU63=1,"X","") | [B2]=Renovating plaster | [G7]=M2 | [H8]==IF(F63=0,0,(_xlfn.CEILING.MATH(F63,3)*((16.25/3)*1.1))/F63) | [I9]==(H63/100)*(100+$F$66) | [J10]=0.3 | [K11]==F63*I63*(1+J63) | [M13]==B63 | [N14]=0.3 | [O15]==F63*N63 | [P16]==$D$155 | [Q17]==(P63/100)*(100+$F$66) | [R18]=1 | [S19]==(O63*Q63*(1+R63)) | [T20]==K63+S63 | [U21]==F63*H63*1.1 | [V22]==O63*$E$155 | [AT46]==IF(F63<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F63=""),1,0)
R64: [A1]==IF(AU64=1,"X","") | [B2]=Wall/floor fillet joint | [G7]=LM | [H8]==IF(F64=0,0,(_xlfn.CEILING.MATH(F64,12)*((24.51/12)*1.1))/F64) | [I9]==(H64/100)*(100+$F$66) | [J10]=0.3 | [K11]==F64*I64*(1+J64) | [M13]==B64 | [N14]=0.3 | [O15]==F64*N64 | [P16]==$D$155 | [Q17]==(P64/100)*(100+$F$66) | [R18]=1 | [S19]==(O64*Q64*(1+R64)) | [T20]==K64+S64 | [U21]==F64*H64*1.1 | [V22]==O64*$E$155 | [AT46]==IF(F64<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F64=""),1,0)
R65: [A1]==IF(AU65=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H65/100)*(100+$F$66) | [J10]=0 | [K11]==F65*I65*(1+J65) | [M13]==B65 | [N14]=1 | [O15]==F65*N65 | [P16]==$D$155 | [Q17]==(P65/100)*(100+$F$66) | [R18]=1 | [S19]==(O65*Q65*(1+R65)) | [T20]==K65+S65 | [U21]==F65*H65*1.1 | [V22]==O65*$E$155 | [AT46]==IF(F65<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F65=""),1,0)
R66: [A1]==IF(AU66=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K61:K65) | [M13]=Totals | [O15]==SUM(O61:O65) | [S19]==SUM(S61:S65) | [T20]==SUM(T61:T65) | [U21]==SUM(U61:U65) | [V22]==SUM(V61:V65)
R68: [A1]==IF(AU68=1,"X","") | [B2]=Floor - Liquid Resin Floor Membranes  | [M13]==B68 | [U21]==B68
R69: [A1]==IF(AU69=1,"X","") | [B2]=EP40 2 Pack resin Primer | [G7]=M2 | [H8]==IF(F69=0,0,(_xlfn.CEILING.MATH(F69,30)*((56.7/30)*1.1))/F69) | [I9]==(H69/100)*(100+$F$74) | [J10]=0.3 | [K11]==F69*I69*(1+J69) | [M13]==B69 | [N14]=0.04 | [O15]==F69*N69 | [P16]==$D$155 | [Q17]==(P69/100)*(100+$F$74) | [R18]=1 | [S19]==(O69*Q69*(1+R69)) | [T20]==K69+S69 | [U21]==(ROUNDUP(F69/30,0))*H69*1.1 | [V22]==O69*$E$155 | [AT46]==IF(F69<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F69=""),1,0)
R70: [A1]==IF(AU70=1,"X","") | [B2]=EP40 2 Pack resin top coat | [G7]=M2 | [H8]==IF(F70=0,0,(_xlfn.CEILING.MATH(F70,30)*((63.7/30)*1.1))/F70) | [I9]==(H70/100)*(100+$F$74) | [J10]=0.3 | [K11]==F70*I70*(1+J70) | [M13]==B70 | [N14]=0.04 | [O15]==F70*N70 | [P16]==$D$155 | [Q17]==(P70/100)*(100+$F$74) | [R18]=1 | [S19]==(O70*Q70*(1+R70)) | [T20]==K70+S70 | [U21]==(ROUNDUP(F70/30,0))*H70*1.1 | [V22]==O70*$E$155 | [AT46]==IF(F70<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F70=""),1,0)
R71: [A1]==IF(AU71=1,"X","") | [B2]=Wall/floor fillet joint | [G7]=LM | [H8]==IF(F71=0,0,(_xlfn.CEILING.MATH(F71,12)*((24.51/12)*1.1))/F71) | [I9]==(H71/100)*(100+$F$74) | [J10]=0.3 | [K11]==F71*I71*(1+J71) | [M13]==B71 | [N14]=0.3 | [O15]==F71*N71 | [P16]==$D$155 | [Q17]==(P71/100)*(100+$F$74) | [R18]=1 | [S19]==(O71*Q71*(1+R71)) | [T20]==K71+S71 | [U21]==F71*H71*1.1 | [V22]==O71*$E$155 | [AT46]==IF(F71<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F71=""),1,0)
R72: [A1]==IF(AU72=1,"X","") | [B2]=Grip grit | [G7]=M2 | [H8]==IF(F72=0,0,(_xlfn.CEILING.MATH(F72,25)*((2.08/25)*1.1))/F72) | [I9]==(H72/100)*(100+$F$74) | [J10]=0.3 | [K11]==F72*I72*(1+J72) | [M13]==B72 | [N14]=0.01 | [O15]==F72*N72 | [P16]==$D$155 | [Q17]==(P72/100)*(100+$F$74) | [R18]=1 | [S19]==(O72*Q72*(1+R72)) | [T20]==K72+S72 | [U21]==F72*H72*1.1 | [V22]==O72*$E$155 | [AT46]==IF(F72<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F72=""),1,0)
R73: [A1]==IF(AU73=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H73/100)*(100+$F$74) | [J10]=0 | [K11]==F73*I73*(1+J73) | [M13]==B73 | [N14]=1 | [O15]==F73*N73 | [P16]==$D$155 | [Q17]==(P73/100)*(100+$F$74) | [R18]=1 | [S19]==(O73*Q73*(1+R73)) | [T20]==K73+S73 | [U21]==F73*H73*1.1 | [V22]==O73*$E$155 | [AT46]==IF(F73<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F73=""),1,0)
R74: [A1]==IF(AU74=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K69:K73) | [M13]=Totals | [O15]==SUM(O69:O73) | [S19]==SUM(S69:S73) | [T20]==SUM(T69:T73) | [U21]==SUM(U69:U73) | [V22]==SUM(V69:V73)
R76: [A1]==IF(AU76=1,"X","") | [B2]=Plastering & finishing | [M13]==B76 | [U21]==B76
R77: [A1]==IF(AU77=1,"X","") | [B2]=Construct stud wall to perimeter | [G7]=M2 | [H8]=14 | [I9]==(H77/100)*(100+$F$85) | [J10]=0.3 | [K11]==F77*I77*(1+J77) | [M13]==B77 | [N14]=0.4 | [O15]==F77*N77 | [P16]==$D$155 | [Q17]==(P77/100)*(100+$F$85) | [R18]=1 | [S19]==(O77*Q77*(1+R77)) | [T20]==K77+S77 | [U21]==F77*H77*1.1 | [V22]==O77*$E$155 | [AT46]==IF(F77<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F77=""),1,0)
R78: [A1]==IF(AU78=1,"X","") | [B2]=Plaster boarding (inc dab/screws) | [G7]=M2 | [H8]==(8.24/1.098)*1.3 | [I9]==(H78/100)*(100+$F$85) | [J10]=0.3 | [K11]==F78*I78*(1+J78) | [M13]==B78 | [N14]=0.4 | [O15]==F78*N78 | [P16]==$D$155 | [Q17]==(P78/100)*(100+$F$85) | [R18]=1 | [S19]==(O78*Q78*(1+R78)) | [T20]==K78+S78 | [U21]==F78*H78*1.1 | [V22]==O78*$E$155 | [AT46]==IF(F78<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F78=""),1,0)
R79: [A1]==IF(AU79=1,"X","") | [B2]=Warmline Internal Wall Insulation | [G7]=M2 | [H8]==IF(F79=0,0,((_xlfn.CEILING.MATH(F79,3.5625)*((196.67/7.125)*1.1))/F79)+((_xlfn.CEILING.MATH(F79,7.125)*((38.5/7.125)*1.1))/F79)) | [I9]==(H79/100)*(100+$F$85) | [J10]=0.3 | [K11]==F79*I79*(1+J79) | [M13]==B79 | [N14]==IF(OR(F79="",F79=0),0,IF(F79<7,2.5/F79,(20/60))) | [O15]==F79*N79 | [P16]==$D$155 | [Q17]==(P79/100)*(100+$F$85) | [R18]=1 | [S19]==(O79*Q79*(1+R79)) | [T20]==K79+S79 | [U21]==F79*H79*1.1 | [V22]==O79*$E$155 | [AT46]==IF(F79<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F79=""),1,0)
R80: [A1]==IF(AU80=1,"X","") | [B2]=Skimming walls (multi finish plaster) | [G7]=M2 | [H8]==IF(F80=0,0,(_xlfn.CEILING.MATH(F80,10)*((12.08/10)*1.1))/F80) | [I9]==(H80/100)*(100+$F$85) | [J10]=0.3 | [K11]==F80*I80*(1+J80) | [M13]==B80 | [N14]==4/15 | [O15]==ROUNDUP(F80/15,0)*4 | [P16]==$D$155 | [Q17]==(P80/100)*(100+$F$85) | [R18]=1 | [S19]==(O80*Q80*(1+R80)) | [T20]==K80+S80 | [U21]==F80*H80*1.1 | [V22]==O80*$E$155 | [AT46]==IF(F80<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F80=""),1,0)
R81: [A1]==IF(AU81=1,"X","") | [B2]=Plastering Stop Bead - 3m length | [G7]=Each | [H8]==1*1.1 | [I9]==(H81/100)*(100+$F$85) | [J10]=0.3 | [K11]==F81*I81*(1+J81) | [M13]==B81 | [N14]=0 | [O15]==F81*N81 | [P16]==$D$155 | [Q17]==(P81/100)*(100+$F$85) | [R18]=1 | [S19]==(O81*Q81*(1+R81)) | [T20]==K81+S81 | [U21]==F81*H81*1.1 | [V22]==O81*$E$155 | [AT46]==IF(F81<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F81=""),1,0)
R82: [A1]==IF(AU82=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 2.4m length | [G7]=Each | [H8]==1.66*1.1 | [I9]==(H82/100)*(100+$F$85) | [J10]=0.3 | [K11]==F82*I82*(1+J82) | [M13]==B82 | [N14]=0 | [O15]==F82*N82 | [P16]==$D$155 | [Q17]==(P82/100)*(100+$F$85) | [R18]=1 | [S19]==(O82*Q82*(1+R82)) | [T20]==K82+S82 | [U21]==F82*H82*1.1 | [V22]==O82*$E$155 | [AT46]==IF(F82<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F82=""),1,0)
R83: [A1]==IF(AU83=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 3m length | [G7]=Each | [H8]==2.5*1.1 | [I9]==(H83/100)*(100+$F$85) | [J10]=0.3 | [K11]==F83*I83*(1+J83) | [M13]==B83 | [N14]=0 | [O15]==F83*N83 | [P16]==$D$155 | [Q17]==(P83/100)*(100+$F$85) | [R18]=1 | [S19]==(O83*Q83*(1+R83)) | [T20]==K83+S83 | [U21]==F83*H83*1.1 | [V22]==O83*$E$155 | [AT46]==IF(F83<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F83=""),1,0)
R84: [A1]==IF(AU84=1,"X","") | [B2]=Difficulty hours (fireplace, corners etc) | [G7]=Hours | [H8]=0 | [I9]==(H84/100)*(100+$F$85) | [J10]=0 | [K11]==F84*I84*(1+J84) | [M13]==B84 | [N14]=1 | [O15]==F84*N84 | [P16]==$D$155 | [Q17]==(P84/100)*(100+$F$85) | [R18]=1 | [S19]==(O84*Q84*(1+R84)) | [T20]==K84+S84 | [U21]==F84*H84*1.1 | [V22]==O84*$E$155 | [AT46]==IF(F84<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F84=""),1,0)
R85: [A1]==IF(AU85=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K77:K84) | [M13]=Totals | [O15]==SUM(O77:O84) | [S19]==SUM(S77:S84) | [T20]==SUM(T77:T84) | [U21]==SUM(U77:U84) | [V22]==SUM(V77:V84)
R87: [A1]==IF(AU87=1,"X","") | [B2]=Floor Joists LM @ 400mm centres | [F6]=Stock lengths 2.4, 3.0, 3.6, 4.2, 4.8, 5.4 | [M13]==B87 | [U21]==B87
R88: [A1]==IF(AU88=1,"X","") | [B2]=Joists Size | [D4]=Quantity  | [E5]=Length
R89: [A1]==IF(AU89=1,"X","") | [B2]=Joists, 100 x 50 | [F6]==D89*E89 | [G7]=LM | [H8]=5.46 | [I9]==(H89/100)*(100+$F$109) | [J10]=0.3 | [K11]==F89*I89*(1+J89) | [M13]==B89 | [N14]=0.25 | [O15]==F89*N89 | [P16]==$D$155 | [Q17]==(P89/100)*(100+$F$109) | [R18]=1 | [S19]==(O89*Q89*(1+R89)) | [T20]==K89+S89 | [U21]==F89*H89*1.1 | [V22]==O89*$E$155 | [AT46]==IF(OR(D89<>"",E89<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D89="",E89="")),1,0)
R90: [A1]==IF(AU90=1,"X","") | [B2]=Joists, 125 x 50 | [F6]==D90*E90 | [G7]=LM | [H8]=6.5 | [I9]==(H90/100)*(100+$F$109) | [J10]=0.3 | [K11]==F90*I90*(1+J90) | [M13]==B90 | [N14]=0.25 | [O15]==F90*N90 | [P16]==$D$155 | [Q17]==(P90/100)*(100+$F$109) | [R18]=1 | [S19]==(O90*Q90*(1+R90)) | [T20]==K90+S90 | [U21]==F90*H90*1.1 | [V22]==O90*$E$155 | [AT46]==IF(OR(D90<>"",E90<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D90="",E90="")),1,0)
R91: [A1]==IF(AU91=1,"X","") | [B2]=Joists, 150 x 50 | [F6]==D91*E91 | [G7]=LM | [H8]=7.7 | [I9]==(H91/100)*(100+$F$109) | [J10]=0.3 | [K11]==F91*I91*(1+J91) | [M13]==B91 | [N14]=0.25 | [O15]==F91*N91 | [P16]==$D$155 | [Q17]==(P91/100)*(100+$F$109) | [R18]=1 | [S19]==(O91*Q91*(1+R91)) | [T20]==K91+S91 | [U21]==F91*H91*1.1 | [V22]==O91*$E$155 | [AT46]==IF(OR(D91<>"",E91<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D91="",E91="")),1,0)
R92: [A1]==IF(AU92=1,"X","") | [B2]=Joists, 175 x 50 | [F6]==D92*E92 | [G7]=LM | [H8]=8 | [I9]==(H92/100)*(100+$F$109) | [J10]=0.3 | [K11]==F92*I92*(1+J92) | [M13]==B92 | [N14]=0.3 | [O15]==F92*N92 | [P16]==$D$155 | [Q17]==(P92/100)*(100+$F$109) | [R18]=1 | [S19]==(O92*Q92*(1+R92)) | [T20]==K92+S92 | [U21]==F92*H92*1.1 | [V22]==O92*$E$155 | [AT46]==IF(OR(D92<>"",E92<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D92="",E92="")),1,0)
R93: [A1]==IF(AU93=1,"X","") | [B2]=Joists, 200 x 50 | [F6]==D93*E93 | [G7]=LM | [H8]=8.9 | [I9]==(H93/100)*(100+$F$109) | [J10]=0.3 | [K11]==F93*I93*(1+J93) | [M13]==B93 | [N14]=0.3 | [O15]==F93*N93 | [P16]==$D$155 | [Q17]==(P93/100)*(100+$F$109) | [R18]=1 | [S19]==(O93*Q93*(1+R93)) | [T20]==K93+S93 | [U21]==F93*H93*1.1 | [V22]==O93*$E$155 | [AT46]==IF(OR(D93<>"",E93<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D93="",E93="")),1,0)
R94: [A1]==IF(AU94=1,"X","") | [B2]=Joists, 225 x 50 | [F6]==D94*E94 | [G7]=LM | [H8]=9.5 | [I9]==(H94/100)*(100+$F$109) | [J10]=0.3 | [K11]==F94*I94*(1+J94) | [M13]==B94 | [N14]=0.4 | [O15]==F94*N94 | [P16]==$D$155 | [Q17]==(P94/100)*(100+$F$109) | [R18]=1 | [S19]==(O94*Q94*(1+R94)) | [T20]==K94+S94 | [U21]==F94*H94*1.1 | [V22]==O94*$E$155 | [AT46]==IF(OR(D94<>"",E94<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D94="",E94="")),1,0)
R95: [A1]==IF(AU95=1,"X","") | [B2]=Treat and endwrap joist | [E5]=1 | [F6]==D95*E95 | [G7]=Each | [H8]=3 | [I9]==(H95/100)*(100+$F$109) | [J10]=0.3 | [K11]==F95*I95*(1+J95) | [M13]==B95 | [N14]=0.15 | [O15]==F95*N95 | [P16]==$D$155 | [Q17]==(P95/100)*(100+$F$109) | [R18]=1 | [S19]==(O95*Q95*(1+R95)) | [T20]==K95+S95 | [U21]==F95*H95*1.1 | [V22]==O95*$E$155 | [AT46]==IF(D95<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D95="",E95="")),1,0)
R96: [A1]==IF(AU96=1,"X","") | [B2]=Wall plate 100x25 | [E5]=1 | [F6]==D96*E96 | [G7]=Each | [H8]=4.84 | [I9]==(H96/100)*(100+$F$109) | [J10]=0.3 | [K11]==F96*I96*(1+J96) | [M13]==B96 | [N14]=0.4 | [O15]==F96*N96 | [P16]==$D$155 | [Q17]==(P96/100)*(100+$F$109) | [R18]=1 | [S19]==(O96*Q96*(1+R96)) | [T20]==K96+S96 | [U21]==F96*H96*1.1 | [V22]==O96*$E$155 | [AT46]==IF(D96<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D96=""),1,0)
R97: [A1]==IF(AU97=1,"X","") | [B2]=Bower beams (pair) | [E5]=1 | [F6]==D97*E97 | [G7]=Pairs | [H8]=36 | [I9]==(H97/100)*(100+$F$109) | [J10]=0.3 | [K11]==F97*I97*(1+J97) | [M13]==B97 | [N14]=1.5 | [O15]==F97*N97 | [P16]==$D$155 | [Q17]==(P97/100)*(100+$F$109) | [R18]=1 | [S19]==(O97*Q97*(1+R97)) | [T20]==K97+S97 | [U21]==F97*H97*1.1 | [V22]==O97*$E$155 | [AT46]==IF(D97<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D97=""),1,0)
R98: [A1]==IF(AU98=1,"X","") | [B2]=Flitch plates (pair) | [E5]=1 | [F6]==D98*E98 | [G7]=Pairs | [H8]=42 | [I9]==(H98/100)*(100+$F$109) | [J10]=0.3 | [K11]==F98*I98*(1+J98) | [M13]==B98 | [N14]=1.5 | [O15]==F98*N98 | [P16]==$D$155 | [Q17]==(P98/100)*(100+$F$109) | [R18]=1 | [S19]==(O98*Q98*(1+R98)) | [T20]==K98+S98 | [U21]==F98*H98*1.1 | [V22]==O98*$E$155 | [AT46]==IF(D98<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D98=""),1,0)
R99: [A1]==IF(AU99=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H99/100)*(100+$F$109) | [J10]=0 | [K11]==F99*I99*(1+J99) | [M13]==B99 | [N14]=1 | [O15]==F99*N99 | [P16]==$D$155 | [Q17]==(P99/100)*(100+$F$109) | [R18]=1 | [S19]==(O99*Q99*(1+R99)) | [T20]==K99+S99 | [U21]==F99*H99*1.1 | [V22]==O99*$E$155 | [AT46]==IF(F99<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F99=""),1,0)
R100: [A1]==IF(AU100=1,"X","") | [B2]=Flooring deck type (M2) | [M13]==B100 | [U21]==B100
R101: [A1]==IF(AU101=1,"X","") | [B2]=Install Weyrock flooring 18mm (M2) | [F6]=1 | [G7]=M2 | [H8]=18 | [I9]==(H101/100)*(100+$F$109) | [J10]=0.3 | [K11]==F101*I101*(1+J101) | [M13]==B101 | [N14]=0.4 | [O15]==F101*N101 | [P16]==$D$155 | [Q17]==(P101/100)*(100+$F$109) | [R18]=1 | [S19]==(O101*Q101*(1+R101)) | [T20]==K101+S101 | [U21]==F101*H101*1.1 | [V22]==O101*$E$155 | [AT46]==IF(F101<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F101=""),1,0)
R102: [A1]==IF(AU102=1,"X","") | [B2]=Install Weyrock flooring 22mm (M2) | [F6]=1 | [G7]=M2 | [H8]=22 | [I9]==(H102/100)*(100+$F$109) | [J10]=0.3 | [K11]==F102*I102*(1+J102) | [M13]==B102 | [N14]=0.425 | [O15]==F102*N102 | [P16]==$D$155 | [Q17]==(P102/100)*(100+$F$109) | [R18]=1 | [S19]==(O102*Q102*(1+R102)) | [T20]==K102+S102 | [U21]==F102*H102*1.1 | [V22]==O102*$E$155 | [AT46]==IF(F102<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F102=""),1,0)
R103: [A1]==IF(AU103=1,"X","") | [B2]=Install std T&G Floorboards (M2) | [F6]=1 | [G7]=M2 | [H8]=46.3 | [I9]==(H103/100)*(100+$F$109) | [J10]=0.3 | [K11]==F103*I103*(1+J103) | [M13]==B103 | [N14]=0.6 | [O15]==F103*N103 | [P16]==$D$155 | [Q17]==(P103/100)*(100+$F$109) | [R18]=1 | [S19]==(O103*Q103*(1+R103)) | [T20]==K103+S103 | [U21]==F103*H103*1.1 | [V22]==O103*$E$155 | [AT46]==IF(F103<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F103=""),1,0)
R104: [A1]==IF(AU104=1,"X","") | [B2]=Install Victorian T&G Floorboards (M2) | [F6]=1 | [G7]=M2 | [H8]=52.8 | [I9]==(H104/100)*(100+$F$109) | [J10]=0.3 | [K11]==F104*I104*(1+J104) | [M13]==B104 | [N14]=0.6 | [O15]==F104*N104 | [P16]==$D$155 | [Q17]==(P104/100)*(100+$F$109) | [R18]=1 | [S19]==(O104*Q104*(1+R104)) | [T20]==K104+S104 | [U21]==F104*H104*1.1 | [V22]==O104*$E$155 | [AT46]==IF(F104<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F104=""),1,0)
R105: [A1]==IF(AU105=1,"X","") | [B2]=Install Engineered Flooring sheet (M2) | [F6]=1 | [G7]=M2 | [H8]=49.99 | [I9]==(H105/100)*(100+$F$109) | [J10]=0.3 | [K11]==F105*I105*(1+J105) | [M13]==B105 | [N14]=0.4 | [O15]==F105*N105 | [P16]==$D$155 | [Q17]==(P105/100)*(100+$F$109) | [R18]=1 | [S19]==(O105*Q105*(1+R105)) | [T20]==K105+S105 | [U21]==F105*H105*1.1 | [V22]==O105*$E$155 | [AT46]==IF(F105<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F105=""),1,0)
R106: [A1]==IF(AU106=1,"X","") | [B2]=Install Structural Engineered Flooring sheet (M2) onto joists | [F6]=1 | [G7]=M2 | [H8]=52.8 | [I9]==(H106/100)*(100+$F$109) | [J10]=0.3 | [K11]==F106*I106*(1+J106) | [M13]==B106 | [N14]=0.9 | [O15]==F106*N106 | [P16]==$D$155 | [Q17]==(P106/100)*(100+$F$109) | [R18]=1 | [S19]==(O106*Q106*(1+R106)) | [T20]==K106+S106 | [U21]==F106*H106*1.1 | [V22]==O106*$E$155 | [AT46]==IF(F106<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F106=""),1,0)
R107: [A1]==IF(AU107=1,"X","") | [B2]=Provide insulation to suspended flooring | [G7]=M2 | [H8]=6.8 | [I9]==(H107/100)*(100+$F$109) | [J10]=0.3 | [K11]==F107*I107*(1+J107) | [M13]==B107 | [N14]=0.2 | [O15]==F107*N107 | [P16]==$D$155 | [Q17]==(P107/100)*(100+$F$109) | [R18]=1 | [S19]==(O107*Q107*(1+R107)) | [T20]==K107+S107 | [U21]==F107*H107*1.1 | [V22]==O107*$E$155 | [AT46]==IF(F107<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F107=""),1,0)
R108: [A1]==IF(AU108=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H108/100)*(100+$F$109) | [J10]=0 | [K11]==F108*I108*(1+J108) | [M13]==B108 | [N14]=1 | [O15]==F108*N108 | [P16]==$D$155 | [Q17]==(P108/100)*(100+$F$109) | [R18]=1 | [S19]==(O108*Q108*(1+R108)) | [T20]==K108+S108 | [U21]==F108*H108*1.1 | [V22]==O108*$E$155 | [AT46]==IF(F108<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F108=""),1,0)
R109: [A1]==IF(AU109=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K89:K108) | [M13]=Totals | [O15]==SUM(O89:O108) | [S19]==SUM(S89:S108) | [T20]==SUM(T89:T108) | [U21]==SUM(U89:U108) | [V22]==SUM(V89:V108)
R111: [A1]==IF(AU111=1,"X","") | [B2]=Airbricks | [M13]==B111 | [U21]==B111
R112: [A1]==IF(AU112=1,"X","") | [B2]=Clean out airbrick/fit new face | [G7]=Each | [H8]=16 | [I9]==(H112/100)*(100+$F$115) | [J10]=0.3 | [K11]==F112*I112*(1+J112) | [M13]==B112 | [N14]=0.5 | [O15]==F112*N112 | [P16]==$D$155 | [Q17]==(P112/100)*(100+$F$115) | [R18]=1 | [S19]==(O112*Q112*(1+R112)) | [T20]==K112+S112 | [U21]==F112*H112*1.1 | [V22]==O112*$E$155 | [AT46]==IF(F112<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F112=""),1,0)
R113: [A1]==IF(AU113=1,"X","") | [B2]=Lift / upgrade existing airbrick/fit new face | [G7]=Each | [H8]=16 | [I9]==(H113/100)*(100+$F$115) | [J10]=0.3 | [K11]==F113*I113*(1+J113) | [M13]==B113 | [N14]=0.8 | [O15]==F113*N113 | [P16]==$D$155 | [Q17]==(P113/100)*(100+$F$115) | [R18]=1 | [S19]==(O113*Q113*(1+R113)) | [T20]==K113+S113 | [U21]==F113*H113*1.1 | [V22]==O113*$E$155 | [AT46]==IF(F113<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F113=""),1,0)
R114: [A1]==IF(AU114=1,"X","") | [B2]=Install additional  airbrick | [G7]=Each | [H8]=16 | [I9]==(H114/100)*(100+$F$115) | [J10]=0.3 | [K11]==F114*I114*(1+J114) | [M13]==B114 | [N14]=2 | [O15]==F114*N114 | [P16]==$D$155 | [Q17]==(P114/100)*(100+$F$115) | [R18]=1 | [S19]==(O114*Q114*(1+R114)) | [T20]==K114+S114 | [U21]==F114*H114*1.1 | [V22]==O114*$E$155 | [AT46]==IF(F114<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F114=""),1,0)
R115: [A1]==IF(AU115=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K112:K114) | [M13]=Totals | [O15]==SUM(O112:O114) | [S19]==SUM(S112:S114) | [T20]==SUM(T112:T114) | [U21]==SUM(U112:U114) | [V22]==SUM(V112:V114)
R117: [A1]==IF(AU117=1,"X","") | [B2]=Spray treatments | [M13]==B117 | [U21]==B117
R118: [A1]==IF(AU118=1,"X","") | [B2]=Fog sub floor void with anti fungal treatment | [G7]=M2 | [H8]==IF(F118=0,0,(_xlfn.CEILING.MATH(F118,100)*((20.979/100)*1.1))/F118) | [I9]==(H118/100)*(100+$F$120) | [J10]=0.3 | [K11]==F118*I118*(1+J118) | [M13]==B118 | [N14]=0.2 | [O15]==F118*N118 | [P16]==$D$155 | [Q17]==(P118/100)*(100+$F$120) | [R18]=1 | [S19]==(O118*Q118*(1+R118)) | [T20]==K118+S118 | [U21]==F118*H118*1.1 | [V22]==O118*$E$155 | [AT46]==IF(F118<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F118=""),1,0)
R119: [A1]==IF(AU119=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [G7]=Hours | [H8]=0 | [I9]==(H119/100)*(100+$F$120) | [J10]=0 | [K11]==F119*I119*(1+J119) | [M13]==B119 | [N14]=1 | [O15]==F119*N119 | [P16]==$D$155 | [Q17]==(P119/100)*(100+$F$120) | [R18]=1 | [S19]==(O119*Q119*(1+R119)) | [T20]==K119+S119 | [U21]==F119*H119*1.1 | [V22]==O119*$E$155 | [AT46]==IF(F119<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F119=""),1,0)
R120: [A1]==IF(AU120=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K118:K119) | [M13]=Totals | [O15]==SUM(O118:O119) | [S19]==SUM(S118:S119) | [T20]==SUM(T118:T119) | [U21]==SUM(U118:U119) | [V22]==SUM(V118:V119)
R121: [F6]=0
R122: [A1]==IF(AU122=1,"X","") | [B2]=Drains | [M13]==B122 | [U21]==B122
R123: [A1]==IF(AU123=1,"X","") | [B2]=Aco Drain per linear meter | [G7]=LM | [H8]=8 | [I9]==(H123/100)*(100+$F$125) | [J10]=0.3 | [K11]==F123*I123*(1+J123) | [M13]==B123 | [N14]=1 | [O15]==F123*N123 | [P16]==$D$155 | [Q17]==(P123/100)*(100+$F$125) | [R18]=1 | [S19]==(O123*Q123*(1+R123)) | [T20]==K123+S123 | [U21]==F123*H123*1.1 | [V22]==O123*$E$155 | [W23]=Optional For Customer by Default | [AT46]==IF(F123<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F123=""),1,0)
R124: [A1]==IF(AU124=1,"X","") | [B2]=French Drain per linear meter | [G7]=LM | [H8]=2.41 | [I9]==(H124/100)*(100+$F$125) | [J10]=0.3 | [K11]==F124*I124*(1+J124) | [M13]==B124 | [N14]==40/60 | [O15]==F124*N124 | [P16]==$D$155 | [Q17]==(P124/100)*(100+$F$125) | [R18]=1 | [S19]==(O124*Q124*(1+R124)) | [T20]==K124+S124 | [U21]==F124*H124*1.1 | [V22]==O124*$E$155 | [W23]=Optional For Customer by Default | [AT46]==IF(F124<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F124=""),1,0)
R125: [A1]==IF(AU125=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K123:K124) | [M13]=Totals | [O15]==SUM(O123:O124) | [S19]==SUM(S123:S124) | [T20]==SUM(T123:T124) | [U21]==SUM(U123:U124) | [V22]==SUM(V123:V124)
R127: [A1]==IF(AU127=1,"X","") | [B2]=External Wall - Aquaban Water Repellant Treatments | [M13]==B127 | [U21]==B127
R128: [A1]==IF(AU128=1,"X","") | [B2]=Aquaban water repellent system | [G7]=M2 | [H8]==IF(F128=0,0,(_xlfn.CEILING.MATH(F128,25)*((12.5/25)*1.1))/F128) | [I9]==(H128/100)*(100+$F$129) | [J10]=0.3 | [K11]==F128*I128*(1+J128) | [M13]==B128 | [N14]==1/20 | [O15]==IF(F128=0,0,IF(F128=0,0,IF(F128<54,(N128*54),(N128*F128)))) | [P16]==$D$155 | [Q17]==(P128/100)*(100+$F$129) | [R18]=1 | [S19]==(O128*Q128*(1+R128)) | [T20]==K128+S128 | [U21]==F128*H128*1.1 | [V22]==O128*$E$155 | [W23]=Optional For Customer by Default | [AT46]==IF(F128<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F128=""),1,0)
R129: [A1]==IF(AU129=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K128:K128) | [M13]=Totals | [O15]==SUM(O128:O128) | [S19]==SUM(S128:S128) | [T20]==SUM(T128:T128) | [U21]==SUM(U128:U128) | [V22]==SUM(V128:V128)
R131: [A1]==IF(AU131=1,"X","") | [B2]=Asbestos Testing | [M13]==B131 | [U21]==B131
R132: [A1]==IF(AU132=1,"X","") | [B2]=Asbestos Testing | [G7]=Each | [H8]=30 | [I9]==(H132/100)*(100+$F$129) | [J10]=0.3 | [K11]==F132*I132*(1+J132) | [M13]==B132 | [N14]=0.64 | [O15]==F132*N132 | [P16]==$D$155 | [Q17]==(P132/100)*(100+$F$133) | [R18]=1 | [S19]==(O132*Q132*(1+R132)) | [T20]==K132+S132 | [U21]==F132*H132*1.1 | [V22]==O132*$E$155 | [W23]=Optional For Customer by Default | [AT46]==IF(F132<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F132=""),1,0)
R133: [A1]==IF(AU133=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K132:K132) | [M13]=Totals | [O15]==SUM(O132:O132) | [S19]==SUM(S132:S132) | [T20]==SUM(T132:T132) | [U21]==SUM(U132:U132) | [V22]==SUM(V132:V132)
R135: [A1]==IF(AU135=1,"X","") | [B2]=Skip hire 8yd | [M13]==B135 | [U21]==B135
R136: [A1]==IF(AU136=1,"X","") | [B2]=Rubbish removal skips | [G7]=Each | [H8]=270 | [I9]==(H136/100)*(100+$B$140) | [J10]=0.3 | [K11]==F136*I136*(1+J136) | [M13]==B136 | [N14]=0 | [O15]=0 | [P16]==D155 | [Q17]==P136 | [R18]=1 | [S19]==(O136*Q136*(1+R136)) | [T20]==K136+S136 | [U21]=0 | [V22]=0 | [AT46]==IF(F136<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F136=""),1,0)
R138: [A1]==IF(AU138=1,"X","")
R139: [A1]==IF(AU139=1,"X","") | [E5]=Materials sub tot | [K11]==K26+K36+K58+K66+K74+K85+K109+K115+K120+K125+K129+K136 | [M13]=TT Totals | [U21]=Contractor Totals
R140: [A1]==IF(AU140=1,"X","") | [E5]=Labour sub tot | [H8]==O140 | [K11]==S26+S36+S58+S66+S74+S85+S109+S115+S120+S125+S129+S136 | [M13]=Labour hours sub total | [O15]==O26+O36+O58+O66+O74+O85+O109+O115+O120+O125+O129 | [U21]==U26+U36+U58+U66+U74+U85+U109+U115+U120+U125+U129 | [V22]==V26+V36+V58+V66+V74+V85+V109+V115+V120+V125+V129
R141: [A1]==IF(AU141=1,"X","") | [H8]=Travel | [K11]==(F155*C155)+((K146*K147)*2)*J155 | [M13]=Hours travel | [O15]==K146*K147*2*K148/30
R142: [A1]==IF(AU142=1,"X","") | [H8]= Price | [K11]==SUM(K139:K141) | [M13]=Total hours | [O15]==SUM(O140:O141) | [U21]=Travel | [V22]==K146*(K147*2)*0.45
R143: [A1]==IF(AU143=1,"X","") | [H8]=Vat | [K11]==K142*0.2 | [U21]=Tot | [V22]==U140+V140+V142
R144: [A1]==IF(AU144=1,"X","") | [H8]=Total price inc vat | [K11]==SUM(K142:K143)
R145: [A1]==IF(AU145=1,"X","") | [M13]=For Office Only
R146: [A1]==IF(AU146=1,"X","") | [J10]=No of days | [K11]==(ROUNDUP((O140/6.5)/K148,0))
R147: [A1]==IF(AU147=1,"X","") | [J10]=Distance from office to job (one way) | [K11]==IF([1]Details!$C$12=0,"",[1]Details!$C$12) | [M13]=The value of the csv import on upload should match the figures to the right ↵(this may be less than the totals to the left as optional items are not calculated up on the import until the customer selects them) | [S19]=Sub Total | [U21]==SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!L:L,"No",'CF CSV Upload'!Q:Q,"Yes") | [AT46]==IF(K147<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K147=""),1,0)
R148: [A1]==IF(AU148=1,"X","") | [J10]=No of men travelling | [S19]=Tax: VAT (20%)	 | [U21]==U147*0.2 | [AT46]==IF(K148<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K148=""),1,0)
R149: [A1]==IF(AU149=1,"X","") | [S19]=Total | [U21]==U147+U148
R151: [A1]==IF(AU151=1,"X","") | [B2]=Choose Estimate Cover Sheet Image To Use (dropdown) | [M13]=View Images (this link will take you to the the Estimates Coversheet Images Tab) | [AT46]==IF(F151<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F151=""),1,0)
R152: [B2]=Survey sheet end
R153: [C3]=Base Travel Hourly rate  | [D4]=Base Labour Hourly rate  | [E5]=Contractor Labour Hourly rate  | [F6]=Approx Travel cost
R154: [F6]=Hours | [H8]=mens travel | [J10]=Vehicle cost | [K11]=Total
R155: [C3]==D155 | [D4]=30.63 | [E5]=28 | [F6]==O141 | [H8]==F155*D155 | [J10]=0.5 | [K11]==(F155*C155)+(K146*K147*2)*J155
```

## SECTION 4: CF CSV UPLOAD SHEET

**Total Rows:** 188  |  **Total Cols:** 17

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
R2: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B21 | [D4]==Costing!F21 | [E5]==Costing!I21 | [F6]==Costing!G21 | [G7]=Damp Materials | [H8]==Costing!J21*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J2="MTL","Preservation Shop","") | [N14]==D2*E2 | [O15]=DELETE | [P16]==N2*(1+(H2/100)) | [Q17]=No
R3: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B22 | [D4]==Costing!F22 | [E5]==Costing!I22 | [F6]==Costing!G22 | [G7]=Damp Materials | [H8]==Costing!J22*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J3="MTL","Preservation Shop","") | [N14]==D3*E3 | [O15]=DELETE | [P16]==N3*(1+(H3/100)) | [Q17]=No
R4: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B23 | [D4]==Costing!F23 | [E5]==Costing!I23 | [F6]==Costing!G23 | [G7]=Damp Materials | [H8]==Costing!J23*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J4="MTL","Preservation Shop","") | [N14]==D4*E4 | [O15]=DELETE | [P16]==N4*(1+(H4/100)) | [Q17]=No
R5: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B24 | [D4]==Costing!F24 | [E5]==Costing!I24 | [F6]==Costing!G24 | [G7]=Damp Materials | [H8]==Costing!J24*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J5="MTL","Preservation Shop","") | [N14]==D5*E5 | [O15]=DELETE | [P16]==N5*(1+(H5/100)) | [Q17]=No
R6: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B25 | [D4]==Costing!F25 | [E5]==Costing!I25 | [F6]==Costing!G25 | [G7]=Damp Materials | [H8]==Costing!J25*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J6="MTL","Preservation Shop","") | [N14]==D6*E6 | [O15]=DELETE | [P16]==N6*(1+(H6/100)) | [Q17]=No
R7: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B29 | [D4]==Costing!F29 | [E5]==Costing!I29 | [F6]==Costing!G29 | [G7]=Damp Materials | [H8]==Costing!J29*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J7="MTL","Preservation Shop","") | [N14]==D7*E7 | [O15]=DELETE | [P16]==N7*(1+(H7/100)) | [Q17]=No
R8: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B30 | [D4]==Costing!F30 | [E5]==Costing!I30 | [F6]==Costing!G30 | [G7]=Damp Materials | [H8]==Costing!J30*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J8="MTL","Preservation Shop","") | [N14]==D8*E8 | [O15]=DELETE | [P16]==N8*(1+(H8/100)) | [Q17]=No
R9: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B31 | [D4]==Costing!F31 | [E5]==Costing!I31 | [F6]==Costing!G31 | [G7]=Damp Materials | [H8]==Costing!J31*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J9="MTL","Preservation Shop","") | [N14]==D9*E9 | [O15]=DELETE | [P16]==N9*(1+(H9/100)) | [Q17]=No
R10: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B32 | [D4]==Costing!F32 | [E5]==Costing!I32 | [F6]==Costing!G32 | [G7]=Damp Materials | [H8]==Costing!J32*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J10="MTL","Preservation Shop","") | [N14]==D10*E10 | [O15]=DELETE | [P16]==N10*(1+(H10/100)) | [Q17]=No
R11: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B33 | [D4]==Costing!F33 | [E5]==Costing!I33 | [F6]==Costing!G33 | [G7]=Damp Materials | [H8]==Costing!J33*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J11="MTL","Preservation Shop","") | [N14]==D11*E11 | [O15]=DELETE | [P16]==N11*(1+(H11/100)) | [Q17]=No
R12: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B34 | [D4]==Costing!F34 | [E5]==Costing!I34 | [F6]==Costing!G34 | [G7]=Damp Materials | [H8]==Costing!J34*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J12="MTL","Preservation Shop","") | [N14]==D12*E12 | [O15]=DELETE | [P16]==N12*(1+(H12/100)) | [Q17]=No
R13: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!B35 | [D4]==Costing!F35 | [E5]==Costing!I35 | [F6]==Costing!G35 | [G7]=Damp Materials | [H8]==Costing!J35*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J13="MTL","Preservation Shop","") | [N14]==D13*E13 | [O15]=DELETE | [P16]==N13*(1+(H13/100)) | [Q17]=No
R14: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M21 | [D4]==Costing!O21 | [E5]==Costing!Q21 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R21*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J14="MTL","Preservation Shop","") | [N14]==D14*E14 | [O15]=DELETE | [P16]==N14*(1+(H14/100)) | [Q17]=No
R15: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M22 | [D4]==Costing!O22 | [E5]==Costing!Q22 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R22*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J15="MTL","Preservation Shop","") | [N14]==D15*E15 | [O15]=DELETE | [P16]==N15*(1+(H15/100)) | [Q17]=No
R16: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M23 | [D4]==Costing!O23 | [E5]==Costing!Q23 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R23*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J16="MTL","Preservation Shop","") | [N14]==D16*E16 | [O15]=DELETE | [P16]==N16*(1+(H16/100)) | [Q17]=No
R17: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M24 | [D4]==Costing!O24 | [E5]==Costing!Q23 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R24*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J17="MTL","Preservation Shop","") | [N14]==D17*E17 | [O15]=DELETE | [P16]==N17*(1+(H17/100)) | [Q17]=No
R18: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M25 | [D4]==Costing!O25 | [E5]==Costing!Q24 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R25*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J18="MTL","Preservation Shop","") | [N14]==D18*E18 | [O15]=DELETE | [P16]==N18*(1+(H18/100)) | [Q17]=No
R19: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M29 | [D4]==Costing!O29 | [E5]==Costing!Q29 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R29*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J19="MTL","Preservation Shop","") | [N14]==D19*E19 | [O15]=DELETE | [P16]==N19*(1+(H19/100)) | [Q17]=No
R20: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M30 | [D4]==Costing!O30 | [E5]==Costing!Q30 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R30*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J20="MTL","Preservation Shop","") | [N14]==D20*E20 | [O15]=DELETE | [P16]==N20*(1+(H20/100)) | [Q17]=No
R21: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M31 | [D4]==Costing!O31 | [E5]==Costing!Q31 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R31*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J21="MTL","Preservation Shop","") | [N14]==D21*E21 | [O15]=DELETE | [P16]==N21*(1+(H21/100)) | [Q17]=No
R22: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M32 | [D4]==Costing!O32 | [E5]==Costing!Q32 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R32*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J22="MTL","Preservation Shop","") | [N14]==D22*E22 | [O15]=DELETE | [P16]==N22*(1+(H22/100)) | [Q17]=No
R23: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M33 | [D4]==Costing!O33 | [E5]==Costing!Q33 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R33*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J23="MTL","Preservation Shop","") | [N14]==D23*E23 | [O15]=DELETE | [P16]==N23*(1+(H23/100)) | [Q17]=No
R24: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M34 | [D4]==Costing!O34 | [E5]==Costing!Q34 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R34*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J24="MTL","Preservation Shop","") | [N14]==D24*E24 | [O15]=DELETE | [P16]==N24*(1+(H24/100)) | [Q17]=No
R25: [A1]=='Customer Summary'!$C$4 | [C3]==Costing!M35 | [D4]==Costing!O35 | [E5]==Costing!Q35 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R35*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J25="MTL","Preservation Shop","") | [N14]==D25*E25 | [O15]=DELETE | [P16]==N25*(1+(H25/100)) | [Q17]=No
R26: [A1]=='Customer Summary'!$C$4 | [C3]==_xlfn.CONCAT(A26," - Materials") | [D4]=1 | [E5]==N26 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P26-N26)/N26)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D4 | [M13]==IF(J26="MTL","Preservation Shop","") | [N14]==SUM(N2:N13) | [O15]==IF(N26=0,"DELETE","LEAVE") | [P16]==SUM(P2:P13) | [Q17]=Yes
R27: [A1]=='Customer Summary'!$C$4 | [C3]==_xlfn.CONCAT(A27," - Labour") | [D4]==SUM(D14:D25) | [E5]==N27/D27 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P27-N27)/N27)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L26 | [M13]==IF(J27="MTL","Preservation Shop","") | [N14]==SUM(N14:N25) | [O15]==IF(N27=0,"DELETE","LEAVE") | [P16]==SUM(P14:P25) | [Q17]=Yes
R28: [O15]=DELETE
R29: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B40 | [D4]==Costing!F40 | [E5]==Costing!I40 | [F6]==Costing!G40 | [G7]=Damp Materials | [H8]==Costing!J40*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J29="MTL","Preservation Shop","") | [N14]==D29*E29 | [O15]=DELETE | [P16]==N29*(1+(H29/100)) | [Q17]=No
R30: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B42 | [D4]==Costing!F42 | [E5]==Costing!I42 | [F6]==Costing!G42 | [G7]=Damp Materials | [H8]==Costing!J42*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J30="MTL","Preservation Shop","") | [N14]==D30*E30 | [O15]=DELETE | [P16]==N30*(1+(H30/100)) | [Q17]=No
R31: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B44 | [D4]==Costing!F44 | [E5]==Costing!I44 | [F6]==Costing!G44 | [G7]=Damp Materials | [H8]==Costing!J44*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J31="MTL","Preservation Shop","") | [N14]==D31*E31 | [O15]=DELETE | [P16]==N31*(1+(H31/100)) | [Q17]=No
R32: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B45 | [D4]==Costing!F45 | [E5]==Costing!I45 | [F6]==Costing!G45 | [G7]=Damp Materials | [H8]==Costing!J45*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J32="MTL","Preservation Shop","") | [N14]==D32*E32 | [O15]=DELETE | [P16]==N32*(1+(H32/100)) | [Q17]=No
R33: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B46 | [D4]==Costing!F46 | [E5]==Costing!I46 | [F6]==Costing!G46 | [G7]=Damp Materials | [H8]==Costing!J46*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J33="MTL","Preservation Shop","") | [N14]==D33*E33 | [O15]=DELETE | [P16]==N33*(1+(H33/100)) | [Q17]=No
R34: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B47 | [D4]==Costing!F47 | [E5]==Costing!I47 | [F6]==Costing!G47 | [G7]=Damp Materials | [H8]==Costing!J47*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J34="MTL","Preservation Shop","") | [N14]==D34*E34 | [O15]=DELETE | [P16]==N34*(1+(H34/100)) | [Q17]=No
R35: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B48 | [D4]==Costing!F48 | [E5]==Costing!I48 | [F6]==Costing!G48 | [G7]=Damp Materials | [H8]==Costing!J48*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J35="MTL","Preservation Shop","") | [N14]==D35*E35 | [O15]=DELETE | [P16]==N35*(1+(H35/100)) | [Q17]=No
R36: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B49 | [D4]==Costing!F49 | [E5]==Costing!I49 | [F6]==Costing!G49 | [G7]=Damp Materials | [H8]==Costing!J49*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J36="MTL","Preservation Shop","") | [N14]==D36*E36 | [O15]=DELETE | [P16]==N36*(1+(H36/100)) | [Q17]=No
R37: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B50 | [D4]==Costing!F50 | [E5]==Costing!I50 | [F6]==Costing!G50 | [G7]=Damp Materials | [H8]==Costing!J50*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J37="MTL","Preservation Shop","") | [N14]==D37*E37 | [O15]=DELETE | [P16]==N37*(1+(H37/100)) | [Q17]=No
R38: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B51 | [D4]==Costing!F51 | [E5]==Costing!I51 | [F6]==Costing!G51 | [G7]=Damp Materials | [H8]==Costing!J51*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J38="MTL","Preservation Shop","") | [N14]==D38*E38 | [O15]=DELETE | [P16]==N38*(1+(H38/100)) | [Q17]=No
R39: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B52 | [D4]==Costing!F52 | [E5]==Costing!I52 | [F6]==Costing!G52 | [G7]=Damp Materials | [H8]==Costing!J52*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J39="MTL","Preservation Shop","") | [N14]==D39*E39 | [O15]=DELETE | [P16]==N39*(1+(H39/100)) | [Q17]=No
R40: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B53 | [D4]==Costing!F53 | [E5]==Costing!I53 | [F6]==Costing!G53 | [G7]=Damp Materials | [H8]==Costing!J53*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J40="MTL","Preservation Shop","") | [N14]==D40*E40 | [O15]=DELETE | [P16]==N40*(1+(H40/100)) | [Q17]=No
R41: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B55 | [D4]==Costing!F55 | [E5]==Costing!I55 | [F6]==Costing!G55 | [G7]=Damp Materials | [H8]==Costing!J55*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J41="MTL","Preservation Shop","") | [N14]==D41*E41 | [O15]=DELETE | [P16]==N41*(1+(H41/100)) | [Q17]=No
R42: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B56 | [D4]==Costing!F56 | [E5]==Costing!I56 | [F6]==Costing!G56 | [G7]=Damp Materials | [H8]==Costing!J56*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J42="MTL","Preservation Shop","") | [N14]==D42*E42 | [O15]=DELETE | [P16]==N42*(1+(H42/100)) | [Q17]=No
R43: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!B57 | [D4]==Costing!F57 | [E5]==Costing!I57 | [F6]==Costing!G57 | [G7]=Damp Materials | [H8]==Costing!J57*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J43="MTL","Preservation Shop","") | [N14]==D43*E43 | [O15]=DELETE | [P16]==N43*(1+(H43/100)) | [Q17]=No
R44: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M40 | [D4]==Costing!O40 | [E5]==Costing!Q40 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R40*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J44="MTL","Preservation Shop","") | [N14]==D44*E44 | [O15]=DELETE | [P16]==N44*(1+(H44/100)) | [Q17]=No
R45: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M42 | [D4]==Costing!O42 | [E5]==Costing!Q42 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R42*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J45="MTL","Preservation Shop","") | [N14]==D45*E45 | [O15]=DELETE | [P16]==N45*(1+(H45/100)) | [Q17]=No
R46: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M44 | [D4]==Costing!O44 | [E5]==Costing!Q44 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R44*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J46="MTL","Preservation Shop","") | [N14]==D46*E46 | [O15]=DELETE | [P16]==N46*(1+(H46/100)) | [Q17]=No
R47: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M45 | [D4]==Costing!O45 | [E5]==Costing!Q45 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R45*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J47="MTL","Preservation Shop","") | [N14]==D47*E47 | [O15]=DELETE | [P16]==N47*(1+(H47/100)) | [Q17]=No
R48: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M46 | [D4]==Costing!O46 | [E5]==Costing!Q46 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R46*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J48="MTL","Preservation Shop","") | [N14]==D48*E48 | [O15]=DELETE | [P16]==N48*(1+(H48/100)) | [Q17]=No
R49: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M47 | [D4]==Costing!O47 | [E5]==Costing!Q47 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R47*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J49="MTL","Preservation Shop","") | [N14]==D49*E49 | [O15]=DELETE | [P16]==N49*(1+(H49/100)) | [Q17]=No
R50: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M48 | [D4]==Costing!O48 | [E5]==Costing!Q48 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R48*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J50="MTL","Preservation Shop","") | [N14]==D50*E50 | [O15]=DELETE | [P16]==N50*(1+(H50/100)) | [Q17]=No
R51: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M49 | [D4]==Costing!O49 | [E5]==Costing!Q49 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R49*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J51="MTL","Preservation Shop","") | [N14]==D51*E51 | [O15]=DELETE | [P16]==N51*(1+(H51/100)) | [Q17]=No
R52: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M50 | [D4]==Costing!O50 | [E5]==Costing!Q50 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R50*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J52="MTL","Preservation Shop","") | [N14]==D52*E52 | [O15]=DELETE | [P16]==N52*(1+(H52/100)) | [Q17]=No
R53: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M51 | [D4]==Costing!O51 | [E5]==Costing!Q51 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R51*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J53="MTL","Preservation Shop","") | [N14]==D53*E53 | [O15]=DELETE | [P16]==N53*(1+(H53/100)) | [Q17]=No
R54: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M52 | [D4]==Costing!O52 | [E5]==Costing!Q52 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R52*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J54="MTL","Preservation Shop","") | [N14]==D54*E54 | [O15]=DELETE | [P16]==N54*(1+(H54/100)) | [Q17]=No
R55: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M53 | [D4]==Costing!O53 | [E5]==Costing!Q53 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R53*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J55="MTL","Preservation Shop","") | [N14]==D55*E55 | [O15]=DELETE | [P16]==N55*(1+(H55/100)) | [Q17]=No
R56: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M55 | [D4]==Costing!O55 | [E5]==Costing!Q55 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R55*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J56="MTL","Preservation Shop","") | [N14]==D56*E56 | [O15]=DELETE | [P16]==N56*(1+(H56/100)) | [Q17]=No
R57: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M56 | [D4]==Costing!O56 | [E5]==Costing!Q56 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R56*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J57="MTL","Preservation Shop","") | [N14]==D57*E57 | [O15]=DELETE | [P16]==N57*(1+(H57/100)) | [Q17]=No
R58: [A1]=='Customer Summary'!$C$5 | [C3]==Costing!M57 | [D4]==Costing!O57 | [E5]==Costing!Q57 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R57*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J58="MTL","Preservation Shop","") | [N14]==D58*E58 | [O15]=DELETE | [P16]==N58*(1+(H58/100)) | [Q17]=No
R59: [A1]=='Customer Summary'!$C$5 | [C3]==_xlfn.CONCAT(A59," - Materials") | [D4]=1 | [E5]==N59 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P59-N59)/N59)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D5 | [M13]==IF(J59="MTL","Preservation Shop","") | [N14]==SUM(N29:N43) | [O15]==IF(N59=0,"DELETE","LEAVE") | [P16]==SUM(P29:P43) | [Q17]=Yes
R60: [A1]=='Customer Summary'!$C$5 | [C3]==_xlfn.CONCAT(A60," - Labour") | [D4]==SUM(D44:D58) | [E5]==N60/D60 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P60-N60)/N60)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L59 | [M13]==IF(J60="MTL","Preservation Shop","") | [N14]==SUM(N44:N58) | [O15]==IF(N60=0,"DELETE","LEAVE") | [P16]==SUM(P44:P58) | [Q17]=Yes
R61: [O15]=DELETE
R62: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!B61 | [D4]==Costing!F61 | [E5]==Costing!I61 | [F6]==Costing!G61 | [G7]=Damp Materials | [H8]==Costing!J61*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J62="MTL","Preservation Shop","") | [N14]==D62*E62 | [O15]=DELETE | [P16]==N62*(1+(H62/100)) | [Q17]=No
R63: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!B62 | [D4]==Costing!F62 | [E5]==Costing!I62 | [F6]==Costing!G62 | [G7]=Damp Materials | [H8]==Costing!J62*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J63="MTL","Preservation Shop","") | [N14]==D63*E63 | [O15]=DELETE | [P16]==N63*(1+(H63/100)) | [Q17]=No
R64: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!B63 | [D4]==Costing!F63 | [E5]==Costing!I63 | [F6]==Costing!G63 | [G7]=Damp Materials | [H8]==Costing!J63*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J64="MTL","Preservation Shop","") | [N14]==D64*E64 | [O15]=DELETE | [P16]==N64*(1+(H64/100)) | [Q17]=No
R65: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!B64 | [D4]==Costing!F64 | [E5]==Costing!I64 | [F6]==Costing!G64 | [G7]=Damp Materials | [H8]==Costing!J64*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J65="MTL","Preservation Shop","") | [N14]==D65*E65 | [O15]=DELETE | [P16]==N65*(1+(H65/100)) | [Q17]=No
R66: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!B65 | [D4]==Costing!F65 | [E5]==Costing!I65 | [F6]==Costing!G65 | [G7]=Damp Materials | [H8]==Costing!J65*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J66="MTL","Preservation Shop","") | [N14]==D66*E66 | [O15]=DELETE | [P16]==N66*(1+(H66/100)) | [Q17]=No
R67: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!M61 | [D4]==Costing!O61 | [E5]==Costing!Q61 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R61*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J67="MTL","Preservation Shop","") | [N14]==D67*E67 | [O15]=DELETE | [P16]==N67*(1+(H67/100)) | [Q17]=No
R68: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!M62 | [D4]==Costing!O62 | [E5]==Costing!Q62 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R62*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J68="MTL","Preservation Shop","") | [N14]==D68*E68 | [O15]=DELETE | [P16]==N68*(1+(H68/100)) | [Q17]=No
R69: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!M63 | [D4]==Costing!O63 | [E5]==Costing!Q63 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R63*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J69="MTL","Preservation Shop","") | [N14]==D69*E69 | [O15]=DELETE | [P16]==N69*(1+(H69/100)) | [Q17]=No
R70: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!M64 | [D4]==Costing!O64 | [E5]==Costing!Q64 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R64*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J70="MTL","Preservation Shop","") | [N14]==D70*E70 | [O15]=DELETE | [P16]==N70*(1+(H70/100)) | [Q17]=No
R71: [A1]=='Customer Summary'!$C$6 | [C3]==Costing!M65 | [D4]==Costing!O65 | [E5]==Costing!Q65 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R65*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J71="MTL","Preservation Shop","") | [N14]==D71*E71 | [O15]=DELETE | [P16]==N71*(1+(H71/100)) | [Q17]=No
R72: [A1]=='Customer Summary'!$C$6 | [C3]=Cementitious tanking system - Materials | [D4]=1 | [E5]==N72 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P72-N72)/N72)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D6 | [M13]==IF(J72="MTL","Preservation Shop","") | [N14]==SUM(N62:N66) | [O15]==IF(N72=0,"DELETE","LEAVE") | [P16]==SUM(P62:P66) | [Q17]=Yes
R73: [A1]=='Customer Summary'!$C$6 | [C3]=Cementitious tanking system - Labour | [D4]==SUM(D67:D71) | [E5]==N73/D73 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P73-N73)/N73)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L72 | [M13]==IF(J73="MTL","Preservation Shop","") | [N14]==SUM(N67:N71) | [O15]==IF(N73=0,"DELETE","LEAVE") | [P16]==SUM(P67:P71) | [Q17]=Yes
R74: [O15]=DELETE
R75: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!B69 | [D4]==Costing!F69 | [E5]==Costing!I69 | [F6]=Each | [G7]=Damp Materials | [H8]==Costing!J69*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J75="MTL","Preservation Shop","") | [N14]==D75*E75 | [O15]=DELETE | [P16]==N75*(1+(H75/100)) | [Q17]=No
R76: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!B70 | [D4]==Costing!F70 | [E5]==Costing!I70 | [F6]=Each | [G7]=Damp Materials | [H8]==Costing!J70*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J76="MTL","Preservation Shop","") | [N14]==D76*E76 | [O15]=DELETE | [P16]==N76*(1+(H76/100)) | [Q17]=No
R77: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!B71 | [D4]==Costing!F71 | [E5]==Costing!I71 | [F6]=Each | [G7]=Damp Materials | [H8]==Costing!J71*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J77="MTL","Preservation Shop","") | [N14]==D77*E77 | [O15]=DELETE | [P16]==N77*(1+(H77/100)) | [Q17]=No
R78: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!B72 | [D4]==Costing!F72 | [E5]==Costing!I72 | [F6]=Each | [G7]=Damp Materials | [H8]==Costing!J72*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J78="MTL","Preservation Shop","") | [N14]==D78*E78 | [O15]=DELETE | [P16]==N78*(1+(H78/100)) | [Q17]=No
R79: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!B73 | [D4]==Costing!F73 | [E5]==Costing!I73 | [F6]=Each | [G7]=Damp Materials | [H8]==Costing!J73*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J79="MTL","Preservation Shop","") | [N14]==D79*E79 | [O15]=DELETE | [P16]==N79*(1+(H79/100)) | [Q17]=No
R80: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!M69 | [D4]==Costing!O69 | [E5]==Costing!Q69 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R69*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J80="MTL","Preservation Shop","") | [N14]==D80*E80 | [O15]=DELETE | [P16]==N80*(1+(H80/100)) | [Q17]=No
R81: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!M70 | [D4]==Costing!O70 | [E5]==Costing!Q70 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R70*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J81="MTL","Preservation Shop","") | [N14]==D81*E81 | [O15]=DELETE | [P16]==N81*(1+(H81/100)) | [Q17]=No
R82: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!M71 | [D4]==Costing!O71 | [E5]==Costing!Q71 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R71*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J82="MTL","Preservation Shop","") | [N14]==D82*E82 | [O15]=DELETE | [P16]==N82*(1+(H82/100)) | [Q17]=No
R83: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!M72 | [D4]==Costing!O72 | [E5]==Costing!Q72 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R72*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J83="MTL","Preservation Shop","") | [N14]==D83*E83 | [O15]=DELETE | [P16]==N83*(1+(H83/100)) | [Q17]=No
R84: [A1]=='Customer Summary'!$C$7 | [C3]==Costing!M73 | [D4]==Costing!O73 | [E5]==Costing!Q73 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R73*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J84="MTL","Preservation Shop","") | [N14]==D84*E84 | [O15]=DELETE | [P16]==N84*(1+(H84/100)) | [Q17]=No
R85: [A1]=='Customer Summary'!$C$7 | [C3]==_xlfn.CONCAT(A85," - Materials") | [D4]=1 | [E5]==N85 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P85-N85)/N85)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D7 | [M13]==IF(J85="MTL","Preservation Shop","") | [N14]==SUM(N75:N79) | [O15]==IF(N85=0,"DELETE","LEAVE") | [P16]==SUM(P75:P79) | [Q17]=Yes
R86: [A1]=='Customer Summary'!$C$7 | [C3]==_xlfn.CONCAT(A86," - Labour") | [D4]==SUM(D80:D84) | [E5]==N86/D86 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P86-N86)/N86)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L85 | [M13]==IF(J86="MTL","Preservation Shop","") | [N14]==SUM(N80:N84) | [O15]==IF(N86=0,"DELETE","LEAVE") | [P16]==SUM(P80:P84) | [Q17]=Yes
R87: [O15]=DELETE
R88: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B77 | [D4]==Costing!F77 | [E5]==Costing!I77 | [F6]==Costing!G77 | [G7]=Damp Materials | [H8]==Costing!J77*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J88="MTL","Preservation Shop","") | [N14]==D88*E88 | [O15]=DELETE | [P16]==N88*(1+(H88/100)) | [Q17]=No
R89: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B78 | [D4]==Costing!F78 | [E5]==Costing!I78 | [F6]==Costing!G78 | [G7]=Damp Materials | [H8]==Costing!J78*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J89="MTL","Preservation Shop","") | [N14]==D89*E89 | [O15]=DELETE | [P16]==N89*(1+(H89/100)) | [Q17]=No
R90: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B80 | [D4]==Costing!F80 | [E5]==Costing!I80 | [F6]==Costing!G80 | [G7]=Damp Materials | [H8]==Costing!J80*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J90="MTL","Preservation Shop","") | [N14]==D90*E90 | [O15]=DELETE | [P16]==N90*(1+(H90/100)) | [Q17]=No
R91: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B81 | [D4]==Costing!F81 | [E5]==Costing!I81 | [F6]==Costing!G81 | [G7]=Damp Materials | [H8]==Costing!J81*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J91="MTL","Preservation Shop","") | [N14]==D91*E91 | [O15]=DELETE | [P16]==N91*(1+(H91/100)) | [Q17]=No
R92: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B82 | [D4]==Costing!F82 | [E5]==Costing!I82 | [F6]==Costing!G82 | [G7]=Damp Materials | [H8]==Costing!J82*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J92="MTL","Preservation Shop","") | [N14]==D92*E92 | [O15]=DELETE | [P16]==N92*(1+(H92/100)) | [Q17]=No
R93: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B83 | [D4]==Costing!F83 | [E5]==Costing!I83 | [F6]==Costing!G83 | [G7]=Damp Materials | [H8]==Costing!J83*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J93="MTL","Preservation Shop","") | [N14]==D93*E93 | [O15]=DELETE | [P16]==N93*(1+(H93/100)) | [Q17]=No
R94: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!B84 | [D4]=0 | [E5]==Costing!I84 | [F6]==Costing!G84 | [G7]=Damp Materials | [H8]==Costing!J84*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J94="MTL","Preservation Shop","") | [N14]==D94*E94 | [O15]=DELETE | [P16]==N94*(1+(H94/100)) | [Q17]=No
R95: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M77 | [D4]==Costing!O77 | [E5]==Costing!Q77 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R77*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J95="MTL","Preservation Shop","") | [N14]==D95*E95 | [O15]=DELETE | [P16]==N95*(1+(H95/100)) | [Q17]=No
R96: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M78 | [D4]==Costing!O78 | [E5]==Costing!Q78 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R78*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J96="MTL","Preservation Shop","") | [N14]==D96*E96 | [O15]=DELETE | [P16]==N96*(1+(H96/100)) | [Q17]=No
R97: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M80 | [D4]==Costing!O80 | [E5]==Costing!Q80 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R80*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J97="MTL","Preservation Shop","") | [N14]==D97*E97 | [O15]=DELETE | [P16]==N97*(1+(H97/100)) | [Q17]=No
R98: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M81 | [D4]==Costing!O81 | [E5]==Costing!Q81 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R81*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J98="MTL","Preservation Shop","") | [N14]==D98*E98 | [O15]=DELETE | [P16]==N98*(1+(H98/100)) | [Q17]=No
R99: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M82 | [D4]==Costing!O82 | [E5]==Costing!Q82 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R82*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J99="MTL","Preservation Shop","") | [N14]==D99*E99 | [O15]=DELETE | [P16]==N99*(1+(H99/100)) | [Q17]=No
R100: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M83 | [D4]==Costing!O83 | [E5]==Costing!Q83 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R83*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J100="MTL","Preservation Shop","") | [N14]==D100*E100 | [O15]=DELETE | [P16]==N100*(1+(H100/100)) | [Q17]=No
R101: [A1]=='Customer Summary'!$C$8 | [C3]==Costing!M84 | [D4]==Costing!O84 | [E5]==Costing!Q84 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R84*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J101="MTL","Preservation Shop","") | [N14]==D101*E101 | [O15]=DELETE | [P16]==N101*(1+(H101/100)) | [Q17]=No
R102: [A1]=='Customer Summary'!$C$8 | [C3]==_xlfn.CONCAT(A102," - Materials") | [D4]=1 | [E5]==N102 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P102-N102)/N102)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D8 | [M13]==IF(J102="MTL","Preservation Shop","") | [N14]==SUM(N88:N94) | [O15]==IF(N102=0,"DELETE","LEAVE") | [P16]==SUM(P88:P94) | [Q17]=Yes
R103: [A1]=='Customer Summary'!$C$8 | [C3]==_xlfn.CONCAT(A103," - Labour") | [D4]==SUM(D95:D101) | [E5]==N103/D103 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P103-N103)/N103)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L102 | [M13]==IF(J103="MTL","Preservation Shop","") | [N14]==SUM(N95:N101) | [O15]==IF(N103=0,"DELETE","LEAVE") | [P16]==SUM(P95:P101) | [Q17]=Yes
R104: [O15]=DELETE
R105: [A1]=='Customer Summary'!$C$9 | [C3]==Costing!B79 | [D4]==Costing!F79 | [E5]==Costing!I79 | [F6]==Costing!G79 | [G7]=Damp Materials | [H8]==Costing!J79*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J105="MTL","Preservation Shop","") | [N14]==D105*E105 | [O15]=DELETE | [P16]==N105*(1+(H105/100)) | [Q17]=No
R106: [A1]=='Customer Summary'!$C$9 | [C3]==Costing!M79 | [D4]==Costing!O79 | [E5]==Costing!Q79 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R79*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J106="MTL","Preservation Shop","") | [N14]==D106*E106 | [O15]=DELETE | [P16]==N106*(1+(H106/100)) | [Q17]=No
R107: [A1]=='Customer Summary'!$C$9 | [C3]==_xlfn.CONCAT(A107," - Materials") | [D4]=1 | [E5]==N107 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P107-N107)/N107)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D9 | [M13]==IF(J107="MTL","Preservation Shop","") | [N14]==SUM(N105) | [O15]==IF(N107=0,"DELETE","LEAVE") | [P16]==SUM(P105) | [Q17]=Yes
R108: [A1]=='Customer Summary'!$C$9 | [C3]==_xlfn.CONCAT(A108," - Labour") | [D4]==SUM(D106) | [E5]==N108/D108 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P108-N108)/N108)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L107 | [M13]==IF(J108="MTL","Preservation Shop","") | [N14]==SUM(N106) | [O15]==IF(N108=0,"DELETE","LEAVE") | [P16]==SUM(P106) | [Q17]=Yes
R109: [O15]=DELETE
R110: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B89 | [D4]==Costing!F89 | [E5]==Costing!I89 | [F6]==Costing!G89 | [G7]=Damp Materials | [H8]==Costing!J89*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J110="MTL","Preservation Shop","") | [N14]==D110*E110 | [O15]=DELETE | [P16]==N110*(1+(H110/100)) | [Q17]=No
R111: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B90 | [D4]==Costing!F90 | [E5]==Costing!I90 | [F6]==Costing!G90 | [G7]=Damp Materials | [H8]==Costing!J90*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J111="MTL","Preservation Shop","") | [N14]==D111*E111 | [O15]=DELETE | [P16]==N111*(1+(H111/100)) | [Q17]=No
R112: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B91 | [D4]==Costing!F91 | [E5]==Costing!I91 | [F6]==Costing!G91 | [G7]=Damp Materials | [H8]==Costing!J91*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J112="MTL","Preservation Shop","") | [N14]==D112*E112 | [O15]=DELETE | [P16]==N112*(1+(H112/100)) | [Q17]=No
R113: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B92 | [D4]==Costing!F92 | [E5]==Costing!I92 | [F6]==Costing!G92 | [G7]=Damp Materials | [H8]==Costing!J92*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J113="MTL","Preservation Shop","") | [N14]==D113*E113 | [O15]=DELETE | [P16]==N113*(1+(H113/100)) | [Q17]=No
R114: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B93 | [D4]==Costing!F93 | [E5]==Costing!I93 | [F6]==Costing!G93 | [G7]=Damp Materials | [H8]==Costing!J93*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J114="MTL","Preservation Shop","") | [N14]==D114*E114 | [O15]=DELETE | [P16]==N114*(1+(H114/100)) | [Q17]=No
R115: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B94 | [D4]==Costing!F94 | [E5]==Costing!I94 | [F6]==Costing!G94 | [G7]=Damp Materials | [H8]==Costing!J94*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J115="MTL","Preservation Shop","") | [N14]==D115*E115 | [O15]=DELETE | [P16]==N115*(1+(H115/100)) | [Q17]=No
R116: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B95 | [D4]==Costing!F95 | [E5]==Costing!I95 | [F6]==Costing!G95 | [G7]=Damp Materials | [H8]==Costing!J95*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J116="MTL","Preservation Shop","") | [N14]==D116*E116 | [O15]=DELETE | [P16]==N116*(1+(H116/100)) | [Q17]=No
R117: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B96 | [D4]==Costing!F96 | [E5]==Costing!I96 | [F6]==Costing!G96 | [G7]=Damp Materials | [H8]==Costing!J96*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J117="MTL","Preservation Shop","") | [N14]==D117*E117 | [O15]=DELETE | [P16]==N117*(1+(H117/100)) | [Q17]=No
R118: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B97 | [D4]==Costing!F97 | [E5]==Costing!I97 | [F6]==Costing!G97 | [G7]=Damp Materials | [H8]==Costing!J97*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J118="MTL","Preservation Shop","") | [N14]==D118*E118 | [O15]=DELETE | [P16]==N118*(1+(H118/100)) | [Q17]=No
R119: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B98 | [D4]==Costing!F98 | [E5]==Costing!I98 | [F6]==Costing!G98 | [G7]=Damp Materials | [H8]==Costing!J98*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J119="MTL","Preservation Shop","") | [N14]==D119*E119 | [O15]=DELETE | [P16]==N119*(1+(H119/100)) | [Q17]=No
R120: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B99 | [D4]==Costing!F99 | [E5]==Costing!I99 | [F6]==Costing!G99 | [G7]=Damp Materials | [H8]==Costing!J99*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J120="MTL","Preservation Shop","") | [N14]==D120*E120 | [O15]=DELETE | [P16]==N120*(1+(H120/100)) | [Q17]=No
R121: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M89 | [D4]==Costing!O89 | [E5]==Costing!Q89 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R89*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J121="MTL","Preservation Shop","") | [N14]==D121*E121 | [O15]=DELETE | [P16]==N121*(1+(H121/100)) | [Q17]=No
R122: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M90 | [D4]==Costing!O90 | [E5]==Costing!Q90 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R90*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J122="MTL","Preservation Shop","") | [N14]==D122*E122 | [O15]=DELETE | [P16]==N122*(1+(H122/100)) | [Q17]=No
R123: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M91 | [D4]==Costing!O91 | [E5]==Costing!Q91 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R91*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J123="MTL","Preservation Shop","") | [N14]==D123*E123 | [O15]=DELETE | [P16]==N123*(1+(H123/100)) | [Q17]=No
R124: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M92 | [D4]==Costing!O92 | [E5]==Costing!Q92 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R92*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J124="MTL","Preservation Shop","") | [N14]==D124*E124 | [O15]=DELETE | [P16]==N124*(1+(H124/100)) | [Q17]=No
R125: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M93 | [D4]==Costing!O93 | [E5]==Costing!Q93 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R93*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J125="MTL","Preservation Shop","") | [N14]==D125*E125 | [O15]=DELETE | [P16]==N125*(1+(H125/100)) | [Q17]=No
R126: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M94 | [D4]==Costing!O94 | [E5]==Costing!Q94 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R94*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J126="MTL","Preservation Shop","") | [N14]==D126*E126 | [O15]=DELETE | [P16]==N126*(1+(H126/100)) | [Q17]=No
R127: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M95 | [D4]==Costing!O95 | [E5]==Costing!Q95 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R95*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J127="MTL","Preservation Shop","") | [N14]==D127*E127 | [O15]=DELETE | [P16]==N127*(1+(H127/100)) | [Q17]=No
R128: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M96 | [D4]==Costing!O96 | [E5]==Costing!Q96 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R96*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J128="MTL","Preservation Shop","") | [N14]==D128*E128 | [O15]=DELETE | [P16]==N128*(1+(H128/100)) | [Q17]=No
R129: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M97 | [D4]==Costing!O97 | [E5]==Costing!Q97 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R97*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J129="MTL","Preservation Shop","") | [N14]==D129*E129 | [O15]=DELETE | [P16]==N129*(1+(H129/100)) | [Q17]=No
R130: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M98 | [D4]==Costing!O98 | [E5]==Costing!Q98 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R98*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J130="MTL","Preservation Shop","") | [N14]==D130*E130 | [O15]=DELETE | [P16]==N130*(1+(H130/100)) | [Q17]=No
R131: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M99 | [D4]==Costing!O99 | [E5]==Costing!Q99 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R99*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J131="MTL","Preservation Shop","") | [N14]==D131*E131 | [O15]=DELETE | [P16]==N131*(1+(H131/100)) | [Q17]=No
R132: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B101 | [D4]==Costing!F101 | [E5]==Costing!I101 | [F6]==Costing!G101 | [G7]=Damp Materials | [H8]==Costing!J101*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J132="MTL","Preservation Shop","") | [N14]==D132*E132 | [O15]=DELETE | [P16]==N132*(1+(H132/100)) | [Q17]=No
R133: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B102 | [D4]==Costing!F102 | [E5]==Costing!I102 | [F6]==Costing!G102 | [G7]=Damp Materials | [H8]==Costing!J102*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J133="MTL","Preservation Shop","") | [N14]==D133*E133 | [O15]=DELETE | [P16]==N133*(1+(H133/100)) | [Q17]=No
R134: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B103 | [D4]==Costing!F103 | [E5]==Costing!I103 | [F6]==Costing!G103 | [G7]=Damp Materials | [H8]==Costing!J103*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J134="MTL","Preservation Shop","") | [N14]==D134*E134 | [O15]=DELETE | [P16]==N134*(1+(H134/100)) | [Q17]=No
R135: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B104 | [D4]==Costing!F104 | [E5]==Costing!I104 | [F6]==Costing!G104 | [G7]=Damp Materials | [H8]==Costing!J104*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J135="MTL","Preservation Shop","") | [N14]==D135*E135 | [O15]=DELETE | [P16]==N135*(1+(H135/100)) | [Q17]=No
R136: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B105 | [D4]==Costing!F105 | [E5]==Costing!I105 | [F6]==Costing!G105 | [G7]=Damp Materials | [H8]==Costing!J105*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J136="MTL","Preservation Shop","") | [N14]==D136*E136 | [O15]=DELETE | [P16]==N136*(1+(H136/100)) | [Q17]=No
R137: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B106 | [D4]==Costing!F106 | [E5]==Costing!I106 | [F6]==Costing!G106 | [G7]=Damp Materials | [H8]==Costing!J106*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J137="MTL","Preservation Shop","") | [N14]==D137*E137 | [O15]=DELETE | [P16]==N137*(1+(H137/100)) | [Q17]=No
R138: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B107 | [D4]==Costing!F107 | [E5]==Costing!I107 | [F6]==Costing!G107 | [G7]=Damp Materials | [H8]==Costing!J107*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J138="MTL","Preservation Shop","") | [N14]==D138*E138 | [O15]=DELETE | [P16]==N138*(1+(H138/100)) | [Q17]=No
R139: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!B108 | [D4]==Costing!F108 | [E5]==Costing!H108 | [F6]==Costing!G108 | [G7]=Damp Materials | [H8]==Costing!J108*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J139="MTL","Preservation Shop","") | [N14]==D139*E139 | [O15]=DELETE | [P16]==N139*(1+(H139/100)) | [Q17]=No
R140: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M101 | [D4]==Costing!O101 | [E5]==Costing!Q101 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R101*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J140="MTL","Preservation Shop","") | [N14]==D140*E140 | [O15]=DELETE | [P16]==N140*(1+(H140/100)) | [Q17]=No
R141: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M102 | [D4]==Costing!O102 | [E5]==Costing!Q102 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R102*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J141="MTL","Preservation Shop","") | [N14]==D141*E141 | [O15]=DELETE | [P16]==N141*(1+(H141/100)) | [Q17]=No
R142: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M103 | [D4]==Costing!O103 | [E5]==Costing!Q103 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R103*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J142="MTL","Preservation Shop","") | [N14]==D142*E142 | [O15]=DELETE | [P16]==N142*(1+(H142/100)) | [Q17]=No
R143: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M104 | [D4]==Costing!O104 | [E5]==Costing!Q104 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R104*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J143="MTL","Preservation Shop","") | [N14]==D143*E143 | [O15]=DELETE | [P16]==N143*(1+(H143/100)) | [Q17]=No
R144: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M105 | [D4]==Costing!O105 | [E5]==Costing!Q105 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R105*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J144="MTL","Preservation Shop","") | [N14]==D144*E144 | [O15]=DELETE | [P16]==N144*(1+(H144/100)) | [Q17]=No
R145: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M106 | [D4]==Costing!O106 | [E5]==Costing!Q106 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R106*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J145="MTL","Preservation Shop","") | [N14]==D145*E145 | [O15]=DELETE | [P16]==N145*(1+(H145/100)) | [Q17]=No
R146: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M107 | [D4]==Costing!O107 | [E5]==Costing!Q107 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R107*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J146="MTL","Preservation Shop","") | [N14]==D146*E146 | [O15]=DELETE | [P16]==N146*(1+(H146/100)) | [Q17]=No
R147: [A1]=='Customer Summary'!$C$10 | [C3]==Costing!M108 | [D4]==Costing!O108 | [E5]==Costing!Q108 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R108*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J147="MTL","Preservation Shop","") | [N14]==D147*E147 | [O15]=DELETE | [P16]==N147*(1+(H147/100)) | [Q17]=No
R148: [A1]=='Customer Summary'!$C$10 | [C3]==_xlfn.CONCAT(A148," - Materials") | [D4]=1 | [E5]==N148 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P148-N148)/N148)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D10 | [M13]==IF(J148="MTL","Preservation Shop","") | [N14]==SUM(N110:N120)+SUM(N132:N139) | [O15]==IF(N148=0,"DELETE","LEAVE") | [P16]==SUM(P110:P120)+SUM(P132:P139) | [Q17]=Yes
R149: [A1]=='Customer Summary'!$C$10 | [C3]==_xlfn.CONCAT(A149," - Labour") | [D4]==SUM(D121:D131,D140:D147) | [E5]==N149/D149 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P149-N149)/N149)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L148 | [M13]==IF(J149="MTL","Preservation Shop","") | [N14]==SUM(N121:N131)+SUM(N140:N147) | [O15]==IF(N149=0,"DELETE","LEAVE") | [P16]==SUM(P121:P131)+SUM(P140:P147) | [Q17]=Yes
R150: [O15]=DELETE
R151: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!B112 | [D4]==Costing!F112 | [E5]==Costing!I112 | [F6]==Costing!G112 | [G7]=Damp Materials | [H8]==Costing!J112*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J151="MTL","Preservation Shop","") | [N14]==D151*E151 | [O15]=DELETE | [P16]==N151*(1+(H151/100)) | [Q17]=No
R152: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!B113 | [D4]==Costing!F113 | [E5]==Costing!I113 | [F6]==Costing!G113 | [G7]=Damp Materials | [H8]==Costing!J113*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J152="MTL","Preservation Shop","") | [N14]==D152*E152 | [O15]=DELETE | [P16]==N152*(1+(H152/100)) | [Q17]=No
R153: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!B114 | [D4]==Costing!F114 | [E5]==Costing!I114 | [F6]==Costing!G114 | [G7]=Damp Materials | [H8]==Costing!J114*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J153="MTL","Preservation Shop","") | [N14]==D153*E153 | [O15]=DELETE | [P16]==N153*(1+(H153/100)) | [Q17]=No
R154: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!M112 | [D4]==Costing!O112 | [E5]==Costing!Q112 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R112*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J154="MTL","Preservation Shop","") | [N14]==D154*E154 | [O15]=DELETE | [P16]==N154*(1+(H154/100)) | [Q17]=No
R155: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!M113 | [D4]==Costing!O113 | [E5]==Costing!Q113 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R113*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J155="MTL","Preservation Shop","") | [N14]==D155*E155 | [O15]=DELETE | [P16]==N155*(1+(H155/100)) | [Q17]=No
R156: [A1]=='Customer Summary'!$C$11 | [C3]==Costing!M114 | [D4]==Costing!O114 | [E5]==Costing!Q114 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R114*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J156="MTL","Preservation Shop","") | [N14]==D156*E156 | [O15]=DELETE | [P16]==N156*(1+(H156/100)) | [Q17]=No
R157: [A1]=='Customer Summary'!$C$11 | [C3]==_xlfn.CONCAT(A157," - Materials") | [D4]=1 | [E5]==N157 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P157-N157)/N157)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D11 | [M13]==IF(J157="MTL","Preservation Shop","") | [N14]==SUM(N151:N153) | [O15]==IF(N157=0,"DELETE","LEAVE") | [P16]==SUM(P151:P153) | [Q17]=Yes
R158: [A1]=='Customer Summary'!$C$11 | [C3]==_xlfn.CONCAT(A158," - Labour") | [D4]==SUM(D154:D156) | [E5]==N158/D158 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P158-N158)/N158)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L157 | [M13]==IF(J158="MTL","Preservation Shop","") | [N14]==SUM(N154:N156) | [O15]==IF(N158=0,"DELETE","LEAVE") | [P16]==SUM(P154:P156) | [Q17]=Yes
R159: [O15]=DELETE
R160: [A1]=='Customer Summary'!$C$12 | [C3]==Costing!B118 | [D4]==Costing!F118 | [E5]==Costing!I118 | [F6]==Costing!G118 | [G7]=Damp Materials | [H8]==Costing!J118*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J160="MTL","Preservation Shop","") | [N14]==D160*E160 | [O15]=DELETE | [P16]==N160*(1+(H160/100)) | [Q17]=No
R161: [A1]=='Customer Summary'!$C$12 | [C3]==Costing!B119 | [D4]==Costing!F119 | [E5]==Costing!I119 | [F6]==Costing!G119 | [G7]=Damp Materials | [H8]==Costing!J119*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J161="MTL","Preservation Shop","") | [N14]==D161*E161 | [O15]=DELETE | [P16]==N161*(1+(H161/100)) | [Q17]=No
R162: [A1]=='Customer Summary'!$C$12 | [C3]==Costing!M118 | [D4]==Costing!O118 | [E5]==Costing!Q118 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R118*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J162="MTL","Preservation Shop","") | [N14]==D162*E162 | [O15]=DELETE | [P16]==N162*(1+(H162/100)) | [Q17]=No
R163: [A1]=='Customer Summary'!$C$12 | [C3]==Costing!M119 | [D4]==Costing!O119 | [E5]==Costing!Q119 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R119*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J163="MTL","Preservation Shop","") | [N14]==D163*E163 | [O15]=DELETE | [P16]==N163*(1+(H163/100)) | [Q17]=No
R164: [A1]=='Customer Summary'!$C$12 | [C3]==_xlfn.CONCAT(A164," - Materials") | [D4]=1 | [E5]==N164 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P164-N164)/N164)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D12 | [M13]==IF(J164="MTL","Preservation Shop","") | [N14]==SUM(N160:N161) | [O15]==IF(N164=0,"DELETE","LEAVE") | [P16]==SUM(P160:P161) | [Q17]=Yes
R165: [A1]=='Customer Summary'!$C$12 | [C3]==_xlfn.CONCAT(A165," - Labour") | [D4]==SUM(D162:D163) | [E5]==N165/D165 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P165-N165)/N165)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L164 | [M13]==IF(J165="MTL","Preservation Shop","") | [N14]==SUM(N162:N163) | [O15]==IF(N165=0,"DELETE","LEAVE") | [P16]==SUM(P162:P163) | [Q17]=Yes
R166: [O15]=DELETE
R167: [A1]=='Customer Summary'!$C$13 | [C3]==Costing!B123 | [D4]==Costing!F123 | [E5]==Costing!I123 | [F6]==Costing!G123 | [G7]=Damp Materials | [H8]==Costing!J123*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J167="MTL","Preservation Shop","") | [N14]==D167*E167 | [O15]=DELETE | [P16]==N167*(1+(H167/100)) | [Q17]=No
R168: [A1]=='Customer Summary'!$C$13 | [C3]==Costing!B124 | [D4]==Costing!F124 | [E5]==Costing!I124 | [F6]==Costing!G124 | [G7]=Damp Materials | [H8]==Costing!J124*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J168="MTL","Preservation Shop","") | [N14]==D168*E168 | [O15]=DELETE | [P16]==N168*(1+(H168/100)) | [Q17]=No
R169: [A1]=='Customer Summary'!$C$13 | [C3]==Costing!M123 | [D4]==Costing!O123 | [E5]==Costing!Q123 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R123*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J169="MTL","Preservation Shop","") | [N14]==D169*E169 | [O15]=DELETE | [P16]==N169*(1+(H169/100)) | [Q17]=No
R170: [A1]=='Customer Summary'!$C$13 | [C3]==Costing!M124 | [D4]==Costing!O124 | [E5]==Costing!Q124 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R124*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J170="MTL","Preservation Shop","") | [N14]==D170*E170 | [O15]=DELETE | [P16]==N170*(1+(H170/100)) | [Q17]=No
R171: [A1]=='Customer Summary'!$C$13 | [C3]==_xlfn.CONCAT(A171," - Materials") | [D4]=1 | [E5]==N171 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P171-N171)/N171)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D13 | [M13]==IF(J171="MTL","Preservation Shop","") | [N14]==SUM(N167:N168) | [O15]==IF(N171=0,"DELETE","LEAVE") | [P16]==SUM(P167:P168) | [Q17]=Yes
R172: [A1]=='Customer Summary'!$C$13 | [C3]==_xlfn.CONCAT(A172," - Labour") | [D4]==SUM(D169:D170) | [E5]==N172/D172 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P172-N172)/N172)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L171 | [M13]==IF(J172="MTL","Preservation Shop","") | [N14]==SUM(N169:N170) | [O15]==IF(N172=0,"DELETE","LEAVE") | [P16]==SUM(P169:P170) | [Q17]=Yes
R173: [O15]=DELETE
R174: [A1]=='Customer Summary'!$C$14 | [C3]==Costing!B128 | [D4]==Costing!F128 | [E5]==Costing!I128 | [F6]==Costing!G128 | [G7]=Damp Materials | [H8]==Costing!J128*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J174="MTL","Preservation Shop","") | [N14]==D174*E174 | [O15]=DELETE | [P16]==N174*(1+(H174/100)) | [Q17]=No
R175: [A1]=='Customer Summary'!$C$14 | [C3]==Costing!M128 | [D4]==Costing!O128 | [E5]==Costing!Q128 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R128*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J175="MTL","Preservation Shop","") | [N14]==D175*E175 | [O15]=DELETE | [P16]==N175*(1+(H175/100)) | [Q17]=No
R176: [A1]=='Customer Summary'!$C$14 | [C3]==_xlfn.CONCAT(A176," - Materials") | [D4]=1 | [E5]==N176 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P176-N176)/N176)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D14 | [M13]==IF(J176="MTL","Preservation Shop","") | [N14]==SUM(N174:N174) | [O15]==IF(N176=0,"DELETE","LEAVE") | [P16]==SUM(P174:P174) | [Q17]=Yes
R177: [A1]=='Customer Summary'!$C$14 | [C3]==_xlfn.CONCAT(A177," - Labour") | [D4]==SUM(D175) | [E5]==N177/D177 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P177-N177)/N177)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L176 | [M13]==IF(J177="MTL","Preservation Shop","") | [N14]==SUM(N175:N175) | [O15]==IF(N177=0,"DELETE","LEAVE") | [P16]==SUM(P175:P175) | [Q17]=Yes
R178: [O15]=DELETE
R179: [A1]=='Customer Summary'!$C$15 | [C3]==Costing!B132 | [D4]==Costing!F132 | [E5]==Costing!I132 | [F6]==Costing!G132 | [G7]=Damp Materials | [H8]==Costing!J132*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J179="MTL","Preservation Shop","") | [N14]==D179*E179 | [O15]=DELETE | [P16]==N179*(1+(H179/100)) | [Q17]=No
R180: [A1]=='Customer Summary'!$C$15 | [C3]==Costing!M132 | [D4]==Costing!O132 | [E5]==Costing!Q132 | [F6]=Hours | [G7]=Damp Labour | [H8]==Costing!R132*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J180="MTL","Preservation Shop","") | [N14]==D180*E180 | [O15]=DELETE | [P16]==N180*(1+(H180/100)) | [Q17]=No
R181: [A1]=='Customer Summary'!$C$15 | [C3]==_xlfn.CONCAT(A181," - Materials") | [D4]=1 | [E5]==N181 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P181-N181)/N181)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D15 | [M13]==IF(J181="MTL","Preservation Shop","") | [N14]==SUM(N179:N179) | [O15]==IF(N181=0,"DELETE","LEAVE") | [P16]==SUM(P179:P179) | [Q17]=Yes
R182: [A1]=='Customer Summary'!$C$15 | [C3]==_xlfn.CONCAT(A182," - Labour") | [D4]==SUM(D180) | [E5]==N182/D182 | [F6]=Hours | [G7]=Damp Labour | [H8]==((P182-N182)/N182)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L181 | [M13]==IF(J182="MTL","Preservation Shop","") | [N14]==SUM(N180:N180) | [O15]==IF(N182=0,"DELETE","LEAVE") | [P16]==SUM(P180:P180) | [Q17]=Yes
R183: [O15]=DELETE
R184: [A1]=='Customer Summary'!$C$16 | [C3]=Skips | [D4]==Costing!F136 | [E5]==Costing!I136 | [F6]=Each | [G7]=Waste Removal | [H8]==Costing!J136*100 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J184="MTL","Preservation Shop","") | [N14]==D184*E184 | [O15]=DELETE | [P16]==N184*(1+(H184/100)) | [Q17]=No
R185: [A1]=='Customer Summary'!$C$16 | [C3]=Vehicle Costs (Fuel) | [D4]==Costing!K146*Costing!K147*2 | [E5]==Costing!J155 | [F6]=Miles | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J185="MTL","Preservation Shop","") | [N14]==D185*E185 | [O15]=DELETE | [P16]==N185*(1+(H185/100)) | [Q17]=No
R186: [A1]=='Customer Summary'!$C$16 | [C3]=Travel Costs for Tradesmen | [D4]==Costing!O141 | [E5]==Costing!C155 | [F6]=Hours | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J186="MTL","Preservation Shop","") | [N14]==D186*E186 | [O15]=DELETE | [P16]==N186*(1+(H186/100)) | [Q17]=No
R187: [A1]=='Customer Summary'!$C$16 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A187," - Materials") | [D4]=1 | [E5]==N187 | [F6]=EACH | [G7]=Damp Materials | [H8]==((P187-N187)/N187)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J187="MTL","Preservation Shop","") | [N14]==SUM(N184:N185) | [O15]==IF(N187=0,"DELETE","LEAVE") | [P16]==SUM(P184:P185) | [Q17]=Yes
R188: [A1]=='Customer Summary'!$C$16 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A188," - Labour") | [D4]==D186 | [E5]==E186 | [F6]==F186 | [G7]=Damp Labour | [H8]==H186 | [I9]=% | [J10]==J186 | [K11]==K186 | [L12]=No | [M13]==IF(J188="MTL","Preservation Shop","") | [N14]==N186 | [O15]==IF(N188=0,"DELETE","LEAVE") | [P16]==P186 | [Q17]=Yes
```

## SECTION 5: CUSTOMER SUMMARY SHEET

**Total Rows:** 25  |  **Total Cols:** 8

### Complete Row Data

```
R1: [B2]==IF(Costing!E1="SHEET NOT COMPLETE","PLEASE COMPLETE COSTING BEFORE SUPPLYING A PRICE","")
R2: [B2]=Customer Pricing Summary
R3: [B2]=# | [C3]=Area of Works  | [D4]=Optional Item? | [E5]=Price ↵(Without Optional items) | [F6]=Price ↵(With Optional Items)
R4: [B2]=1 | [C3]=Stripping out of items as required to proceed with works | [D4]=No | [E5]==IF(D4="Yes","Optional",F4) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes"))
R5: [B2]==B4+1 | [C3]=Walls (Install membrane system) | [D4]=No | [E5]==IF(D5="Yes","Optional",F5) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes"))
R6: [B2]==B5+1 | [C3]=Cementitious tanking system | [D4]=No | [E5]==IF(D6="Yes","Optional",F6) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes"))
R7: [B2]==B6+1 | [C3]=Floor - Liquid Resin floor Membranes  | [D4]=No | [E5]==IF(D7="Yes","Optional",F7) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes"))
R8: [B2]==B7+1 | [C3]=Plastering & finishing | [D4]=No | [E5]==IF(D8="Yes","Optional",F8) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes"))
R9: [B2]==B8+1 | [C3]=Warmline Internal Wall Insulation | [D4]=No | [E5]==IF(D9="Yes","Optional",F9) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes"))
R10: [B2]==B9+1 | [C3]=Floor Joists & Floor Decking | [D4]=No | [E5]==IF(D10="Yes","Optional",F10) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C10,'CF CSV Upload'!Q:Q,"Yes"))
R11: [B2]==B10+1 | [C3]=Airbricks | [D4]=No | [E5]==IF(D11="Yes","Optional",F11) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C11,'CF CSV Upload'!Q:Q,"Yes"))
R12: [B2]==B11+1 | [C3]=Spray treatments | [D4]=No | [E5]==IF(D12="Yes","Optional",F12) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C12,'CF CSV Upload'!Q:Q,"Yes"))
R13: [B2]==B12+1 | [C3]=Drains | [D4]=Yes | [E5]==IF(D13="Yes","Optional",F13) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C13,'CF CSV Upload'!Q:Q,"Yes"))
R14: [B2]==B13+1 | [C3]=External Wall - Aquaban Water Repellent Treatments | [D4]=Yes | [E5]==IF(D14="Yes","Optional",F14) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C14,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C14,'CF CSV Upload'!Q:Q,"Yes"))
R15: [B2]==B14+1 | [C3]=Asbestos Testing | [D4]=Yes | [E5]==IF(D15="Yes","Optional",F15) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C15,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C15,'CF CSV Upload'!Q:Q,"Yes"))
R16: [B2]==B14+1 | [C3]=Project Specific Overheads | [D4]=No | [E5]==IF(D16="Yes","Optional",F16) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C16,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C16,'CF CSV Upload'!Q:Q,"Yes"))
R17: [B2]=Totals
R18: [C3]=Sub Total | [E5]==SUM(E4:E16) | [F6]==SUM(F4:F16)
R19: [C3]=Vat at 20% | [E5]==E18*0.2 | [F6]==F18*0.2
R20: [C3]=Total | [E5]==SUM(E18:E19) | [F6]==SUM(F18:F19)
R22: [C3]=Start of works deposit at 30% | [D4]=Ex. VAT | [E5]==E23/6*5 | [F6]==F23/6*5
R23: [D4]=Inc. VAT | [E5]==E20*0.3 | [F6]==F20*0.3
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
R20: [A1]=='Customer Summary'!C9 | [B2]=n/a
R21: [A1]=='Customer Summary'!C10 | [B2]=n/a
R22: [A1]=='Customer Summary'!C11 | [B2]=n/a
R23: [A1]=='Customer Summary'!C12 | [B2]=n/a
R24: [A1]=='Customer Summary'!C13 | [B2]=n/a
R25: [A1]=='Customer Summary'!C14 | [B2]=n/a
R26: [A1]=='Customer Summary'!C15 | [B2]=n/a
R27: [A1]=='Customer Summary'!C16 | [B2]=n/a
R41: [A1]=This is used in the projects to determine costs by the 'Cost Code' category (lets you see which areas you are over or under budget on).
R42: [A1]=Cost Codes
R43: [A1]=Item | [B2]=Comments
R44: [A1]=Damp Equipment | [B2]=n/a
R45: [A1]=Damp Labour | [B2]=n/a
R46: [A1]=Damp Materials | [B2]=n/a
R47: [A1]=Damp Other | [B2]=n/a
R48: [A1]=Damp Sub Contractors | [B2]=n/a
R49: [A1]=Travel Costs | [B2]=n/a
R50: [A1]=Waste Removal | [B2]=n/a
R53: [A1]=This is used to on the items for costing reference
R54: [A1]=Unit of measures
R55: [A1]=Item | [B2]=Comments
R56: [A1]=Each | [B2]=n/a
R57: [A1]=M2 | [B2]=n/a
R58: [A1]=M3 | [B2]=n/a
R59: [A1]=Hours | [B2]=n/a
R60: [A1]=LM | [B2]=n/a
R61: [A1]=Miles | [B2]=n/a
R62: [A1]=Bags | [B2]=n/a
R63: [A1]=Pairs | [B2]=n/a
R64: [A1]=Radius (mtr) | [B2]=n/a
R66: [A1]=CSV Import File Name Creator
R67: [A1]=CSV File Name | [B2]=CF-Damp-
R68: [A1]=Current Date | [B2]=02-10-25-08-38-34
R69: [A1]=Full File Name | [B2]==CONCATENATE(B67,B68)
R71: [A1]=File Name Creator
R72: [A1]=PDF Report Name | [B2]==CONCATENATE(Costing!E4,"-DAMP-REPORT-",B68)
R73: [A1]=Access Email Template Name | [B2]==CONCATENATE(Costing!E4,"-ACCESS-EMAIL-",B68)
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

#### Sheet: Report (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D23:N23 D72:N72 D79:N79 D86:N86 D93:N93 D100:N100 D107:N107 D120:N120 D133:N133 D140:N140 D147:N147 D162:N162 D169:N169 D176:N176 D197:N197 D204:N204 D211:N211 D230:N230 D237:N237 D244:N244 D269:N269 D282:N282 D355:N355 D362:N362 D369:N369 D387:N387 D394:N394 D401:N401 D429:N429 D445:N445 D452:N452 D459:N459 Q23:Z23 Q72:Z72 Q79:Z79 Q86:Z86 Q93:Z93 Q100:Z100 Q107:Z107 Q120:Z120 Q133:Z133 Q140:Z140 Q147:Z147 Q162:Z162 Q169:Z169 Q176:Z176 Q197:Z197 Q204:Z204 Q211:Z211 Q230:Z230 Q237:Z237 Q244:Z244 Q269:Z269 Q282:Z282 Q355:Z355 Q362:Z362 Q369:Z369 Q387:Z387 Q394:Z394 Q401:Z401 Q429:Z429 Q445:Z445 Q452:Z452 Q459:Z459 | list |  | "Hide,Show" |  | True | False |

#### Sheet: Costing (3 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | E42 | list |  | "4,6,8,10,12,15,22,30,N/A" |  | True | False |
| 2 | D42 | list |  | "Brick, Concrete, Stone, Mixed, N/A" |  | True | False |
| 3 | F151:L151 | list |  | "Image 1: Default or Miscellaneous, Image 2: Single Male (Young), Image 3: Single Male (Elderly), Image 4: Single Female (Young), Image 5: Single Female (Elderly), Image 6: Young Couple, Image 7: Elde… |  | True | False |

#### Sheet: Customer Summary (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D4:D16 | list |  | "No, Yes" |  | True | False |

#### Sheet: CF CSV Upload (2 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | Q2:Q27 Q29:Q60 Q62:Q73 Q75:Q86 Q88:Q103 Q105:Q108 Q110:Q149 Q151:Q158 Q160:Q165 Q167:Q172 Q174:Q177 Q179:Q182 Q184:Q188 | list |  | "No,Yes" |  | True | False |
| 2 | L2:L188 | list |  | "Yes,No" |  | True | False |

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
ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b69")

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
ThisWorkbook.Sheets("Costing").Range("F29:F33,F36").Value = 0
End Sub
Private Sub Walls_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("D40,E40,D44:D48,E46:E48,F53,D55:E55,F57:F58").Value = 0
ThisWorkbook.Sheets("Costing").Range("D42,E42").Value = "N/A"
End Sub
Private Sub Tanking_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F61:F66").Value = 0
End Sub
Private Sub Floor_Resin_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F69:F74").Value = 0
End Sub
Private Sub Plastering_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F77:F85").Value = 0
End Sub
Private Sub Floor_Joists_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("D89:D98,E89:E94,F99").Value = 0
End Sub
Private Sub Floor_Deck_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F101:F109").Value = 0
End Sub
Private Sub Airbricks_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F112:F115").Value = 0
End Sub
Private Sub Spray_Treatments_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F118:F120").Value = 0
End Sub
Private Sub Drains_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F123:F125").Value = 0
End Sub
Private Sub Aquaban_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F128:F129").Value = 0
End Sub
Private Sub Asbestos_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F132:F133").Value = 0
End Sub
Private Sub Skip_Hire_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F136").Value = 0
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
Private Sub CommandButton1_Click()

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

'Remove Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
'Set new time to give a specific file name
ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
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
MsgBox "CANNOT CREATE REPORT - PLEASE COMPLETE THE SHEET FULLY"

End If

End Sub
' https://excel.tips.net/T003144_Spell-Checking_in_a_Protected_Worksheet.html
Sub SpellCheck_Sheet_Click()

' Set Password
Dim xPsw As String
    xPsw = "window"

    With ActiveSheet
        .Unprotect xPsw
        .Range("D16:Z912").CheckSpelling
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
ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
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

## SECTION 8: CROSS-SHEET REFERENCES

### References FROM: Report

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Report!D11 |
| Costing!E11 | Report!D12 |
| Costing!E14 | Report!B473, Report!B476, Report!B479 |
| Costing!E4 | Report!I13 |
| Costing!E7 | Report!D8 |
| Costing!E8 | Report!D9 |
| Costing!E9 | Report!D10 |
| Details!$C$13 | Report!D33, Report!D33 |

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
| Details!$C$12 | Costing!K147, Costing!K147 |
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
| Customer Summary!C16 | Customer Summary!F16, Customer Summary!F16 |
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

### References FROM: Sub Contractor Costs

| Target | Referenced By |
|--------|-------------|
| Costing!E10 | Sub Contractor Costs!D8 |
| Costing!E11 | Sub Contractor Costs!D9 |
| Costing!E4 | Sub Contractor Costs!D4 |
| Costing!E7 | Sub Contractor Costs!D5 |
| Costing!E8 | Sub Contractor Costs!D6 |
| Costing!E9 | Sub Contractor Costs!D7 |
| Costing!O109 | Sub Contractor Costs!G17 |
| Costing!O115 | Sub Contractor Costs!G18 |
| Costing!O120 | Sub Contractor Costs!G19 |
| Costing!O125 | Sub Contractor Costs!G20 |
| Costing!O129 | Sub Contractor Costs!G21 |
| Costing!O26 | Sub Contractor Costs!G11 |
| Costing!O36 | Sub Contractor Costs!G11 |
| Costing!O58 | Sub Contractor Costs!G12 |
| Costing!O66 | Sub Contractor Costs!G13 |
| Costing!O74 | Sub Contractor Costs!G14 |
| Costing!O79 | Sub Contractor Costs!G16 |
| Costing!O85 | Sub Contractor Costs!G15 |
| Costing!V109 | Sub Contractor Costs!D17 |
| Costing!V115 | Sub Contractor Costs!D18 |
| Costing!V120 | Sub Contractor Costs!D19 |
| Costing!V125 | Sub Contractor Costs!D20 |
| Costing!V129 | Sub Contractor Costs!D21 |
| Costing!V26 | Sub Contractor Costs!D11 |
| Costing!V36 | Sub Contractor Costs!D11 |
| Costing!V58 | Sub Contractor Costs!D12 |
| Costing!V66 | Sub Contractor Costs!D13 |
| Costing!V74 | Sub Contractor Costs!D14 |
| Costing!V79 | Sub Contractor Costs!D16 |
| Costing!V85 | Sub Contractor Costs!D15 |
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

### References FROM: CF CSV Upload

| Target | Referenced By |
|--------|-------------|
| Costing!B101 | CF CSV Upload!C132 |
| Costing!B102 | CF CSV Upload!C133 |
| Costing!B103 | CF CSV Upload!C134 |
| Costing!B104 | CF CSV Upload!C135 |
| Costing!B105 | CF CSV Upload!C136 |
| Costing!B106 | CF CSV Upload!C137 |
| Costing!B107 | CF CSV Upload!C138 |
| Costing!B108 | CF CSV Upload!C139 |
| Costing!B112 | CF CSV Upload!C151 |
| Costing!B113 | CF CSV Upload!C152 |
| Costing!B114 | CF CSV Upload!C153 |
| Costing!B118 | CF CSV Upload!C160 |
| Costing!B119 | CF CSV Upload!C161 |
| Costing!B123 | CF CSV Upload!C167 |
| Costing!B124 | CF CSV Upload!C168 |
| Costing!B128 | CF CSV Upload!C174 |
| Costing!B132 | CF CSV Upload!C179 |
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
| Costing!B40 | CF CSV Upload!C29 |
| Costing!B42 | CF CSV Upload!C30 |
| Costing!B44 | CF CSV Upload!C31 |
| Costing!B45 | CF CSV Upload!C32 |
| Costing!B46 | CF CSV Upload!C33 |
| Costing!B47 | CF CSV Upload!C34 |
| Costing!B48 | CF CSV Upload!C35 |
| Costing!B49 | CF CSV Upload!C36 |
| Costing!B50 | CF CSV Upload!C37 |
| Costing!B51 | CF CSV Upload!C38 |
| Costing!B52 | CF CSV Upload!C39 |
| Costing!B53 | CF CSV Upload!C40 |
| Costing!B55 | CF CSV Upload!C41 |
| Costing!B56 | CF CSV Upload!C42 |
| Costing!B57 | CF CSV Upload!C43 |
| Costing!B61 | CF CSV Upload!C62 |
| Costing!B62 | CF CSV Upload!C63 |
| Costing!B63 | CF CSV Upload!C64 |
| Costing!B64 | CF CSV Upload!C65 |
| Costing!B65 | CF CSV Upload!C66 |
| Costing!B69 | CF CSV Upload!C75 |
| Costing!B70 | CF CSV Upload!C76 |
| Costing!B71 | CF CSV Upload!C77 |
| Costing!B72 | CF CSV Upload!C78 |
| Costing!B73 | CF CSV Upload!C79 |
| Costing!B77 | CF CSV Upload!C88 |
| Costing!B78 | CF CSV Upload!C89 |
| Costing!B79 | CF CSV Upload!C105 |
| Costing!B80 | CF CSV Upload!C90 |
| Costing!B81 | CF CSV Upload!C91 |
| Costing!B82 | CF CSV Upload!C92 |
| Costing!B83 | CF CSV Upload!C93 |
| Costing!B84 | CF CSV Upload!C94 |
| Costing!B89 | CF CSV Upload!C110 |
| Costing!B90 | CF CSV Upload!C111 |
| Costing!B91 | CF CSV Upload!C112 |
| Costing!B92 | CF CSV Upload!C113 |
| Costing!B93 | CF CSV Upload!C114 |
| Costing!B94 | CF CSV Upload!C115 |
| Costing!B95 | CF CSV Upload!C116 |
| Costing!B96 | CF CSV Upload!C117 |
| Costing!B97 | CF CSV Upload!C118 |
| Costing!B98 | CF CSV Upload!C119 |
| Costing!B99 | CF CSV Upload!C120 |
| Costing!C155 | CF CSV Upload!E186 |
| Costing!F101 | CF CSV Upload!D132 |
| Costing!F102 | CF CSV Upload!D133 |
| Costing!F103 | CF CSV Upload!D134 |
| Costing!F104 | CF CSV Upload!D135 |
| Costing!F105 | CF CSV Upload!D136 |
| Costing!F106 | CF CSV Upload!D137 |
| Costing!F107 | CF CSV Upload!D138 |
| Costing!F108 | CF CSV Upload!D139 |
| Costing!F112 | CF CSV Upload!D151 |
| Costing!F113 | CF CSV Upload!D152 |
| Costing!F114 | CF CSV Upload!D153 |
| Costing!F118 | CF CSV Upload!D160 |
| Costing!F119 | CF CSV Upload!D161 |
| Costing!F123 | CF CSV Upload!D167 |
| Costing!F124 | CF CSV Upload!D168 |
| Costing!F128 | CF CSV Upload!D174 |
| Costing!F132 | CF CSV Upload!D179 |
| Costing!F136 | CF CSV Upload!D184 |
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
| Costing!F40 | CF CSV Upload!D29 |
| Costing!F42 | CF CSV Upload!D30 |
| Costing!F44 | CF CSV Upload!D31 |
| Costing!F45 | CF CSV Upload!D32 |
| Costing!F46 | CF CSV Upload!D33 |
| Costing!F47 | CF CSV Upload!D34 |
| Costing!F48 | CF CSV Upload!D35 |
| Costing!F49 | CF CSV Upload!D36 |
| Costing!F50 | CF CSV Upload!D37 |
| Costing!F51 | CF CSV Upload!D38 |
| Costing!F52 | CF CSV Upload!D39 |
| Costing!F53 | CF CSV Upload!D40 |
| Costing!F55 | CF CSV Upload!D41 |
| Costing!F56 | CF CSV Upload!D42 |
| Costing!F57 | CF CSV Upload!D43 |
| Costing!F61 | CF CSV Upload!D62 |
| Costing!F62 | CF CSV Upload!D63 |
| Costing!F63 | CF CSV Upload!D64 |
| Costing!F64 | CF CSV Upload!D65 |
| Costing!F65 | CF CSV Upload!D66 |
| Costing!F69 | CF CSV Upload!D75 |
| Costing!F70 | CF CSV Upload!D76 |
| Costing!F71 | CF CSV Upload!D77 |
| Costing!F72 | CF CSV Upload!D78 |
| Costing!F73 | CF CSV Upload!D79 |
| Costing!F77 | CF CSV Upload!D88 |
| Costing!F78 | CF CSV Upload!D89 |
| Costing!F79 | CF CSV Upload!D105 |
| Costing!F80 | CF CSV Upload!D90 |
| Costing!F81 | CF CSV Upload!D91 |
| Costing!F82 | CF CSV Upload!D92 |
| Costing!F83 | CF CSV Upload!D93 |
| Costing!F89 | CF CSV Upload!D110 |
| Costing!F90 | CF CSV Upload!D111 |
| Costing!F91 | CF CSV Upload!D112 |
| Costing!F92 | CF CSV Upload!D113 |
| Costing!F93 | CF CSV Upload!D114 |
| Costing!F94 | CF CSV Upload!D115 |
| Costing!F95 | CF CSV Upload!D116 |
| Costing!F96 | CF CSV Upload!D117 |
| Costing!F97 | CF CSV Upload!D118 |
| Costing!F98 | CF CSV Upload!D119 |
| Costing!F99 | CF CSV Upload!D120 |
| Costing!G101 | CF CSV Upload!F132 |
| Costing!G102 | CF CSV Upload!F133 |
| Costing!G103 | CF CSV Upload!F134 |
| Costing!G104 | CF CSV Upload!F135 |
| Costing!G105 | CF CSV Upload!F136 |
| Costing!G106 | CF CSV Upload!F137 |
| Costing!G107 | CF CSV Upload!F138 |
| Costing!G108 | CF CSV Upload!F139 |
| Costing!G112 | CF CSV Upload!F151 |
| Costing!G113 | CF CSV Upload!F152 |
| Costing!G114 | CF CSV Upload!F153 |
| Costing!G118 | CF CSV Upload!F160 |
| Costing!G119 | CF CSV Upload!F161 |
| Costing!G123 | CF CSV Upload!F167 |
| Costing!G124 | CF CSV Upload!F168 |
| Costing!G128 | CF CSV Upload!F174 |
| Costing!G132 | CF CSV Upload!F179 |
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
| Costing!G40 | CF CSV Upload!F29 |
| Costing!G42 | CF CSV Upload!F30 |
| Costing!G44 | CF CSV Upload!F31 |
| Costing!G45 | CF CSV Upload!F32 |
| Costing!G46 | CF CSV Upload!F33 |
| Costing!G47 | CF CSV Upload!F34 |
| Costing!G48 | CF CSV Upload!F35 |
| Costing!G49 | CF CSV Upload!F36 |
| Costing!G50 | CF CSV Upload!F37 |
| Costing!G51 | CF CSV Upload!F38 |
| Costing!G52 | CF CSV Upload!F39 |
| Costing!G53 | CF CSV Upload!F40 |
| Costing!G55 | CF CSV Upload!F41 |
| Costing!G56 | CF CSV Upload!F42 |
| Costing!G57 | CF CSV Upload!F43 |
| Costing!G61 | CF CSV Upload!F62 |
| Costing!G62 | CF CSV Upload!F63 |
| Costing!G63 | CF CSV Upload!F64 |
| Costing!G64 | CF CSV Upload!F65 |
| Costing!G65 | CF CSV Upload!F66 |
| Costing!G77 | CF CSV Upload!F88 |
| Costing!G78 | CF CSV Upload!F89 |
| Costing!G79 | CF CSV Upload!F105 |
| Costing!G80 | CF CSV Upload!F90 |
| Costing!G81 | CF CSV Upload!F91 |
| Costing!G82 | CF CSV Upload!F92 |
| Costing!G83 | CF CSV Upload!F93 |
| Costing!G84 | CF CSV Upload!F94 |
| Costing!G89 | CF CSV Upload!F110 |
| Costing!G90 | CF CSV Upload!F111 |
| Costing!G91 | CF CSV Upload!F112 |
| Costing!G92 | CF CSV Upload!F113 |
| Costing!G93 | CF CSV Upload!F114 |
| Costing!G94 | CF CSV Upload!F115 |
| Costing!G95 | CF CSV Upload!F116 |
| Costing!G96 | CF CSV Upload!F117 |
| Costing!G97 | CF CSV Upload!F118 |
| Costing!G98 | CF CSV Upload!F119 |
| Costing!G99 | CF CSV Upload!F120 |
| Costing!H108 | CF CSV Upload!E139 |
| Costing!I101 | CF CSV Upload!E132 |
| Costing!I102 | CF CSV Upload!E133 |
| Costing!I103 | CF CSV Upload!E134 |
| Costing!I104 | CF CSV Upload!E135 |
| Costing!I105 | CF CSV Upload!E136 |
| Costing!I106 | CF CSV Upload!E137 |
| Costing!I107 | CF CSV Upload!E138 |
| Costing!I112 | CF CSV Upload!E151 |
| Costing!I113 | CF CSV Upload!E152 |
| Costing!I114 | CF CSV Upload!E153 |
| Costing!I118 | CF CSV Upload!E160 |
| Costing!I119 | CF CSV Upload!E161 |
| Costing!I123 | CF CSV Upload!E167 |
| Costing!I124 | CF CSV Upload!E168 |
| Costing!I128 | CF CSV Upload!E174 |
| Costing!I132 | CF CSV Upload!E179 |
| Costing!I136 | CF CSV Upload!E184 |
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
| Costing!I40 | CF CSV Upload!E29 |
| Costing!I42 | CF CSV Upload!E30 |
| Costing!I44 | CF CSV Upload!E31 |
| Costing!I45 | CF CSV Upload!E32 |
| Costing!I46 | CF CSV Upload!E33 |
| Costing!I47 | CF CSV Upload!E34 |
| Costing!I48 | CF CSV Upload!E35 |
| Costing!I49 | CF CSV Upload!E36 |
| Costing!I50 | CF CSV Upload!E37 |
| Costing!I51 | CF CSV Upload!E38 |
| Costing!I52 | CF CSV Upload!E39 |
| Costing!I53 | CF CSV Upload!E40 |
| Costing!I55 | CF CSV Upload!E41 |
| Costing!I56 | CF CSV Upload!E42 |
| Costing!I57 | CF CSV Upload!E43 |
| Costing!I61 | CF CSV Upload!E62 |
| Costing!I62 | CF CSV Upload!E63 |
| Costing!I63 | CF CSV Upload!E64 |
| Costing!I64 | CF CSV Upload!E65 |
| Costing!I65 | CF CSV Upload!E66 |
| Costing!I69 | CF CSV Upload!E75 |
| Costing!I70 | CF CSV Upload!E76 |
| Costing!I71 | CF CSV Upload!E77 |
| Costing!I72 | CF CSV Upload!E78 |
| Costing!I73 | CF CSV Upload!E79 |
| Costing!I77 | CF CSV Upload!E88 |
| Costing!I78 | CF CSV Upload!E89 |
| Costing!I79 | CF CSV Upload!E105 |
| Costing!I80 | CF CSV Upload!E90 |
| Costing!I81 | CF CSV Upload!E91 |
| Costing!I82 | CF CSV Upload!E92 |
| Costing!I83 | CF CSV Upload!E93 |
| Costing!I84 | CF CSV Upload!E94 |
| Costing!I89 | CF CSV Upload!E110 |
| Costing!I90 | CF CSV Upload!E111 |
| Costing!I91 | CF CSV Upload!E112 |
| Costing!I92 | CF CSV Upload!E113 |
| Costing!I93 | CF CSV Upload!E114 |
| Costing!I94 | CF CSV Upload!E115 |
| Costing!I95 | CF CSV Upload!E116 |
| Costing!I96 | CF CSV Upload!E117 |
| Costing!I97 | CF CSV Upload!E118 |
| Costing!I98 | CF CSV Upload!E119 |
| Costing!I99 | CF CSV Upload!E120 |
| Costing!J101 | CF CSV Upload!H132 |
| Costing!J102 | CF CSV Upload!H133 |
| Costing!J103 | CF CSV Upload!H134 |
| Costing!J104 | CF CSV Upload!H135 |
| Costing!J105 | CF CSV Upload!H136 |
| Costing!J106 | CF CSV Upload!H137 |
| Costing!J107 | CF CSV Upload!H138 |
| Costing!J108 | CF CSV Upload!H139 |
| Costing!J112 | CF CSV Upload!H151 |
| Costing!J113 | CF CSV Upload!H152 |
| Costing!J114 | CF CSV Upload!H153 |
| Costing!J118 | CF CSV Upload!H160 |
| Costing!J119 | CF CSV Upload!H161 |
| Costing!J123 | CF CSV Upload!H167 |
| Costing!J124 | CF CSV Upload!H168 |
| Costing!J128 | CF CSV Upload!H174 |
| Costing!J132 | CF CSV Upload!H179 |
| Costing!J136 | CF CSV Upload!H184 |
| Costing!J155 | CF CSV Upload!E185 |
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
| Costing!J40 | CF CSV Upload!H29 |
| Costing!J42 | CF CSV Upload!H30 |
| Costing!J44 | CF CSV Upload!H31 |
| Costing!J45 | CF CSV Upload!H32 |
| Costing!J46 | CF CSV Upload!H33 |
| Costing!J47 | CF CSV Upload!H34 |
| Costing!J48 | CF CSV Upload!H35 |
| Costing!J49 | CF CSV Upload!H36 |
| Costing!J50 | CF CSV Upload!H37 |
| Costing!J51 | CF CSV Upload!H38 |
| Costing!J52 | CF CSV Upload!H39 |
| Costing!J53 | CF CSV Upload!H40 |
| Costing!J55 | CF CSV Upload!H41 |
| Costing!J56 | CF CSV Upload!H42 |
| Costing!J57 | CF CSV Upload!H43 |
| Costing!J61 | CF CSV Upload!H62 |
| Costing!J62 | CF CSV Upload!H63 |
| Costing!J63 | CF CSV Upload!H64 |
| Costing!J64 | CF CSV Upload!H65 |
| Costing!J65 | CF CSV Upload!H66 |
| Costing!J69 | CF CSV Upload!H75 |
| Costing!J70 | CF CSV Upload!H76 |
| Costing!J71 | CF CSV Upload!H77 |
| Costing!J72 | CF CSV Upload!H78 |
| Costing!J73 | CF CSV Upload!H79 |
| Costing!J77 | CF CSV Upload!H88 |
| Costing!J78 | CF CSV Upload!H89 |
| Costing!J79 | CF CSV Upload!H105 |
| Costing!J80 | CF CSV Upload!H90 |
| Costing!J81 | CF CSV Upload!H91 |
| Costing!J82 | CF CSV Upload!H92 |
| Costing!J83 | CF CSV Upload!H93 |
| Costing!J84 | CF CSV Upload!H94 |
| Costing!J89 | CF CSV Upload!H110 |
| Costing!J90 | CF CSV Upload!H111 |
| Costing!J91 | CF CSV Upload!H112 |
| Costing!J92 | CF CSV Upload!H113 |
| Costing!J93 | CF CSV Upload!H114 |
| Costing!J94 | CF CSV Upload!H115 |
| Costing!J95 | CF CSV Upload!H116 |
| Costing!J96 | CF CSV Upload!H117 |
| Costing!J97 | CF CSV Upload!H118 |
| Costing!J98 | CF CSV Upload!H119 |
| Costing!J99 | CF CSV Upload!H120 |
| Costing!K146 | CF CSV Upload!D185 |
| Costing!K147 | CF CSV Upload!D185 |
| Costing!M101 | CF CSV Upload!C140 |
| Costing!M102 | CF CSV Upload!C141 |
| Costing!M103 | CF CSV Upload!C142 |
| Costing!M104 | CF CSV Upload!C143 |
| Costing!M105 | CF CSV Upload!C144 |
| Costing!M106 | CF CSV Upload!C145 |
| Costing!M107 | CF CSV Upload!C146 |
| Costing!M108 | CF CSV Upload!C147 |
| Costing!M112 | CF CSV Upload!C154 |
| Costing!M113 | CF CSV Upload!C155 |
| Costing!M114 | CF CSV Upload!C156 |
| Costing!M118 | CF CSV Upload!C162 |
| Costing!M119 | CF CSV Upload!C163 |
| Costing!M123 | CF CSV Upload!C169 |
| Costing!M124 | CF CSV Upload!C170 |
| Costing!M128 | CF CSV Upload!C175 |
| Costing!M132 | CF CSV Upload!C180 |
| Costing!M21 | CF CSV Upload!C14 |
| Costing!M22 | CF CSV Upload!C15 |
| Costing!M23 | CF CSV Upload!C16 |
| Costing!M24 | CF CSV Upload!C17 |
| Costing!M25 | CF CSV Upload!C18 |
| Costing!M29 | CF CSV Upload!C19 |
| Costing!M30 | CF CSV Upload!C20 |
| Costing!M31 | CF CSV Upload!C21 |
| Costing!M32 | CF CSV Upload!C22 |
| Costing!M33 | CF CSV Upload!C23 |
| Costing!M34 | CF CSV Upload!C24 |
| Costing!M35 | CF CSV Upload!C25 |
| Costing!M40 | CF CSV Upload!C44 |
| Costing!M42 | CF CSV Upload!C45 |
| Costing!M44 | CF CSV Upload!C46 |
| Costing!M45 | CF CSV Upload!C47 |
| Costing!M46 | CF CSV Upload!C48 |
| Costing!M47 | CF CSV Upload!C49 |
| Costing!M48 | CF CSV Upload!C50 |
| Costing!M49 | CF CSV Upload!C51 |
| Costing!M50 | CF CSV Upload!C52 |
| Costing!M51 | CF CSV Upload!C53 |
| Costing!M52 | CF CSV Upload!C54 |
| Costing!M53 | CF CSV Upload!C55 |
| Costing!M55 | CF CSV Upload!C56 |
| Costing!M56 | CF CSV Upload!C57 |
| Costing!M57 | CF CSV Upload!C58 |
| Costing!M61 | CF CSV Upload!C67 |
| Costing!M62 | CF CSV Upload!C68 |
| Costing!M63 | CF CSV Upload!C69 |
| Costing!M64 | CF CSV Upload!C70 |
| Costing!M65 | CF CSV Upload!C71 |
| Costing!M69 | CF CSV Upload!C80 |
| Costing!M70 | CF CSV Upload!C81 |
| Costing!M71 | CF CSV Upload!C82 |
| Costing!M72 | CF CSV Upload!C83 |
| Costing!M73 | CF CSV Upload!C84 |
| Costing!M77 | CF CSV Upload!C95 |
| Costing!M78 | CF CSV Upload!C96 |
| Costing!M79 | CF CSV Upload!C106 |
| Costing!M80 | CF CSV Upload!C97 |
| Costing!M81 | CF CSV Upload!C98 |
| Costing!M82 | CF CSV Upload!C99 |
| Costing!M83 | CF CSV Upload!C100 |
| Costing!M84 | CF CSV Upload!C101 |
| Costing!M89 | CF CSV Upload!C121 |
| Costing!M90 | CF CSV Upload!C122 |
| Costing!M91 | CF CSV Upload!C123 |
| Costing!M92 | CF CSV Upload!C124 |
| Costing!M93 | CF CSV Upload!C125 |
| Costing!M94 | CF CSV Upload!C126 |
| Costing!M95 | CF CSV Upload!C127 |
| Costing!M96 | CF CSV Upload!C128 |
| Costing!M97 | CF CSV Upload!C129 |
| Costing!M98 | CF CSV Upload!C130 |
| Costing!M99 | CF CSV Upload!C131 |
| Costing!O101 | CF CSV Upload!D140 |
| Costing!O102 | CF CSV Upload!D141 |
| Costing!O103 | CF CSV Upload!D142 |
| Costing!O104 | CF CSV Upload!D143 |
| Costing!O105 | CF CSV Upload!D144 |
| Costing!O106 | CF CSV Upload!D145 |
| Costing!O107 | CF CSV Upload!D146 |
| Costing!O108 | CF CSV Upload!D147 |
| Costing!O112 | CF CSV Upload!D154 |
| Costing!O113 | CF CSV Upload!D155 |
| Costing!O114 | CF CSV Upload!D156 |
| Costing!O118 | CF CSV Upload!D162 |
| Costing!O119 | CF CSV Upload!D163 |
| Costing!O123 | CF CSV Upload!D169 |
| Costing!O124 | CF CSV Upload!D170 |
| Costing!O128 | CF CSV Upload!D175 |
| Costing!O132 | CF CSV Upload!D180 |
| Costing!O141 | CF CSV Upload!D186 |
| Costing!O21 | CF CSV Upload!D14 |
| Costing!O22 | CF CSV Upload!D15 |
| Costing!O23 | CF CSV Upload!D16 |
| Costing!O24 | CF CSV Upload!D17 |
| Costing!O25 | CF CSV Upload!D18 |
| Costing!O29 | CF CSV Upload!D19 |
| Costing!O30 | CF CSV Upload!D20 |
| Costing!O31 | CF CSV Upload!D21 |
| Costing!O32 | CF CSV Upload!D22 |
| Costing!O33 | CF CSV Upload!D23 |
| Costing!O34 | CF CSV Upload!D24 |
| Costing!O35 | CF CSV Upload!D25 |
| Costing!O40 | CF CSV Upload!D44 |
| Costing!O42 | CF CSV Upload!D45 |
| Costing!O44 | CF CSV Upload!D46 |
| Costing!O45 | CF CSV Upload!D47 |
| Costing!O46 | CF CSV Upload!D48 |
| Costing!O47 | CF CSV Upload!D49 |
| Costing!O48 | CF CSV Upload!D50 |
| Costing!O49 | CF CSV Upload!D51 |
| Costing!O50 | CF CSV Upload!D52 |
| Costing!O51 | CF CSV Upload!D53 |
| Costing!O52 | CF CSV Upload!D54 |
| Costing!O53 | CF CSV Upload!D55 |
| Costing!O55 | CF CSV Upload!D56 |
| Costing!O56 | CF CSV Upload!D57 |
| Costing!O57 | CF CSV Upload!D58 |
| Costing!O61 | CF CSV Upload!D67 |
| Costing!O62 | CF CSV Upload!D68 |
| Costing!O63 | CF CSV Upload!D69 |
| Costing!O64 | CF CSV Upload!D70 |
| Costing!O65 | CF CSV Upload!D71 |
| Costing!O69 | CF CSV Upload!D80 |
| Costing!O70 | CF CSV Upload!D81 |
| Costing!O71 | CF CSV Upload!D82 |
| Costing!O72 | CF CSV Upload!D83 |
| Costing!O73 | CF CSV Upload!D84 |
| Costing!O77 | CF CSV Upload!D95 |
| Costing!O78 | CF CSV Upload!D96 |
| Costing!O79 | CF CSV Upload!D106 |
| Costing!O80 | CF CSV Upload!D97 |
| Costing!O81 | CF CSV Upload!D98 |
| Costing!O82 | CF CSV Upload!D99 |
| Costing!O83 | CF CSV Upload!D100 |
| Costing!O84 | CF CSV Upload!D101 |
| Costing!O89 | CF CSV Upload!D121 |
| Costing!O90 | CF CSV Upload!D122 |
| Costing!O91 | CF CSV Upload!D123 |
| Costing!O92 | CF CSV Upload!D124 |
| Costing!O93 | CF CSV Upload!D125 |
| Costing!O94 | CF CSV Upload!D126 |
| Costing!O95 | CF CSV Upload!D127 |
| Costing!O96 | CF CSV Upload!D128 |
| Costing!O97 | CF CSV Upload!D129 |
| Costing!O98 | CF CSV Upload!D130 |
| Costing!O99 | CF CSV Upload!D131 |
| Costing!Q101 | CF CSV Upload!E140 |
| Costing!Q102 | CF CSV Upload!E141 |
| Costing!Q103 | CF CSV Upload!E142 |
| Costing!Q104 | CF CSV Upload!E143 |
| Costing!Q105 | CF CSV Upload!E144 |
| Costing!Q106 | CF CSV Upload!E145 |
| Costing!Q107 | CF CSV Upload!E146 |
| Costing!Q108 | CF CSV Upload!E147 |
| Costing!Q112 | CF CSV Upload!E154 |
| Costing!Q113 | CF CSV Upload!E155 |
| Costing!Q114 | CF CSV Upload!E156 |
| Costing!Q118 | CF CSV Upload!E162 |
| Costing!Q119 | CF CSV Upload!E163 |
| Costing!Q123 | CF CSV Upload!E169 |
| Costing!Q124 | CF CSV Upload!E170 |
| Costing!Q128 | CF CSV Upload!E175 |
| Costing!Q132 | CF CSV Upload!E180 |
| Costing!Q21 | CF CSV Upload!E14 |
| Costing!Q22 | CF CSV Upload!E15 |
| Costing!Q23 | CF CSV Upload!E16, CF CSV Upload!E17 |
| Costing!Q24 | CF CSV Upload!E18 |
| Costing!Q29 | CF CSV Upload!E19 |
| Costing!Q30 | CF CSV Upload!E20 |
| Costing!Q31 | CF CSV Upload!E21 |
| Costing!Q32 | CF CSV Upload!E22 |
| Costing!Q33 | CF CSV Upload!E23 |
| Costing!Q34 | CF CSV Upload!E24 |
| Costing!Q35 | CF CSV Upload!E25 |
| Costing!Q40 | CF CSV Upload!E44 |
| Costing!Q42 | CF CSV Upload!E45 |
| Costing!Q44 | CF CSV Upload!E46 |
| Costing!Q45 | CF CSV Upload!E47 |
| Costing!Q46 | CF CSV Upload!E48 |
| Costing!Q47 | CF CSV Upload!E49 |
| Costing!Q48 | CF CSV Upload!E50 |
| Costing!Q49 | CF CSV Upload!E51 |
| Costing!Q50 | CF CSV Upload!E52 |
| Costing!Q51 | CF CSV Upload!E53 |
| Costing!Q52 | CF CSV Upload!E54 |
| Costing!Q53 | CF CSV Upload!E55 |
| Costing!Q55 | CF CSV Upload!E56 |
| Costing!Q56 | CF CSV Upload!E57 |
| Costing!Q57 | CF CSV Upload!E58 |
| Costing!Q61 | CF CSV Upload!E67 |
| Costing!Q62 | CF CSV Upload!E68 |
| Costing!Q63 | CF CSV Upload!E69 |
| Costing!Q64 | CF CSV Upload!E70 |
| Costing!Q65 | CF CSV Upload!E71 |
| Costing!Q69 | CF CSV Upload!E80 |
| Costing!Q70 | CF CSV Upload!E81 |
| Costing!Q71 | CF CSV Upload!E82 |
| Costing!Q72 | CF CSV Upload!E83 |
| Costing!Q73 | CF CSV Upload!E84 |
| Costing!Q77 | CF CSV Upload!E95 |
| Costing!Q78 | CF CSV Upload!E96 |
| Costing!Q79 | CF CSV Upload!E106 |
| Costing!Q80 | CF CSV Upload!E97 |
| Costing!Q81 | CF CSV Upload!E98 |
| Costing!Q82 | CF CSV Upload!E99 |
| Costing!Q83 | CF CSV Upload!E100 |
| Costing!Q84 | CF CSV Upload!E101 |
| Costing!Q89 | CF CSV Upload!E121 |
| Costing!Q90 | CF CSV Upload!E122 |
| Costing!Q91 | CF CSV Upload!E123 |
| Costing!Q92 | CF CSV Upload!E124 |
| Costing!Q93 | CF CSV Upload!E125 |
| Costing!Q94 | CF CSV Upload!E126 |
| Costing!Q95 | CF CSV Upload!E127 |
| Costing!Q96 | CF CSV Upload!E128 |
| Costing!Q97 | CF CSV Upload!E129 |
| Costing!Q98 | CF CSV Upload!E130 |
| Costing!Q99 | CF CSV Upload!E131 |
| Costing!R101 | CF CSV Upload!H140 |
| Costing!R102 | CF CSV Upload!H141 |
| Costing!R103 | CF CSV Upload!H142 |
| Costing!R104 | CF CSV Upload!H143 |
| Costing!R105 | CF CSV Upload!H144 |
| Costing!R106 | CF CSV Upload!H145 |
| Costing!R107 | CF CSV Upload!H146 |
| Costing!R108 | CF CSV Upload!H147 |
| Costing!R112 | CF CSV Upload!H154 |
| Costing!R113 | CF CSV Upload!H155 |
| Costing!R114 | CF CSV Upload!H156 |
| Costing!R118 | CF CSV Upload!H162 |
| Costing!R119 | CF CSV Upload!H163 |
| Costing!R123 | CF CSV Upload!H169 |
| Costing!R124 | CF CSV Upload!H170 |
| Costing!R128 | CF CSV Upload!H175 |
| Costing!R132 | CF CSV Upload!H180 |
| Costing!R21 | CF CSV Upload!H14 |
| Costing!R22 | CF CSV Upload!H15 |
| Costing!R23 | CF CSV Upload!H16 |
| Costing!R24 | CF CSV Upload!H17 |
| Costing!R25 | CF CSV Upload!H18 |
| Costing!R29 | CF CSV Upload!H19 |
| Costing!R30 | CF CSV Upload!H20 |
| Costing!R31 | CF CSV Upload!H21 |
| Costing!R32 | CF CSV Upload!H22 |
| Costing!R33 | CF CSV Upload!H23 |
| Costing!R34 | CF CSV Upload!H24 |
| Costing!R35 | CF CSV Upload!H25 |
| Costing!R40 | CF CSV Upload!H44 |
| Costing!R42 | CF CSV Upload!H45 |
| Costing!R44 | CF CSV Upload!H46 |
| Costing!R45 | CF CSV Upload!H47 |
| Costing!R46 | CF CSV Upload!H48 |
| Costing!R47 | CF CSV Upload!H49 |
| Costing!R48 | CF CSV Upload!H50 |
| Costing!R49 | CF CSV Upload!H51 |
| Costing!R50 | CF CSV Upload!H52 |
| Costing!R51 | CF CSV Upload!H53 |
| Costing!R52 | CF CSV Upload!H54 |
| Costing!R53 | CF CSV Upload!H55 |
| Costing!R55 | CF CSV Upload!H56 |
| Costing!R56 | CF CSV Upload!H57 |
| Costing!R57 | CF CSV Upload!H58 |
| Costing!R61 | CF CSV Upload!H67 |
| Costing!R62 | CF CSV Upload!H68 |
| Costing!R63 | CF CSV Upload!H69 |
| Costing!R64 | CF CSV Upload!H70 |
| Costing!R65 | CF CSV Upload!H71 |
| Costing!R69 | CF CSV Upload!H80 |
| Costing!R70 | CF CSV Upload!H81 |
| Costing!R71 | CF CSV Upload!H82 |
| Costing!R72 | CF CSV Upload!H83 |
| Costing!R73 | CF CSV Upload!H84 |
| Costing!R77 | CF CSV Upload!H95 |
| Costing!R78 | CF CSV Upload!H96 |
| Costing!R79 | CF CSV Upload!H106 |
| Costing!R80 | CF CSV Upload!H97 |
| Costing!R81 | CF CSV Upload!H98 |
| Costing!R82 | CF CSV Upload!H99 |
| Costing!R83 | CF CSV Upload!H100 |
| Costing!R84 | CF CSV Upload!H101 |
| Costing!R89 | CF CSV Upload!H121 |
| Costing!R90 | CF CSV Upload!H122 |
| Costing!R91 | CF CSV Upload!H123 |
| Costing!R92 | CF CSV Upload!H124 |
| Costing!R93 | CF CSV Upload!H125 |
| Costing!R94 | CF CSV Upload!H126 |
| Costing!R95 | CF CSV Upload!H127 |
| Costing!R96 | CF CSV Upload!H128 |
| Costing!R97 | CF CSV Upload!H129 |
| Costing!R98 | CF CSV Upload!H130 |
| Costing!R99 | CF CSV Upload!H131 |
| Customer Summary!$C$10 | CF CSV Upload!A110, CF CSV Upload!A111, CF CSV Upload!A112, CF CSV Upload!A113, CF CSV Upload!A114, CF CSV Upload!A115, CF CSV Upload!A116, CF CSV Upload!A117, CF CSV Upload!A118, CF CSV Upload!A119 (+30 more) |
| Customer Summary!$C$11 | CF CSV Upload!A151, CF CSV Upload!A152, CF CSV Upload!A153, CF CSV Upload!A154, CF CSV Upload!A155, CF CSV Upload!A156, CF CSV Upload!A157, CF CSV Upload!A158 |
| Customer Summary!$C$12 | CF CSV Upload!A160, CF CSV Upload!A161, CF CSV Upload!A162, CF CSV Upload!A163, CF CSV Upload!A164, CF CSV Upload!A165 |
| Customer Summary!$C$13 | CF CSV Upload!A167, CF CSV Upload!A168, CF CSV Upload!A169, CF CSV Upload!A170, CF CSV Upload!A171, CF CSV Upload!A172 |
| Customer Summary!$C$14 | CF CSV Upload!A174, CF CSV Upload!A175, CF CSV Upload!A176, CF CSV Upload!A177 |
| Customer Summary!$C$15 | CF CSV Upload!A179, CF CSV Upload!A180, CF CSV Upload!A181, CF CSV Upload!A182 |
| Customer Summary!$C$16 | CF CSV Upload!A184, CF CSV Upload!A185, CF CSV Upload!A186, CF CSV Upload!A187, CF CSV Upload!A188 |
| Customer Summary!$C$4 | CF CSV Upload!A2, CF CSV Upload!A3, CF CSV Upload!A4, CF CSV Upload!A5, CF CSV Upload!A6, CF CSV Upload!A7, CF CSV Upload!A8, CF CSV Upload!A9, CF CSV Upload!A10, CF CSV Upload!A11 (+16 more) |
| Customer Summary!$C$5 | CF CSV Upload!A29, CF CSV Upload!A30, CF CSV Upload!A31, CF CSV Upload!A32, CF CSV Upload!A33, CF CSV Upload!A34, CF CSV Upload!A35, CF CSV Upload!A36, CF CSV Upload!A37, CF CSV Upload!A38 (+22 more) |
| Customer Summary!$C$6 | CF CSV Upload!A62, CF CSV Upload!A63, CF CSV Upload!A64, CF CSV Upload!A65, CF CSV Upload!A66, CF CSV Upload!A67, CF CSV Upload!A68, CF CSV Upload!A69, CF CSV Upload!A70, CF CSV Upload!A71 (+2 more) |
| Customer Summary!$C$7 | CF CSV Upload!A75, CF CSV Upload!A76, CF CSV Upload!A77, CF CSV Upload!A78, CF CSV Upload!A79, CF CSV Upload!A80, CF CSV Upload!A81, CF CSV Upload!A82, CF CSV Upload!A83, CF CSV Upload!A84 (+2 more) |
| Customer Summary!$C$8 | CF CSV Upload!A88, CF CSV Upload!A89, CF CSV Upload!A90, CF CSV Upload!A91, CF CSV Upload!A92, CF CSV Upload!A93, CF CSV Upload!A94, CF CSV Upload!A95, CF CSV Upload!A96, CF CSV Upload!A97 (+6 more) |
| Customer Summary!$C$9 | CF CSV Upload!A105, CF CSV Upload!A106, CF CSV Upload!A107, CF CSV Upload!A108 |
| Customer Summary!D10 | CF CSV Upload!L148 |
| Customer Summary!D11 | CF CSV Upload!L157 |
| Customer Summary!D12 | CF CSV Upload!L164 |
| Customer Summary!D13 | CF CSV Upload!L171 |
| Customer Summary!D14 | CF CSV Upload!L176 |
| Customer Summary!D15 | CF CSV Upload!L181 |
| Customer Summary!D4 | CF CSV Upload!L26 |
| Customer Summary!D5 | CF CSV Upload!L59 |
| Customer Summary!D6 | CF CSV Upload!L72 |
| Customer Summary!D7 | CF CSV Upload!L85 |
| Customer Summary!D8 | CF CSV Upload!L102 |
| Customer Summary!D9 | CF CSV Upload!L107 |

### References FROM: Material-List

| Target | Referenced By |
|--------|-------------|
| Costing!B69 | Material-List!D39 |
| Costing!B70 | Material-List!D40 |
| Costing!B72 | Material-List!D41 |
| Costing!D40 | Material-List!E17 |
| Costing!D42 | Material-List!D18 |
| Costing!D46 | Material-List!D23 |
| Costing!E10 | Material-List!E8 |
| Costing!E11 | Material-List!E9 |
| Costing!E4 | Material-List!E4 |
| Costing!E42 | Material-List!D18 |
| Costing!E46 | Material-List!D23 |
| Costing!E7 | Material-List!E5 |
| Costing!E8 | Material-List!E6 |
| Costing!E9 | Material-List!E7 |
| Costing!F112 | Material-List!E53 |
| Costing!F113 | Material-List!E53 |
| Costing!F114 | Material-List!E53 |
| Costing!F118 | Material-List!E56 |
| Costing!F128 | Material-List!E59 |
| Costing!F25 | Material-List!E13 |
| Costing!F40 | Material-List!E16, Material-List!E16, Material-List!E16, Material-List!E16, Material-List!E16 |
| Costing!F42 | Material-List!E18 |
| Costing!F44 | Material-List!E21 |
| Costing!F44:F48 | Material-List!E24 |
| Costing!F45 | Material-List!E22 |
| Costing!F49 | Material-List!E23 |
| Costing!F51 | Material-List!E25 |
| Costing!F52 | Material-List!E26 |
| Costing!F53 | Material-List!E27 |
| Costing!F55 | Material-List!E28 |
| Costing!F56 | Material-List!E29 |
| Costing!F61 | Material-List!E32, Material-List!E33, Material-List!E34 |
| Costing!F62 | Material-List!E35 |
| Costing!F63 | Material-List!E36 |
| Costing!F64 | Material-List!E27 |
| Costing!F69 | Material-List!E39 |
| Costing!F70 | Material-List!E40 |
| Costing!F71 | Material-List!E27 |
| Costing!F72 | Material-List!E41 |
| Costing!F78 | Material-List!E44 |
| Costing!F79 | Material-List!E49, Material-List!E50 |
| Costing!F80 | Material-List!E48 |
| Costing!F81 | Material-List!E45 |
| Costing!F82 | Material-List!E46 |
| Costing!F83 | Material-List!E47 |
| Costing!K112 | Material-List!O53 |
| Costing!K113 | Material-List!O53 |
| Costing!K114 | Material-List!O53 |
| Costing!K118 | Material-List!O56 |
| Costing!K128 | Material-List!O59 |
| Costing!K25 | Material-List!O13 |
| Costing!K40 | Material-List!O16 |
| Costing!K44 | Material-List!O21 |
| Costing!K45 | Material-List!O22 |
| Costing!K46 | Material-List!O23 |
| Costing!K50 | Material-List!O24 |
| Costing!K51 | Material-List!O25 |
| Costing!K52 | Material-List!O26 |
| Costing!K53 | Material-List!O27 |
| Costing!K55 | Material-List!O28 |
| Costing!K56 | Material-List!O29 |
| Costing!K61 | Material-List!O32 |
| Costing!K62 | Material-List!O35 |
| Costing!K63 | Material-List!O36 |
| Costing!K69 | Material-List!O39 |
| Costing!K70 | Material-List!O40 |
| Costing!K72 | Material-List!O41 |
| Costing!K78 | Material-List!O44 |
| Costing!K79 | Material-List!O49 |
| Costing!K80 | Material-List!O48 |
| Costing!T81 | Material-List!O45 |
| Costing!T82 | Material-List!O46 |
| Costing!T83 | Material-List!O47 |

### References FROM: Data Lists

| Target | Referenced By |
|--------|-------------|
| Costing!E4 | Data Lists!B72, Data Lists!B73 |
| Customer Summary!C10 | Data Lists!A21 |
| Customer Summary!C11 | Data Lists!A22 |
| Customer Summary!C12 | Data Lists!A23 |
| Customer Summary!C13 | Data Lists!A24 |
| Customer Summary!C14 | Data Lists!A25 |
| Customer Summary!C15 | Data Lists!A26 |
| Customer Summary!C16 | Data Lists!A27 |
| Customer Summary!C4 | Data Lists!A15 |
| Customer Summary!C5 | Data Lists!A16 |
| Customer Summary!C6 | Data Lists!A17 |
| Customer Summary!C7 | Data Lists!A18 |
| Customer Summary!C8 | Data Lists!A19 |
| Customer Summary!C9 | Data Lists!A20 |

## SECTION 9: NAMED RANGES

*No named ranges defined.*

## SECTION 10: CONDITIONAL FORMATTING

### Sheet: Report (382 rules)

**Rule 1** — Range: `<ConditionalFormatting J1>`

- Type: `cellIs`
  Priority: 1148
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
  Priority: 1149
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

**Rule 2** — Range: `<ConditionalFormatting B46 B48:B64 B256:B260 B262:B268 B270:B273 B277:B278 B287:B311 B313:B316 B330:B335 B352:B354 B356:B361 B363:B368 B370:B373 B408:B415 B417 B419:B420 B422:B428 B430:B433 K16:K18 M28:M30>`

- Type: `containsBlanks`
  Priority: 1147
  Formula: `['LEN(TRIM(B16))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 3** — Range: `<ConditionalFormatting D33 D35>`

- Type: `containsBlanks`
  Priority: 1142
  Formula: `['LEN(TRIM(D33))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 4** — Range: `<ConditionalFormatting B115:B116>`

- Type: `containsBlanks`
  Priority: 1140
  Formula: `['LEN(TRIM(B115))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 5** — Range: `<ConditionalFormatting B128:B129>`

- Type: `containsBlanks`
  Priority: 1139
  Formula: `['LEN(TRIM(B128))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 6** — Range: `<ConditionalFormatting B153:B155>`

- Type: `containsBlanks`
  Priority: 1138
  Formula: `['LEN(TRIM(B153))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 7** — Range: `<ConditionalFormatting P157>`

- Type: `containsBlanks`
  Priority: 1135
  Formula: `['LEN(TRIM(P157))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 8** — Range: `<ConditionalFormatting P158>`

- Type: `containsBlanks`
  Priority: 1134
  Formula: `['LEN(TRIM(P158))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 9** — Range: `<ConditionalFormatting B181:B183 B187:B188>`

- Type: `containsBlanks`
  Priority: 1133
  Formula: `['LEN(TRIM(B181))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 10** — Range: `<ConditionalFormatting B189:B193>`

- Type: `containsBlanks`
  Priority: 1132
  Formula: `['LEN(TRIM(B189))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 11** — Range: `<ConditionalFormatting B218:B220>`

- Type: `containsBlanks`
  Priority: 1129
  Formula: `['LEN(TRIM(B218))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 12** — Range: `<ConditionalFormatting B221 B249:B254>`

- Type: `containsBlanks`
  Priority: 1127
  Formula: `['LEN(TRIM(B221))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 13** — Range: `<ConditionalFormatting E250:F250>`

- Type: `containsBlanks`
  Priority: 1126
  Formula: `['LEN(TRIM(E250))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 14** — Range: `<ConditionalFormatting E251:F254>`

- Type: `containsBlanks`
  Priority: 1125
  Formula: `['LEN(TRIM(E251))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 15** — Range: `<ConditionalFormatting T274>`

- Type: `containsBlanks`
  Priority: 1124
  Formula: `['LEN(TRIM(T274))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 16** — Range: `<ConditionalFormatting E292 F290 G288:G289>`

- Type: `containsBlanks`
  Priority: 1122
  Formula: `['LEN(TRIM(E288))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 17** — Range: `<ConditionalFormatting B380:B383 B406:B407>`

- Type: `containsBlanks`
  Priority: 1120
  Formula: `['LEN(TRIM(B380))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 18** — Range: `<ConditionalFormatting E314:Z316>`

- Type: `containsBlanks`
  Priority: 1117
  Formula: `['LEN(TRIM(E314))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 19** — Range: `<ConditionalFormatting B308:B311>`

- Type: `containsBlanks`
  Priority: 1116
  Formula: `['LEN(TRIM(B308))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 20** — Range: `<ConditionalFormatting B437:B441 B464:B466>`

- Type: `containsBlanks`
  Priority: 1115
  Formula: `['LEN(TRIM(B437))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 21** — Range: `<ConditionalFormatting D72:N72 Q72:Z72>`

- Type: `cellIs`
  Priority: 1092
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
  Priority: 1094
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
  Priority: 1096
  Formula: `['LEN(TRIM(D72))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 22** — Range: `<ConditionalFormatting D74:N75>`

- Type: `expression`
  Priority: 1095
  Formula: `['AND(D72="Show",D74="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 23** — Range: `<ConditionalFormatting Q74:Z75>`

- Type: `expression`
  Priority: 1093
  Formula: `['AND(Q72="Show",Q74="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 24** — Range: `<ConditionalFormatting D72:N72>`

- Type: `expression`
  Priority: 1064
  Formula: `['OR(D72="Show",D72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 25** — Range: `<ConditionalFormatting D73:N73>`

- Type: `expression`
  Priority: 1063
  Formula: `['OR(D72="Show",D72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 26** — Range: `<ConditionalFormatting D74:N74>`

- Type: `expression`
  Priority: 1062
  Formula: `['OR(D72="Show",D72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 27** — Range: `<ConditionalFormatting Q72:Z72>`

- Type: `expression`
  Priority: 1061
  Formula: `['OR(Q72="Show",Q72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 28** — Range: `<ConditionalFormatting Q73:Z73>`

- Type: `expression`
  Priority: 1060
  Formula: `['OR(Q72="Show",Q72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 29** — Range: `<ConditionalFormatting Q74:Z74>`

- Type: `expression`
  Priority: 1059
  Formula: `['OR(Q72="Show",Q72="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 30** — Range: `<ConditionalFormatting D82:N82>`

- Type: `expression`
  Priority: 1056
  Formula: `['AND(D80="Show",D82="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 31** — Range: `<ConditionalFormatting Q82:Z82>`

- Type: `expression`
  Priority: 1054
  Formula: `['AND(Q80="Show",Q82="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 32** — Range: `<ConditionalFormatting D79:N79 Q79:Z79>`

- Type: `cellIs`
  Priority: 849
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
  Priority: 851
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
  Priority: 853
  Formula: `['LEN(TRIM(D79))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 33** — Range: `<ConditionalFormatting D81:N81>`

- Type: `expression`
  Priority: 852
  Formula: `['AND(D79="Show",D81="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 846
  Formula: `['OR(D79="Show",D79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 34** — Range: `<ConditionalFormatting Q81:Z81>`

- Type: `expression`
  Priority: 850
  Formula: `['AND(Q79="Show",Q81="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 843
  Formula: `['OR(Q79="Show",Q79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 35** — Range: `<ConditionalFormatting D79:N79>`

- Type: `expression`
  Priority: 848
  Formula: `['OR(D79="Show",D79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 36** — Range: `<ConditionalFormatting D80:N80>`

- Type: `expression`
  Priority: 847
  Formula: `['OR(D79="Show",D79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 37** — Range: `<ConditionalFormatting Q79:Z79>`

- Type: `expression`
  Priority: 845
  Formula: `['OR(Q79="Show",Q79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 38** — Range: `<ConditionalFormatting Q80:Z80>`

- Type: `expression`
  Priority: 844
  Formula: `['OR(Q79="Show",Q79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 39** — Range: `<ConditionalFormatting D89:N89>`

- Type: `expression`
  Priority: 554
  Formula: `['AND(D87="Show",D89="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 40** — Range: `<ConditionalFormatting Q89:Z89>`

- Type: `expression`
  Priority: 553
  Formula: `['AND(Q87="Show",Q89="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 41** — Range: `<ConditionalFormatting D86:N86 Q86:Z86>`

- Type: `cellIs`
  Priority: 547
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
  Priority: 549
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
  Priority: 551
  Formula: `['LEN(TRIM(D86))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 42** — Range: `<ConditionalFormatting D88:N88>`

- Type: `expression`
  Priority: 550
  Formula: `['AND(D86="Show",D88="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 544
  Formula: `['OR(D86="Show",D86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 43** — Range: `<ConditionalFormatting Q88:Z88>`

- Type: `expression`
  Priority: 548
  Formula: `['AND(Q86="Show",Q88="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 541
  Formula: `['OR(Q86="Show",Q86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 44** — Range: `<ConditionalFormatting D86:N86>`

- Type: `expression`
  Priority: 546
  Formula: `['OR(D86="Show",D86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 45** — Range: `<ConditionalFormatting D87:N87>`

- Type: `expression`
  Priority: 545
  Formula: `['OR(D86="Show",D86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 46** — Range: `<ConditionalFormatting Q86:Z86>`

- Type: `expression`
  Priority: 543
  Formula: `['OR(Q86="Show",Q86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 47** — Range: `<ConditionalFormatting Q87:Z87>`

- Type: `expression`
  Priority: 542
  Formula: `['OR(Q86="Show",Q86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 48** — Range: `<ConditionalFormatting D123:N123>`

- Type: `expression`
  Priority: 540
  Formula: `['AND(D121="Show",D123="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 49** — Range: `<ConditionalFormatting Q123:Z123>`

- Type: `expression`
  Priority: 539
  Formula: `['AND(Q121="Show",Q123="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 50** — Range: `<ConditionalFormatting D120:N120 Q120:Z120>`

- Type: `cellIs`
  Priority: 533
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
  Priority: 535
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
  Priority: 537
  Formula: `['LEN(TRIM(D120))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 51** — Range: `<ConditionalFormatting D122:N122>`

- Type: `expression`
  Priority: 536
  Formula: `['AND(D120="Show",D122="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 530
  Formula: `['OR(D120="Show",D120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 52** — Range: `<ConditionalFormatting Q122:Z122>`

- Type: `expression`
  Priority: 534
  Formula: `['AND(Q120="Show",Q122="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 527
  Formula: `['OR(Q120="Show",Q120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 53** — Range: `<ConditionalFormatting D120:N120>`

- Type: `expression`
  Priority: 532
  Formula: `['OR(D120="Show",D120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 54** — Range: `<ConditionalFormatting D121:N121>`

- Type: `expression`
  Priority: 531
  Formula: `['OR(D120="Show",D120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 55** — Range: `<ConditionalFormatting Q120:Z120>`

- Type: `expression`
  Priority: 529
  Formula: `['OR(Q120="Show",Q120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 56** — Range: `<ConditionalFormatting Q121:Z121>`

- Type: `expression`
  Priority: 528
  Formula: `['OR(Q120="Show",Q120="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 57** — Range: `<ConditionalFormatting D136:N136>`

- Type: `expression`
  Priority: 498
  Formula: `['AND(D134="Show",D136="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 58** — Range: `<ConditionalFormatting Q136:Z136>`

- Type: `expression`
  Priority: 497
  Formula: `['AND(Q134="Show",Q136="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 59** — Range: `<ConditionalFormatting D133:N133 Q133:Z133>`

- Type: `cellIs`
  Priority: 491
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
  Priority: 493
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
  Priority: 495
  Formula: `['LEN(TRIM(D133))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 60** — Range: `<ConditionalFormatting D135:N135>`

- Type: `expression`
  Priority: 494
  Formula: `['AND(D133="Show",D135="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 488
  Formula: `['OR(D133="Show",D133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 61** — Range: `<ConditionalFormatting Q135:Z135>`

- Type: `expression`
  Priority: 492
  Formula: `['AND(Q133="Show",Q135="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 485
  Formula: `['OR(Q133="Show",Q133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 62** — Range: `<ConditionalFormatting D133:N133>`

- Type: `expression`
  Priority: 490
  Formula: `['OR(D133="Show",D133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 63** — Range: `<ConditionalFormatting D134:N134>`

- Type: `expression`
  Priority: 489
  Formula: `['OR(D133="Show",D133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 64** — Range: `<ConditionalFormatting Q133:Z133>`

- Type: `expression`
  Priority: 487
  Formula: `['OR(Q133="Show",Q133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 65** — Range: `<ConditionalFormatting Q134:Z134>`

- Type: `expression`
  Priority: 486
  Formula: `['OR(Q133="Show",Q133="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 66** — Range: `<ConditionalFormatting D143:N143>`

- Type: `expression`
  Priority: 484
  Formula: `['AND(D141="Show",D143="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 67** — Range: `<ConditionalFormatting Q143:Z143>`

- Type: `expression`
  Priority: 483
  Formula: `['AND(Q141="Show",Q143="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 68** — Range: `<ConditionalFormatting D140:N140 Q140:Z140>`

- Type: `cellIs`
  Priority: 477
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
  Priority: 479
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
  Priority: 481
  Formula: `['LEN(TRIM(D140))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 69** — Range: `<ConditionalFormatting D142:N142>`

- Type: `expression`
  Priority: 480
  Formula: `['AND(D140="Show",D142="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 474
  Formula: `['OR(D140="Show",D140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 70** — Range: `<ConditionalFormatting Q142:Z142>`

- Type: `expression`
  Priority: 478
  Formula: `['AND(Q140="Show",Q142="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 471
  Formula: `['OR(Q140="Show",Q140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 71** — Range: `<ConditionalFormatting D140:N140>`

- Type: `expression`
  Priority: 476
  Formula: `['OR(D140="Show",D140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 72** — Range: `<ConditionalFormatting D141:N141>`

- Type: `expression`
  Priority: 475
  Formula: `['OR(D140="Show",D140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 73** — Range: `<ConditionalFormatting Q140:Z140>`

- Type: `expression`
  Priority: 473
  Formula: `['OR(Q140="Show",Q140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 74** — Range: `<ConditionalFormatting Q141:Z141>`

- Type: `expression`
  Priority: 472
  Formula: `['OR(Q140="Show",Q140="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 75** — Range: `<ConditionalFormatting D150:N150>`

- Type: `expression`
  Priority: 470
  Formula: `['AND(D148="Show",D150="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 76** — Range: `<ConditionalFormatting Q150:Z150>`

- Type: `expression`
  Priority: 469
  Formula: `['AND(Q148="Show",Q150="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 77** — Range: `<ConditionalFormatting D147:N147 Q147:Z147>`

- Type: `cellIs`
  Priority: 463
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
  Priority: 465
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
  Priority: 467
  Formula: `['LEN(TRIM(D147))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 78** — Range: `<ConditionalFormatting D149:N149>`

- Type: `expression`
  Priority: 466
  Formula: `['AND(D147="Show",D149="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 460
  Formula: `['OR(D147="Show",D147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 79** — Range: `<ConditionalFormatting Q149:Z149>`

- Type: `expression`
  Priority: 464
  Formula: `['AND(Q147="Show",Q149="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 457
  Formula: `['OR(Q147="Show",Q147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 80** — Range: `<ConditionalFormatting D147:N147>`

- Type: `expression`
  Priority: 462
  Formula: `['OR(D147="Show",D147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 81** — Range: `<ConditionalFormatting D148:N148>`

- Type: `expression`
  Priority: 461
  Formula: `['OR(D147="Show",D147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 82** — Range: `<ConditionalFormatting Q147:Z147>`

- Type: `expression`
  Priority: 459
  Formula: `['OR(Q147="Show",Q147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 83** — Range: `<ConditionalFormatting Q148:Z148>`

- Type: `expression`
  Priority: 458
  Formula: `['OR(Q147="Show",Q147="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 84** — Range: `<ConditionalFormatting D165:N165>`

- Type: `expression`
  Priority: 456
  Formula: `['AND(D163="Show",D165="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 85** — Range: `<ConditionalFormatting Q165:Z165>`

- Type: `expression`
  Priority: 455
  Formula: `['AND(Q163="Show",Q165="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 86** — Range: `<ConditionalFormatting D162:N162 Q162:Z162>`

- Type: `cellIs`
  Priority: 449
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
  Priority: 451
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
  Priority: 453
  Formula: `['LEN(TRIM(D162))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 87** — Range: `<ConditionalFormatting D164:N164>`

- Type: `expression`
  Priority: 452
  Formula: `['AND(D162="Show",D164="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 446
  Formula: `['OR(D162="Show",D162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 88** — Range: `<ConditionalFormatting Q164:Z164>`

- Type: `expression`
  Priority: 450
  Formula: `['AND(Q162="Show",Q164="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 443
  Formula: `['OR(Q162="Show",Q162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 89** — Range: `<ConditionalFormatting D162:N162>`

- Type: `expression`
  Priority: 448
  Formula: `['OR(D162="Show",D162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 90** — Range: `<ConditionalFormatting D163:N163>`

- Type: `expression`
  Priority: 447
  Formula: `['OR(D162="Show",D162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 91** — Range: `<ConditionalFormatting Q162:Z162>`

- Type: `expression`
  Priority: 445
  Formula: `['OR(Q162="Show",Q162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 92** — Range: `<ConditionalFormatting Q163:Z163>`

- Type: `expression`
  Priority: 444
  Formula: `['OR(Q162="Show",Q162="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 93** — Range: `<ConditionalFormatting D172:N172>`

- Type: `expression`
  Priority: 442
  Formula: `['AND(D170="Show",D172="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 94** — Range: `<ConditionalFormatting Q172:Z172>`

- Type: `expression`
  Priority: 441
  Formula: `['AND(Q170="Show",Q172="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 95** — Range: `<ConditionalFormatting D169:N169 Q169:Z169>`

- Type: `cellIs`
  Priority: 435
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
  Priority: 437
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
  Priority: 439
  Formula: `['LEN(TRIM(D169))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 96** — Range: `<ConditionalFormatting D171:N171>`

- Type: `expression`
  Priority: 438
  Formula: `['AND(D169="Show",D171="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 432
  Formula: `['OR(D169="Show",D169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 97** — Range: `<ConditionalFormatting Q171:Z171>`

- Type: `expression`
  Priority: 436
  Formula: `['AND(Q169="Show",Q171="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 429
  Formula: `['OR(Q169="Show",Q169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 98** — Range: `<ConditionalFormatting D169:N169>`

- Type: `expression`
  Priority: 434
  Formula: `['OR(D169="Show",D169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 99** — Range: `<ConditionalFormatting D170:N170>`

- Type: `expression`
  Priority: 433
  Formula: `['OR(D169="Show",D169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 100** — Range: `<ConditionalFormatting Q169:Z169>`

- Type: `expression`
  Priority: 431
  Formula: `['OR(Q169="Show",Q169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 101** — Range: `<ConditionalFormatting Q170:Z170>`

- Type: `expression`
  Priority: 430
  Formula: `['OR(Q169="Show",Q169="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 102** — Range: `<ConditionalFormatting D179:N179>`

- Type: `expression`
  Priority: 428
  Formula: `['AND(D177="Show",D179="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 103** — Range: `<ConditionalFormatting Q179:Z179>`

- Type: `expression`
  Priority: 427
  Formula: `['AND(Q177="Show",Q179="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 104** — Range: `<ConditionalFormatting D176:N176 Q176:Z176>`

- Type: `cellIs`
  Priority: 421
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
  Priority: 423
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
  Priority: 425
  Formula: `['LEN(TRIM(D176))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 105** — Range: `<ConditionalFormatting D178:N178>`

- Type: `expression`
  Priority: 424
  Formula: `['AND(D176="Show",D178="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 418
  Formula: `['OR(D176="Show",D176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 106** — Range: `<ConditionalFormatting Q178:Z178>`

- Type: `expression`
  Priority: 422
  Formula: `['AND(Q176="Show",Q178="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 415
  Formula: `['OR(Q176="Show",Q176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 107** — Range: `<ConditionalFormatting D176:N176>`

- Type: `expression`
  Priority: 420
  Formula: `['OR(D176="Show",D176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 108** — Range: `<ConditionalFormatting D177:N177>`

- Type: `expression`
  Priority: 419
  Formula: `['OR(D176="Show",D176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 109** — Range: `<ConditionalFormatting Q176:Z176>`

- Type: `expression`
  Priority: 417
  Formula: `['OR(Q176="Show",Q176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 110** — Range: `<ConditionalFormatting Q177:Z177>`

- Type: `expression`
  Priority: 416
  Formula: `['OR(Q176="Show",Q176="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 111** — Range: `<ConditionalFormatting D200:N200>`

- Type: `expression`
  Priority: 414
  Formula: `['AND(D198="Show",D200="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 112** — Range: `<ConditionalFormatting Q200:Z200>`

- Type: `expression`
  Priority: 413
  Formula: `['AND(Q198="Show",Q200="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 113** — Range: `<ConditionalFormatting D197:N197 Q197:Z197>`

- Type: `cellIs`
  Priority: 407
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
  Priority: 409
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
  Priority: 411
  Formula: `['LEN(TRIM(D197))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 114** — Range: `<ConditionalFormatting D199:N199>`

- Type: `expression`
  Priority: 410
  Formula: `['AND(D197="Show",D199="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 404
  Formula: `['OR(D197="Show",D197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 115** — Range: `<ConditionalFormatting Q199:Z199>`

- Type: `expression`
  Priority: 408
  Formula: `['AND(Q197="Show",Q199="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 401
  Formula: `['OR(Q197="Show",Q197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 116** — Range: `<ConditionalFormatting D197:N197>`

- Type: `expression`
  Priority: 406
  Formula: `['OR(D197="Show",D197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 117** — Range: `<ConditionalFormatting D198:N198>`

- Type: `expression`
  Priority: 405
  Formula: `['OR(D197="Show",D197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 118** — Range: `<ConditionalFormatting Q197:Z197>`

- Type: `expression`
  Priority: 403
  Formula: `['OR(Q197="Show",Q197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 119** — Range: `<ConditionalFormatting Q198:Z198>`

- Type: `expression`
  Priority: 402
  Formula: `['OR(Q197="Show",Q197="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 120** — Range: `<ConditionalFormatting D207:N207>`

- Type: `expression`
  Priority: 400
  Formula: `['AND(D205="Show",D207="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 121** — Range: `<ConditionalFormatting Q207:Z207>`

- Type: `expression`
  Priority: 399
  Formula: `['AND(Q205="Show",Q207="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 122** — Range: `<ConditionalFormatting D204:N204 Q204:Z204>`

- Type: `cellIs`
  Priority: 393
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
  Priority: 395
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
  Priority: 397
  Formula: `['LEN(TRIM(D204))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 123** — Range: `<ConditionalFormatting D206:N206>`

- Type: `expression`
  Priority: 396
  Formula: `['AND(D204="Show",D206="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 390
  Formula: `['OR(D204="Show",D204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 124** — Range: `<ConditionalFormatting Q206:Z206>`

- Type: `expression`
  Priority: 394
  Formula: `['AND(Q204="Show",Q206="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 387
  Formula: `['OR(Q204="Show",Q204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 125** — Range: `<ConditionalFormatting D204:N204>`

- Type: `expression`
  Priority: 392
  Formula: `['OR(D204="Show",D204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 126** — Range: `<ConditionalFormatting D205:N205>`

- Type: `expression`
  Priority: 391
  Formula: `['OR(D204="Show",D204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 127** — Range: `<ConditionalFormatting Q204:Z204>`

- Type: `expression`
  Priority: 389
  Formula: `['OR(Q204="Show",Q204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 128** — Range: `<ConditionalFormatting Q205:Z205>`

- Type: `expression`
  Priority: 388
  Formula: `['OR(Q204="Show",Q204="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 129** — Range: `<ConditionalFormatting D214:N214>`

- Type: `expression`
  Priority: 386
  Formula: `['AND(D212="Show",D214="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 130** — Range: `<ConditionalFormatting Q214:Z214>`

- Type: `expression`
  Priority: 385
  Formula: `['AND(Q212="Show",Q214="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 131** — Range: `<ConditionalFormatting D211:N211 Q211:Z211>`

- Type: `cellIs`
  Priority: 379
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
  Priority: 381
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
  Priority: 383
  Formula: `['LEN(TRIM(D211))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 132** — Range: `<ConditionalFormatting D213:N213>`

- Type: `expression`
  Priority: 382
  Formula: `['AND(D211="Show",D213="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 376
  Formula: `['OR(D211="Show",D211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 133** — Range: `<ConditionalFormatting Q213:Z213>`

- Type: `expression`
  Priority: 380
  Formula: `['AND(Q211="Show",Q213="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 373
  Formula: `['OR(Q211="Show",Q211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 134** — Range: `<ConditionalFormatting D211:N211>`

- Type: `expression`
  Priority: 378
  Formula: `['OR(D211="Show",D211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 135** — Range: `<ConditionalFormatting D212:N212>`

- Type: `expression`
  Priority: 377
  Formula: `['OR(D211="Show",D211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 136** — Range: `<ConditionalFormatting Q211:Z211>`

- Type: `expression`
  Priority: 375
  Formula: `['OR(Q211="Show",Q211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 137** — Range: `<ConditionalFormatting Q212:Z212>`

- Type: `expression`
  Priority: 374
  Formula: `['OR(Q211="Show",Q211="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 138** — Range: `<ConditionalFormatting D358:N358>`

- Type: `expression`
  Priority: 372
  Formula: `['AND(D356="Show",D358="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 139** — Range: `<ConditionalFormatting Q358:Z358>`

- Type: `expression`
  Priority: 371
  Formula: `['AND(Q356="Show",Q358="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 140** — Range: `<ConditionalFormatting D355:N355 Q355:Z355>`

- Type: `cellIs`
  Priority: 365
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
  Priority: 367
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
  Priority: 369
  Formula: `['LEN(TRIM(D355))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 141** — Range: `<ConditionalFormatting D357:N357>`

- Type: `expression`
  Priority: 368
  Formula: `['AND(D355="Show",D357="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 362
  Formula: `['OR(D355="Show",D355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 142** — Range: `<ConditionalFormatting Q357:Z357>`

- Type: `expression`
  Priority: 366
  Formula: `['AND(Q355="Show",Q357="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 359
  Formula: `['OR(Q355="Show",Q355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 143** — Range: `<ConditionalFormatting D355:N355>`

- Type: `expression`
  Priority: 364
  Formula: `['OR(D355="Show",D355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 144** — Range: `<ConditionalFormatting D356:N356>`

- Type: `expression`
  Priority: 363
  Formula: `['OR(D355="Show",D355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 145** — Range: `<ConditionalFormatting Q355:Z355>`

- Type: `expression`
  Priority: 361
  Formula: `['OR(Q355="Show",Q355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 146** — Range: `<ConditionalFormatting Q356:Z356>`

- Type: `expression`
  Priority: 360
  Formula: `['OR(Q355="Show",Q355="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 147** — Range: `<ConditionalFormatting D365:N365>`

- Type: `expression`
  Priority: 358
  Formula: `['AND(D363="Show",D365="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 148** — Range: `<ConditionalFormatting Q365:Z365>`

- Type: `expression`
  Priority: 357
  Formula: `['AND(Q363="Show",Q365="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 149** — Range: `<ConditionalFormatting D362:N362 Q362:Z362>`

- Type: `cellIs`
  Priority: 351
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
  Priority: 353
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
  Priority: 355
  Formula: `['LEN(TRIM(D362))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 150** — Range: `<ConditionalFormatting D364:N364>`

- Type: `expression`
  Priority: 354
  Formula: `['AND(D362="Show",D364="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 348
  Formula: `['OR(D362="Show",D362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 151** — Range: `<ConditionalFormatting Q364:Z364>`

- Type: `expression`
  Priority: 352
  Formula: `['AND(Q362="Show",Q364="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 345
  Formula: `['OR(Q362="Show",Q362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 152** — Range: `<ConditionalFormatting D362:N362>`

- Type: `expression`
  Priority: 350
  Formula: `['OR(D362="Show",D362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 153** — Range: `<ConditionalFormatting D363:N363>`

- Type: `expression`
  Priority: 349
  Formula: `['OR(D362="Show",D362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 154** — Range: `<ConditionalFormatting Q362:Z362>`

- Type: `expression`
  Priority: 347
  Formula: `['OR(Q362="Show",Q362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 155** — Range: `<ConditionalFormatting Q363:Z363>`

- Type: `expression`
  Priority: 346
  Formula: `['OR(Q362="Show",Q362="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 156** — Range: `<ConditionalFormatting D372:N372>`

- Type: `expression`
  Priority: 344
  Formula: `['AND(D370="Show",D372="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 157** — Range: `<ConditionalFormatting Q372:Z372>`

- Type: `expression`
  Priority: 343
  Formula: `['AND(Q370="Show",Q372="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 158** — Range: `<ConditionalFormatting D369:N369 Q369:Z369>`

- Type: `cellIs`
  Priority: 337
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
  Priority: 339
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
  Priority: 341
  Formula: `['LEN(TRIM(D369))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 159** — Range: `<ConditionalFormatting D371:N371>`

- Type: `expression`
  Priority: 340
  Formula: `['AND(D369="Show",D371="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 334
  Formula: `['OR(D369="Show",D369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 160** — Range: `<ConditionalFormatting Q371:Z371>`

- Type: `expression`
  Priority: 338
  Formula: `['AND(Q369="Show",Q371="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 331
  Formula: `['OR(Q369="Show",Q369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 161** — Range: `<ConditionalFormatting D369:N369>`

- Type: `expression`
  Priority: 336
  Formula: `['OR(D369="Show",D369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 162** — Range: `<ConditionalFormatting D370:N370>`

- Type: `expression`
  Priority: 335
  Formula: `['OR(D369="Show",D369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 163** — Range: `<ConditionalFormatting Q369:Z369>`

- Type: `expression`
  Priority: 333
  Formula: `['OR(Q369="Show",Q369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 164** — Range: `<ConditionalFormatting Q370:Z370>`

- Type: `expression`
  Priority: 332
  Formula: `['OR(Q369="Show",Q369="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 165** — Range: `<ConditionalFormatting B112:B114>`

- Type: `containsBlanks`
  Priority: 330
  Formula: `['LEN(TRIM(B112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 166** — Range: `<ConditionalFormatting B255:B256 B274>`

- Type: `containsBlanks`
  Priority: 329
  Formula: `['LEN(TRIM(B255))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 167** — Range: `<ConditionalFormatting B374:B379>`

- Type: `containsBlanks`
  Priority: 328
  Formula: `['LEN(TRIM(B374))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 168** — Range: `<ConditionalFormatting B314:B316>`

- Type: `containsBlanks`
  Priority: 327
  Formula: `['LEN(TRIM(B314))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 169** — Range: `<ConditionalFormatting D390:N390>`

- Type: `expression`
  Priority: 325
  Formula: `['AND(D388="Show",D390="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 170** — Range: `<ConditionalFormatting Q390:Z390>`

- Type: `expression`
  Priority: 324
  Formula: `['AND(Q388="Show",Q390="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 171** — Range: `<ConditionalFormatting D387:N387 Q387:Z387>`

- Type: `cellIs`
  Priority: 318
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
  Priority: 320
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
  Priority: 322
  Formula: `['LEN(TRIM(D387))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 172** — Range: `<ConditionalFormatting D389:N389>`

- Type: `expression`
  Priority: 321
  Formula: `['AND(D387="Show",D389="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 315
  Formula: `['OR(D387="Show",D387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 173** — Range: `<ConditionalFormatting Q389:Z389>`

- Type: `expression`
  Priority: 319
  Formula: `['AND(Q387="Show",Q389="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 312
  Formula: `['OR(Q387="Show",Q387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 174** — Range: `<ConditionalFormatting D387:N387>`

- Type: `expression`
  Priority: 317
  Formula: `['OR(D387="Show",D387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 175** — Range: `<ConditionalFormatting D388:N388>`

- Type: `expression`
  Priority: 316
  Formula: `['OR(D387="Show",D387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 176** — Range: `<ConditionalFormatting Q387:Z387>`

- Type: `expression`
  Priority: 314
  Formula: `['OR(Q387="Show",Q387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 177** — Range: `<ConditionalFormatting Q388:Z388>`

- Type: `expression`
  Priority: 313
  Formula: `['OR(Q387="Show",Q387="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 178** — Range: `<ConditionalFormatting D397:N397>`

- Type: `expression`
  Priority: 311
  Formula: `['AND(D395="Show",D397="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 179** — Range: `<ConditionalFormatting Q397:Z397>`

- Type: `expression`
  Priority: 310
  Formula: `['AND(Q395="Show",Q397="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 180** — Range: `<ConditionalFormatting D394:N394 Q394:Z394>`

- Type: `cellIs`
  Priority: 304
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
  Priority: 306
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
  Priority: 308
  Formula: `['LEN(TRIM(D394))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 181** — Range: `<ConditionalFormatting D396:N396>`

- Type: `expression`
  Priority: 307
  Formula: `['AND(D394="Show",D396="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 301
  Formula: `['OR(D394="Show",D394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 182** — Range: `<ConditionalFormatting Q396:Z396>`

- Type: `expression`
  Priority: 305
  Formula: `['AND(Q394="Show",Q396="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 298
  Formula: `['OR(Q394="Show",Q394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 183** — Range: `<ConditionalFormatting D394:N394>`

- Type: `expression`
  Priority: 303
  Formula: `['OR(D394="Show",D394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 184** — Range: `<ConditionalFormatting D395:N395>`

- Type: `expression`
  Priority: 302
  Formula: `['OR(D394="Show",D394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 185** — Range: `<ConditionalFormatting Q394:Z394>`

- Type: `expression`
  Priority: 300
  Formula: `['OR(Q394="Show",Q394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 186** — Range: `<ConditionalFormatting Q395:Z395>`

- Type: `expression`
  Priority: 299
  Formula: `['OR(Q394="Show",Q394="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 187** — Range: `<ConditionalFormatting D404:N404>`

- Type: `expression`
  Priority: 297
  Formula: `['AND(D402="Show",D404="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 188** — Range: `<ConditionalFormatting Q404:Z404>`

- Type: `expression`
  Priority: 296
  Formula: `['AND(Q402="Show",Q404="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 189** — Range: `<ConditionalFormatting D401:N401 Q401:Z401>`

- Type: `cellIs`
  Priority: 290
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
  Priority: 292
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
  Priority: 294
  Formula: `['LEN(TRIM(D401))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 190** — Range: `<ConditionalFormatting D403:N403>`

- Type: `expression`
  Priority: 293
  Formula: `['AND(D401="Show",D403="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 287
  Formula: `['OR(D401="Show",D401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 191** — Range: `<ConditionalFormatting Q403:Z403>`

- Type: `expression`
  Priority: 291
  Formula: `['AND(Q401="Show",Q403="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 284
  Formula: `['OR(Q401="Show",Q401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 192** — Range: `<ConditionalFormatting D401:N401>`

- Type: `expression`
  Priority: 289
  Formula: `['OR(D401="Show",D401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 193** — Range: `<ConditionalFormatting D402:N402>`

- Type: `expression`
  Priority: 288
  Formula: `['OR(D401="Show",D401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 194** — Range: `<ConditionalFormatting Q401:Z401>`

- Type: `expression`
  Priority: 286
  Formula: `['OR(Q401="Show",Q401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 195** — Range: `<ConditionalFormatting Q402:Z402>`

- Type: `expression`
  Priority: 285
  Formula: `['OR(Q401="Show",Q401="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 196** — Range: `<ConditionalFormatting D448:N448>`

- Type: `expression`
  Priority: 283
  Formula: `['AND(D446="Show",D448="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 197** — Range: `<ConditionalFormatting Q448:Z448>`

- Type: `expression`
  Priority: 282
  Formula: `['AND(Q446="Show",Q448="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 198** — Range: `<ConditionalFormatting D445:N445 Q445:Z445>`

- Type: `cellIs`
  Priority: 276
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
  Priority: 278
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
  Priority: 280
  Formula: `['LEN(TRIM(D445))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 199** — Range: `<ConditionalFormatting D447:N447>`

- Type: `expression`
  Priority: 279
  Formula: `['AND(D445="Show",D447="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 273
  Formula: `['OR(D445="Show",D445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 200** — Range: `<ConditionalFormatting Q447:Z447>`

- Type: `expression`
  Priority: 277
  Formula: `['AND(Q445="Show",Q447="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 270
  Formula: `['OR(Q445="Show",Q445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 201** — Range: `<ConditionalFormatting D445:N445>`

- Type: `expression`
  Priority: 275
  Formula: `['OR(D445="Show",D445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 202** — Range: `<ConditionalFormatting D446:N446>`

- Type: `expression`
  Priority: 274
  Formula: `['OR(D445="Show",D445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 203** — Range: `<ConditionalFormatting Q445:Z445>`

- Type: `expression`
  Priority: 272
  Formula: `['OR(Q445="Show",Q445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 204** — Range: `<ConditionalFormatting Q446:Z446>`

- Type: `expression`
  Priority: 271
  Formula: `['OR(Q445="Show",Q445="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 205** — Range: `<ConditionalFormatting D455:N455>`

- Type: `expression`
  Priority: 269
  Formula: `['AND(D453="Show",D455="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 206** — Range: `<ConditionalFormatting Q455:Z455>`

- Type: `expression`
  Priority: 268
  Formula: `['AND(Q453="Show",Q455="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 207** — Range: `<ConditionalFormatting D452:N452 Q452:Z452>`

- Type: `cellIs`
  Priority: 262
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
  Priority: 264
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
  Priority: 266
  Formula: `['LEN(TRIM(D452))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 208** — Range: `<ConditionalFormatting D454:N454>`

- Type: `expression`
  Priority: 265
  Formula: `['AND(D452="Show",D454="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 259
  Formula: `['OR(D452="Show",D452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 209** — Range: `<ConditionalFormatting Q454:Z454>`

- Type: `expression`
  Priority: 263
  Formula: `['AND(Q452="Show",Q454="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 256
  Formula: `['OR(Q452="Show",Q452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 210** — Range: `<ConditionalFormatting D452:N452>`

- Type: `expression`
  Priority: 261
  Formula: `['OR(D452="Show",D452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 211** — Range: `<ConditionalFormatting D453:N453>`

- Type: `expression`
  Priority: 260
  Formula: `['OR(D452="Show",D452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 212** — Range: `<ConditionalFormatting Q452:Z452>`

- Type: `expression`
  Priority: 258
  Formula: `['OR(Q452="Show",Q452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 213** — Range: `<ConditionalFormatting Q453:Z453>`

- Type: `expression`
  Priority: 257
  Formula: `['OR(Q452="Show",Q452="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 214** — Range: `<ConditionalFormatting D462:N462>`

- Type: `expression`
  Priority: 255
  Formula: `['AND(D460="Show",D462="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 215** — Range: `<ConditionalFormatting Q462:Z462>`

- Type: `expression`
  Priority: 254
  Formula: `['AND(Q460="Show",Q462="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 216** — Range: `<ConditionalFormatting D459:N459 Q459:Z459>`

- Type: `cellIs`
  Priority: 248
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
  Priority: 250
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
  Priority: 252
  Formula: `['LEN(TRIM(D459))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 217** — Range: `<ConditionalFormatting D461:N461>`

- Type: `expression`
  Priority: 251
  Formula: `['AND(D459="Show",D461="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 245
  Formula: `['OR(D459="Show",D459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 218** — Range: `<ConditionalFormatting Q461:Z461>`

- Type: `expression`
  Priority: 249
  Formula: `['AND(Q459="Show",Q461="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 242
  Formula: `['OR(Q459="Show",Q459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 219** — Range: `<ConditionalFormatting D459:N459>`

- Type: `expression`
  Priority: 247
  Formula: `['OR(D459="Show",D459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 220** — Range: `<ConditionalFormatting D460:N460>`

- Type: `expression`
  Priority: 246
  Formula: `['OR(D459="Show",D459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 221** — Range: `<ConditionalFormatting Q459:Z459>`

- Type: `expression`
  Priority: 244
  Formula: `['OR(Q459="Show",Q459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 222** — Range: `<ConditionalFormatting Q460:Z460>`

- Type: `expression`
  Priority: 243
  Formula: `['OR(Q459="Show",Q459="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 223** — Range: `<ConditionalFormatting B436>`

- Type: `containsBlanks`
  Priority: 241
  Formula: `['LEN(TRIM(B436))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 224** — Range: `<ConditionalFormatting D532:Z532>`

- Type: `expression`
  Priority: 240
  Formula: `['$B$436=0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=None, theme=0, tint=-0.14996795556505021, type='theme', bold=False

**Rule 225** — Range: `<ConditionalFormatting E66:Z68>`

- Type: `containsBlanks`
  Priority: 239
  Formula: `['LEN(TRIM(E66))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 226** — Range: `<ConditionalFormatting B72>`

- Type: `containsBlanks`
  Priority: 237
  Formula: `['LEN(TRIM(B72))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 227** — Range: `<ConditionalFormatting B48:B64>`

- Type: `expression`
  Priority: 232
  Formula: `['B48=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 228** — Range: `<ConditionalFormatting B184:B186>`

- Type: `containsBlanks`
  Priority: 224
  Formula: `['LEN(TRIM(B184))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 222
  Formula: `['LEN(TRIM(B184))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 229** — Range: `<ConditionalFormatting E184:Z184>`

- Type: `containsBlanks`
  Priority: 223
  Formula: `['LEN(TRIM(E184))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 230** — Range: `<ConditionalFormatting E185:Z186>`

- Type: `containsBlanks`
  Priority: 221
  Formula: `['LEN(TRIM(E185))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 231** — Range: `<ConditionalFormatting B79>`

- Type: `containsBlanks`
  Priority: 216
  Formula: `['LEN(TRIM(B79))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 232** — Range: `<ConditionalFormatting B86>`

- Type: `containsBlanks`
  Priority: 215
  Formula: `['LEN(TRIM(B86))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 233** — Range: `<ConditionalFormatting B120>`

- Type: `containsBlanks`
  Priority: 214
  Formula: `['LEN(TRIM(B120))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 234** — Range: `<ConditionalFormatting B133>`

- Type: `containsBlanks`
  Priority: 211
  Formula: `['LEN(TRIM(B133))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 235** — Range: `<ConditionalFormatting B140>`

- Type: `containsBlanks`
  Priority: 210
  Formula: `['LEN(TRIM(B140))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 236** — Range: `<ConditionalFormatting B147>`

- Type: `containsBlanks`
  Priority: 209
  Formula: `['LEN(TRIM(B147))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 237** — Range: `<ConditionalFormatting B162>`

- Type: `containsBlanks`
  Priority: 208
  Formula: `['LEN(TRIM(B162))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 238** — Range: `<ConditionalFormatting B169>`

- Type: `containsBlanks`
  Priority: 207
  Formula: `['LEN(TRIM(B169))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 239** — Range: `<ConditionalFormatting B176>`

- Type: `containsBlanks`
  Priority: 206
  Formula: `['LEN(TRIM(B176))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 240** — Range: `<ConditionalFormatting B197>`

- Type: `containsBlanks`
  Priority: 205
  Formula: `['LEN(TRIM(B197))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 241** — Range: `<ConditionalFormatting B204>`

- Type: `containsBlanks`
  Priority: 204
  Formula: `['LEN(TRIM(B204))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 242** — Range: `<ConditionalFormatting B211>`

- Type: `containsBlanks`
  Priority: 203
  Formula: `['LEN(TRIM(B211))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 243** — Range: `<ConditionalFormatting B355>`

- Type: `containsBlanks`
  Priority: 202
  Formula: `['LEN(TRIM(B355))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 244** — Range: `<ConditionalFormatting B362>`

- Type: `containsBlanks`
  Priority: 201
  Formula: `['LEN(TRIM(B362))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 245** — Range: `<ConditionalFormatting B369>`

- Type: `containsBlanks`
  Priority: 200
  Formula: `['LEN(TRIM(B369))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 246** — Range: `<ConditionalFormatting B387>`

- Type: `containsBlanks`
  Priority: 199
  Formula: `['LEN(TRIM(B387))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 247** — Range: `<ConditionalFormatting B394>`

- Type: `containsBlanks`
  Priority: 198
  Formula: `['LEN(TRIM(B394))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 248** — Range: `<ConditionalFormatting B401>`

- Type: `containsBlanks`
  Priority: 197
  Formula: `['LEN(TRIM(B401))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 249** — Range: `<ConditionalFormatting B445>`

- Type: `containsBlanks`
  Priority: 196
  Formula: `['LEN(TRIM(B445))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 250** — Range: `<ConditionalFormatting B452>`

- Type: `containsBlanks`
  Priority: 195
  Formula: `['LEN(TRIM(B452))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 251** — Range: `<ConditionalFormatting B459>`

- Type: `containsBlanks`
  Priority: 194
  Formula: `['LEN(TRIM(B459))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 252** — Range: `<ConditionalFormatting B312>`

- Type: `containsBlanks`
  Priority: 187
  Formula: `['LEN(TRIM(B312))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 186
  Formula: `['LEN(TRIM(B312))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 253** — Range: `<ConditionalFormatting I187>`

- Type: `containsBlanks`
  Priority: 185
  Formula: `['LEN(TRIM(I187))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 254** — Range: `<ConditionalFormatting B222:B226>`

- Type: `containsBlanks`
  Priority: 180
  Formula: `['LEN(TRIM(B222))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 255** — Range: `<ConditionalFormatting E224:Z226>`

- Type: `containsBlanks`
  Priority: 179
  Formula: `['LEN(TRIM(E224))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 256** — Range: `<ConditionalFormatting B224:B226>`

- Type: `containsBlanks`
  Priority: 177
  Formula: `['LEN(TRIM(B224))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 257** — Range: `<ConditionalFormatting D233:N233>`

- Type: `expression`
  Priority: 174
  Formula: `['AND(D231="Show",D233="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 258** — Range: `<ConditionalFormatting Q233:Z233>`

- Type: `expression`
  Priority: 173
  Formula: `['AND(Q231="Show",Q233="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 259** — Range: `<ConditionalFormatting D230:N230 Q230:Z230>`

- Type: `cellIs`
  Priority: 168
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
  Priority: 170
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
  Priority: 172
  Formula: `['LEN(TRIM(D230))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 260** — Range: `<ConditionalFormatting D232:N232>`

- Type: `expression`
  Priority: 171
  Formula: `['AND(D230="Show",D232="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 165
  Formula: `['OR(D230="Show",D230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 261** — Range: `<ConditionalFormatting Q232:Z232>`

- Type: `expression`
  Priority: 169
  Formula: `['AND(Q230="Show",Q232="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 162
  Formula: `['OR(Q230="Show",Q230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 262** — Range: `<ConditionalFormatting D230:N230>`

- Type: `expression`
  Priority: 167
  Formula: `['OR(D230="Show",D230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 263** — Range: `<ConditionalFormatting D231:N231>`

- Type: `expression`
  Priority: 166
  Formula: `['OR(D230="Show",D230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 264** — Range: `<ConditionalFormatting Q230:Z230>`

- Type: `expression`
  Priority: 164
  Formula: `['OR(Q230="Show",Q230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 265** — Range: `<ConditionalFormatting Q231:Z231>`

- Type: `expression`
  Priority: 163
  Formula: `['OR(Q230="Show",Q230="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 266** — Range: `<ConditionalFormatting D240:N240>`

- Type: `expression`
  Priority: 161
  Formula: `['AND(D238="Show",D240="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 267** — Range: `<ConditionalFormatting Q240:Z240>`

- Type: `expression`
  Priority: 160
  Formula: `['AND(Q238="Show",Q240="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 268** — Range: `<ConditionalFormatting D237:N237 Q237:Z237>`

- Type: `cellIs`
  Priority: 155
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
  Priority: 157
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
  Priority: 159
  Formula: `['LEN(TRIM(D237))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 269** — Range: `<ConditionalFormatting D239:N239>`

- Type: `expression`
  Priority: 158
  Formula: `['AND(D237="Show",D239="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 152
  Formula: `['OR(D237="Show",D237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 270** — Range: `<ConditionalFormatting Q239:Z239>`

- Type: `expression`
  Priority: 156
  Formula: `['AND(Q237="Show",Q239="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 149
  Formula: `['OR(Q237="Show",Q237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 271** — Range: `<ConditionalFormatting D237:N237>`

- Type: `expression`
  Priority: 154
  Formula: `['OR(D237="Show",D237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 272** — Range: `<ConditionalFormatting D238:N238>`

- Type: `expression`
  Priority: 153
  Formula: `['OR(D237="Show",D237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 273** — Range: `<ConditionalFormatting Q237:Z237>`

- Type: `expression`
  Priority: 151
  Formula: `['OR(Q237="Show",Q237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 274** — Range: `<ConditionalFormatting Q238:Z238>`

- Type: `expression`
  Priority: 150
  Formula: `['OR(Q237="Show",Q237="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 275** — Range: `<ConditionalFormatting D247:N247>`

- Type: `expression`
  Priority: 148
  Formula: `['AND(D245="Show",D247="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 276** — Range: `<ConditionalFormatting Q247:Z247>`

- Type: `expression`
  Priority: 147
  Formula: `['AND(Q245="Show",Q247="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 277** — Range: `<ConditionalFormatting D244:N244 Q244:Z244>`

- Type: `cellIs`
  Priority: 142
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
  Priority: 144
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
  Priority: 146
  Formula: `['LEN(TRIM(D244))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 278** — Range: `<ConditionalFormatting D246:N246>`

- Type: `expression`
  Priority: 145
  Formula: `['AND(D244="Show",D246="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 139
  Formula: `['OR(D244="Show",D244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 279** — Range: `<ConditionalFormatting Q246:Z246>`

- Type: `expression`
  Priority: 143
  Formula: `['AND(Q244="Show",Q246="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 136
  Formula: `['OR(Q244="Show",Q244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 280** — Range: `<ConditionalFormatting D244:N244>`

- Type: `expression`
  Priority: 141
  Formula: `['OR(D244="Show",D244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 281** — Range: `<ConditionalFormatting D245:N245>`

- Type: `expression`
  Priority: 140
  Formula: `['OR(D244="Show",D244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 282** — Range: `<ConditionalFormatting Q244:Z244>`

- Type: `expression`
  Priority: 138
  Formula: `['OR(Q244="Show",Q244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 283** — Range: `<ConditionalFormatting Q245:Z245>`

- Type: `expression`
  Priority: 137
  Formula: `['OR(Q244="Show",Q244="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 284** — Range: `<ConditionalFormatting B230>`

- Type: `containsBlanks`
  Priority: 135
  Formula: `['LEN(TRIM(B230))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 285** — Range: `<ConditionalFormatting B237>`

- Type: `containsBlanks`
  Priority: 134
  Formula: `['LEN(TRIM(B237))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 286** — Range: `<ConditionalFormatting B244>`

- Type: `containsBlanks`
  Priority: 133
  Formula: `['LEN(TRIM(B244))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 287** — Range: `<ConditionalFormatting B66:B68>`

- Type: `containsBlanks`
  Priority: 130
  Formula: `['LEN(TRIM(B66))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 129
  Formula: `['B66=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 288** — Range: `<ConditionalFormatting B482>`

- Type: `containsBlanks`
  Priority: 128
  Formula: `['LEN(TRIM(B482))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 289** — Range: `<ConditionalFormatting B126:B127>`

- Type: `containsBlanks`
  Priority: 127
  Formula: `['LEN(TRIM(B126))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 290** — Range: `<ConditionalFormatting B156>`

- Type: `containsBlanks`
  Priority: 126
  Formula: `['LEN(TRIM(B156))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 291** — Range: `<ConditionalFormatting B157:B158>`

- Type: `containsBlanks`
  Priority: 125
  Formula: `['LEN(TRIM(B157))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 124
  Formula: `['B157=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 292** — Range: `<ConditionalFormatting B216:B217>`

- Type: `containsBlanks`
  Priority: 122
  Formula: `['LEN(TRIM(B216))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 121
  Formula: `['B216=FALSE']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 293** — Range: `<ConditionalFormatting D26:N26>`

- Type: `expression`
  Priority: 120
  Formula: `['AND(D24="Show",D26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 294** — Range: `<ConditionalFormatting Q26:Z26>`

- Type: `expression`
  Priority: 119
  Formula: `['AND(Q24="Show",Q26="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 295** — Range: `<ConditionalFormatting D23:N23 Q23:Z23>`

- Type: `cellIs`
  Priority: 114
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
  Priority: 116
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
  Priority: 118
  Formula: `['LEN(TRIM(D23))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 296** — Range: `<ConditionalFormatting D25:N25>`

- Type: `expression`
  Priority: 117
  Formula: `['AND(D23="Show",D25="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 111
  Formula: `['OR(D23="Show",D23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 297** — Range: `<ConditionalFormatting Q25:Z25>`

- Type: `expression`
  Priority: 115
  Formula: `['AND(Q23="Show",Q25="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 108
  Formula: `['OR(Q23="Show",Q23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 298** — Range: `<ConditionalFormatting D23:N23>`

- Type: `expression`
  Priority: 113
  Formula: `['OR(D23="Show",D23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 299** — Range: `<ConditionalFormatting D24:N24>`

- Type: `expression`
  Priority: 112
  Formula: `['OR(D23="Show",D23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 300** — Range: `<ConditionalFormatting Q23:Z23>`

- Type: `expression`
  Priority: 110
  Formula: `['OR(Q23="Show",Q23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 301** — Range: `<ConditionalFormatting Q24:Z24>`

- Type: `expression`
  Priority: 109
  Formula: `['OR(Q23="Show",Q23="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 302** — Range: `<ConditionalFormatting B23>`

- Type: `containsBlanks`
  Priority: 107
  Formula: `['LEN(TRIM(B23))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 303** — Range: `<ConditionalFormatting E263:Z265>`

- Type: `containsBlanks`
  Priority: 106
  Formula: `['LEN(TRIM(E263))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 304** — Range: `<ConditionalFormatting B257:B260>`

- Type: `containsBlanks`
  Priority: 105
  Formula: `['LEN(TRIM(B257))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 305** — Range: `<ConditionalFormatting D272:N272>`

- Type: `expression`
  Priority: 104
  Formula: `['AND(D270="Show",D272="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 306** — Range: `<ConditionalFormatting Q272:Z272>`

- Type: `expression`
  Priority: 103
  Formula: `['AND(Q270="Show",Q272="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 307** — Range: `<ConditionalFormatting D269:N269 Q269:Z269>`

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
  Formula: `['LEN(TRIM(D269))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 308** — Range: `<ConditionalFormatting D271:N271>`

- Type: `expression`
  Priority: 101
  Formula: `['AND(D269="Show",D271="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 95
  Formula: `['OR(D269="Show",D269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 309** — Range: `<ConditionalFormatting Q271:Z271>`

- Type: `expression`
  Priority: 99
  Formula: `['AND(Q269="Show",Q271="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 92
  Formula: `['OR(Q269="Show",Q269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 310** — Range: `<ConditionalFormatting D269:N269>`

- Type: `expression`
  Priority: 97
  Formula: `['OR(D269="Show",D269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 311** — Range: `<ConditionalFormatting D270:N270>`

- Type: `expression`
  Priority: 96
  Formula: `['OR(D269="Show",D269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 312** — Range: `<ConditionalFormatting Q269:Z269>`

- Type: `expression`
  Priority: 94
  Formula: `['OR(Q269="Show",Q269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 313** — Range: `<ConditionalFormatting Q270:Z270>`

- Type: `expression`
  Priority: 93
  Formula: `['OR(Q269="Show",Q269="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 314** — Range: `<ConditionalFormatting B263:B265>`

- Type: `containsBlanks`
  Priority: 91
  Formula: `['LEN(TRIM(B263))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 315** — Range: `<ConditionalFormatting B269>`

- Type: `containsBlanks`
  Priority: 90
  Formula: `['LEN(TRIM(B269))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 316** — Range: `<ConditionalFormatting B261>`

- Type: `containsBlanks`
  Priority: 89
  Formula: `['LEN(TRIM(B261))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 88
  Formula: `['LEN(TRIM(B261))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 317** — Range: `<ConditionalFormatting B467>`

- Type: `containsBlanks`
  Priority: 87
  Formula: `['LEN(TRIM(B467))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 318** — Range: `<ConditionalFormatting D469>`

- Type: `containsBlanks`
  Priority: 86
  Formula: `['LEN(TRIM(D469))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 319** — Range: `<ConditionalFormatting B469>`

- Type: `containsBlanks`
  Priority: 85
  Formula: `['LEN(TRIM(B469))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 320** — Range: `<ConditionalFormatting E325:Z329>`

- Type: `containsBlanks`
  Priority: 84
  Formula: `['LEN(TRIM(E325))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 321** — Range: `<ConditionalFormatting B325:B329>`

- Type: `containsBlanks`
  Priority: 83
  Formula: `['LEN(TRIM(B325))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 322** — Range: `<ConditionalFormatting B318 B324>`

- Type: `containsBlanks`
  Priority: 82
  Formula: `['LEN(TRIM(B318))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 323** — Range: `<ConditionalFormatting E322:Z323>`

- Type: `containsBlanks`
  Priority: 81
  Formula: `['LEN(TRIM(E322))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 324** — Range: `<ConditionalFormatting B320:B323>`

- Type: `containsBlanks`
  Priority: 80
  Formula: `['LEN(TRIM(B320))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 325** — Range: `<ConditionalFormatting E320:Z321>`

- Type: `containsBlanks`
  Priority: 79
  Formula: `['LEN(TRIM(E320))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 326** — Range: `<ConditionalFormatting B336>`

- Type: `containsBlanks`
  Priority: 78
  Formula: `['LEN(TRIM(B336))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 327** — Range: `<ConditionalFormatting B337:B351>`

- Type: `containsBlanks`
  Priority: 77
  Formula: `['LEN(TRIM(B337))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 328** — Range: `<ConditionalFormatting D96:N96>`

- Type: `expression`
  Priority: 75
  Formula: `['AND(D94="Show",D96="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 329** — Range: `<ConditionalFormatting Q96:Z96>`

- Type: `expression`
  Priority: 74
  Formula: `['AND(Q94="Show",Q96="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 330** — Range: `<ConditionalFormatting D93:N93 Q93:Z93>`

- Type: `cellIs`
  Priority: 69
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
  Priority: 71
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
  Priority: 73
  Formula: `['LEN(TRIM(D93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 331** — Range: `<ConditionalFormatting D95:N95>`

- Type: `expression`
  Priority: 72
  Formula: `['AND(D93="Show",D95="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 66
  Formula: `['OR(D93="Show",D93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 332** — Range: `<ConditionalFormatting Q95:Z95>`

- Type: `expression`
  Priority: 70
  Formula: `['AND(Q93="Show",Q95="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 63
  Formula: `['OR(Q93="Show",Q93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 333** — Range: `<ConditionalFormatting D93:N93>`

- Type: `expression`
  Priority: 68
  Formula: `['OR(D93="Show",D93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 334** — Range: `<ConditionalFormatting D94:N94>`

- Type: `expression`
  Priority: 67
  Formula: `['OR(D93="Show",D93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 335** — Range: `<ConditionalFormatting Q93:Z93>`

- Type: `expression`
  Priority: 65
  Formula: `['OR(Q93="Show",Q93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 336** — Range: `<ConditionalFormatting Q94:Z94>`

- Type: `expression`
  Priority: 64
  Formula: `['OR(Q93="Show",Q93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 337** — Range: `<ConditionalFormatting B93>`

- Type: `containsBlanks`
  Priority: 62
  Formula: `['LEN(TRIM(B93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 338** — Range: `<ConditionalFormatting D103:N103>`

- Type: `expression`
  Priority: 61
  Formula: `['AND(D101="Show",D103="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 339** — Range: `<ConditionalFormatting Q103:Z103>`

- Type: `expression`
  Priority: 60
  Formula: `['AND(Q101="Show",Q103="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 340** — Range: `<ConditionalFormatting D100:N100 Q100:Z100>`

- Type: `cellIs`
  Priority: 55
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
  Priority: 57
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
  Priority: 59
  Formula: `['LEN(TRIM(D100))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 341** — Range: `<ConditionalFormatting D102:N102>`

- Type: `expression`
  Priority: 58
  Formula: `['AND(D100="Show",D102="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 52
  Formula: `['OR(D100="Show",D100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 342** — Range: `<ConditionalFormatting Q102:Z102>`

- Type: `expression`
  Priority: 56
  Formula: `['AND(Q100="Show",Q102="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 49
  Formula: `['OR(Q100="Show",Q100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 343** — Range: `<ConditionalFormatting D100:N100>`

- Type: `expression`
  Priority: 54
  Formula: `['OR(D100="Show",D100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 344** — Range: `<ConditionalFormatting D101:N101>`

- Type: `expression`
  Priority: 53
  Formula: `['OR(D100="Show",D100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 345** — Range: `<ConditionalFormatting Q100:Z100>`

- Type: `expression`
  Priority: 51
  Formula: `['OR(Q100="Show",Q100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 346** — Range: `<ConditionalFormatting Q101:Z101>`

- Type: `expression`
  Priority: 50
  Formula: `['OR(Q100="Show",Q100="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 347** — Range: `<ConditionalFormatting B100>`

- Type: `containsBlanks`
  Priority: 48
  Formula: `['LEN(TRIM(B100))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 348** — Range: `<ConditionalFormatting D110:N110>`

- Type: `expression`
  Priority: 47
  Formula: `['AND(D108="Show",D110="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 349** — Range: `<ConditionalFormatting Q110:Z110>`

- Type: `expression`
  Priority: 46
  Formula: `['AND(Q108="Show",Q110="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 350** — Range: `<ConditionalFormatting D107:N107 Q107:Z107>`

- Type: `cellIs`
  Priority: 41
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
  Priority: 43
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
  Priority: 45
  Formula: `['LEN(TRIM(D107))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 351** — Range: `<ConditionalFormatting D109:N109>`

- Type: `expression`
  Priority: 44
  Formula: `['AND(D107="Show",D109="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 38
  Formula: `['OR(D107="Show",D107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 352** — Range: `<ConditionalFormatting Q109:Z109>`

- Type: `expression`
  Priority: 42
  Formula: `['AND(Q107="Show",Q109="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 35
  Formula: `['OR(Q107="Show",Q107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 353** — Range: `<ConditionalFormatting D107:N107>`

- Type: `expression`
  Priority: 40
  Formula: `['OR(D107="Show",D107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 354** — Range: `<ConditionalFormatting D108:N108>`

- Type: `expression`
  Priority: 39
  Formula: `['OR(D107="Show",D107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 355** — Range: `<ConditionalFormatting Q107:Z107>`

- Type: `expression`
  Priority: 37
  Formula: `['OR(Q107="Show",Q107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 356** — Range: `<ConditionalFormatting Q108:Z108>`

- Type: `expression`
  Priority: 36
  Formula: `['OR(Q107="Show",Q107="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 357** — Range: `<ConditionalFormatting B107>`

- Type: `containsBlanks`
  Priority: 34
  Formula: `['LEN(TRIM(B107))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 358** — Range: `<ConditionalFormatting D282:N282 Q282:Z282>`

- Type: `cellIs`
  Priority: 29
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
  Priority: 31
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
  Priority: 33
  Formula: `['LEN(TRIM(D282))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 359** — Range: `<ConditionalFormatting D284:N285>`

- Type: `expression`
  Priority: 32
  Formula: `['AND(D282="Show",D284="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 360** — Range: `<ConditionalFormatting Q284:Z285>`

- Type: `expression`
  Priority: 30
  Formula: `['AND(Q282="Show",Q284="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 361** — Range: `<ConditionalFormatting D282:N282>`

- Type: `expression`
  Priority: 28
  Formula: `['OR(D282="Show",D282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 362** — Range: `<ConditionalFormatting D283:N283>`

- Type: `expression`
  Priority: 27
  Formula: `['OR(D282="Show",D282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 363** — Range: `<ConditionalFormatting D284:N284>`

- Type: `expression`
  Priority: 26
  Formula: `['OR(D282="Show",D282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 364** — Range: `<ConditionalFormatting Q282:Z282>`

- Type: `expression`
  Priority: 25
  Formula: `['OR(Q282="Show",Q282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 365** — Range: `<ConditionalFormatting Q283:Z283>`

- Type: `expression`
  Priority: 24
  Formula: `['OR(Q282="Show",Q282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 366** — Range: `<ConditionalFormatting Q284:Z284>`

- Type: `expression`
  Priority: 23
  Formula: `['OR(Q282="Show",Q282="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 367** — Range: `<ConditionalFormatting B282>`

- Type: `containsBlanks`
  Priority: 22
  Formula: `['LEN(TRIM(B282))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 368** — Range: `<ConditionalFormatting B418:B419>`

- Type: `containsBlanks`
  Priority: 21
  Formula: `['LEN(TRIM(B418))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 369** — Range: `<ConditionalFormatting E423:Z425>`

- Type: `containsBlanks`
  Priority: 20
  Formula: `['LEN(TRIM(E423))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 370** — Range: `<ConditionalFormatting D432:N432>`

- Type: `expression`
  Priority: 18
  Formula: `['AND(D430="Show",D432="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 371** — Range: `<ConditionalFormatting Q432:Z432>`

- Type: `expression`
  Priority: 17
  Formula: `['AND(Q430="Show",Q432="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 372** — Range: `<ConditionalFormatting D429:N429 Q429:Z429>`

- Type: `cellIs`
  Priority: 12
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
  Priority: 14
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
  Priority: 16
  Formula: `['LEN(TRIM(D429))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 373** — Range: `<ConditionalFormatting D431:N431>`

- Type: `expression`
  Priority: 15
  Formula: `['AND(D429="Show",D431="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 9
  Formula: `['OR(D429="Show",D429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 374** — Range: `<ConditionalFormatting Q431:Z431>`

- Type: `expression`
  Priority: 13
  Formula: `['AND(Q429="Show",Q431="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 6
  Formula: `['OR(Q429="Show",Q429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 375** — Range: `<ConditionalFormatting D429:N429>`

- Type: `expression`
  Priority: 11
  Formula: `['OR(D429="Show",D429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 376** — Range: `<ConditionalFormatting D430:N430>`

- Type: `expression`
  Priority: 10
  Formula: `['OR(D429="Show",D429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 377** — Range: `<ConditionalFormatting Q429:Z429>`

- Type: `expression`
  Priority: 8
  Formula: `['OR(Q429="Show",Q429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 378** — Range: `<ConditionalFormatting Q430:Z430>`

- Type: `expression`
  Priority: 7
  Formula: `['OR(Q429="Show",Q429="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 379** — Range: `<ConditionalFormatting B423:B425>`

- Type: `containsBlanks`
  Priority: 5
  Formula: `['LEN(TRIM(B423))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 380** — Range: `<ConditionalFormatting B429>`

- Type: `containsBlanks`
  Priority: 4
  Formula: `['LEN(TRIM(B429))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 381** — Range: `<ConditionalFormatting B421>`

- Type: `containsBlanks`
  Priority: 3
  Formula: `['LEN(TRIM(B421))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `containsBlanks`
  Priority: 2
  Formula: `['LEN(TRIM(B421))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 382** — Range: `<ConditionalFormatting B416>`

- Type: `containsBlanks`
  Priority: 1
  Formula: `['LEN(TRIM(B416))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'


### Sheet: Costing (26 rules)

**Rule 1** — Range: `<ConditionalFormatting E1>`

- Type: `cellIs`
  Priority: 97
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
  Priority: 98
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

**Rule 2** — Range: `<ConditionalFormatting F26>`

- Type: `cellIs`
  Priority: 95
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
  Priority: 96
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

**Rule 3** — Range: `<ConditionalFormatting F36>`

- Type: `cellIs`
  Priority: 93
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
  Priority: 94
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

**Rule 4** — Range: `<ConditionalFormatting F125>`

- Type: `cellIs`
  Priority: 77
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
  Priority: 78
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

**Rule 5** — Range: `<ConditionalFormatting F58>`

- Type: `cellIs`
  Priority: 71
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
  Priority: 72
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

**Rule 6** — Range: `<ConditionalFormatting F66>`

- Type: `cellIs`
  Priority: 69
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
  Priority: 70
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

**Rule 7** — Range: `<ConditionalFormatting F74>`

- Type: `cellIs`
  Priority: 67
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
  Priority: 68
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

**Rule 8** — Range: `<ConditionalFormatting F85>`

- Type: `cellIs`
  Priority: 65
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
  Priority: 66
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

**Rule 9** — Range: `<ConditionalFormatting F109>`

- Type: `cellIs`
  Priority: 63
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
  Priority: 64
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

**Rule 10** — Range: `<ConditionalFormatting F115>`

- Type: `cellIs`
  Priority: 61
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
  Priority: 62
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

**Rule 11** — Range: `<ConditionalFormatting F120>`

- Type: `cellIs`
  Priority: 59
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
  Priority: 60
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

**Rule 12** — Range: `<ConditionalFormatting F129 F133>`

- Type: `cellIs`
  Priority: 57
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
  Priority: 58
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

**Rule 13** — Range: `<ConditionalFormatting F19>`

- Type: `cellIs`
  Priority: 53
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
  Priority: 54
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

**Rule 14** — Range: `<ConditionalFormatting F27>`

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

**Rule 15** — Range: `<ConditionalFormatting F37>`

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

**Rule 16** — Range: `<ConditionalFormatting F59>`

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

**Rule 17** — Range: `<ConditionalFormatting F67>`

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

**Rule 18** — Range: `<ConditionalFormatting F75>`

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

**Rule 19** — Range: `<ConditionalFormatting F86>`

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

**Rule 20** — Range: `<ConditionalFormatting F110>`

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

**Rule 21** — Range: `<ConditionalFormatting F116>`

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

**Rule 22** — Range: `<ConditionalFormatting F121>`

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

**Rule 23** — Range: `<ConditionalFormatting F126>`

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

**Rule 24** — Range: `<ConditionalFormatting F134>`

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

**Rule 25** — Range: `<ConditionalFormatting F137>`

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

**Rule 26** — Range: `<ConditionalFormatting F130>`

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

**Rule 2** — Range: `<ConditionalFormatting D4:D16>`

- Type: `cellIs`
  Priority: 4
  Operator: equal
  Formula: `['"Yes"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bold=False

**Rule 3** — Range: `<ConditionalFormatting E4:E16>`

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

**Rule 4** — Range: `<ConditionalFormatting F4:F16>`

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
  Priority: 7
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
  Priority: 8
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


### Sheet: Material-List (2 rules)

**Rule 1** — Range: `<ConditionalFormatting Q13 Q16:Q17 Q21:Q29 Q39:Q41>`

- Type: `cellIs`
  Priority: 3
  Operator: greaterThanOrEqual
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

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

**Rule 2** — Range: `<ConditionalFormatting Q32 Q35:Q36 Q44:Q49 Q53 Q56 Q59>`

- Type: `cellIs`
  Priority: 1
  Operator: greaterThanOrEqual
  Formula: `['0']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb=None, indexed=None, auto=True, theme=None, tint=0.0, type='auto', bold=True
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FF92D050', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

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
R25: [A1]=https://www.tyneteesdampproofing.co.uk/
```

### Sheet: Sub Contractor Costs

**Rows:** 24  |  **Cols:** 8

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
R11: [B2]=1 | [C3]=='Customer Summary'!C4 | [D4]==Costing!V26+Costing!V36 | [G7]==Costing!O26+Costing!O36
R12: [B2]==B11+1 | [C3]=='Customer Summary'!C5 | [D4]==Costing!V58 | [G7]==Costing!O58
R13: [B2]==B12+1 | [C3]=='Customer Summary'!C6 | [D4]==Costing!V66 | [G7]==Costing!O66
R14: [B2]==B13+1 | [C3]=='Customer Summary'!C7 | [D4]==Costing!V74 | [G7]==Costing!O74
R15: [B2]==B14+1 | [C3]=='Customer Summary'!C8 | [D4]==Costing!V85-D16 | [G7]==Costing!O85-G16
R16: [B2]==B15+1 | [C3]=='Customer Summary'!C9 | [D4]==Costing!V79 | [G7]==Costing!O79
R17: [B2]==B16+1 | [C3]=='Customer Summary'!C10 | [D4]==Costing!V109 | [G7]==Costing!O109
R18: [B2]==B17+1 | [C3]=='Customer Summary'!C11 | [D4]==Costing!V115 | [G7]==Costing!O115
R19: [B2]==B18+1 | [C3]=='Customer Summary'!C12 | [D4]==Costing!V120 | [G7]==Costing!O120
R20: [B2]==B19+1 | [C3]=='Customer Summary'!C13 | [D4]==Costing!V125 | [G7]==Costing!O125
R21: [B2]==B20+1 | [C3]=='Customer Summary'!C14 | [D4]==Costing!V129 | [G7]==Costing!O129
R23: [C3]=Total | [D4]==SUM(D11:D22) | [G7]==SUM(G11:G22)
```

### Sheet: Material-List

**Rows:** 71  |  **Cols:** 18

```
R1: [D4]=Project Materials List
R3: [D4]=Site Details | [I9]=DOES NOT CONTAIN ANY JOINERY MATERIALS (JOISTS, STUD WORK, FLOORING) or ACO DRAINS
R4: [D4]=Enquiry ID: | [E5]==Costing!E4
R5: [D4]=Client Name | [E5]==Costing!E7
R6: [D4]=First Line of site address | [E5]==Costing!E8
R7: [D4]=Town / City | [E5]==Costing!E9
R8: [D4]=County | [E5]==Costing!E10
R9: [D4]=Site Post Code | [E5]==Costing!E11
R10: [B2]=Filter
R11: [B2]==B13 | [D4]=Prep Work | [L12]=Material Sheet Cost | [O15]=Cost Sheet 
R12: [B2]==B11 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage / logic based upon:  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R13: [B2]==IF(E13>0,1,0) | [D4]=Antinox Heavy Duty Floor Protection Boards – 2.4m x 1.2m | [E5]==Costing!F25 | [F6]=Per sheet | [I9]=n/a - as specified on the cost sheet. | [J10]=https://www.preservationshop.co.uk/product/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/ | [L12]=4.16 | [M13]==L13*E13 | [O15]==Costing!K25 | [Q17]==O13-M13
R14: [B2]==IF(SUM(B16:B18)>0,1,0) | [D4]=Walls - DPC | [L12]=Material Sheet Cost | [O15]=Cost Sheet 
R15: [B2]==B14 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R16: [B2]==IF(E16>0,1,0) | [D4]=Wykamol Ultracure Damp Proofing Cream | [E5]==IF(Costing!F40=0,0,IF(Costing!F40/(10*0.115)*1.1<0.5,1,IF(MOD(Costing!F40/(10*0.115),1)>=0.5,ROUNDUP(Costing!F40/(10*0.115),0),ROUNDDOWN(Costing!F40/(10*0.115),0)))) | [F6]=1ltr Cartridge | [I9]=10 linear metres at a 115mm brick thickness = 1.15 volume per tube↵Also see note in qty box. | [J10]=https://www.preservationshop.co.uk/product/wykamol-ultracure-damp-proofing-cream/ | [L12]=13.93 | [M13]==L16*E16 | [O15]==Costing!K40 | [Q17]==O16-M16-M17
R17: [B2]==IF(E17>0,1,0) | [D4]=Drill Plugs 12mm – Grey or Black  -  | [E5]==_xlfn.CEILING.MATH(((Costing!D40/6*50)),50) | [F6]=Each (rounded to multiples of 50) | [I9]=50 plugs to every 6LM | [J10]=https://www.preservationshop.co.uk/product/12mm-drill-plugs-grey-for-dpc-injection/ | [L12]==4.29/100 | [M13]==L17*E17
R18: [B2]==IF(E18>0,1,0) | [D4]==_xlfn.CONCAT("Mursec Eco Unit | Type: ",Costing!D42, " | Radius (mtr): ",Costing!E42) | [E5]==Costing!F42 | [F6]=Each | [I9]=n/a - as specified on the cost sheet. | [J10]=n/a | [L12]=n/a | [M13]=n/a | [O15]=n/a | [Q17]=n/a
R19: [B2]==IF(SUM(B21:B29)>0,1,0) | [D4]=Walls - Membrane | [O15]=Cost Sheet 
R20: [B2]==B19 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R21: [B2]==IF(E21>0,1,0) | [D4]=Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr | [E5]==_xlfn.CEILING.MATH((Costing!F44),5) | [F6]=M2 | [I9]=Round to lengths of 5mtrs as we cut the rolls in multiples of 5 and sell as such. | [J10]=https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/ | [L12]==20.83/5 | [M13]==L21*E21 | [O15]==Costing!K44 | [Q17]==O21-M21
R22: [B2]==IF(E22>0,1,0) | [D4]=Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr | [E5]==_xlfn.CEILING.MATH((Costing!F45),5) | [F6]=M2 | [I9]=Round to lengths of 5mtrs as we cut the rolls in multiples of 5 and sell as such. | [J10]=https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/ | [L12]==26.67/6 | [M13]==L22*E22 | [O15]==Costing!K45 | [Q17]==O22-M22
R23: [B2]==IF(E23>0,1,0) | [D4]==_xlfn.CONCAT("Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr↵For area of: [Length:",Costing!D46," mtrs] & [Height: ",Costing!E46," mtrs]") | [E5]==_xlfn.CEILING.MATH((Costing!F49),5) | [F6]=M2 | [I9]=Round to lengths of 5mtrs as we cut the rolls in multiples of 5 and sell as such. | [J10]=https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/ | [L12]==44.17/10 | [M13]==L23*E23 | [O15]==Costing!K46 | [Q17]==O23-M23
R24: [B2]==IF(E24>0,1,0) | [D4]=Cavity Membrane Fixing Plugs – 50mm | [E5]==_xlfn.CEILING.MATH(((SUM(Costing!F44:F48)*10)),20) | [F6]=Each (rounded to multiples of 20) | [I9]=Based on 10 plugs per m2. | [J10]=https://www.preservationshop.co.uk/product/cavity-membrane-fixing-plugs-50mm/ | [L12]==9.33/100 | [M13]==L24*E24 | [O15]==Costing!K50 | [Q17]==O24-M24
R25: [B2]==IF(E25>0,1,0) | [D4]=Wykamol Membrane Sealing Tape – 28mm x 22m | [E5]==ROUNDUP((Costing!F51)/22,0) | [F6]=Roll x 22 mtrs | [H8]=Gary to ask if subbies need tape | [I9]=Round to rolls of 22mtrs as we sell in rolls of 22mtr minimum | [J10]=https://www.preservationshop.co.uk/product/wykamol-membrane-sealing-tape-28mm-x-22m/ | [L12]=19.16 | [M13]==L25*E25 | [O15]==Costing!K51 | [Q17]==O25-M25
R26: [B2]==IF(E26>0,1,0) | [D4]=Wykamol Technoseal Liquid Damp Proofing Membrane 5ltr (DPM) - Black or White | [E5]==ROUNDUP((Costing!F52/80),1) | [F6]=5ltr Container | [H8]=Gary to supply buckets as needed so need to ask contractors what they have already. | [I9]=Estimated usage is 80LM per 5ltr container | [J10]=https://www.preservationshop.co.uk/product/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/ | [L12]=23.33 | [M13]==L26*E26 | [O15]==Costing!K52 | [Q17]==O26-M26
R27: [B2]==IF(E27>0,1,0) | [D4]=Wykamol – Universal Mortar | [E5]==ROUNDUP((Costing!F53+Costing!F64+Costing!F71)/12,0) | [F6]=25kg Bag | [I9]=Estimated usage is 12 LM per 25ltr bag.↵This covers all filet seal for all of the costing. | [J10]=https://www.preservationshop.co.uk/product/wykamol-universal-mortar/ | [L12]=24.51 | [M13]==L27*E27 | [O15]==Costing!K53 | [Q17]==O27-M27
R28: [B2]==IF(E28>0,1,0) | [D4]=Wykamol Membrane Fibre/Fleece Tape – 115mm X 5m | [E5]==ROUNDUP(((Costing!F55/5)),0) | [F6]=Roll x 5 mtrs | [H8]=Gary to ask if subbies need tape | [I9]=Round to rolls of 5mtrs as we sell in rolls of 5mtr minimum | [J10]=https://www.preservationshop.co.uk/product/wykamol-fibre-tape/ | [L12]=10.83 | [M13]==L28*E28 | [O15]==Costing!K55 | [Q17]==O28-M28
R29: [B2]==IF(E29>0,1,0) | [D4]=Wykamol Rope 10mm x 5m | [E5]==ROUNDUP((Costing!F56/5),0) | [F6]=Roll x 5 mtrs | [H8]=Gary to ask if subbies need tape | [I9]=Round to rolls of 5mtrs as we sell in rolls of 5mtr minimum | [J10]=https://www.preservationshop.co.uk/product/wykamol-rope-10mm-x-5m/ | [L12]=10.33 | [M13]==L29*E29 | [O15]==Costing!K56 | [Q17]==O29-M29
R30: [B2]==IF(SUM(B32:B36)>0,1,0) | [D4]=Cementitious tanking system | [O15]=Cost Sheet 
R31: [B2]==B30 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R32: [B2]==IF(E32>0,1,0) | [D4]=Wykamol SBR Latex – 5ltr | [E5]==ROUNDUP((Costing!F61/8),0) | [F6]=5ltr Container | [I9]=Dubbing out coat (sand/cement/SBR) - Uses SBR, building sand and cement  - 4 metres for 4 bags of sand 1 bag of cement and 0.5 tub of SBR. ↵Haven't added 10% wastage on this but rounded to full bags /… | [J10]=https://www.preservationshop.co.uk/product/wykamol-sbr-latex-5l/ | [L12]=16.66 | [M13]==L32*E32 | [O15]==Costing!K61 | [Q17]==O32-SUM(M32:M34)
R33: [B2]==IF(E33>0,1,0) | [D4]=Building Sand | [E5]==ROUNDUP(Costing!F61,0) | [F6]=Per bag | [J10]=n/a - on till only | [L12]==3.35/6*5 | [M13]==L33*E33
R34: [B2]==IF(E34>0,1,0) | [D4]=Cement 25kg | [E5]==ROUNDUP((Costing!F61/4),0) | [F6]=Per bag | [J10]=https://www.preservationshop.co.uk/product/cement/ | [L12]=7.69 | [M13]==L34*E34
R35: [B2]==IF(E35>0,1,0) | [D4]=Wykamol Hydradry Tanking Slurry – 20kg | [E5]==ROUNDUP((Costing!F62/7),0) | [F6]=20kg Container | [I9]=7 mtrs coverage per tub | [J10]=https://www.preservationshop.co.uk/product/hydradry-tanking-slurry/ | [L12]=21.7 | [M13]==L35*E35 | [O15]==Costing!K62 | [Q17]==O35-M35
R36: [B2]==IF(E36>0,1,0) | [D4]=Wykamol Renovating Plaster – 20kg Bag | [E5]==ROUNDUP(((Costing!F63/3)),0) | [F6]=20kg Bag | [I9]=Wykamol suggest 3 m² / 20 Kg bag when applied at a thickness of 10 mm | [J10]=https://www.preservationshop.co.uk/product/renovating-plaster/ | [L12]=16.25 | [M13]==L36*E36 | [O15]==Costing!K63 | [Q17]==O36-M36
R37: [B2]==IF(SUM(B39:B41)>0,1,0) | [D4]=Floor - Liquid Resin Floor Membranes  | [O15]=Cost Sheet 
R38: [B2]==B37 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R39: [B2]==IF(E39>0,1,0) | [D4]==Costing!B69 | [E5]==ROUNDUP((Costing!F69/30),0) | [F6]=5ltr Container | [I9]=30 mtrs coverage per tub | [J10]=https://www.preservationshop.co.uk/product/ep40-primer-coat/ | [L12]=56.7 | [M13]==L39*E39 | [O15]==Costing!K69 | [Q17]==O39-M39
R40: [B2]==IF(E40>0,1,0) | [D4]==Costing!B70 | [E5]==ROUNDUP(((Costing!F70/30)),0) | [F6]=5ltr Container | [I9]=30 mtrs coverage per tub | [J10]=https://www.preservationshop.co.uk/product/wykamol-ep40-epoxy-floor-coating-5l-grey/ | [L12]=63.7 | [M13]==L40*E40 | [O15]==Costing!K70 | [Q17]==O40-M40
R41: [B2]==IF(E41>0,1,0) | [D4]==Costing!B72 | [E5]==ROUNDUP(((Costing!F72/30)*1.1),0) | [F6]=Bag | [I9]=25 mtrs coverage per bag | [J10]=https://www.preservationshop.co.uk/product/grip-grit/ | [L12]=2.08 | [M13]==L41*E41 | [O15]==Costing!K72 | [Q17]==O41-M41
R42: [B2]==IF(SUM(B44:B50)>0,1,0) | [D4]=Plastering & finishing | [O15]=Cost Sheet 
R43: [B2]==B42 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R44: [B2]==IF(E44>0,1,0) | [D4]=Plasterboards, 1220mm x 900mmx 9.5mm | [E5]==ROUNDUP(Costing!F78/1.098,0) | [F6]=Each | [I9]=1 board covers 1.098 m2 | [J10]=n/a - on till only | [L12]=8.24 | [M13]==L44*E44 | [O15]==Costing!K78 | [Q17]==O44-M44 | [R18]==Q44/O44
R45: [B2]==IF(E45>0,1,0) | [D4]=Plastering Stop Bead - 3m length | [E5]==Costing!F81 | [F6]=Each | [I9]=n/a - as specified on the cost sheet. | [J10]=n/a - on till only | [L12]==1.2/6*5 | [M13]==L45*E45 | [O15]==Costing!T81 | [Q17]==O45-M45
R46: [B2]==IF(E46>0,1,0) | [D4]=Plastering Thin Coat Angle/Corner Bead - 2.4m length | [E5]==Costing!F82 | [F6]=Each | [I9]=n/a - as specified on the cost sheet. | [J10]=n/a - on till only | [L12]==1.99/6*5 | [M13]==L46*E46 | [O15]==Costing!T82 | [Q17]==O46-M46
R47: [B2]==IF(E47>0,1,0) | [D4]=Plastering Thin Coat Angle/Corner Bead - 3m length | [E5]==Costing!F83 | [F6]=Each | [I9]=n/a - as specified on the cost sheet. | [J10]=n/a - on till only | [L12]==2.99/6*5 | [M13]==L47*E47 | [O15]==Costing!T83 | [Q17]==O47-M47
R48: [B2]==IF(E48>0,1,0) | [D4]=Multi Finish Plaster – 25kg Bag – (British Gypsum Thistle) | [E5]==ROUNDUP(Costing!F80/10,0) | [F6]=25kg Bag | [I9]=1 bag does approx. 10m2 | [J10]=https://www.preservationshop.co.uk/product/multi-finish-plaster-25kg-bag-british-gypsum-thistle/ | [L12]=12.075 | [M13]==L48*E48 | [O15]==Costing!K80 | [Q17]==O48-M48 | [R18]==Q48/O48
R49: [B2]==IF(E49>0,1,0) | [D4]=Wykamol ISO-THERM – Thin Internal Wall Insulation (TIWI) – 0.95m x 7.5m | [E5]==_xlfn.CEILING.MATH(Costing!F79/7.125,0.5) | [F6]=Rolls (7.125 m2 per roll) | [I9]=1 roll does 7.125 m2 | [J10]=https://www.preservationshop.co.uk/product/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/ | [L12]==196.67/7.125 | [M13]==L49*E49 | [O15]==Costing!K79 | [Q17]==O49-M49-M50
R50: [B2]==IF(E50>0,1,0) | [D4]=Wykamol ISO-THERM Adhesive For Thin Internal Wall Insulation (TIWI) | [E5]==ROUNDUP(Costing!F79/7.125,0) | [F6]=Per 15kg tub | [I9]=1 tub does 7.125 m2 | [J10]=https://www.preservationshop.co.uk/product/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/ | [L12]=38.5 | [M13]==L50*E50
R51: [B2]==B53 | [D4]=Airbricks | [O15]=Cost Sheet 
R52: [B2]==B51 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R53: [B2]==IF(E53>0,1,0) | [D4]=Plastic Airbrick 9 x 3 (Beige, Black or Terracotta) | [E5]==(Costing!F112+Costing!F113+Costing!F114)*2 | [F6]=Each | [I9]=2 plastic airbricks make 1 actual installed airbrick | [J10]=https://www.preservationshop.co.uk/product/plastic-air-brick-9-x-3/ | [L12]=1.66 | [M13]==L53*E53 | [O15]==Costing!K112+Costing!K113+Costing!K114 | [Q17]==O53-M53
R54: [B2]==B56 | [D4]=Spray Treatments | [O15]=Cost Sheet 
R55: [B2]==B54 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R56: [B2]==IF(E56>0,1,0) | [D4]=Wykamol Microtech Dual Purpose Concentrate - 400g | [E5]==ROUNDUP((Costing!F118/100),0) | [F6]=400g bottle | [I9]=400 g makes up to 25 Litres - 100m2 coverage | [J10]=https://www.preservationshop.co.uk/product/wykamol-microtech-dual-purpose-concentrate/ | [L12]=20.97 | [M13]==L56*E56 | [O15]==Costing!K118 | [Q17]==O56-M56
R57: [B2]==B59 | [D4]=External Wall - Aquaban Water Repellant Treatments | [O15]=Cost Sheet 
R58: [B2]==B57 | [D4]=Item | [E5]=Qty | [F6]=UOM | [G7]=Assigned To: | [I9]=Usage based on  | [J10]=PS Product Link | [L12]=PS Item Cost | [M13]=Total Cost | [O15]=Total Cost (inc %) | [Q17]=Variance
R59: [B2]==IF(E59>0,1,0) | [D4]=Wykamol Enviroseal Liquid Water Repellent - 5ltr | [E5]==ROUNDUP((Costing!F128/25),0) | [F6]=5ltr Container | [I9]=Based on 25 m2 per 5ltr container | [J10]=https://www.preservationshop.co.uk/product/wykamol-enviroseal-liquid-water-repellent/ | [L12]=12.5 | [M13]==L59*E59 | [O15]==Costing!K128 | [Q17]==O59-M59
```

### Sheet: Changes

**Rows:** 33  |  **Cols:** 4

```
R1: [A1]=Date | [B2]=Version From | [C3]=Version To | [D4]=Change
R2: [A1]=2024-03-25 00:00:00 | [B2]=21 | [C3]=22 | [D4]=Added stripping wall paper to costing.
R3: [A1]=2024-03-25 00:00:00 | [B2]=21 | [C3]=22 | [D4]=Added Sub Contractor 'clarity' section on costing sheet - Vat registered and non vat registered
R4: [A1]=2024-04-09 00:00:00 | [B2]=22 | [C3]=23 | [D4]=Changed the refitting of ancilliaries (refit sockets, radiator and skirting boards) to be costed in chunks of 3 hours (approx half day).  E.g. If the total calculated hours equaled 2 hours then this w…
R5: [A1]=2024-04-11 00:00:00 | [B2]=23 | [C3]=24 | [D4]=Add VBA to updated the file name (date) on each click as the file names only changed on open so if clicking multiple times it was trying to save the same file again which is confusing)
R6: [A1]=2024-04-23 00:00:00 | [B2]=24 | [C3]=25 | [D4]=Added a 'Digital' DPC option to the sheet for using the Mursec Eco.
R7: [A1]=2024-05-07 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Add extra statements under the timber section as advised by SR.
R8: [A1]=2024-05-20 00:00:00 | [B2]=26 | [C3]=27 | [D4]=Fixed error logic in Aco drains section where you could specify there were issues but could then not specify what the issues were.
R9: [A1]=2024-05-28 00:00:00 | [B2]=27 | [C3]=28 | [D4]=Added deposit value ex vat and inc vat for card readers.
R10: [A1]=2024-06-14 00:00:00 | [B2]=28 | [C3]=29 | [D4]=Costing: Added in percentage adjuster to sections.↵Costing: Added in questions and conditional logic for skirting boards refit.↵Report: Add in more image sections for building defects.↵Report: Added i…
R11: [A1]=2024-09-04 00:00:00 | [B2]=29 | [C3]=30 | [D4]=Added conditional logic to Wall ties and solid floors section on report so that it pre-populates more cells as requested by GH.  Also removed the Office comments section at the bottom of the report as…
R12: [A1]=2024-09-11 00:00:00 | [B2]=30 | [C3]=31 | [D4]=Added Sub Contractor Costs and Sub Contractor Mats Tabs
R13: [A1]=2024-09-27 00:00:00 | [B2]=31 | [C3]=32 | [D4]=Changed wording on Projects Specific Overheads to make it look more generic and to cover more areas and removed the vehicle costs statement.↵Added the On Site Approval Form Tab.
R14: [A1]=2024-11-04 00:00:00 | [B2]=32 | [C3]=33 | [D4]=Updated material pricing on:↵Dubbing out coat, Renovating Plaster, EP40 Top Coat, EP40 Primer, Plasterboards, skimming, Isotherm rolls and adhesive, Fog Sub Floor.↵Updated hourly rate from £30.00 to £…
R15: [A1]=2024-11-11 00:00:00 | [B2]=33 | [C3]=34 | [D4]=Added materials sheet and updated logic on many lines to ensure that we are costing rolls of membranes etc in 5m2 qtys.↵Updated Contractyor cost sheet with hours.↵Amalgamated the strip out costs to on…
R16: [A1]=2024-11-13 00:00:00 | [B2]=34 | [C3]=35 | [D4]=Added extra line in on costing for CM3 20 metre rolls
R17: [A1]=2024-11-14 00:00:00 | [B2]=35 | [C3]=36 | [D4]=Fixed an issue where the CSV import file was importing extra lines.
R18: [A1]=2024-11-22 00:00:00 | [B2]=36 | [C3]=37 | [D4]=Fixed errors where the stripping out labour wasn't summing correctly and also the Aquaban option box wasn't linking to the corrrect cell on the csv import.
R19: [A1]=2024-12-11 00:00:00 | [B2]=37 | [C3]=38 | [D4]=Updated the wording etc on the 'Overheads' sections to olny show as Lab and Mats and added the description field to the csv upload as the wording was being cut off in the title.
R20: [A1]=2025-01-27 00:00:00 | [B2]=38 | [C3]=39 | [D4]=Added Estimate Coversheet Selections To Cost Sheet.↵Updated material pricing for HandyBoards and Multi Finish Plaster↵Re-named Warmline Thin Wall Insulation to Warmline Internal Wall Insulation as per…
R21: [A1]=2025-02-10 00:00:00 | [B2]=39 | [C3]=40 | [D4]=Added more coversheet images.
R22: [A1]=2025-04-07 00:00:00 | [B2]=40 | [C3]=41 | [D4]=Changed the Digital DPC section to allow the Surveyor to upsell the item where they can change the markup of the unit.
R23: [A1]=2025-06-02 00:00:00 | [B2]=41 | [C3]=42 | [D4]=Project Specifics Overhead description amended on csv upload for change to CF estimate to make it clear that the overheads may contain all or some of the items mentioned.↵Added floor insulation line a…
R24: [A1]=2025-09-26 00:00:00 | [B2]=42 | [C3]=43 | [D4]=Added line for Engineered flooring.
R25: [A1]=2025-10-02 00:00:00 | [B2]=43 | [C3]=44 | [D4]=Fixed margin value column on csv import for beta estimates.↵Applied filter to costing sheet for the headers.
R26: [A1]=2025-11-13 00:00:00 | [B2]=44 | [C3]=45 | [D4]=Updated master password.
R27: [A1]=2025-11-27 00:00:00 | [B2]=45 | [C3]=46 | [D4]=Added Walls unable to inspect section for GH
R28: [A1]=2025-12-16 00:00:00 | [B2]=46 | [C3]=47 | [D4]=Added Asbestos test to costing and report
R29: [A1]=2026-01-22 00:00:00 | [B2]=47 | [C3]=48 | [D4]=Updated pricing on the flooring labour as we have been undercharging.
```
