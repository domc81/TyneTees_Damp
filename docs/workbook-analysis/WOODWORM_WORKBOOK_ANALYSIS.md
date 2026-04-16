# WOODWORM Workbook — Forensic Analysis

**Source:** `Copy of Woodworm Costing v26 - CF Version - 220126.xlsm`  
**Extracted:** 2026-02-18 00:38:43  
**Tool:** extract_workbook.py v1.0

---

## SECTION 1: WORKBOOK OVERVIEW

**File:** `Copy of Woodworm Costing v26 - CF Version - 220126.xlsm`

**Extracted:** 2026-02-18T00:38:43.127737

**Survey Type:** WOODWORM

**Sheet Count:** 10


| # | Sheet Name | Rows | Cols | State |
|---|-----------|------|------|-------|
| 1 | Report | 247 | 29 | visible |
| 2 | Costing | 188 | 50 | visible |
| 3 | Customer Summary | 19 | 8 | visible |
| 4 | Office Notes | 1 | 9 | visible |
| 5 | CAF1 Form | 29 | 11 | visible |
| 6 | Sub Contractor Costs | 18 | 8 | visible |
| 7 | Sub Contractor Mats | 51 | 9 | visible |
| 8 | CF CSV Upload | 121 | 17 | visible |
| 9 | Data Lists | 121 | 2 | visible |
| 10 | Changes | 27 | 4 | visible |

## SECTION 2: REPORT SHEET — Complete Row-by-Row Map

**Total Rows:** 247  |  **Total Cols:** 29

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
R1: [D4]=Sheet Validation | [H8]==IF(SUM(V:V)=0,"SHEET NOT YET STARTED",IF(SUM(W:W)>0,"SHEET NOT COMPLETE","SHEET COMPLETE"))
R3: [D4]=Report | [R18]=Comments for Surveyors | [T20]=Visibility | [U21]=Sheet Validation to right | [V22]=Check if any data is entered | [W23]=Check if field needs to be completed
R4: [A1]==IF(W4=1,"X","") | [B2]=1 | [T20]=Always show
R5: [A1]==IF(W5=1,"X","") | [B2]=1 | [D4]=Client Name And Site Details | [R18]=Will always show | [T20]=Always show
R6: [A1]==IF(W6=1,"X","") | [B2]=1 | [T20]=Always show
R7: [A1]==IF(W7=1,"X","") | [B2]=1 | [D4]==Costing!E7 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(D7<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D7="",D7=0)),1,0)
R8: [A1]==IF(W8=1,"X","") | [B2]=1 | [D4]==Costing!E8 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(D8<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D8="",D8=0)),1,0)
R9: [A1]==IF(W9=1,"X","") | [B2]=1 | [D4]==Costing!E9 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(D9<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D9="",D9=0)),1,0)
R10: [A1]==IF(W10=1,"X","") | [B2]=1 | [D4]==Costing!E10 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(D10<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D10="",D10=0)),1,0)
R11: [A1]==IF(W11=1,"X","") | [B2]=1 | [D4]==Costing!E11 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(D11<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D11="",D11=0)),1,0)
R12: [A1]==IF(W12=1,"X","") | [B2]=1 | [D4]=Internal Reference ID: | [G7]==Costing!E4 | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(G12<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(G12="",G12=0)),1,0)
R13: [A1]==IF(W13=1,"X","") | [B2]=1 | [T20]=Always show
R14: [A1]==IF(W14=1,"X","") | [B2]=1 | [D4]=Weather Conditions | [R18]=Will always show | [T20]=Always show
R15: [A1]==IF(W15=1,"X","") | [B2]=1 | [D4]=Date of Inspection: | [R18]=← Enter date | [T20]=Always show | [V22]==IF(H15<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(H15="",H15=0)),1,0)
R16: [A1]==IF(W16=1,"X","") | [B2]=1 | [D4]=The weather conditions were:  | [R18]=← Enter Data Here | [T20]=Always show | [V22]==IF(H16<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(H16="",H16=0)),1,0)
R17: [A1]==IF(W17=1,"X","") | [B2]=1 | [D4]=The weather temperature was:  | [I9]=(°C). | [R18]=← Enter Data Here | [T20]=Always show | [V22]==IF(H17<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(H17="",H17=0)),1,0)
R18: [A1]==IF(W18=1,"X","") | [B2]=1 | [D4]=The Property | [R18]=Will always show | [T20]=Always show
R19: [A1]==IF(W19=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [R18]=This line will NOT show on the report | [T20]=Always Hide
R20: [A1]==IF(W20=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R21: [A1]==IF(W21=1,"X","") | [B2]==IF(OR(D22="Show",Q22="Show"),1,0) | [T20]=Always show
R22: [A1]==IF(W22=1,"X","") | [B2]=0 | [D4]=Show | [K11]=Show | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D22="Show",D22="",K22="Show",K22=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D22="",K22="")),1,0)
R23: [A1]==IF(W23=1,"X","") | [B2]==B21 | [R18]=← Add Images | [T20]=Determined by surveyor
R24: [A1]==IF(W24=1,"X","") | [B2]==B23 | [D4]=Front Elevation | [K11]=Rear Elevation | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D22="Show",D22="",K22="Show",K22=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D22="Show",D24=""),AND(K22="Show",K24=""))),1,0)
R25: [A1]==IF(W25=1,"X","") | [B2]==B24 | [T20]=Always show
R26: [A1]==IF(W26=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R27: [A1]==IF(W27=1,"X","") | [B2]=1 | [D4]=The property is a: | [R18]=← Enter Data Here | [T20]=Always show | [V22]==IF(I27<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(I27="",I27=0)),1,0)
R28: [A1]==IF(W28=1,"X","") | [B2]=1 | [D4]=The property is constructed of : | [R18]=← Enter Data Here | [T20]=Always show | [V22]==IF(I28<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(I28="",I28=0)),1,0)
R29: [A1]==IF(W29=1,"X","") | [B2]=1 | [D4]=The property was built approximately : | [R18]=← Enter Data Here | [T20]=Always show | [V22]==IF(I29<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(I29="",I29=0)),1,0)
R30: [A1]==IF(W30=1,"X","") | [B2]=1 | [T20]=Always show
R31: [A1]==IF(W31=1,"X","") | [B2]=1 | [D4]=Reported Problem | [R18]=Will always show | [T20]=Always show
R32: [A1]==IF(W32=1,"X","") | [B2]=1 | [D4]=Woodworm suspected  to: | [H8]==IF(D34<>"",D34,IF([1]Details!$C$13=0,"",[1]Details!$C$13)) | [R18]=Will always show (pre-populated) | [T20]=Always show | [V22]==IF(H32<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(H32="",H32=0)),1,0)
R33: [A1]==IF(W33=1,"X","") | [B2]=0 | [D4]=If the reported defect above, which pulls through from the master document, is no longer appropriate you can overwrite it by inputting a new one below otherwise leave it blank.   | [R18]=This line will NOT show on the report | [T20]=Always Hide
R34: [A1]==IF(W34=1,"X","") | [B2]=0 | [R18]=This line will NOT show on the report | [T20]=Always Hide
R35: [A1]==IF(W35=1,"X","") | [B2]=1
R36: [A1]==IF(W36=1,"X","") | [B2]=1 | [D4]=The Scope | [R18]=Will always show | [T20]=Always show
R37: [A1]==IF(W37=1,"X","") | [B2]=1 | [D4]=We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which… | [R18]=Will always show | [T20]=Always show
R38: [A1]==IF(W38=1,"X","") | [B2]=1 | [D4]=Our findings and proposals are set out below and should be read in conjunction with the enclosed document 'General Notes for clients and Health and Safety precautions'.  | [R18]=Will always show | [T20]=Always show
R39: [A1]==IF(W39=1,"X","") | [B2]=1 | [T20]=Always show
R40: [A1]==IF(W40=1,"X","") | [B2]=1 | [D4]=Inspection | [R18]=Will always show | [T20]=Always show
R41: [A1]==IF(W41=1,"X","") | [D4]=Our surveyor did not identify any damage related to wood boring insects. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B41<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B41=""),1,0)
R42: [A1]==IF(W42=1,"X","") | [D4]=Our inspection confirmed an historic attack of common furniture beetle (anobium punctatum). | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B42<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B42=""),1,0)
R43: [A1]==IF(W43=1,"X","") | [D4]=Our inspection confirmed an active infestation of common furniture beetle (anobium punctatum - picture below). | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B43<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B43=""),1,0)
R44: [A1]==IF(W44=1,"X","") | [B2]==IF(SUM(B42:B43)>0,1,0) | [N14]=Common furniture beetle                        (anobium punctatum) | [R18]=Will show if 'historic' or 'active' infestation | [T20]=Determined by surveyor
R45: [A1]==IF(W45=1,"X","") | [D4]=The infestation was noted to the following areas: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B45<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B45=""),1,0)
R46: [A1]==IF(W46=1,"X","") | [D4]=Ground floor rooms: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B46<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B46=""),1,0)
R47: [A1]==IF(W47=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B47<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B47=1,D47=""),AND(B47="",D47=""),AND(B47="",D47<>""),AND(B47=0,D47<>""))),1,0)
R48: [A1]==IF(W48=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B48<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B48=1,D48=""),AND(B48="",D48=""),AND(B48="",D48<>""),AND(B48=0,D48<>""))),1,0)
R49: [A1]==IF(W49=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B49<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B49=1,D49=""),AND(B49="",D49=""),AND(B49="",D49<>""),AND(B49=0,D49<>""))),1,0)
R50: [A1]==IF(W50=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [R18]=This line will NOT show on the report | [T20]=Always Hide
R51: [A1]==IF(W51=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R52: [A1]==IF(W52=1,"X","") | [B2]==IF(OR(D53="Show",Q53="Show"),1,0) | [T20]=Always show
R53: [A1]==IF(W53=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D53="Show",D53="",K53="Show",K53=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D53="",K53="")),1,0)
R54: [A1]==IF(W54=1,"X","") | [B2]==B52 | [R18]=← Add Images | [T20]=Determined by surveyor
R55: [A1]==IF(W55=1,"X","") | [B2]==B54 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D53="Show",D53="",K53="Show",K53=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D53="Show",D55=""),AND(K53="Show",K55=""))),1,0)
R56: [A1]==IF(W56=1,"X","") | [B2]==B55 | [T20]=Always show
R57: [A1]==IF(W57=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R58: [A1]==IF(W58=1,"X","") | [B2]=0 | [D4]=↓ Image Section 2 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R59: [A1]==IF(W59=1,"X","") | [B2]==IF(OR(D60="Show",Q60="Show"),1,0) | [T20]=Always show
R60: [A1]==IF(W60=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D60="Show",D60="",K60="Show",K60=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D60="",K60="")),1,0)
R61: [A1]==IF(W61=1,"X","") | [B2]==B59 | [R18]=← Add Images | [T20]=Determined by surveyor
R62: [A1]==IF(W62=1,"X","") | [B2]==B61 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D60="Show",D60="",K60="Show",K60=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D60="Show",D62=""),AND(K60="Show",K62=""))),1,0)
R63: [A1]==IF(W63=1,"X","") | [B2]==B62 | [T20]=Always show
R64: [A1]==IF(W64=1,"X","") | [B2]=0 | [D4]=↑ Image Section 2↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R65: [A1]==IF(W65=1,"X","") | [B2]=0 | [D4]=↓ Image Section 3 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R66: [A1]==IF(W66=1,"X","") | [B2]==IF(OR(D67="Show",Q67="Show"),1,0) | [T20]=Always show
R67: [A1]==IF(W67=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D67="Show",D67="",K67="Show",K67=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D67="",K67="")),1,0)
R68: [A1]==IF(W68=1,"X","") | [B2]==B66 | [R18]=← Add Images | [T20]=Determined by surveyor
R69: [A1]==IF(W69=1,"X","") | [B2]==B68 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D67="Show",D67="",K67="Show",K67=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D67="Show",D69=""),AND(K67="Show",K69=""))),1,0)
R70: [A1]==IF(W70=1,"X","") | [B2]==B69 | [T20]=Always show
R71: [A1]==IF(W71=1,"X","") | [B2]=0 | [D4]=↑ Image Section 3↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R72: [A1]==IF(W72=1,"X","") | [D4]=First floor rooms: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B72<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B72=""),1,0)
R73: [A1]==IF(W73=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B73<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B73=1,D73=""),AND(B73="",D73=""),AND(B73="",D73<>""),AND(B73=0,D73<>""))),1,0)
R74: [A1]==IF(W74=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B74<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B74=1,D74=""),AND(B74="",D74=""),AND(B74="",D74<>""),AND(B74=0,D74<>""))),1,0)
R75: [A1]==IF(W75=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B75<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B75=1,D75=""),AND(B75="",D75=""),AND(B75="",D75<>""),AND(B75=0,D75<>""))),1,0)
R76: [A1]==IF(W76=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [R18]=This line will NOT show on the report | [T20]=Always Hide
R77: [A1]==IF(W77=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R78: [A1]==IF(W78=1,"X","") | [B2]==IF(OR(D79="Show",Q79="Show"),1,0) | [T20]=Always show
R79: [A1]==IF(W79=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D79="Show",D79="",K79="Show",K79=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D79="",K79="")),1,0)
R80: [A1]==IF(W80=1,"X","") | [B2]==B78 | [R18]=← Add Images | [T20]=Determined by surveyor
R81: [A1]==IF(W81=1,"X","") | [B2]==B80 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D79="Show",D79="",K79="Show",K79=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D79="Show",D81=""),AND(K79="Show",K81=""))),1,0)
R82: [A1]==IF(W82=1,"X","") | [B2]==B81 | [T20]=Always show
R83: [A1]==IF(W83=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R84: [A1]==IF(W84=1,"X","") | [B2]=0 | [D4]=↓ Image Section 2 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R85: [A1]==IF(W85=1,"X","") | [B2]==IF(OR(D86="Show",Q86="Show"),1,0) | [T20]=Always show
R86: [A1]==IF(W86=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D86="Show",D86="",K86="Show",K86=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D86="",K86="")),1,0)
R87: [A1]==IF(W87=1,"X","") | [B2]==B85 | [R18]=← Add Images | [T20]=Determined by surveyor
R88: [A1]==IF(W88=1,"X","") | [B2]==B87 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D86="Show",D86="",K86="Show",K86=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D86="Show",D88=""),AND(K86="Show",K88=""))),1,0)
R89: [A1]==IF(W89=1,"X","") | [B2]==B88 | [T20]=Always show
R90: [A1]==IF(W90=1,"X","") | [B2]=0 | [D4]=↑ Image Section 2↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R91: [A1]==IF(W91=1,"X","") | [B2]=0 | [D4]=↓ Image Section 3 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R92: [A1]==IF(W92=1,"X","") | [B2]==IF(OR(D93="Show",Q93="Show"),1,0) | [T20]=Always show
R93: [A1]==IF(W93=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D93="Show",D93="",K93="Show",K93=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D93="",K93="")),1,0)
R94: [A1]==IF(W94=1,"X","") | [B2]==B92 | [R18]=← Add Images | [T20]=Determined by surveyor
R95: [A1]==IF(W95=1,"X","") | [B2]==B94 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D93="Show",D93="",K93="Show",K93=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D93="Show",D95=""),AND(K93="Show",K95=""))),1,0)
R96: [A1]==IF(W96=1,"X","") | [B2]==B95 | [T20]=Always show
R97: [A1]==IF(W97=1,"X","") | [B2]=0 | [D4]=↑ Image Section 3↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R98: [A1]==IF(W98=1,"X","") | [D4]=Loft area/Attic rooms: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B98<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B98=""),1,0)
R99: [A1]==IF(W99=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B99<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B99=1,D99=""),AND(B99="",D99=""),AND(B99="",D99<>""),AND(B99=0,D99<>""))),1,0)
R100: [A1]==IF(W100=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B100<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B100=1,D100=""),AND(B100="",D100=""),AND(B100="",D100<>""),AND(B100=0,D100<>""))),1,0)
R101: [A1]==IF(W101=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B101<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B101=1,D101=""),AND(B101="",D101=""),AND(B101="",D101<>""),AND(B101=0,D101<>""))),1,0)
R102: [A1]==IF(W102=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [T20]=Always Hide
R103: [A1]==IF(W103=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R104: [A1]==IF(W104=1,"X","") | [B2]==IF(OR(D105="Show",Q105="Show"),1,0) | [T20]=Always show
R105: [A1]==IF(W105=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D105="Show",D105="",K105="Show",K105=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D105="",K105="")),1,0)
R106: [A1]==IF(W106=1,"X","") | [B2]==B104 | [R18]=← Add Images | [T20]=Determined by surveyor
R107: [A1]==IF(W107=1,"X","") | [B2]==B106 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D105="Show",D105="",K105="Show",K105=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D105="Show",D107=""),AND(K105="Show",K107=""))),1,0)
R108: [A1]==IF(W108=1,"X","") | [B2]==B107 | [T20]=Always show
R109: [A1]==IF(W109=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R110: [A1]==IF(W110=1,"X","") | [B2]=0 | [D4]=↓ Image Section 2 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R111: [A1]==IF(W111=1,"X","") | [B2]==IF(OR(D112="Show",Q112="Show"),1,0) | [T20]=Always show
R112: [A1]==IF(W112=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D112="Show",D112="",K112="Show",K112=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D112="",K112="")),1,0)
R113: [A1]==IF(W113=1,"X","") | [B2]==B111 | [R18]=← Add Images | [T20]=Determined by surveyor
R114: [A1]==IF(W114=1,"X","") | [B2]==B113 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D112="Show",D112="",K112="Show",K112=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D112="Show",D114=""),AND(K112="Show",K114=""))),1,0)
R115: [A1]==IF(W115=1,"X","") | [B2]==B114 | [T20]=Always show
R116: [A1]==IF(W116=1,"X","") | [B2]=0 | [D4]=↑ Image Section 2↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R117: [A1]==IF(W117=1,"X","") | [B2]=0 | [D4]=↓ Image Section 3 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R118: [A1]==IF(W118=1,"X","") | [B2]==IF(OR(D119="Show",Q119="Show"),1,0) | [T20]=Always show
R119: [A1]==IF(W119=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D119="Show",D119="",K119="Show",K119=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D119="",K119="")),1,0)
R120: [A1]==IF(W120=1,"X","") | [B2]==B118 | [R18]=← Add Images | [T20]=Determined by surveyor
R121: [A1]==IF(W121=1,"X","") | [B2]==B120 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D119="Show",D119="",K119="Show",K119=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D119="Show",D121=""),AND(K119="Show",K121=""))),1,0)
R122: [A1]==IF(W122=1,"X","") | [B2]==B121 | [T20]=Always show
R123: [A1]==IF(W123=1,"X","") | [B2]=0 | [D4]=↑ Image Section 3↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R124: [A1]==IF(W124=1,"X","") | [D4]=Other rooms: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B124<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B124=""),1,0)
R125: [A1]==IF(W125=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B125<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B125=1,D125=""),AND(B125="",D125=""),AND(B125="",D125<>""),AND(B125=0,D125<>""))),1,0)
R126: [A1]==IF(W126=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B126<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B126=1,D126=""),AND(B126="",D126=""),AND(B126="",D126<>""),AND(B126=0,D126<>""))),1,0)
R127: [A1]==IF(W127=1,"X","") | [R18]=← Enter visibility & room details here | [T20]=Determined by surveyor | [V22]==IF(B127<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B127=1,D127=""),AND(B127="",D127=""),AND(B127="",D127<>""),AND(B127=0,D127<>""))),1,0)
R128: [A1]==IF(W128=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [T20]=Always Hide
R129: [A1]==IF(W129=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R130: [A1]==IF(W130=1,"X","") | [B2]==IF(OR(D131="Show",Q131="Show"),1,0) | [T20]=Always show
R131: [A1]==IF(W131=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D131="Show",D131="",K131="Show",K131=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D131="",K131="")),1,0)
R132: [A1]==IF(W132=1,"X","") | [B2]==B130 | [R18]=← Add Images | [T20]=Determined by surveyor
R133: [A1]==IF(W133=1,"X","") | [B2]==B132 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D131="Show",D131="",K131="Show",K131=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D131="Show",D133=""),AND(K131="Show",K133=""))),1,0)
R134: [A1]==IF(W134=1,"X","") | [B2]==B133 | [T20]=Always show
R135: [A1]==IF(W135=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R136: [A1]==IF(W136=1,"X","") | [B2]=0 | [D4]=↓ Image Section 2 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R137: [A1]==IF(W137=1,"X","") | [B2]==IF(OR(D138="Show",Q138="Show"),1,0) | [T20]=Always show
R138: [A1]==IF(W138=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D138="Show",D138="",K138="Show",K138=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D138="",K138="")),1,0)
R139: [A1]==IF(W139=1,"X","") | [B2]==B137 | [R18]=← Add Images | [T20]=Determined by surveyor
R140: [A1]==IF(W140=1,"X","") | [B2]==B139 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D138="Show",D138="",K138="Show",K138=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D138="Show",D140=""),AND(K138="Show",K140=""))),1,0)
R141: [A1]==IF(W141=1,"X","") | [B2]==B140 | [T20]=Always show
R142: [A1]==IF(W142=1,"X","") | [B2]=0 | [D4]=↑ Image Section 2↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R143: [A1]==IF(W143=1,"X","") | [B2]=0 | [D4]=↓ Image Section 3 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R144: [A1]==IF(W144=1,"X","") | [B2]==IF(OR(D145="Show",Q145="Show"),1,0) | [T20]=Always show
R145: [A1]==IF(W145=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D145="Show",D145="",K145="Show",K145=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D145="",K145="")),1,0)
R146: [A1]==IF(W146=1,"X","") | [B2]==B144 | [R18]=← Add Images | [T20]=Determined by surveyor
R147: [A1]==IF(W147=1,"X","") | [B2]==B146 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D145="Show",D145="",K145="Show",K145=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D145="Show",D147=""),AND(K145="Show",K147=""))),1,0)
R148: [A1]==IF(W148=1,"X","") | [B2]==B147 | [T20]=Always show
R149: [A1]==IF(W149=1,"X","") | [B2]=0 | [D4]=↑ Image Section 3↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R150: [A1]==IF(W150=1,"X","") | [D4]=It was not possible to inspect all timbers at the time of our visit. Some areas were inaccessible because of: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B150<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B150=""),1,0)
R151: [A1]==IF(W151=1,"X","") | [D4]=• | [E5]=Laminate/Wood overlay. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B151<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B151=""),1,0)
R152: [A1]==IF(W152=1,"X","") | [D4]=• | [E5]=Tacked or specialist carpet. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B152<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B152=""),1,0)
R153: [A1]==IF(W153=1,"X","") | [D4]=• | [E5]=Sealed natural floor. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B153<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B153=""),1,0)
R154: [A1]==IF(W154=1,"X","") | [B2]=0 | [D4]=• | [E5]=Other reason (state below): | [R18]=This line will NOT show on the report | [T20]=Always Hide
R155: [A1]==IF(W155=1,"X","") | [D4]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B155<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B155=1,E155=""),AND(B155="",E155=""),AND(B155="",E155<>""),AND(B155=0,E155<>""))),1,0)
R156: [A1]==IF(W156=1,"X","") | [D4]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B156<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B156=1,E156=""),AND(B156="",E156=""),AND(B156="",E156<>""),AND(B156=0,E156<>""))),1,0)
R157: [A1]==IF(W157=1,"X","") | [D4]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B157<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B157=1,E157=""),AND(B157="",E157=""),AND(B157="",E157<>""),AND(B157=0,E157<>""))),1,0)
R158: [A1]==IF(W158=1,"X","") | [B2]=0 | [D4]=Use the alt key and the mouse to 'snap' the image to the top and bottom of the cell for alignment. | [R18]=This line will NOT show on the report | [T20]=Always Hide
R159: [A1]==IF(W159=1,"X","") | [B2]=0 | [D4]=↓ Image Section 1 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R160: [A1]==IF(W160=1,"X","") | [B2]==IF(OR(D161="Show",Q161="Show"),1,0) | [T20]=Always show
R161: [A1]==IF(W161=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D161="Show",D161="",K161="Show",K161=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D161="",K161="")),1,0)
R162: [A1]==IF(W162=1,"X","") | [B2]==B160 | [R18]=← Add Images | [T20]=Determined by surveyor
R163: [A1]==IF(W163=1,"X","") | [B2]==B162 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D161="Show",D161="",K161="Show",K161=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D161="Show",D163=""),AND(K161="Show",K163=""))),1,0)
R164: [A1]==IF(W164=1,"X","") | [B2]==B163 | [T20]=Always show
R165: [A1]==IF(W165=1,"X","") | [B2]=0 | [D4]=↑ Image Section 1 ↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R166: [A1]==IF(W166=1,"X","") | [B2]=0 | [D4]=↓ Image Section 2 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R167: [A1]==IF(W167=1,"X","") | [B2]==IF(OR(D168="Show",Q168="Show"),1,0) | [T20]=Always show
R168: [A1]==IF(W168=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D168="Show",D168="",K168="Show",K168=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D168="",K168="")),1,0)
R169: [A1]==IF(W169=1,"X","") | [B2]==B167 | [R18]=← Add Images | [T20]=Determined by surveyor
R170: [A1]==IF(W170=1,"X","") | [B2]==B169 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D168="Show",D168="",K168="Show",K168=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D168="Show",D170=""),AND(K168="Show",K170=""))),1,0)
R171: [A1]==IF(W171=1,"X","") | [B2]==B170 | [T20]=Always show
R172: [A1]==IF(W172=1,"X","") | [B2]=0 | [D4]=↑ Image Section 2↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R173: [A1]==IF(W173=1,"X","") | [B2]=0 | [D4]=↓ Image Section 3 ↓ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R174: [A1]==IF(W174=1,"X","") | [B2]==IF(OR(D175="Show",Q175="Show"),1,0) | [T20]=Always show
R175: [A1]==IF(W175=1,"X","") | [B2]=0 | [D4]=Hide | [K11]=Hide | [R18]=← Enter Image Visibility | [T20]=Determined by surveyor | [V22]==IF(OR(D175="Show",D175="",K175="Show",K175=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(D175="",K175="")),1,0)
R176: [A1]==IF(W176=1,"X","") | [B2]==B174 | [R18]=← Add Images | [T20]=Determined by surveyor
R177: [A1]==IF(W177=1,"X","") | [B2]==B176 | [R18]=← Enter Images Descriptions | [T20]=Determined by surveyor | [V22]==IF(OR(D175="Show",D175="",K175="Show",K175=""),1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(D175="Show",D177=""),AND(K175="Show",K177=""))),1,0)
R178: [A1]==IF(W178=1,"X","") | [B2]==B177 | [T20]=Always show
R179: [A1]==IF(W179=1,"X","") | [B2]=0 | [D4]=↑ Image Section 3↑ | [R18]=This line will NOT show on the report | [T20]=Always Hide
R180: [A1]==IF(W180=1,"X","") | [B2]==B43 | [D4]=Proposal | [R18]=Will always show | [T20]=Determined by surveyor
R181: [A1]==IF(W181=1,"X","") | [D4]=No further treatment is necessary. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B181<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B181=""),1,0)
R182: [A1]==IF(W182=1,"X","") | [D4]=We would propose for the following works to be carried out: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B182<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B182=""),1,0)
R183: [A1]==IF(W183=1,"X","") | [D4]=• | [E5]=Create discrete openings as required to facilitate treatment. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B183<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B183=""),1,0)
R184: [A1]==IF(W184=1,"X","") | [D4]=• | [E5]=Carry out treatment for woodboring insects using  our environmentally friendly (water based with no solvents or propellants) micro biocidal fluid fogging system. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B184<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B184=""),1,0)
R185: [A1]==IF(W185=1,"X","") | [D4]=• | [E5]=Create access points to facilitate treatment of the staircase. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B185<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B185=""),1,0)
R186: [A1]==IF(W186=1,"X","") | [D4]=Roof void | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B186<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B186=""),1,0)
R187: [A1]==IF(W187=1,"X","") | [D4]=• | [E5]=Remove loft insulation and set aside to permit access to the roof base timbers. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B187<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B187=""),1,0)
R188: [A1]==IF(W188=1,"X","") | [D4]=• | [E5]=Carry out treatment for the eradication of woodworm infestation. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B188<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B188=""),1,0)
R189: [A1]==IF(W189=1,"X","") | [D4]=• | [E5]=Treat all roof timbers and ceiling studs to the loft area. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B189<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B189=""),1,0)
R190: [A1]==IF(W190=1,"X","") | [D4]=• | [E5]=Replace the loft insulation quilt. | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B190<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B190=""),1,0)
R191: [A1]==IF(W191=1,"X","") | [D4]=• | [E5]=Replace structurally compromised timbers to: | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B191<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B191=""),1,0)
R192: [A1]==IF(W192=1,"X","") | [E5]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B192<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B192=1,F192=""),AND(B192="",F192=""),AND(B192="",F192<>""),AND(B192=0,F192<>""))),1,0)
R193: [A1]==IF(W193=1,"X","") | [E5]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B193<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B193=1,F193=""),AND(B193="",F193=""),AND(B193="",F193<>""),AND(B193=0,F193<>""))),1,0)
R194: [A1]==IF(W194=1,"X","") | [E5]=• | [R18]=← please specify here | [T20]=Determined by surveyor | [V22]==IF(B194<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B194=1,F194=""),AND(B194="",F194=""),AND(B194="",F194<>""),AND(B194=0,F194<>""))),1,0)
R195: [A1]==IF(W195=1,"X","") | [B2]==IF(SUM(B182:B194)>0,1,0) | [D4]=Treatment  | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R196: [A1]==IF(W196=1,"X","") | [B2]==B195 | [D4]=We will apply new generation, Microtec woodworm treatment chemicals using our specialist Electronic aerosol micro spray system. This system allows the work to be carried out with minimum disruption. T… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R197: [A1]==IF(W197=1,"X","") | [B2]==B195 | [D4]=     Protective clothing | [H8]= Electro-aerosol applicator | [L12]=Atomised micro-spray fogging | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R198: [A1]==IF(W198=1,"X","") | [B2]==B195 | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R199: [A1]==IF(W199=1,"X","") | [B2]==B186 | [D4]=Insulation | [R18]=Will show if any of the 'Roof Void' title is marked as visible | [T20]=Show if active infestation
R200: [A1]==IF(W200=1,"X","") | [B2]==B186 | [D4]=Loft Insulation (where possible) will be lifted to one side of the roof void area to expose timbers below, that area will be treated. The insulation will then be transferred to the treated side, the n… | [R18]=Will show if any of the 'Roof Void' title is marked as visible | [T20]=Show if active infestation
R201: [A1]==IF(W201=1,"X","") | [B2]==B195 | [D4]=Exclusion Zone | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R202: [A1]==IF(W202=1,"X","") | [B2]==B195 | [D4]=There will be no permitted entry to the areas of treatment, during the treatment and for 1 hour after completion of treatment works. Exclusion will be to the whole of all rooms treated and if communal… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R203: [A1]==IF(W203=1,"X","") | [B2]==B195 | [D4]=Fish tanks should be covered and sealed for the same duration. We advise that fish are removed and kept away from the area and that the tank water is changed prior to return of the fish. | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R204: [A1]==IF(W204=1,"X","") | [B2]==B195 | [D4]=General | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R205: [A1]==IF(W205=1,"X","") | [B2]==B195 | [D4]=Ancillary Items | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R206: [A1]==IF(W206=1,"X","") | [B2]==B195 | [D4]=No allowance has been made in our estimate for the removal or replacement of floor coverings, furnishings, furniture, roof void stored contents and any other items that may obstruct our work. Whilst w… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R207: [A1]==IF(W207=1,"X","") | [B2]==B195 | [D4]=Extent of Survey | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R208: [A1]==IF(W208=1,"X","") | [B2]==B195 | [D4]=The areas we have reported upon are those inspected in accordance with your instructions. If there are any omissions or if you believe that we have misinterpreted your survey instruction, please let u… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R209: [A1]==IF(W209=1,"X","") | [B2]==B195 | [D4]=You should be aware that we have reported upon problems evident to us at the time of our inspection. We are not commenting in any general sense on the risks of dampness, fungal decay or any other defe… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R210: [A1]==IF(W210=1,"X","") | [B2]==B195 | [D4]=Payment | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R211: [A1]==IF(W211=1,"X","") | [B2]==B195 | [D4]=An initial payment of 30% of the contract value will be payable in advance, this will give us confidence to order job specific materials, and to book the time for your project into our technicians sch… | [R18]=Will show if any of the 'proposed treatment' lines are marked as visible | [T20]=Show if active infestation
R212: [A1]==IF(W212=1,"X","") | [B2]==B213 | [D4]=Additional Supporting Comments From Surveyor | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B212<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,B212=""),1,0)
R213: [A1]==IF(W213=1,"X","") | [B2]=0 | [R18]=← Enter visibility | [T20]=Determined by surveyor | [V22]==IF(B213<>"",1,0) | [W23]==IF(AND(SUM(V:V)>0,OR(AND(B213=1,D213=""),AND(B213="",D213=""),AND(B213="",D213<>""),AND(B213=0,D213<>""))),1,0)
R214: [A1]==IF(W214=1,"X","") | [B2]=1 | [T20]=Always Show
R215: [A1]==IF(W215=1,"X","") | [B2]=1 | [D4]=Report produced under the guidance of Tyne Tees Damp Proofing Ltd by: | [R18]=Will always show | [T20]=Always Show
R216: [A1]==IF(W216=1,"X","") | [B2]=1 | [T20]=Always Show
R217: [A1]==IF(W217=1,"X","") | [B2]==IF(Costing!$E$14="Steven Robinson",1,0) | [D4]=Steven Robinson  | [T20]=Show dependant on Surveyor
R218: [A1]==IF(W218=1,"X","") | [B2]==B217 | [D4]=Steve Robinson A.Inst.SSE | [T20]=Show dependant on Surveyor
R219: [A1]==IF(W219=1,"X","") | [B2]==B218 | [D4]=Remedial Consultant | [T20]=Show dependant on Surveyor
R220: [A1]==IF(W220=1,"X","") | [B2]==IF(Costing!$E$14="Graeme Hazel",1,0) | [D4]=Graeme Hazel | [T20]=Show dependant on Surveyor
R221: [A1]==IF(W221=1,"X","") | [B2]==B220 | [D4]=Graeme Hazel | [T20]=Show dependant on Surveyor
R222: [A1]==IF(W222=1,"X","") | [B2]==B221 | [D4]=Remedial Consultant | [T20]=Show dependant on Surveyor
R223: [A1]==IF(W223=1,"X","") | [B2]==IF(Costing!$E$14="Mike Davison",1,0) | [D4]=Mike Davison  | [T20]=Show dependant on Surveyor
R224: [A1]==IF(W224=1,"X","") | [B2]==B223 | [D4]=Mike Davison CSSW, M.Inst.SSE | [T20]=Show dependant on Surveyor
R225: [A1]==IF(W225=1,"X","") | [B2]==B224 | [D4]=Technical Director | [T20]=Show dependant on Surveyor
R227: [D4]=Office tasks when submitting an estimate 
R228: [D4]=You need to attach the following items to the estimate:
R229: [D4]=• The Survey Inspection Report (generated from the Report tab in this document).
R230: [D4]=• Our Terms and Conditions (latest version always found in the folder '1.Current Documentation'). 
R231: [D4]=• General Notes for clients and Health and Safety precautions (latest version always found in the folder '1.Current Documentation'). 
R233: [D4]=Notes for office
R234: [D4]=Page Breaks:
R235: [D4]=To understand page breaks the link below will be of assistance:
R236: [D4]=https://support.microsoft.com/en-gb/office/insert-move-or-delete-page-breaks-in-a-worksheet-ad3dc726-beec-4a4c-861f-ed640612bdc2
R237: [D4]=Image Best Practices:
R238: [D4]=• Use the 'Alt' key to align an image to the bottom of the cell.
R239: [D4]=• To format an image right click on it to set the height and/or crop ( a good starting height is 6cm).
R240: [D4]=• Try to keep images the same height especially if on the same row and ensure you use the 'alt' key to align the image to the bottom of the cell.
R241: [D4]=• Try and keep the images a fraction smaller than the cell height to prevent overspill if the image cell falls on a page break.
R242: [D4]=• Try and keep the images centrally above their descriptions.
```

## SECTION 3: COSTING SHEET — Complete Pricing Engine

**Total Rows:** 188  |  **Total Cols:** 50

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
R16: [A1]==IF(AU16=1,"X","") | [B2]=WOODWORM SHEET
R17: [A1]==IF(AU17=1,"X","") | [B2]=Materials | [F6]=Area/No. | [G7]=UOM | [H8]=Default ↵Mats Cost | [I9]=Adjusted ↵Mats Cost | [J10]=M/U | [K11]=Mats Tot | [M13]=Labour | [N14]=Hour Mult | [O15]=Total Hours | [P16]=Default ↵Lab Cost | [Q17]=Adjusted ↵Lab Cost | [R18]=LMU | [S19]=Lab Total | [T20]=Line total | [U21]=Contractor Materials | [V22]=Contractor hours pay
R18: [A1]==IF(AU18=1,"X","")
R20: [A1]==IF(AU20=1,"X","") | [B2]=Preparatory work | [M13]==B20 | [U21]==B20
R21: [A1]==IF(AU21=1,"X","") | [B2]=Remove radiators & cap valves | [G7]=Each | [H8]=7 | [I9]==(H21/100)*(100+$F$26) | [J10]=0.3 | [K11]==F21*I21*(1+J21) | [M13]==B21 | [N14]==(1/60)*20 | [O15]==F21*N21 | [P16]==$D$110 | [Q17]==(P21/100)*(100+$F$26) | [R18]=1 | [S19]==(O21*Q21*(1+R21)) | [T20]==K21+S21 | [U21]==F21*H21*1.1 | [V22]==O21*$E$110 | [AT46]==IF(F21<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F21=""),1,0)
R22: [A1]==IF(AU22=1,"X","") | [B2]=Remove socket fronts and isolate | [G7]=Each | [H8]=2 | [I9]==(H22/100)*(100+$F$26) | [J10]=0.3 | [K11]==F22*I22*(1+J22) | [M13]==B22 | [N14]==(1/60)*12 | [O15]==F22*N22 | [P16]==$D$110 | [Q17]==(P22/100)*(100+$F$26) | [R18]=1 | [S19]==(O22*Q22*(1+R22)) | [T20]==K22+S22 | [U21]==F22*H22*1.1 | [V22]==O22*$E$110 | [AT46]==IF(F22<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F22=""),1,0)
R23: [A1]==IF(AU23=1,"X","") | [B2]=Skirting board removal & set aside | [G7]=LM | [H8]=0.1 | [I9]==(H23/100)*(100+$F$26) | [J10]=0.3 | [K11]==F23*I23*(1+J23) | [L12]=0.25 | [M13]==B23 | [N14]=0.07 | [O15]==F23*N23 | [P16]==$D$110 | [Q17]==(P23/100)*(100+$F$26) | [R18]=1 | [S19]==(O23*Q23*(1+R23)) | [T20]==K23+S23 | [U21]==F23*H23*1.1 | [V22]==O23*$E$110 | [AT46]==IF(F23<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F23=""),1,0)
R24: [A1]==IF(AU24=1,"X","") | [B2]=Strip Wall Paper | [G7]=M2 | [H8]=0.5 | [I9]==(H24/100)*(100+$F$26) | [J10]=0.3 | [K11]==F24*I24*(1+J24) | [L12]=0.25 | [M13]==B24 | [N14]=0.5 | [O15]==F24*N24 | [P16]==$D$110 | [Q17]==(P24/100)*(100+$F$26) | [R18]=1 | [S19]==(O24*Q24*(1+R24)) | [T20]==K24+S24 | [U21]==F24*H24*1.1 | [V22]==O24*$E$110 | [AT46]==IF(F24<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F24=""),1,0)
R25: [A1]==IF(AU25=1,"X","") | [B2]=Antinox HD Floor Protection Boards – 2.4m x 1.2m | [G7]=M2 | [H8]==4.16*1.1 | [I9]==(H25/100)*(100+$F$26) | [J10]=0.3 | [K11]==F25*I25*(1+J25) | [L12]=0.25 | [M13]==B25 | [N14]==(1/60)*2 | [O15]==F25*N25 | [P16]==$D$110 | [Q17]==(P25/100)*(100+$F$26) | [R18]=1 | [S19]==(O25*Q25*(1+R25)) | [T20]==K25+S25 | [U21]==F25*H25*1.1 | [V22]==O25*$E$110 | [AT46]==IF(F25<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F25=""),1,0)
R26: [A1]==IF(AU26=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K21:K25) | [M13]=Totals | [O15]==SUM(O21:O23) | [S19]==SUM(S21:S25) | [T20]==SUM(T21:T25) | [U21]==SUM(U21:U25) | [V22]==SUM(V21:V25)
R28: [A1]==IF(AU28=1,"X","") | [B2]=Strip out | [M13]==B28 | [U21]==B28
R29: [A1]==IF(AU29=1,"X","") | [B2]=Remove plaster/render (Walls) | [G7]=M2 | [H8]=0 | [I9]==(H29/100)*(100+$F$36) | [J10]=0 | [K11]==F29*I29*(1+J29) | [L12]=0.75 | [M13]==B29 | [N14]=0.3 | [O15]==F29*N29 | [P16]==$D$110 | [Q17]==(P29/100)*(100+$F$36) | [R18]=1 | [S19]==(O29*Q29*(1+R29)) | [T20]==K29+S29 | [U21]==F29*H29*1.1 | [V22]==O29*$E$110 | [AT46]==IF(F29<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F29=""),1,0)
R30: [A1]==IF(AU30=1,"X","") | [B2]=Removal of stud walls etc (Bag & cart away) | [G7]=M2 | [H8]=0 | [I9]==(H30/100)*(100+$F$36) | [J10]=0 | [K11]==F30*I30*(1+J30) | [L12]=0.8 | [M13]==B30 | [N14]=0.4 | [O15]==F30*N30 | [P16]==$D$110 | [Q17]==(P30/100)*(100+$F$36) | [R18]=1 | [S19]==(O30*Q30*(1+R30)) | [T20]==K30+S30 | [U21]==F30*H30*1.1 | [V22]==O30*$E$110 | [AT46]==IF(F30<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F30=""),1,0)
R31: [A1]==IF(AU31=1,"X","") | [B2]=Plaster & lath removal )& de-nail  (Ceilings) | [G7]=M2 | [H8]=0 | [I9]==(H31/100)*(100+$F$36) | [J10]=0 | [K11]==F31*I31*(1+J31) | [L12]=0.6 | [M13]==B31 | [N14]=0.8 | [O15]==F31*N31 | [P16]==$D$110 | [Q17]==(P31/100)*(100+$F$36) | [R18]=1 | [S19]==(O31*Q31*(1+R31)) | [T20]==K31+S31 | [U21]==F31*H31*1.1 | [V22]==O31*$E$110 | [AT46]==IF(F31<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F31=""),1,0)
R32: [A1]==IF(AU32=1,"X","") | [B2]=Strip out existing timber floor (GF) | [G7]=M2 | [H8]=0 | [I9]==(H32/100)*(100+$F$36) | [J10]=0 | [K11]==F32*I32*(1+J32) | [M13]==B32 | [N14]=0.5 | [O15]==F32*N32 | [P16]==$D$110 | [Q17]==(P32/100)*(100+$F$36) | [R18]=1 | [S19]==(O32*Q32*(1+R32)) | [T20]==K32+S32 | [U21]==F32*H32*1.1 | [V22]==O32*$E$110 | [AT46]==IF(F32<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F32=""),1,0)
R33: [A1]==IF(AU33=1,"X","") | [B2]=Scrape back/clear sub floors | [G7]=M2 | [H8]=0 | [I9]==(H33/100)*(100+$F$36) | [J10]=0 | [K11]==F33*I33*(1+J33) | [M13]==B33 | [N14]=0.25 | [O15]==F33*N33 | [P16]==$D$110 | [Q17]==(P33/100)*(100+$F$36) | [R18]=1 | [S19]==(O33*Q33*(1+R33)) | [T20]==K33+S33 | [U21]==F33*H33*1.1 | [V22]==O33*$E$110 | [AT46]==IF(F33<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F33=""),1,0)
R34: [A1]==IF(AU34=1,"X","") | [B2]=Bag up debris & cart outside  | [F6]==SUM(F29:F33)*2 | [G7]=Bags | [H8]=1 | [I9]==(H34/100)*(100+$F$36) | [J10]=0.3 | [K11]==F34*I34*(1+J34) | [M13]==B34 | [N14]=0.01 | [O15]==F34*N34 | [P16]==$D$110 | [Q17]==(P34/100)*(100+$F$36) | [R18]=1 | [S19]==(O34*Q34*(1+R34)) | [T20]==K34+S34 | [U21]==F34*H34*1.1 | [V22]==O34*$E$110
R35: [A1]==IF(AU35=1,"X","") | [B2]=Disposal via licensed transfer agent | [F6]==F34 | [G7]=Bags | [H8]==IF(F35=0,0,IF(F35<=20,40/F35,2)) | [I9]==(H35/100)*(100+$F$36) | [J10]=0.3 | [K11]==F35*I35*(1+J35) | [M13]==B35 | [N14]=0 | [O15]=0 | [P16]==$D$110 | [Q17]==(P35/100)*(100+$F$36) | [R18]=1 | [S19]==(O35*Q35*(1+R35)) | [T20]==K35+S35 | [U21]==F35*H35*1.1 | [V22]==O35*$E$110
R36: [A1]==IF(AU36=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K29:K35) | [M13]=Totals | [O15]==SUM(O29:O35) | [S19]==SUM(S29:S35) | [T20]==SUM(T29:T35) | [U21]==SUM(U29:U35) | [V22]==SUM(V29:V35)
R38: [A1]==IF(AU38=1,"X","") | [B2]=Plastering/finishing | [M13]==B38 | [U21]==B38
R39: [A1]==IF(AU39=1,"X","") | [B2]=Construct stud wall to perimiter | [G7]=M2 | [H8]=14 | [I9]==(H39/100)*(100+$F$46) | [J10]=0.3 | [K11]==F39*I39*(1+J39) | [M13]==B39 | [N14]=0.4 | [O15]==F39*N39 | [P16]==$D$110 | [Q17]==(P39/100)*(100+$F$46) | [R18]=1 | [S19]==(O39*Q39*(1+R39)) | [T20]==K39+S39 | [U21]==F39*H39*1.1 | [V22]==O39*$E$110 | [AT46]==IF(F39<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F39=""),1,0)
R40: [A1]==IF(AU40=1,"X","") | [B2]=Plasterboarding (inc dab/screws) | [G7]=M2 | [H8]==(8.24/1.098)*1.3 | [I9]==(H40/100)*(100+$F$46) | [J10]=0.3 | [K11]==F40*I40*(1+J40) | [M13]==B40 | [N14]=0.4 | [O15]==F40*N40 | [P16]==$D$110 | [Q17]==(P40/100)*(100+$F$46) | [R18]=1 | [S19]==(O40*Q40*(1+R40)) | [T20]==K40+S40 | [U21]==F40*H40*1.1 | [V22]==O40*$E$110 | [AT46]==IF(F40<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F40=""),1,0)
R41: [A1]==IF(AU41=1,"X","") | [B2]=Skimming walls (multi finish plaster) | [G7]=M2 | [H8]==IF(F41=0,0,(_xlfn.CEILING.MATH(F41,10)*((12.08/10)*1.1))/F41) | [I9]==(H41/100)*(100+$F$46) | [J10]=0.3 | [K11]==F41*I41*(1+J41) | [M13]==B41 | [N14]==4/15 | [O15]==ROUNDUP(F41/15,0)*4 | [P16]==$D$110 | [Q17]==(P41/100)*(100+$F$46) | [R18]=1 | [S19]==(O41*Q41*(1+R41)) | [T20]==K41+S41 | [U21]==F41*H41*1.1 | [V22]==O41*$E$110 | [AT46]==IF(F41<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F41=""),1,0)
R42: [A1]==IF(AU42=1,"X","") | [B2]=Plastering Stop Bead - 3m length | [G7]=Each | [H8]==1*1.1 | [I9]==(H42/100)*(100+$F$46) | [J10]=0.3 | [K11]==F42*I42*(1+J42) | [M13]==B42 | [N14]=0 | [O15]==F42*N42 | [P16]==$D$110 | [Q17]==(P42/100)*(100+$F$46) | [R18]=1 | [S19]==(O42*Q42*(1+R42)) | [T20]==K42+S42 | [U21]==F42*H42*1.1 | [V22]==O42*$E$110 | [AT46]==IF(F42<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F42=""),1,0)
R43: [A1]==IF(AU43=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 2.4m length | [G7]=Each | [H8]==1.66*1.1 | [I9]==(H43/100)*(100+$F$46) | [J10]=0.3 | [K11]==F43*I43*(1+J43) | [M13]==B43 | [N14]=0 | [O15]==F43*N43 | [P16]==$D$110 | [Q17]==(P43/100)*(100+$F$46) | [R18]=1 | [S19]==(O43*Q43*(1+R43)) | [T20]==K43+S43 | [U21]==F43*H43*1.1 | [V22]==O43*$E$110 | [AT46]==IF(F43<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F43=""),1,0)
R44: [A1]==IF(AU44=1,"X","") | [B2]=Plastering Thin Coat Angle/Corner Bead - 3m length | [G7]=Each | [H8]==2.5*1.1 | [I9]==(H44/100)*(100+$F$46) | [J10]=0.3 | [K11]==F44*I44*(1+J44) | [M13]==B44 | [N14]=0 | [O15]==F44*N44 | [P16]==$D$110 | [Q17]==(P44/100)*(100+$F$46) | [R18]=1 | [S19]==(O44*Q44*(1+R44)) | [T20]==K44+S44 | [U21]==F44*H44*1.1 | [V22]==O44*$E$110 | [AT46]==IF(F44<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F44=""),1,0)
R45: [A1]==IF(AU45=1,"X","") | [B2]=Difficulty hours (fireplace, corners etc) | [G7]=Hours | [H8]=0 | [I9]==(H45/100)*(100+$F$46) | [J10]=0 | [K11]==F45*I45*(1+J45) | [M13]==B45 | [N14]=1 | [O15]==F45*N45 | [P16]==$D$110 | [Q17]==(P45/100)*(100+$F$46) | [R18]=1 | [S19]==(O45*Q45*(1+R45)) | [T20]==K45+S45 | [U21]==F45*H45*1.1 | [V22]==O45*$E$110 | [AT46]==IF(F45<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F45=""),1,0)
R46: [A1]==IF(AU46=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K39:K45) | [M13]=Totals | [O15]==SUM(O39:O45) | [S19]==SUM(S39:S45) | [T20]==SUM(T39:T45) | [U21]==SUM(U39:U45) | [V22]==SUM(V39:V45)
R48: [A1]==IF(AU48=1,"X","") | [B2]=Floor Joists LM @ 400mm centres | [E5]=Stock lengths 2.4, 3.0, 3.6, 4.2, 4.8, 5.4 | [M13]==B48 | [U21]==B48
R49: [A1]==IF(AU49=1,"X","") | [B2]=Joists Size | [D4]=Quantity  | [E5]=Length
R50: [A1]==IF(AU50=1,"X","") | [B2]=Joists/Timbers, 100 x 50 | [F6]==D50*E50 | [G7]=LM | [H8]=5.46 | [I9]==(H50/100)*(100+$F$69) | [J10]=0.3 | [K11]==F50*I50*(1+J50) | [M13]==B50 | [N14]=0.25 | [O15]==F50*N50 | [P16]==$D$110 | [Q17]==(P50/100)*(100+$F$69) | [R18]=1 | [S19]==(O50*Q50*(1+R50)) | [T20]==K50+S50 | [U21]==F50*H50*1.1 | [V22]==O50*$E$110 | [AT46]==IF(OR(D50<>"",E50<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D50="",E50="")),1,0)
R51: [A1]==IF(AU51=1,"X","") | [B2]=Joists/Timbers, 125 x 50 | [F6]==D51*E51 | [G7]=LM | [H8]=6.5 | [I9]==(H51/100)*(100+$F$69) | [J10]=0.3 | [K11]==F51*I51*(1+J51) | [M13]==B51 | [N14]=0.25 | [O15]==F51*N51 | [P16]==$D$110 | [Q17]==(P51/100)*(100+$F$69) | [R18]=1 | [S19]==(O51*Q51*(1+R51)) | [T20]==K51+S51 | [U21]==F51*H51*1.1 | [V22]==O51*$E$110 | [AT46]==IF(OR(D51<>"",E51<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D51="",E51="")),1,0)
R52: [A1]==IF(AU52=1,"X","") | [B2]=Joists/Timbers, 150 x 50 | [F6]==D52*E52 | [G7]=LM | [H8]=7.7 | [I9]==(H52/100)*(100+$F$69) | [J10]=0.3 | [K11]==F52*I52*(1+J52) | [M13]==B52 | [N14]=0.25 | [O15]==F52*N52 | [P16]==$D$110 | [Q17]==(P52/100)*(100+$F$69) | [R18]=1 | [S19]==(O52*Q52*(1+R52)) | [T20]==K52+S52 | [U21]==F52*H52*1.1 | [V22]==O52*$E$110 | [AT46]==IF(OR(D52<>"",E52<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D52="",E52="")),1,0)
R53: [A1]==IF(AU53=1,"X","") | [B2]=Joists/Timbers, 175 x 50 | [F6]==D53*E53 | [G7]=LM | [H8]=8 | [I9]==(H53/100)*(100+$F$69) | [J10]=0.3 | [K11]==F53*I53*(1+J53) | [M13]==B53 | [N14]=0.3 | [O15]==F53*N53 | [P16]==$D$110 | [Q17]==(P53/100)*(100+$F$69) | [R18]=1 | [S19]==(O53*Q53*(1+R53)) | [T20]==K53+S53 | [U21]==F53*H53*1.1 | [V22]==O53*$E$110 | [AT46]==IF(OR(D53<>"",E53<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D53="",E53="")),1,0)
R54: [A1]==IF(AU54=1,"X","") | [B2]=Joists/Timbers, 200 x 50 | [F6]==D54*E54 | [G7]=LM | [H8]=8.9 | [I9]==(H54/100)*(100+$F$69) | [J10]=0.3 | [K11]==F54*I54*(1+J54) | [M13]==B54 | [N14]=0.3 | [O15]==F54*N54 | [P16]==$D$110 | [Q17]==(P54/100)*(100+$F$69) | [R18]=1 | [S19]==(O54*Q54*(1+R54)) | [T20]==K54+S54 | [U21]==F54*H54*1.1 | [V22]==O54*$E$110 | [AT46]==IF(OR(D54<>"",E54<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D54="",E54="")),1,0)
R55: [A1]==IF(AU55=1,"X","") | [B2]=Joists/Timbers, 225 x 50 | [F6]==D55*E55 | [G7]=LM | [H8]=9.5 | [I9]==(H55/100)*(100+$F$69) | [J10]=0.3 | [K11]==F55*I55*(1+J55) | [M13]==B55 | [N14]=0.4 | [O15]==F55*N55 | [P16]==$D$110 | [Q17]==(P55/100)*(100+$F$69) | [R18]=1 | [S19]==(O55*Q55*(1+R55)) | [T20]==K55+S55 | [U21]==F55*H55*1.1 | [V22]==O55*$E$110 | [AT46]==IF(OR(D55<>"",E55<>""),1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,OR(D55="",E55="")),1,0)
R56: [A1]==IF(AU56=1,"X","") | [B2]=Treat and endwrap joist | [E5]=1 | [F6]==D56*E56 | [G7]=Each | [H8]=3 | [I9]==(H56/100)*(100+$F$69) | [J10]=0.3 | [K11]==F56*I56*(1+J56) | [M13]==B56 | [N14]=0.15 | [O15]==F56*N56 | [P16]==$D$110 | [Q17]==(P56/100)*(100+$F$69) | [R18]=1 | [S19]==(O56*Q56*(1+R56)) | [T20]==K56+S56 | [U21]==F56*H56*1.1 | [V22]==O56*$E$110 | [AT46]==IF(D56<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D56=""),1,0)
R57: [A1]==IF(AU57=1,"X","") | [B2]=Wall plate 100x25 | [E5]=1 | [F6]==D57*E57 | [G7]=Each | [H8]=4.84 | [I9]==(H57/100)*(100+$F$69) | [J10]=0.3 | [K11]==F57*I57*(1+J57) | [M13]==B57 | [N14]=0.4 | [O15]==F57*N57 | [P16]==$D$110 | [Q17]==(P57/100)*(100+$F$69) | [R18]=1 | [S19]==(O57*Q57*(1+R57)) | [T20]==K57+S57 | [U21]==F57*H57*1.1 | [V22]==O57*$E$110 | [AT46]==IF(D57<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D57=""),1,0)
R58: [A1]==IF(AU58=1,"X","") | [B2]=Bower beams (pair) | [E5]=1 | [F6]==D58*E58 | [G7]=Pairs | [H8]=36 | [I9]==(H58/100)*(100+$F$69) | [J10]=0.3 | [K11]==F58*I58*(1+J58) | [M13]==B58 | [N14]=1.5 | [O15]==F58*N58 | [P16]==$D$110 | [Q17]==(P58/100)*(100+$F$69) | [R18]=1 | [S19]==(O58*Q58*(1+R58)) | [T20]==K58+S58 | [U21]==F58*H58*1.1 | [V22]==O58*$E$110 | [AT46]==IF(D58<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D58=""),1,0)
R59: [A1]==IF(AU59=1,"X","") | [B2]=Flitch plates (pair) | [E5]=1 | [F6]==D59*E59 | [G7]=Pairs | [H8]=42 | [I9]==(H59/100)*(100+$F$69) | [J10]=0.3 | [K11]==F59*I59*(1+J59) | [M13]==B59 | [N14]=1.5 | [O15]==F59*N59 | [P16]==$D$110 | [Q17]==(P59/100)*(100+$F$69) | [R18]=1 | [S19]==(O59*Q59*(1+R59)) | [T20]==K59+S59 | [U21]==F59*H59*1.1 | [V22]==O59*$E$110 | [AT46]==IF(D59<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,D59=""),1,0)
R60: [A1]==IF(AU60=1,"X","") | [B2]=Flooring deck type (M2) | [M13]==B60 | [U21]==B60
R61: [A1]==IF(AU61=1,"X","") | [B2]=Install Weyrock flooring 18mm (M2) | [F6]=20 | [G7]=M2 | [H8]=18 | [I9]==(H61/100)*(100+$F$69) | [J10]=0.3 | [K11]==F61*I61*(1+J61) | [M13]==B61 | [N14]=0.4 | [O15]==F61*N61 | [P16]==$D$110 | [Q17]==(P61/100)*(100+$F$69) | [R18]=1 | [S19]==(O61*Q61*(1+R61)) | [T20]==K61+S61 | [U21]==F61*H61*1.1 | [V22]==O61*$E$110 | [AT46]==IF(F61<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F61=""),1,0)
R62: [A1]==IF(AU62=1,"X","") | [B2]=Install Weyrock flooring 22mm (M2) | [F6]=20 | [G7]=M2 | [H8]=22 | [I9]==(H62/100)*(100+$F$69) | [J10]=0.3 | [K11]==F62*I62*(1+J62) | [M13]==B62 | [N14]=0.425 | [O15]==F62*N62 | [P16]==$D$110 | [Q17]==(P62/100)*(100+$F$69) | [R18]=1 | [S19]==(O62*Q62*(1+R62)) | [T20]==K62+S62 | [U21]==F62*H62*1.1 | [V22]==O62*$E$110 | [AT46]==IF(F62<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F62=""),1,0)
R63: [A1]==IF(AU63=1,"X","") | [B2]=Install std T&G Floorboards (M2) | [F6]=20 | [G7]=M2 | [H8]=46.3 | [I9]==(H63/100)*(100+$F$69) | [J10]=0.3 | [K11]==F63*I63*(1+J63) | [M13]==B63 | [N14]=0.6 | [O15]==F63*N63 | [P16]==$D$110 | [Q17]==(P63/100)*(100+$F$69) | [R18]=1 | [S19]==(O63*Q63*(1+R63)) | [T20]==K63+S63 | [U21]==F63*H63*1.1 | [V22]==O63*$E$110 | [AT46]==IF(F63<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F63=""),1,0)
R64: [A1]==IF(AU64=1,"X","") | [B2]=Install victorian T&G Floorboards (M2) | [F6]=20 | [G7]=M2 | [H8]=52.8 | [I9]==(H64/100)*(100+$F$69) | [J10]=0.3 | [K11]==F64*I64*(1+J64) | [M13]==B64 | [N14]=0.6 | [O15]==F64*N64 | [P16]==$D$110 | [Q17]==(P64/100)*(100+$F$69) | [R18]=1 | [S19]==(O64*Q64*(1+R64)) | [T20]==K64+S64 | [U21]==F64*H64*1.1 | [V22]==O64*$E$110 | [AT46]==IF(F64<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F64=""),1,0)
R65: [A1]==IF(AU65=1,"X","") | [B2]=Install Engineered Flooring sheet (M2) | [F6]=20 | [G7]=M2 | [H8]=49.99 | [I9]==(H65/100)*(100+$F$69) | [J10]=0.3 | [K11]==F65*I65*(1+J65) | [M13]==B65 | [N14]=0.4 | [O15]==F65*N65 | [P16]==$D$110 | [Q17]==(P65/100)*(100+$F$69) | [R18]=1 | [S19]==(O65*Q65*(1+R65)) | [T20]==K65+S65 | [U21]==F65*H65*1.1 | [V22]==O65*$E$110 | [AT46]==IF(F65<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F65=""),1,0)
R66: [A1]==IF(AU66=1,"X","") | [B2]=Install Structural Engineered Flooring sheet (M2) onto joists | [F6]=20 | [G7]=M2 | [H8]=52.8 | [I9]==(H66/100)*(100+$F$69) | [J10]=0.3 | [K11]==F66*I66*(1+J66) | [M13]==B66 | [N14]=0.9 | [O15]==F66*N66 | [P16]==$D$110 | [Q17]==(P66/100)*(100+$F$69) | [R18]=1 | [S19]==(O66*Q66*(1+R66)) | [T20]==K66+S66 | [U21]==F66*H66*1.1 | [V22]==O66*$E$110 | [AT46]==IF(F66<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F66=""),1,0)
R67: [A1]==IF(AU67=1,"X","") | [B2]=Provide insulation to suspended flooring | [G7]=M2 | [H8]=6.8 | [I9]==(H67/100)*(100+$F$69) | [J10]=0.3 | [K11]==F67*I67*(1+J67) | [M13]==B67 | [N14]=0.2 | [O15]==F67*N67 | [P16]==$D$110 | [Q17]==(P67/100)*(100+$F$69) | [R18]=1 | [S19]==(O67*Q67*(1+R67)) | [T20]==K67+S67 | [U21]==F67*H67*1.1 | [V22]==O67*$E$110 | [AT46]==IF(F67<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F67=""),1,0)
R68: [A1]==IF(AU68=1,"X","") | [B2]=Difficulty hours (additional hours if required) | [F6]=2 | [G7]=Hours | [H8]=0 | [I9]==(H68/100)*(100+$F$69) | [J10]=0.3 | [K11]==F68*I68*(1+J68) | [M13]==B68 | [N14]=1 | [O15]==F68*N68 | [P16]==$D$110 | [Q17]==(P68/100)*(100+$F$69) | [R18]=1 | [S19]==(O68*Q68*(1+R68)) | [T20]==K68+S68 | [U21]==F68*H68*1.1 | [V22]==O68*$E$110 | [AT46]==IF(F68<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F68=""),1,0)
R69: [A1]==IF(AU69=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K50:K68) | [M13]=Totals | [O15]==SUM(O50:O68) | [S19]==SUM(S50:S68) | [T20]==SUM(T50:T68) | [U21]==SUM(U50:U68) | [V22]==SUM(V50:V68)
R71: [A1]==IF(AU71=1,"X","") | [B2]=Timber treatments  | [M13]==B71 | [U21]==B71
R72: [A1]==IF(AU72=1,"X","") | [B2]=Clear debris from sub floor | [G7]=M2 | [H8]=0 | [I9]==(H72/100)*(100+$F$82) | [J10]=0.3 | [K11]==F72*I72*(1+J72) | [M13]==B72 | [N14]=0.15 | [O15]==F72*N72 | [P16]==$D$110 | [Q17]==(P72/100)*(100+$F$82) | [R18]=1 | [S19]==(O72*Q72*(1+R72)) | [T20]==K72+S72 | [U21]==F72*H72*1.1 | [V22]==O72*$E$110 | [AT46]==IF(F72<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F72=""),1,0)
R73: [A1]==IF(AU73=1,"X","") | [B2]=Protective treatment to new timbers installation | [G7]=M2 | [H8]=0.5 | [I9]==(H73/100)*(100+$F$82) | [J10]=0.3 | [K11]==F73*I73*(1+J73) | [M13]==B73 | [N14]=0.02 | [O15]==F73*N73 | [P16]==$D$110 | [Q17]==(P73/100)*(100+$F$82) | [R18]=1 | [S19]==(O73*Q73*(1+R73)) | [T20]==K73+S73 | [U21]==F73*H73*1.1 | [V22]==O73*$E$110 | [AT46]==IF(F73<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F73=""),1,0)
R74: [A1]==IF(AU74=1,"X","") | [B2]=40.1 Gel injection @100mm centres, plug with dowel | [G7]=M2 | [H8]=2.22 | [I9]==(H74/100)*(100+$F$82) | [J10]=0.3 | [K11]==F74*I74*(1+J74) | [M13]==B74 | [N14]=0.25 | [O15]==F74*N74 | [P16]==$D$110 | [Q17]==(P74/100)*(100+$F$82) | [R18]=1 | [S19]==(O74*Q74*(1+R74)) | [T20]==K74+S74 | [U21]==F74*H74*1.1 | [V22]==O74*$E$110 | [AT46]==IF(F74<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F74=""),1,0)
R75: [A1]==IF(AU75=1,"X","") | [B2]=Fogging floor area | [G7]=M2 | [H8]=0.5 | [I9]==(H75/100)*(100+$F$82) | [J10]=0.3 | [K11]==F75*I75*(1+J75) | [M13]==B75 | [N14]=0.1 | [O15]==F75*N75 | [P16]==$D$110 | [Q17]==(P75/100)*(100+$F$82) | [R18]=1 | [S19]==(O75*Q75*(1+R75)) | [T20]==K75+S75 | [U21]==F75*H75*1.1 | [V22]==O75*$E$110 | [AT46]==IF(F75<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F75=""),1,0)
R76: [A1]==IF(AU76=1,"X","") | [B2]=Fogging boarded area | [G7]=M2 | [H8]=0.5 | [I9]==(H76/100)*(100+$F$82) | [J10]=0.3 | [K11]==F76*I76*(1+J76) | [M13]==B76 | [N14]==1/43 | [O15]==F76*N76 | [P16]==$D$110 | [Q17]==(P76/100)*(100+$F$82) | [R18]=1 | [S19]==(O76*Q76*(1+R76)) | [T20]==K76+S76 | [U21]==F76*H76*1.1 | [V22]==O76*$E$110 | [AT46]==IF(F76<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F76=""),1,0)
R77: [A1]==IF(AU77=1,"X","") | [B2]=Fogging staircase - open rear treads Per step | [G7]=Each | [H8]=0.5 | [I9]==(H77/100)*(100+$F$82) | [J10]=0.3 | [K11]==F77*I77*(1+J77) | [M13]==B77 | [N14]=0.1 | [O15]==F77*N77 | [P16]==$D$110 | [Q17]==(P77/100)*(100+$F$82) | [R18]=1 | [S19]==(O77*Q77*(1+R77)) | [T20]==K77+S77 | [U21]==F77*H77*1.1 | [V22]==O77*$E$110 | [AT46]==IF(F77<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F77=""),1,0)
R78: [A1]==IF(AU78=1,"X","") | [B2]=Fogging staircase - rear closed, drill and plug per step | [G7]=Each | [H8]=2 | [I9]==(H78/100)*(100+$F$82) | [J10]=0.3 | [K11]==F78*I78*(1+J78) | [M13]==B78 | [N14]=0.2 | [O15]==F78*N78 | [P16]==$D$110 | [Q17]==(P78/100)*(100+$F$82) | [R18]=1 | [S19]==(O78*Q78*(1+R78)) | [T20]==K78+S78 | [U21]==F78*H78*1.1 | [V22]==O78*$E$110 | [AT46]==IF(F78<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F78=""),1,0)
R79: [A1]==IF(AU79=1,"X","") | [B2]=Lifting loft insulation | [G7]=M2 | [H8]=0 | [I9]==(H79/100)*(100+$F$82) | [J10]=0.3 | [K11]==F79*I79*(1+J79) | [M13]==B79 | [N14]=0.05 | [O15]==F79*N79 | [P16]==$D$110 | [Q17]==(P79/100)*(100+$F$82) | [R18]=1 | [S19]==(O79*Q79*(1+R79)) | [T20]==K79+S79 | [U21]==F79*H79*1.1 | [V22]==O79*$E$110 | [AT46]==IF(F79<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F79=""),1,0)
R80: [A1]==IF(AU80=1,"X","") | [B2]=Fogging loft area (calculated from floor area of loft) | [G7]=M2 | [H8]=0.5 | [I9]==(H80/100)*(100+$F$82) | [J10]=0.3 | [K11]==F80*I80*(1+J80) | [M13]==B80 | [N14]=0.04 | [O15]==F80*N80 | [P16]==$D$110 | [Q17]==(P80/100)*(100+$F$82) | [R18]=1 | [S19]==(O80*Q80*(1+R80)) | [T20]==K80+S80 | [U21]==F80*H80*1.1 | [V22]==O80*$E$110 | [AT46]==IF(F80<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F80=""),1,0)
R81: [A1]==IF(AU81=1,"X","") | [B2]=Relaying loft insulation | [G7]=M2 | [H8]=0 | [I9]==(H81/100)*(100+$F$82) | [J10]=0.3 | [K11]==F81*I81*(1+J81) | [M13]==B81 | [N14]=0.03 | [O15]==F81*N81 | [P16]==$D$110 | [Q17]==(P81/100)*(100+$F$82) | [R18]=1 | [S19]==(O81*Q81*(1+R81)) | [T20]==K81+S81 | [U21]==F81*H81*1.1 | [V22]==O81*$E$110 | [AT46]==IF(F81<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F81=""),1,0)
R82: [A1]==IF(AU82=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K72:K81) | [M13]=Totals | [O15]==SUM(O72:O81) | [S19]==SUM(S72:S81) | [T20]==SUM(T72:T81) | [U21]==SUM(U72:U81) | [V22]==SUM(V72:V81)
R84: [A1]==IF(AU84=1,"X","") | [B2]=Airbricks | [M13]==B84 | [U21]==B84
R85: [A1]==IF(AU85=1,"X","") | [B2]=Clean out airbrick/fit new face | [G7]=Each | [H8]=16 | [I9]==(H85/100)*(100+$F$88) | [J10]=0.3 | [K11]==F85*I85*(1+J85) | [M13]==B85 | [N14]=0.5 | [O15]==F85*N85 | [P16]==$D$110 | [Q17]==(P85/100)*(100+$F$88) | [R18]=1 | [S19]==(O85*Q85*(1+R85)) | [T20]==K85+S85 | [U21]==F85*H85*1.1 | [V22]==O85*$E$110 | [AT46]==IF(F85<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F85=""),1,0)
R86: [A1]==IF(AU86=1,"X","") | [B2]=Lift/upgrade existing airbrick/fit new face | [G7]=Each | [H8]=16 | [I9]==(H86/100)*(100+$F$88) | [J10]=0.3 | [K11]==F86*I86*(1+J86) | [M13]==B86 | [N14]=0.8 | [O15]==F86*N86 | [P16]==$D$110 | [Q17]==(P86/100)*(100+$F$88) | [R18]=1 | [S19]==(O86*Q86*(1+R86)) | [T20]==K86+S86 | [U21]==F86*H86*1.1 | [V22]==O86*$E$110 | [AT46]==IF(F86<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F86=""),1,0)
R87: [A1]==IF(AU87=1,"X","") | [B2]=Install additional  airbrick | [G7]=Each | [H8]=16 | [I9]==(H87/100)*(100+$F$88) | [J10]=0.3 | [K11]==F87*I87*(1+J87) | [M13]==B87 | [N14]=2 | [O15]==F87*N87 | [P16]==$D$110 | [Q17]==(P87/100)*(100+$F$88) | [R18]=1 | [S19]==(O87*Q87*(1+R87)) | [T20]==K87+S87 | [U21]==F87*H87*1.1 | [V22]==O87*$E$110 | [AT46]==IF(F87<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F87=""),1,0)
R88: [A1]==IF(AU88=1,"X","") | [B2]=Section Price Adjustment % | [F6]=0 | [J10]=Totals | [K11]==SUM(K85:K87) | [M13]=Totals | [O15]==SUM(O85:O87) | [S19]==SUM(S85:S87) | [T20]==SUM(T85:T87) | [U21]==SUM(U85:U87) | [V22]==SUM(V85:V87)
R90: [A1]==IF(AU90=1,"X","") | [B2]=Skip hire 8yd | [M13]==B90 | [U21]==B90
R91: [A1]==IF(AU91=1,"X","") | [B2]=Rubbish removal skips | [G7]=Each | [H8]=270 | [I9]==H91 | [J10]=0.3 | [K11]==F91*I91*(1+J91) | [M13]==B91 | [N14]=0 | [O15]==F91*N91 | [P16]==$D$110 | [Q17]==P91 | [R18]=1 | [S19]==(O91*Q91*(1+R91)) | [T20]==K91+S91 | [U21]==F91*H91*1.1 | [V22]==O91*$E$110 | [AT46]==IF(F91<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F91=""),1,0)
R93: [A1]==IF(AU93=1,"X","")
R94: [A1]==IF(AU94=1,"X","") | [E5]=Materials sub tot | [K11]==K26+K36+K46+K69+K82+K88+K91 | [M13]=TT Totals | [U21]=Contractor Totals
R95: [A1]==IF(AU95=1,"X","") | [E5]=Labour sub tot | [H8]==O95 | [K11]==(S26+S36+S46+S69+S82+S88+S91) | [M13]=Labour hours sub total | [O15]==O26+O36+O46+O69+O82+O88 | [U21]==U26+U36+U46+U69+U82+U88 | [V22]==V26+V36+V46+V69+V82+V88
R96: [A1]==IF(AU96=1,"X","") | [H8]=Travel | [K11]==(F110*C110)+((K101*K102)*2)*J110 | [M13]=Men, Hours travel | [O15]==K101*(K102*2)*K103/30
R97: [A1]==IF(AU97=1,"X","") | [H8]= Price | [K11]==SUM(K94:K96) | [M13]=Total hours | [O15]==SUM(O95:O96) | [U21]=Travel | [V22]==K101*(K102*2)*0.45
R98: [A1]==IF(AU98=1,"X","") | [H8]=Vat | [K11]==K97*0.2 | [U21]=Tot | [V22]==U95+V95+V97
R99: [A1]==IF(AU99=1,"X","") | [H8]=Total price inc vat | [K11]==SUM(K97:K98)
R100: [A1]==IF(AU100=1,"X","") | [M13]=For Office Only
R101: [A1]==IF(AU101=1,"X","") | [J10]=No of days | [K11]==(ROUNDUP((O95/6.5)/K103,0))
R102: [A1]==IF(AU102=1,"X","") | [J10]=Distance in miles from office to job (one way) | [K11]==IF([1]Details!$C$12=0,"",[1]Details!$C$12) | [M13]=The value of the csv import on upload should match the figures to the right ↵(this may be less than the totals to the left as optional items are not calculated up on the import until the customer selects them) | [T20]=Sub Total | [U21]==SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!L:L,"No",'CF CSV Upload'!Q:Q,"Yes") | [AT46]==IF(K102<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K102=""),1,0)
R103: [A1]==IF(AU103=1,"X","") | [J10]=No of men travelling | [T20]=Tax: VAT (20%)	 | [U21]==U102*0.2 | [AT46]==IF(K103<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,K103=""),1,0)
R104: [A1]==IF(AU104=1,"X","") | [T20]=Total | [U21]==U102+U103
R106: [A1]==IF(AU106=1,"X","") | [B2]=Choose Estimate Cover Sheet Image To Use (dropdown) | [M13]=View Images (this link will take you to the the Estimates Coversheet Images Tab) | [AT46]==IF(F106<>"",1,0) | [AU47]==IF(AND(SUM(AT:AT)>0,F106=""),1,0)
R107: [A1]==IF(AU107=1,"X","") | [B2]=Survey sheet end
R108: [A1]==IF(AU108=1,"X","") | [C3]=Base Travel Hourly rate  | [D4]=Base Labour Hourly rate  | [E5]=Contractor Labour Hourly rate  | [F6]=Approx Travel cost
R109: [A1]==IF(AU109=1,"X","") | [F6]=Hours | [H8]=mens travel | [J10]=Vehicle cost | [K11]=Total
R110: [A1]==IF(AU110=1,"X","") | [C3]==D110 | [D4]=30.63 | [E5]=28 | [F6]==O96 | [H8]==F110*D110 | [J10]=0.5 | [K11]==(F110*C110)+(K101*K102*2)*J110
```

## SECTION 4: CF CSV UPLOAD SHEET

**Total Rows:** 121  |  **Total Cols:** 17

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
R2: [A1]=='Customer Summary'!C4 | [C3]==Costing!B21 | [D4]==Costing!F21 | [E5]==Costing!I21 | [F6]==Costing!G21 | [G7]=Woodworm Materials | [H8]==Costing!J21*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J2="MTL","Preservation Shop","") | [N14]==D2*E2 | [O15]=DELETE | [P16]==N2*(1+(H2/100)) | [Q17]=No
R3: [A1]==A2 | [C3]==Costing!B22 | [D4]==Costing!F22 | [E5]==Costing!I22 | [F6]==Costing!G22 | [G7]=Woodworm Materials | [H8]==Costing!J22*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J3="MTL","Preservation Shop","") | [N14]==D3*E3 | [O15]=DELETE | [P16]==N3*(1+(H3/100)) | [Q17]=No
R4: [A1]==A3 | [C3]==Costing!B23 | [D4]==Costing!F23 | [E5]==Costing!I23 | [F6]==Costing!G23 | [G7]=Woodworm Materials | [H8]==Costing!J23*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J4="MTL","Preservation Shop","") | [N14]==D4*E4 | [O15]=DELETE | [P16]==N4*(1+(H4/100)) | [Q17]=No
R5: [A1]==A4 | [C3]==Costing!B24 | [D4]==Costing!F24 | [E5]==Costing!I24 | [F6]==Costing!G24 | [G7]=Woodworm Materials | [H8]==Costing!J24*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J5="MTL","Preservation Shop","") | [N14]==D5*E5 | [O15]=DELETE | [P16]==N5*(1+(H5/100)) | [Q17]=No
R6: [A1]==A4 | [C3]==Costing!B25 | [D4]==Costing!F25 | [E5]==Costing!I25 | [F6]==Costing!G25 | [G7]=Woodworm Materials | [H8]==Costing!J25*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J6="MTL","Preservation Shop","") | [N14]==D6*E6 | [O15]=DELETE | [P16]==N6*(1+(H6/100)) | [Q17]=No
R7: [A1]==A6 | [C3]==Costing!B29 | [D4]==Costing!F29 | [E5]==Costing!I29 | [F6]==Costing!G29 | [G7]=Woodworm Materials | [H8]==Costing!J29*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J7="MTL","Preservation Shop","") | [N14]==D7*E7 | [O15]=DELETE | [P16]==N7*(1+(H7/100)) | [Q17]=No
R8: [A1]==A7 | [C3]==Costing!B30 | [D4]==Costing!F30 | [E5]==Costing!I30 | [F6]==Costing!G30 | [G7]=Woodworm Materials | [H8]==Costing!J30*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J8="MTL","Preservation Shop","") | [N14]==D8*E8 | [O15]=DELETE | [P16]==N8*(1+(H8/100)) | [Q17]=No
R9: [A1]==A8 | [C3]==Costing!B31 | [D4]==Costing!F31 | [E5]==Costing!I31 | [F6]==Costing!G31 | [G7]=Woodworm Materials | [H8]==Costing!J31*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J9="MTL","Preservation Shop","") | [N14]==D9*E9 | [O15]=DELETE | [P16]==N9*(1+(H9/100)) | [Q17]=No
R10: [A1]==A9 | [C3]==Costing!B32 | [D4]==Costing!F32 | [E5]==Costing!I32 | [F6]==Costing!G32 | [G7]=Woodworm Materials | [H8]==Costing!J32*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J10="MTL","Preservation Shop","") | [N14]==D10*E10 | [O15]=DELETE | [P16]==N10*(1+(H10/100)) | [Q17]=No
R11: [A1]==A10 | [C3]==Costing!B33 | [D4]==Costing!F33 | [E5]==Costing!I33 | [F6]==Costing!G33 | [G7]=Woodworm Materials | [H8]==Costing!J33*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J11="MTL","Preservation Shop","") | [N14]==D11*E11 | [O15]=DELETE | [P16]==N11*(1+(H11/100)) | [Q17]=No
R12: [A1]==A11 | [C3]==Costing!B34 | [D4]==Costing!F34 | [E5]==Costing!I34 | [F6]==Costing!G34 | [G7]=Woodworm Materials | [H8]==Costing!J34*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J12="MTL","Preservation Shop","") | [N14]==D12*E12 | [O15]=DELETE | [P16]==N12*(1+(H12/100)) | [Q17]=No
R13: [A1]==A12 | [C3]==Costing!B35 | [D4]==Costing!F35 | [E5]==Costing!I35 | [F6]==Costing!G35 | [G7]=Woodworm Materials | [H8]==Costing!J35*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J13="MTL","Preservation Shop","") | [N14]==D13*E13 | [O15]=DELETE | [P16]==N13*(1+(H13/100)) | [Q17]=No
R14: [A1]==A13 | [C3]==Costing!M21 | [D4]==Costing!O21 | [E5]==Costing!Q21 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R21*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J14="MTL","Preservation Shop","") | [N14]==D14*E14 | [O15]=DELETE | [P16]==N14*(1+(H14/100)) | [Q17]=No
R15: [A1]==A14 | [C3]==Costing!M22 | [D4]==Costing!O22 | [E5]==Costing!Q22 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R22*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J15="MTL","Preservation Shop","") | [N14]==D15*E15 | [O15]=DELETE | [P16]==N15*(1+(H15/100)) | [Q17]=No
R16: [A1]==A15 | [C3]==Costing!M23 | [D4]==Costing!O23 | [E5]==Costing!Q23 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R23*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J16="MTL","Preservation Shop","") | [N14]==D16*E16 | [O15]=DELETE | [P16]==N16*(1+(H16/100)) | [Q17]=No
R17: [A1]==A15 | [C3]==Costing!M24 | [D4]==Costing!O24 | [E5]==Costing!Q24 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R24*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J17="MTL","Preservation Shop","") | [N14]==D17*E17 | [O15]=DELETE | [P16]==N17*(1+(H17/100)) | [Q17]=No
R18: [A1]==A16 | [C3]==Costing!M25 | [D4]==Costing!O25 | [E5]==Costing!Q25 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R25*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J18="MTL","Preservation Shop","") | [N14]==D18*E18 | [O15]=DELETE | [P16]==N18*(1+(H18/100)) | [Q17]=No
R19: [A1]==A18 | [C3]==Costing!M29 | [D4]==Costing!O29 | [E5]==Costing!Q29 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R29*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J19="MTL","Preservation Shop","") | [N14]==D19*E19 | [O15]=DELETE | [P16]==N19*(1+(H19/100)) | [Q17]=No
R20: [A1]==A19 | [C3]==Costing!M30 | [D4]==Costing!O30 | [E5]==Costing!Q30 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R30*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J20="MTL","Preservation Shop","") | [N14]==D20*E20 | [O15]=DELETE | [P16]==N20*(1+(H20/100)) | [Q17]=No
R21: [A1]==A20 | [C3]==Costing!M31 | [D4]==Costing!O31 | [E5]==Costing!Q31 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R31*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J21="MTL","Preservation Shop","") | [N14]==D21*E21 | [O15]=DELETE | [P16]==N21*(1+(H21/100)) | [Q17]=No
R22: [A1]==A21 | [C3]==Costing!M32 | [D4]==Costing!O32 | [E5]==Costing!Q32 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R32*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J22="MTL","Preservation Shop","") | [N14]==D22*E22 | [O15]=DELETE | [P16]==N22*(1+(H22/100)) | [Q17]=No
R23: [A1]==A22 | [C3]==Costing!M33 | [D4]==Costing!O33 | [E5]==Costing!Q33 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R33*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J23="MTL","Preservation Shop","") | [N14]==D23*E23 | [O15]=DELETE | [P16]==N23*(1+(H23/100)) | [Q17]=No
R24: [A1]==A23 | [C3]==Costing!M34 | [D4]==Costing!O34 | [E5]==Costing!Q34 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R34*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J24="MTL","Preservation Shop","") | [N14]==D24*E24 | [O15]=DELETE | [P16]==N24*(1+(H24/100)) | [Q17]=No
R25: [A1]==A24 | [C3]==Costing!M35 | [D4]==Costing!O35 | [E5]==Costing!Q35 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R35*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J25="MTL","Preservation Shop","") | [N14]==D25*E25 | [O15]=DELETE | [P16]==N25*(1+(H25/100)) | [Q17]=No
R26: [A1]==A25 | [C3]=Stripping out - Materials | [D4]=1 | [E5]==N26 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P26-N26)/N26)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D4 | [M13]==IF(J26="MTL","Preservation Shop","") | [N14]==SUM(N2:N13) | [O15]==IF(N26=0,"DELETE","LEAVE") | [P16]==SUM(P2:P13) | [Q17]=Yes
R27: [A1]==A26 | [C3]=Stripping out - Labour | [D4]==SUM(D14:D25) | [E5]==N27/D27 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==((P27-N27)/N27)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L26 | [M13]==IF(J27="MTL","Preservation Shop","") | [N14]==SUM(N14:N25) | [O15]==IF(N27=0,"DELETE","LEAVE") | [P16]==SUM(P14:P25) | [Q17]=Yes
R28: [O15]=DELETE
R29: [A1]=='Customer Summary'!C5 | [C3]==Costing!B39 | [D4]==Costing!F39 | [E5]==Costing!I39 | [F6]==Costing!G39 | [G7]=Woodworm Materials | [H8]==Costing!J39*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J29="MTL","Preservation Shop","") | [N14]==D29*E29 | [O15]=DELETE | [P16]==N29*(1+(H29/100)) | [Q17]=No
R30: [A1]==A29 | [C3]==Costing!B40 | [D4]==Costing!F40 | [E5]==Costing!I40 | [F6]==Costing!G40 | [G7]=Woodworm Materials | [H8]==Costing!J40*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J30="MTL","Preservation Shop","") | [N14]==D30*E30 | [O15]=DELETE | [P16]==N30*(1+(H30/100)) | [Q17]=No
R31: [A1]==A30 | [C3]==Costing!B41 | [D4]==Costing!F41 | [E5]==Costing!I41 | [F6]==Costing!G41 | [G7]=Woodworm Materials | [H8]==Costing!J41*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J31="MTL","Preservation Shop","") | [N14]==D31*E31 | [O15]=DELETE | [P16]==N31*(1+(H31/100)) | [Q17]=No
R32: [A1]==A31 | [C3]==Costing!B42 | [D4]==Costing!F42 | [E5]==Costing!I42 | [F6]==Costing!G42 | [G7]=Woodworm Materials | [H8]==Costing!J42*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J32="MTL","Preservation Shop","") | [N14]==D32*E32 | [O15]=DELETE | [P16]==N32*(1+(H32/100)) | [Q17]=No
R33: [A1]==A32 | [C3]==Costing!B43 | [D4]==Costing!F43 | [E5]==Costing!I43 | [F6]==Costing!G43 | [G7]=Woodworm Materials | [H8]==Costing!J43*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J33="MTL","Preservation Shop","") | [N14]==D33*E33 | [O15]=DELETE | [P16]==N33*(1+(H33/100)) | [Q17]=No
R34: [A1]==A33 | [C3]==Costing!B44 | [D4]==Costing!F44 | [E5]==Costing!I44 | [F6]==Costing!G44 | [G7]=Woodworm Materials | [H8]==Costing!J44*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J34="MTL","Preservation Shop","") | [N14]==D34*E34 | [O15]=DELETE | [P16]==N34*(1+(H34/100)) | [Q17]=No
R35: [A1]==A34 | [C3]==Costing!B45 | [D4]==Costing!F45 | [E5]==Costing!I45 | [F6]==Costing!G45 | [G7]=Woodworm Materials | [H8]==Costing!J45*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J35="MTL","Preservation Shop","") | [N14]==D35*E35 | [O15]=DELETE | [P16]==N35*(1+(H35/100)) | [Q17]=No
R36: [A1]==A35 | [C3]==Costing!M39 | [D4]==Costing!O39 | [E5]==Costing!Q39 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R39*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J36="MTL","Preservation Shop","") | [N14]==D36*E36 | [O15]=DELETE | [P16]==N36*(1+(H36/100)) | [Q17]=No
R37: [A1]==A36 | [C3]==Costing!M40 | [D4]==Costing!O40 | [E5]==Costing!Q40 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R40*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J37="MTL","Preservation Shop","") | [N14]==D37*E37 | [O15]=DELETE | [P16]==N37*(1+(H37/100)) | [Q17]=No
R38: [A1]==A37 | [C3]==Costing!M41 | [D4]==Costing!O41 | [E5]==Costing!Q41 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R41*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J38="MTL","Preservation Shop","") | [N14]==D38*E38 | [O15]=DELETE | [P16]==N38*(1+(H38/100)) | [Q17]=No
R39: [A1]==A38 | [C3]==Costing!M42 | [D4]==Costing!O42 | [E5]==Costing!Q42 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R42*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J39="MTL","Preservation Shop","") | [N14]==D39*E39 | [O15]=DELETE | [P16]==N39*(1+(H39/100)) | [Q17]=No
R40: [A1]==A39 | [C3]==Costing!M43 | [D4]==Costing!O43 | [E5]==Costing!Q43 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R43*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J40="MTL","Preservation Shop","") | [N14]==D40*E40 | [O15]=DELETE | [P16]==N40*(1+(H40/100)) | [Q17]=No
R41: [A1]==A40 | [C3]==Costing!M44 | [D4]==Costing!O44 | [E5]==Costing!Q44 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R44*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J41="MTL","Preservation Shop","") | [N14]==D41*E41 | [O15]=DELETE | [P16]==N41*(1+(H41/100)) | [Q17]=No
R42: [A1]==A41 | [C3]==Costing!M45 | [D4]==Costing!O45 | [E5]==Costing!Q45 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R45*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J42="MTL","Preservation Shop","") | [N14]==D42*E42 | [O15]=DELETE | [P16]==N42*(1+(H42/100)) | [Q17]=No
R43: [A1]==A42 | [C3]=Plastering/finishing  - Materials | [D4]=1 | [E5]==N43 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P43-N43)/N43)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D5 | [M13]==IF(J43="MTL","Preservation Shop","") | [N14]==SUM(N29:N35) | [O15]==IF(N43=0,"DELETE","LEAVE") | [P16]==SUM(P29:P35) | [Q17]=Yes
R44: [A1]==A43 | [C3]=Plastering/finishing  - Labour | [D4]==SUM(D36:D42) | [E5]==N44/D44 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==((P44-N44)/N44)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L43 | [M13]==IF(J44="MTL","Preservation Shop","") | [N14]==SUM(N36:N42) | [O15]==IF(N44=0,"DELETE","LEAVE") | [P16]==SUM(P36:P42) | [Q17]=Yes
R45: [O15]=DELETE
R46: [A1]=='Customer Summary'!C6 | [C3]==Costing!B50 | [D4]==Costing!F50 | [E5]==Costing!I50 | [F6]==Costing!G50 | [G7]=Woodworm Materials | [H8]==Costing!J50*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J46="MTL","Preservation Shop","") | [N14]==D46*E46 | [O15]=DELETE | [P16]==N46*(1+(H46/100)) | [Q17]=No
R47: [A1]==A46 | [C3]==Costing!B51 | [D4]==Costing!F51 | [E5]==Costing!I51 | [F6]==Costing!G51 | [G7]=Woodworm Materials | [H8]==Costing!J51*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J47="MTL","Preservation Shop","") | [N14]==D47*E47 | [O15]=DELETE | [P16]==N47*(1+(H47/100)) | [Q17]=No
R48: [A1]==A47 | [C3]==Costing!B52 | [D4]==Costing!F52 | [E5]==Costing!I52 | [F6]==Costing!G52 | [G7]=Woodworm Materials | [H8]==Costing!J52*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J48="MTL","Preservation Shop","") | [N14]==D48*E48 | [O15]=DELETE | [P16]==N48*(1+(H48/100)) | [Q17]=No
R49: [A1]==A48 | [C3]==Costing!B53 | [D4]==Costing!F53 | [E5]==Costing!I53 | [F6]==Costing!G53 | [G7]=Woodworm Materials | [H8]==Costing!J53*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J49="MTL","Preservation Shop","") | [N14]==D49*E49 | [O15]=DELETE | [P16]==N49*(1+(H49/100)) | [Q17]=No
R50: [A1]==A49 | [C3]==Costing!B54 | [D4]==Costing!F54 | [E5]==Costing!I54 | [F6]==Costing!G54 | [G7]=Woodworm Materials | [H8]==Costing!J54*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J50="MTL","Preservation Shop","") | [N14]==D50*E50 | [O15]=DELETE | [P16]==N50*(1+(H50/100)) | [Q17]=No
R51: [A1]==A50 | [C3]==Costing!B55 | [D4]==Costing!F55 | [E5]==Costing!I55 | [F6]==Costing!G55 | [G7]=Woodworm Materials | [H8]==Costing!J55*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J51="MTL","Preservation Shop","") | [N14]==D51*E51 | [O15]=DELETE | [P16]==N51*(1+(H51/100)) | [Q17]=No
R52: [A1]==A51 | [C3]==Costing!B56 | [D4]==Costing!F56 | [E5]==Costing!I56 | [F6]==Costing!G56 | [G7]=Woodworm Materials | [H8]==Costing!J56*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J52="MTL","Preservation Shop","") | [N14]==D52*E52 | [O15]=DELETE | [P16]==N52*(1+(H52/100)) | [Q17]=No
R53: [A1]==A52 | [C3]==Costing!B57 | [D4]==Costing!F57 | [E5]==Costing!I57 | [F6]==Costing!G57 | [G7]=Woodworm Materials | [H8]==Costing!J57*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J53="MTL","Preservation Shop","") | [N14]==D53*E53 | [O15]=DELETE | [P16]==N53*(1+(H53/100)) | [Q17]=No
R54: [A1]==A53 | [C3]==Costing!B58 | [D4]==Costing!F58 | [E5]==Costing!I58 | [F6]==Costing!G58 | [G7]=Woodworm Materials | [H8]==Costing!J58*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J54="MTL","Preservation Shop","") | [N14]==D54*E54 | [O15]=DELETE | [P16]==N54*(1+(H54/100)) | [Q17]=No
R55: [A1]==A54 | [C3]==Costing!B59 | [D4]==Costing!F59 | [E5]==Costing!I59 | [F6]==Costing!G59 | [G7]=Woodworm Materials | [H8]==Costing!J59*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J55="MTL","Preservation Shop","") | [N14]==D55*E55 | [O15]=DELETE | [P16]==N55*(1+(H55/100)) | [Q17]=No
R56: [A1]==A55 | [C3]==Costing!B61 | [D4]==Costing!F61 | [E5]==Costing!I61 | [F6]==Costing!G61 | [G7]=Woodworm Materials | [H8]==Costing!J61*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J56="MTL","Preservation Shop","") | [N14]==D56*E56 | [O15]=DELETE | [P16]==N56*(1+(H56/100)) | [Q17]=No
R57: [A1]==A56 | [C3]==Costing!B62 | [D4]==Costing!F62 | [E5]==Costing!I62 | [F6]==Costing!G62 | [G7]=Woodworm Materials | [H8]==Costing!J62*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J57="MTL","Preservation Shop","") | [N14]==D57*E57 | [O15]=DELETE | [P16]==N57*(1+(H57/100)) | [Q17]=No
R58: [A1]==A57 | [C3]==Costing!B63 | [D4]==Costing!F63 | [E5]==Costing!I63 | [F6]==Costing!G63 | [G7]=Woodworm Materials | [H8]==Costing!J63*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J58="MTL","Preservation Shop","") | [N14]==D58*E58 | [O15]=DELETE | [P16]==N58*(1+(H58/100)) | [Q17]=No
R59: [A1]==A58 | [C3]==Costing!B64 | [D4]==Costing!F64 | [E5]==Costing!I64 | [F6]==Costing!G64 | [G7]=Woodworm Materials | [H8]==Costing!J64*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J59="MTL","Preservation Shop","") | [N14]==D59*E59 | [O15]=DELETE | [P16]==N59*(1+(H59/100)) | [Q17]=No
R60: [A1]==A59 | [C3]==Costing!B65 | [D4]==Costing!F65 | [E5]==Costing!I65 | [F6]==Costing!G65 | [G7]=Woodworm Materials | [H8]==Costing!J65*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J60="MTL","Preservation Shop","") | [N14]==D60*E60 | [O15]=DELETE | [P16]==N60*(1+(H60/100)) | [Q17]=No
R61: [A1]==A60 | [C3]==Costing!B66 | [D4]==Costing!F66 | [E5]==Costing!I66 | [F6]==Costing!G66 | [G7]=Woodworm Materials | [H8]==Costing!J66*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J61="MTL","Preservation Shop","") | [N14]==D61*E61 | [O15]=DELETE | [P16]==N61*(1+(H61/100)) | [Q17]=No
R62: [A1]==A61 | [C3]==Costing!B67 | [D4]==Costing!F67 | [E5]==Costing!I67 | [F6]==Costing!G67 | [G7]=Woodworm Materials | [H8]==Costing!J67*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J62="MTL","Preservation Shop","") | [N14]==D62*E62 | [O15]=DELETE | [P16]==N62*(1+(H62/100)) | [Q17]=No
R63: [A1]==A58 | [C3]==Costing!B68 | [D4]==Costing!F68 | [E5]==Costing!I68 | [F6]==Costing!G68 | [G7]=Woodworm Materials | [H8]==Costing!J68*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J63="MTL","Preservation Shop","") | [N14]==D63*E63 | [O15]=DELETE | [P16]==N63*(1+(H63/100)) | [Q17]=No
R64: [A1]==A63 | [C3]==Costing!M50 | [D4]==Costing!O50 | [E5]==Costing!Q50 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R50*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J64="MTL","Preservation Shop","") | [N14]==D64*E64 | [O15]=DELETE | [P16]==N64*(1+(H64/100)) | [Q17]=No
R65: [A1]==A64 | [C3]==Costing!M51 | [D4]==Costing!O51 | [E5]==Costing!Q51 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R51*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J65="MTL","Preservation Shop","") | [N14]==D65*E65 | [O15]=DELETE | [P16]==N65*(1+(H65/100)) | [Q17]=No
R66: [A1]==A65 | [C3]==Costing!M52 | [D4]==Costing!O52 | [E5]==Costing!Q52 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R52*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J66="MTL","Preservation Shop","") | [N14]==D66*E66 | [O15]=DELETE | [P16]==N66*(1+(H66/100)) | [Q17]=No
R67: [A1]==A66 | [C3]==Costing!M53 | [D4]==Costing!O53 | [E5]==Costing!Q53 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R53*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J67="MTL","Preservation Shop","") | [N14]==D67*E67 | [O15]=DELETE | [P16]==N67*(1+(H67/100)) | [Q17]=No
R68: [A1]==A67 | [C3]==Costing!M54 | [D4]==Costing!O54 | [E5]==Costing!Q54 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R54*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J68="MTL","Preservation Shop","") | [N14]==D68*E68 | [O15]=DELETE | [P16]==N68*(1+(H68/100)) | [Q17]=No
R69: [A1]==A68 | [C3]==Costing!M55 | [D4]==Costing!O55 | [E5]==Costing!Q55 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R55*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J69="MTL","Preservation Shop","") | [N14]==D69*E69 | [O15]=DELETE | [P16]==N69*(1+(H69/100)) | [Q17]=No
R70: [A1]==A69 | [C3]==Costing!M56 | [D4]==Costing!O56 | [E5]==Costing!Q56 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R56*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J70="MTL","Preservation Shop","") | [N14]==D70*E70 | [O15]=DELETE | [P16]==N70*(1+(H70/100)) | [Q17]=No
R71: [A1]==A70 | [C3]==Costing!M57 | [D4]==Costing!O57 | [E5]==Costing!Q57 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R57*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J71="MTL","Preservation Shop","") | [N14]==D71*E71 | [O15]=DELETE | [P16]==N71*(1+(H71/100)) | [Q17]=No
R72: [A1]==A71 | [C3]==Costing!M58 | [D4]==Costing!O58 | [E5]==Costing!Q58 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R58*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J72="MTL","Preservation Shop","") | [N14]==D72*E72 | [O15]=DELETE | [P16]==N72*(1+(H72/100)) | [Q17]=No
R73: [A1]==A72 | [C3]==Costing!M59 | [D4]==Costing!O59 | [E5]==Costing!Q59 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R59*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J73="MTL","Preservation Shop","") | [N14]==D73*E73 | [O15]=DELETE | [P16]==N73*(1+(H73/100)) | [Q17]=No
R74: [A1]==A73 | [C3]==Costing!M61 | [D4]==Costing!O61 | [E5]==Costing!Q61 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R61*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J74="MTL","Preservation Shop","") | [N14]==D74*E74 | [O15]=DELETE | [P16]==N74*(1+(H74/100)) | [Q17]=No
R75: [A1]==A74 | [C3]==Costing!M62 | [D4]==Costing!O62 | [E5]==Costing!Q62 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R62*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J75="MTL","Preservation Shop","") | [N14]==D75*E75 | [O15]=DELETE | [P16]==N75*(1+(H75/100)) | [Q17]=No
R76: [A1]==A75 | [C3]==Costing!M63 | [D4]==Costing!O63 | [E5]==Costing!Q63 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R63*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J76="MTL","Preservation Shop","") | [N14]==D76*E76 | [O15]=DELETE | [P16]==N76*(1+(H76/100)) | [Q17]=No
R77: [A1]==A76 | [C3]==Costing!M64 | [D4]==Costing!O64 | [E5]==Costing!Q64 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R64*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J77="MTL","Preservation Shop","") | [N14]==D77*E77 | [O15]=DELETE | [P16]==N77*(1+(H77/100)) | [Q17]=No
R78: [A1]==A77 | [C3]==Costing!M65 | [D4]==Costing!O65 | [E5]==Costing!Q65 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R65*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J78="MTL","Preservation Shop","") | [N14]==D78*E78 | [O15]=DELETE | [P16]==N78*(1+(H78/100)) | [Q17]=No
R79: [A1]==A77 | [C3]==Costing!M66 | [D4]==Costing!O66 | [E5]==Costing!Q66 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R66*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J79="MTL","Preservation Shop","") | [N14]==D79*E79 | [O15]=DELETE | [P16]==N79*(1+(H79/100)) | [Q17]=No
R80: [A1]==A79 | [C3]==Costing!M67 | [D4]==Costing!O67 | [E5]==Costing!Q67 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R67*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J80="MTL","Preservation Shop","") | [N14]==D80*E80 | [O15]=DELETE | [P16]==N80*(1+(H80/100)) | [Q17]=No
R81: [A1]==A76 | [C3]==Costing!M68 | [D4]==Costing!O68 | [E5]==Costing!Q68 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R68*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J81="MTL","Preservation Shop","") | [N14]==D81*E81 | [O15]=DELETE | [P16]==N81*(1+(H81/100)) | [Q17]=No
R82: [A1]==A81 | [C3]=Floor Joists & Floor Decking  - Materials | [D4]=1 | [E5]==N82 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P82-N82)/N82)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D6 | [M13]==SUM(M46:M63) | [N14]==SUM(N46:N63) | [O15]==IF(N82=0,"DELETE","LEAVE") | [P16]==SUM(P46:P63) | [Q17]=Yes
R83: [A1]==A82 | [C3]=Floor Joists & Floor Decking  - Labour | [D4]==SUM(D64:D81) | [E5]==N83/D83 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==((P83-N83)/N83)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L82 | [M13]==SUM(M64:M81) | [N14]==SUM(N64:N81) | [O15]==IF(N83=0,"DELETE","LEAVE") | [P16]==SUM(P64:P81) | [Q17]=Yes
R84: [O15]=DELETE
R85: [A1]=='Customer Summary'!C7 | [C3]==Costing!B72 | [D4]==Costing!F72 | [E5]==Costing!I72 | [F6]==Costing!G72 | [G7]=Woodworm Materials | [H8]==Costing!J72*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J85="MTL","Preservation Shop","") | [N14]==D85*E85 | [O15]=DELETE | [P16]==N85*(1+(H85/100)) | [Q17]=No
R86: [A1]==A85 | [C3]==Costing!B73 | [D4]==Costing!F73 | [E5]==Costing!I73 | [F6]==Costing!G73 | [G7]=Woodworm Materials | [H8]==Costing!J73*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J86="MTL","Preservation Shop","") | [N14]==D86*E86 | [O15]=DELETE | [P16]==N86*(1+(H86/100)) | [Q17]=No
R87: [A1]==A86 | [C3]==Costing!B74 | [D4]==Costing!F74 | [E5]==Costing!I74 | [F6]==Costing!G74 | [G7]=Woodworm Materials | [H8]==Costing!J74*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J87="MTL","Preservation Shop","") | [N14]==D87*E87 | [O15]=DELETE | [P16]==N87*(1+(H87/100)) | [Q17]=No
R88: [A1]==A87 | [C3]==Costing!B75 | [D4]==Costing!F75 | [E5]==Costing!I75 | [F6]==Costing!G75 | [G7]=Woodworm Materials | [H8]==Costing!J75*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J88="MTL","Preservation Shop","") | [N14]==D88*E88 | [O15]=DELETE | [P16]==N88*(1+(H88/100)) | [Q17]=No
R89: [A1]==A88 | [C3]==Costing!B76 | [D4]==Costing!F76 | [E5]==Costing!I76 | [F6]==Costing!G76 | [G7]=Woodworm Materials | [H8]==Costing!J76*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J89="MTL","Preservation Shop","") | [N14]==D89*E89 | [O15]=DELETE | [P16]==N89*(1+(H89/100)) | [Q17]=No
R90: [A1]==A89 | [C3]==Costing!B77 | [D4]==Costing!F77 | [E5]==Costing!I77 | [F6]==Costing!G77 | [G7]=Woodworm Materials | [H8]==Costing!J77*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J90="MTL","Preservation Shop","") | [N14]==D90*E90 | [O15]=DELETE | [P16]==N90*(1+(H90/100)) | [Q17]=No
R91: [A1]==A90 | [C3]==Costing!B78 | [D4]==Costing!F78 | [E5]==Costing!I78 | [F6]==Costing!G78 | [G7]=Woodworm Materials | [H8]==Costing!J78*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J91="MTL","Preservation Shop","") | [N14]==D91*E91 | [O15]=DELETE | [P16]==N91*(1+(H91/100)) | [Q17]=No
R92: [A1]==A91 | [C3]==Costing!B79 | [D4]==Costing!F79 | [E5]==Costing!I79 | [F6]==Costing!G79 | [G7]=Woodworm Materials | [H8]==Costing!J79*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J92="MTL","Preservation Shop","") | [N14]==D92*E92 | [O15]=DELETE | [P16]==N92*(1+(H92/100)) | [Q17]=No
R93: [A1]==A92 | [C3]==Costing!B80 | [D4]==Costing!F80 | [E5]==Costing!I80 | [F6]==Costing!G80 | [G7]=Woodworm Materials | [H8]==Costing!J80*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J93="MTL","Preservation Shop","") | [N14]==D93*E93 | [O15]=DELETE | [P16]==N93*(1+(H93/100)) | [Q17]=No
R94: [A1]==A93 | [C3]==Costing!B81 | [D4]==Costing!F81 | [E5]==Costing!I81 | [F6]==Costing!G81 | [G7]=Woodworm Materials | [H8]==Costing!J81*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J94="MTL","Preservation Shop","") | [N14]==D94*E94 | [O15]=DELETE | [P16]==N94*(1+(H94/100)) | [Q17]=No
R95: [A1]==A94 | [C3]==Costing!M72 | [D4]==Costing!O72 | [E5]==Costing!Q72 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R72*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J95="MTL","Preservation Shop","") | [N14]==D95*E95 | [O15]=DELETE | [P16]==N95*(1+(H95/100)) | [Q17]=No
R96: [A1]==A95 | [C3]==Costing!M73 | [D4]==Costing!O73 | [E5]==Costing!Q73 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R73*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J96="MTL","Preservation Shop","") | [N14]==D96*E96 | [O15]=DELETE | [P16]==N96*(1+(H96/100)) | [Q17]=No
R97: [A1]==A96 | [C3]==Costing!M74 | [D4]==Costing!O74 | [E5]==Costing!Q74 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R74*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J97="MTL","Preservation Shop","") | [N14]==D97*E97 | [O15]=DELETE | [P16]==N97*(1+(H97/100)) | [Q17]=No
R98: [A1]==A97 | [C3]==Costing!M75 | [D4]==Costing!O75 | [E5]==Costing!Q75 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R75*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J98="MTL","Preservation Shop","") | [N14]==D98*E98 | [O15]=DELETE | [P16]==N98*(1+(H98/100)) | [Q17]=No
R99: [A1]==A98 | [C3]==Costing!M76 | [D4]==Costing!O76 | [E5]==Costing!Q76 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R76*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J99="MTL","Preservation Shop","") | [N14]==D99*E99 | [O15]=DELETE | [P16]==N99*(1+(H99/100)) | [Q17]=No
R100: [A1]==A99 | [C3]==Costing!M77 | [D4]==Costing!O77 | [E5]==Costing!Q77 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R77*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J100="MTL","Preservation Shop","") | [N14]==D100*E100 | [O15]=DELETE | [P16]==N100*(1+(H100/100)) | [Q17]=No
R101: [A1]==A100 | [C3]==Costing!M78 | [D4]==Costing!O78 | [E5]==Costing!Q78 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R78*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J101="MTL","Preservation Shop","") | [N14]==D101*E101 | [O15]=DELETE | [P16]==N101*(1+(H101/100)) | [Q17]=No
R102: [A1]==A101 | [C3]==Costing!M79 | [D4]==Costing!O79 | [E5]==Costing!Q79 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R79*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J102="MTL","Preservation Shop","") | [N14]==D102*E102 | [O15]=DELETE | [P16]==N102*(1+(H102/100)) | [Q17]=No
R103: [A1]==A102 | [C3]==Costing!M80 | [D4]==Costing!O80 | [E5]==Costing!Q80 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R80*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J103="MTL","Preservation Shop","") | [N14]==D103*E103 | [O15]=DELETE | [P16]==N103*(1+(H103/100)) | [Q17]=No
R104: [A1]==A103 | [C3]==Costing!M81 | [D4]==Costing!O81 | [E5]==Costing!Q81 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R81*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J104="MTL","Preservation Shop","") | [N14]==D104*E104 | [O15]=DELETE | [P16]==N104*(1+(H104/100)) | [Q17]=No
R105: [A1]==A104 | [C3]=Timber Treatments  - Materials | [D4]=1 | [E5]==N105 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P105-N105)/N105)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D7 | [M13]==IF(J105="MTL","Preservation Shop","") | [N14]==SUM(N85:N94) | [O15]==IF(N105=0,"DELETE","LEAVE") | [P16]==SUM(P85:P94) | [Q17]=Yes
R106: [A1]==A105 | [C3]=Timber Treatments  - Labour | [D4]==SUM(D95:D104) | [E5]==N106/D106 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==((P106-N106)/N106)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L105 | [M13]==IF(J106="MTL","Preservation Shop","") | [N14]==SUM(N95:N104) | [O15]==IF(N106=0,"DELETE","LEAVE") | [P16]==SUM(P95:P104) | [Q17]=Yes
R107: [O15]=DELETE
R108: [A1]=='Customer Summary'!C8 | [C3]==Costing!B85 | [D4]==Costing!F85 | [E5]==Costing!I85 | [F6]==Costing!G85 | [G7]=Woodworm Materials | [H8]==Costing!J85*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J108="MTL","Preservation Shop","") | [N14]==D108*E108 | [O15]=DELETE | [P16]==N108*(1+(H108/100)) | [Q17]=No
R109: [A1]==A108 | [C3]==Costing!B86 | [D4]==Costing!F86 | [E5]==Costing!I86 | [F6]==Costing!G86 | [G7]=Woodworm Materials | [H8]==Costing!J86*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J109="MTL","Preservation Shop","") | [N14]==D109*E109 | [O15]=DELETE | [P16]==N109*(1+(H109/100)) | [Q17]=No
R110: [A1]==A109 | [C3]==Costing!B87 | [D4]==Costing!F87 | [E5]==Costing!I87 | [F6]==Costing!G87 | [G7]=Woodworm Materials | [H8]==Costing!J87*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J110="MTL","Preservation Shop","") | [N14]==D110*E110 | [O15]=DELETE | [P16]==N110*(1+(H110/100)) | [Q17]=No
R111: [A1]==A110 | [C3]==Costing!M85 | [D4]==Costing!O85 | [E5]==Costing!Q85 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R85*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J111="MTL","Preservation Shop","") | [N14]==D111*E111 | [O15]=DELETE | [P16]==N111*(1+(H111/100)) | [Q17]=No
R112: [A1]==A111 | [C3]==Costing!M86 | [D4]==Costing!O86 | [E5]==Costing!Q86 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R86*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J112="MTL","Preservation Shop","") | [N14]==D112*E112 | [O15]=DELETE | [P16]==N112*(1+(H112/100)) | [Q17]=No
R113: [A1]==A112 | [C3]==Costing!M87 | [D4]==Costing!O87 | [E5]==Costing!Q87 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==Costing!R87*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J113="MTL","Preservation Shop","") | [N14]==D113*E113 | [O15]=DELETE | [P16]==N113*(1+(H113/100)) | [Q17]=No
R114: [A1]==A113 | [C3]=Airbricks/Spray treatments  - Materials | [D4]=1 | [E5]==N114 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P114-N114)/N114)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=='Customer Summary'!D8 | [M13]==IF(J114="MTL","Preservation Shop","") | [N14]==SUM(N108:N110) | [O15]==IF(N114=0,"DELETE","LEAVE") | [P16]==SUM(P108:P110) | [Q17]=Yes
R115: [A1]==A114 | [C3]=Airbricks/Spray treatments  - Labour | [D4]==SUM(D111:D113) | [E5]==N115/D115 | [F6]=Hours | [G7]=Woodworm Labour | [H8]==((P115-N115)/N115)*100 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]==L114 | [M13]==IF(J115="MTL","Preservation Shop","") | [N14]==SUM(N111:N113) | [O15]==IF(N115=0,"DELETE","LEAVE") | [P16]==SUM(P111:P113) | [Q17]=Yes
R116: [O15]=DELETE
R117: [A1]=='Customer Summary'!C9 | [C3]=Skips | [D4]==Costing!F91 | [E5]==Costing!I91 | [F6]==Costing!G91 | [G7]=Waste Removal | [H8]==Costing!J91*100 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J117="MTL","Preservation Shop","") | [N14]==D117*E117 | [O15]=DELETE | [P16]==N117*(1+(H117/100)) | [Q17]=No
R118: [A1]==A117 | [C3]=Vehicle Costs (Fuel) | [D4]==Costing!K101*Costing!K102*2 | [E5]=0.5 | [F6]=Miles | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=Other | [K11]=Yes | [L12]=No | [M13]==IF(J118="MTL","Preservation Shop","") | [N14]==D118*E118 | [O15]=DELETE | [P16]==N118*(1+(H118/100)) | [Q17]=No
R119: [A1]==A118 | [C3]=Travel Costs for Tradesmen | [D4]==Costing!O96 | [E5]==Costing!C110 | [F6]=Hours | [G7]=Travel Costs | [H8]=0 | [I9]=% | [J10]=LBR | [K11]=Yes | [L12]=No | [M13]==IF(J119="MTL","Preservation Shop","") | [N14]==D119*E119 | [O15]=DELETE | [P16]==N119*(1+(H119/100)) | [Q17]=No
R120: [A1]==A119 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A120," - Materials") | [D4]=1 | [E5]==N120 | [F6]=EACH | [G7]=Woodworm Materials | [H8]==((P120-N120)/N120)*100 | [I9]=% | [J10]=MTL | [K11]=Yes | [L12]=No | [M13]==IF(J120="MTL","Preservation Shop","") | [N14]==SUM(N117:N118) | [O15]==IF(N120=0,"DELETE","LEAVE") | [P16]==SUM(P117:P118) | [Q17]=Yes
R121: [A1]==A120 | [B2]=(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.) | [C3]==_xlfn.CONCAT(A121," - Labour") | [D4]==D119 | [E5]==E119 | [F6]==F119 | [G7]=Woodworm Labour | [H8]==H119 | [I9]=% | [J10]==J119 | [K11]==K119 | [L12]=No | [M13]==IF(J121="MTL","Preservation Shop","") | [N14]==N119 | [O15]==IF(N121=0,"DELETE","LEAVE") | [P16]==P119 | [Q17]=Yes
```

## SECTION 5: CUSTOMER SUMMARY SHEET

**Total Rows:** 19  |  **Total Cols:** 8

### Complete Row Data

```
R1: [B2]==IF(Costing!E1="SHEET NOT COMPLETE","PLEASE COMPLETE COSTING BEFORE SUPPLYING A PRICE","")
R2: [B2]=Customer Pricing Summary
R3: [B2]=# | [C3]=Area of Works | [D4]=Optional Item? | [E5]=Price ↵(Without Optional items) | [F6]=Price ↵(With Optional Items)
R4: [B2]=1 | [C3]=Stripping out of items as required to proceed with works | [D4]=No | [E5]==IF(D4="Yes","Optional",F4) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C4,'CF CSV Upload'!Q:Q,"Yes"))
R5: [B2]==B4+1 | [C3]=Plastering & finishing | [D4]=No | [E5]==IF(D5="Yes","Optional",F5) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C5,'CF CSV Upload'!Q:Q,"Yes"))
R6: [B2]==B5+1 | [C3]=Floor Joists & Floor Decking | [D4]=No | [E5]==IF(D6="Yes","Optional",F6) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C6,'CF CSV Upload'!Q:Q,"Yes"))
R7: [B2]==B6+1 | [C3]=Timber Treatments | [D4]=No | [E5]==IF(D7="Yes","Optional",F7) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C7,'CF CSV Upload'!Q:Q,"Yes"))
R8: [B2]==B7+1 | [C3]=Airbricks | [D4]=No | [E5]==IF(D8="Yes","Optional",F8) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C8,'CF CSV Upload'!Q:Q,"Yes"))
R9: [B2]==B8+1 | [C3]=Project Specific Overheads | [D4]=No | [E5]==IF(D9="Yes","Optional",F9) | [F6]==IF(SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes")=0,"n/a",SUMIFS('CF CSV Upload'!P:P,'CF CSV Upload'!A:A,'Customer Summary'!C9,'CF CSV Upload'!Q:Q,"Yes"))
R10: [B2]=Totals
R11: [C3]=Sub Total | [E5]==SUM(E4:E9) | [F6]==SUM(F4:F9)
R12: [C3]=Vat at 20% | [E5]==E11*0.2 | [F6]==F11*0.2
R13: [C3]=Total | [E5]==SUM(E11:E12) | [F6]==SUM(F11:F12)
R15: [C3]=Start of works deposit at 30% | [D4]=Ex. VAT | [E5]==E16/6*5 | [F6]==F16/6*5
R16: [D4]=Inc. VAT | [E5]==E13*0.3 | [F6]==F13*0.3
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
R21: [B2]=n/a
R22: [B2]=n/a
R23: [B2]=n/a
R24: [B2]=n/a
R25: [B2]=n/a
R26: [B2]=n/a
R27: [B2]=n/a
R32: [A1]=This is used in the projects to determine costs by the 'Cost Code' category (lets you see which areas you are over or under budget on).
R33: [A1]=Cost Codes
R34: [A1]=Item | [B2]=Comments
R35: [A1]=Woodworm Equipment | [B2]=n/a
R36: [A1]=Woodworm Labour | [B2]=n/a
R37: [A1]=Woodworm Materials | [B2]=n/a
R38: [A1]=Woodworm Other | [B2]=n/a
R39: [A1]=Woodworm Sub Contractors | [B2]=n/a
R40: [A1]=Travel Costs | [B2]=n/a
R41: [A1]=Waste Removal | [B2]=n/a
R44: [A1]=This is used to on the items for costing reference
R45: [A1]=Unit of measures
R46: [A1]=Item | [B2]=Comments
R47: [A1]=Each | [B2]=n/a
R48: [A1]=M2 | [B2]=n/a
R49: [A1]=M3 | [B2]=n/a
R50: [A1]=Hours | [B2]=n/a
R51: [A1]=LM | [B2]=n/a
R52: [A1]=Miles | [B2]=n/a
R53: [A1]=Bags | [B2]=n/a
R54: [A1]=Pairs | [B2]=n/a
R57: [A1]=CSV Import File Name Creator
R58: [A1]=CSV File Name | [B2]=CF-Woodworm-
R59: [A1]=Current Date | [B2]=02-10-25-11-02-46
R60: [A1]=Full File Name | [B2]==CONCATENATE(B58,B59)
R62: [A1]=CSV Import File Name Creator
R63: [A1]=PDF Report Name | [B2]==CONCATENATE(Costing!E4,"-WW-REPORT-",B59)
R65: [A1]=Section Price Adjustment % Values
R66: [A1]=-5
R67: [A1]==A66+1
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
```

### 6B: Data Validation Rules Per Sheet

#### Sheet: Report (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D22:P22 D53:P53 D60:P60 D67:P67 D79:P79 D86:P86 D93:P93 D105:P105 D112:P112 D119:P119 D131:P131 D138:P138 D145:P145 D161:P161 D168:P168 D175:P175 | list |  | "Hide,Show" |  | True | False |

#### Sheet: Costing (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | F106:L106 | list |  | "Image 1: Default or Miscellaneous, Image 2: Single Male (Young), Image 3: Single Male (Elderly), Image 4: Single Female (Young), Image 5: Single Female (Elderly), Image 6: Young Couple, Image 7: Elde… |  | True | False |

#### Sheet: Customer Summary (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | D4:D9 | list |  | "No, Yes" |  | True | False |

#### Sheet: Sub Contractor Costs (1 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | B10:B13 B18:B21 B24:B33 B36:B39 B42:B51 B54:B56 B59:B61 D3 G5 | list |  | "No,Yes" |  | True | False |

#### Sheet: CF CSV Upload (2 validation rules)

| # | Cell Range | Type | Operator | Formula1 | Formula2 | Allow Blank | Show List |
|---|-----------|------|----------|----------|----------|-------------|-----------|
| 1 | Q2:Q27 Q29:Q44 Q46:Q83 Q85:Q106 Q108:Q115 Q117:Q121 | list |  | "No,Yes" |  | True | False |
| 2 | L2:L121 | list |  | "Yes,No" |  | True | False |

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
ThisWorkbook.Sheets("Data Lists").Range("B59").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b60")

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
Private Sub Plastering_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F39:F46").Value = 0
End Sub
Private Sub Floor_Joists_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("D50:D59,E50:E55").Value = 0
End Sub
Private Sub Floor_Deck_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F61:F69").Value = 0
End Sub
Private Sub Timber_Treatments_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F72:F82").Value = 0
End Sub
Private Sub Airbricks_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F85:F88").Value = 0
End Sub
Private Sub Skip_Hire_Section_Zero_Click()
ThisWorkbook.Sheets("Costing").Range("F91").Value = 0
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
ThisWorkbook.Sheets("Data Lists").Range("B59").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################
' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b63")

'Get current folder
Dim current_folder As String
current_folder = ThisWorkbook.Path

'Get full file name
Dim filename_plus_path As String
filename_plus_path = current_folder & "/" & file_name


'Get Validation Status
Dim validation_status As String
validation_status = ThisWorkbook.Sheets("Report").Range("H1")

If validation_status = "SHEET COMPLETE" Then

'Save active workbook as PDF
' https://exceloffthegrid.com/vba-code-save-excel-file-as-pdf/
ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
    Filename:=filename_plus_path


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
        .Range("D14:P226").CheckSpelling
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

## SECTION 8: CROSS-SHEET REFERENCES

### References FROM: Report

| Target | Referenced By |
|--------|-------------|
| Costing!$E$14 | Report!B217, Report!B220, Report!B223 |
| Costing!E10 | Report!D10 |
| Costing!E11 | Report!D11 |
| Costing!E4 | Report!G12 |
| Costing!E7 | Report!D7 |
| Costing!E8 | Report!D8 |
| Costing!E9 | Report!D9 |
| Details!$C$13 | Report!H32, Report!H32 |

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
| Details!$C$12 | Costing!K102, Costing!K102 |
| Details!$C$16 | Costing!E14, Costing!E14 |
| Details!$C$4 | Costing!E4, Costing!E4 |
| Details!$C$7 | Costing!E7, Costing!E7 |
| Details!$C$8 | Costing!E8, Costing!E8 |
| Details!$C$9 | Costing!E9, Costing!E9 |

### References FROM: Customer Summary

| Target | Referenced By |
|--------|-------------|
| Costing!E1 | Customer Summary!B1 |
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
| Costing!O26 | Sub Contractor Costs!G11 |
| Costing!O36 | Sub Contractor Costs!G11 |
| Costing!O46 | Sub Contractor Costs!G12 |
| Costing!O69 | Sub Contractor Costs!G13 |
| Costing!O82 | Sub Contractor Costs!G14 |
| Costing!O88 | Sub Contractor Costs!G15 |
| Costing!V26 | Sub Contractor Costs!D11 |
| Costing!V36 | Sub Contractor Costs!D11 |
| Costing!V46 | Sub Contractor Costs!D12 |
| Costing!V69 | Sub Contractor Costs!D13 |
| Costing!V82 | Sub Contractor Costs!D14 |
| Costing!V88 | Sub Contractor Costs!D15 |
| Customer Summary!C4 | Sub Contractor Costs!C11 |
| Customer Summary!C5 | Sub Contractor Costs!C12 |
| Customer Summary!C6 | Sub Contractor Costs!C13 |
| Customer Summary!C7 | Sub Contractor Costs!C14 |
| Customer Summary!C8 | Sub Contractor Costs!C15 |

### References FROM: CF CSV Upload

| Target | Referenced By |
|--------|-------------|
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
| Costing!B39 | CF CSV Upload!C29 |
| Costing!B40 | CF CSV Upload!C30 |
| Costing!B41 | CF CSV Upload!C31 |
| Costing!B42 | CF CSV Upload!C32 |
| Costing!B43 | CF CSV Upload!C33 |
| Costing!B44 | CF CSV Upload!C34 |
| Costing!B45 | CF CSV Upload!C35 |
| Costing!B50 | CF CSV Upload!C46 |
| Costing!B51 | CF CSV Upload!C47 |
| Costing!B52 | CF CSV Upload!C48 |
| Costing!B53 | CF CSV Upload!C49 |
| Costing!B54 | CF CSV Upload!C50 |
| Costing!B55 | CF CSV Upload!C51 |
| Costing!B56 | CF CSV Upload!C52 |
| Costing!B57 | CF CSV Upload!C53 |
| Costing!B58 | CF CSV Upload!C54 |
| Costing!B59 | CF CSV Upload!C55 |
| Costing!B61 | CF CSV Upload!C56 |
| Costing!B62 | CF CSV Upload!C57 |
| Costing!B63 | CF CSV Upload!C58 |
| Costing!B64 | CF CSV Upload!C59 |
| Costing!B65 | CF CSV Upload!C60 |
| Costing!B66 | CF CSV Upload!C61 |
| Costing!B67 | CF CSV Upload!C62 |
| Costing!B68 | CF CSV Upload!C63 |
| Costing!B72 | CF CSV Upload!C85 |
| Costing!B73 | CF CSV Upload!C86 |
| Costing!B74 | CF CSV Upload!C87 |
| Costing!B75 | CF CSV Upload!C88 |
| Costing!B76 | CF CSV Upload!C89 |
| Costing!B77 | CF CSV Upload!C90 |
| Costing!B78 | CF CSV Upload!C91 |
| Costing!B79 | CF CSV Upload!C92 |
| Costing!B80 | CF CSV Upload!C93 |
| Costing!B81 | CF CSV Upload!C94 |
| Costing!B85 | CF CSV Upload!C108 |
| Costing!B86 | CF CSV Upload!C109 |
| Costing!B87 | CF CSV Upload!C110 |
| Costing!C110 | CF CSV Upload!E119 |
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
| Costing!F39 | CF CSV Upload!D29 |
| Costing!F40 | CF CSV Upload!D30 |
| Costing!F41 | CF CSV Upload!D31 |
| Costing!F42 | CF CSV Upload!D32 |
| Costing!F43 | CF CSV Upload!D33 |
| Costing!F44 | CF CSV Upload!D34 |
| Costing!F45 | CF CSV Upload!D35 |
| Costing!F50 | CF CSV Upload!D46 |
| Costing!F51 | CF CSV Upload!D47 |
| Costing!F52 | CF CSV Upload!D48 |
| Costing!F53 | CF CSV Upload!D49 |
| Costing!F54 | CF CSV Upload!D50 |
| Costing!F55 | CF CSV Upload!D51 |
| Costing!F56 | CF CSV Upload!D52 |
| Costing!F57 | CF CSV Upload!D53 |
| Costing!F58 | CF CSV Upload!D54 |
| Costing!F59 | CF CSV Upload!D55 |
| Costing!F61 | CF CSV Upload!D56 |
| Costing!F62 | CF CSV Upload!D57 |
| Costing!F63 | CF CSV Upload!D58 |
| Costing!F64 | CF CSV Upload!D59 |
| Costing!F65 | CF CSV Upload!D60 |
| Costing!F66 | CF CSV Upload!D61 |
| Costing!F67 | CF CSV Upload!D62 |
| Costing!F68 | CF CSV Upload!D63 |
| Costing!F72 | CF CSV Upload!D85 |
| Costing!F73 | CF CSV Upload!D86 |
| Costing!F74 | CF CSV Upload!D87 |
| Costing!F75 | CF CSV Upload!D88 |
| Costing!F76 | CF CSV Upload!D89 |
| Costing!F77 | CF CSV Upload!D90 |
| Costing!F78 | CF CSV Upload!D91 |
| Costing!F79 | CF CSV Upload!D92 |
| Costing!F80 | CF CSV Upload!D93 |
| Costing!F81 | CF CSV Upload!D94 |
| Costing!F85 | CF CSV Upload!D108 |
| Costing!F86 | CF CSV Upload!D109 |
| Costing!F87 | CF CSV Upload!D110 |
| Costing!F91 | CF CSV Upload!D117 |
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
| Costing!G39 | CF CSV Upload!F29 |
| Costing!G40 | CF CSV Upload!F30 |
| Costing!G41 | CF CSV Upload!F31 |
| Costing!G42 | CF CSV Upload!F32 |
| Costing!G43 | CF CSV Upload!F33 |
| Costing!G44 | CF CSV Upload!F34 |
| Costing!G45 | CF CSV Upload!F35 |
| Costing!G50 | CF CSV Upload!F46 |
| Costing!G51 | CF CSV Upload!F47 |
| Costing!G52 | CF CSV Upload!F48 |
| Costing!G53 | CF CSV Upload!F49 |
| Costing!G54 | CF CSV Upload!F50 |
| Costing!G55 | CF CSV Upload!F51 |
| Costing!G56 | CF CSV Upload!F52 |
| Costing!G57 | CF CSV Upload!F53 |
| Costing!G58 | CF CSV Upload!F54 |
| Costing!G59 | CF CSV Upload!F55 |
| Costing!G61 | CF CSV Upload!F56 |
| Costing!G62 | CF CSV Upload!F57 |
| Costing!G63 | CF CSV Upload!F58 |
| Costing!G64 | CF CSV Upload!F59 |
| Costing!G65 | CF CSV Upload!F60 |
| Costing!G66 | CF CSV Upload!F61 |
| Costing!G67 | CF CSV Upload!F62 |
| Costing!G68 | CF CSV Upload!F63 |
| Costing!G72 | CF CSV Upload!F85 |
| Costing!G73 | CF CSV Upload!F86 |
| Costing!G74 | CF CSV Upload!F87 |
| Costing!G75 | CF CSV Upload!F88 |
| Costing!G76 | CF CSV Upload!F89 |
| Costing!G77 | CF CSV Upload!F90 |
| Costing!G78 | CF CSV Upload!F91 |
| Costing!G79 | CF CSV Upload!F92 |
| Costing!G80 | CF CSV Upload!F93 |
| Costing!G81 | CF CSV Upload!F94 |
| Costing!G85 | CF CSV Upload!F108 |
| Costing!G86 | CF CSV Upload!F109 |
| Costing!G87 | CF CSV Upload!F110 |
| Costing!G91 | CF CSV Upload!F117 |
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
| Costing!I39 | CF CSV Upload!E29 |
| Costing!I40 | CF CSV Upload!E30 |
| Costing!I41 | CF CSV Upload!E31 |
| Costing!I42 | CF CSV Upload!E32 |
| Costing!I43 | CF CSV Upload!E33 |
| Costing!I44 | CF CSV Upload!E34 |
| Costing!I45 | CF CSV Upload!E35 |
| Costing!I50 | CF CSV Upload!E46 |
| Costing!I51 | CF CSV Upload!E47 |
| Costing!I52 | CF CSV Upload!E48 |
| Costing!I53 | CF CSV Upload!E49 |
| Costing!I54 | CF CSV Upload!E50 |
| Costing!I55 | CF CSV Upload!E51 |
| Costing!I56 | CF CSV Upload!E52 |
| Costing!I57 | CF CSV Upload!E53 |
| Costing!I58 | CF CSV Upload!E54 |
| Costing!I59 | CF CSV Upload!E55 |
| Costing!I61 | CF CSV Upload!E56 |
| Costing!I62 | CF CSV Upload!E57 |
| Costing!I63 | CF CSV Upload!E58 |
| Costing!I64 | CF CSV Upload!E59 |
| Costing!I65 | CF CSV Upload!E60 |
| Costing!I66 | CF CSV Upload!E61 |
| Costing!I67 | CF CSV Upload!E62 |
| Costing!I68 | CF CSV Upload!E63 |
| Costing!I72 | CF CSV Upload!E85 |
| Costing!I73 | CF CSV Upload!E86 |
| Costing!I74 | CF CSV Upload!E87 |
| Costing!I75 | CF CSV Upload!E88 |
| Costing!I76 | CF CSV Upload!E89 |
| Costing!I77 | CF CSV Upload!E90 |
| Costing!I78 | CF CSV Upload!E91 |
| Costing!I79 | CF CSV Upload!E92 |
| Costing!I80 | CF CSV Upload!E93 |
| Costing!I81 | CF CSV Upload!E94 |
| Costing!I85 | CF CSV Upload!E108 |
| Costing!I86 | CF CSV Upload!E109 |
| Costing!I87 | CF CSV Upload!E110 |
| Costing!I91 | CF CSV Upload!E117 |
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
| Costing!J39 | CF CSV Upload!H29 |
| Costing!J40 | CF CSV Upload!H30 |
| Costing!J41 | CF CSV Upload!H31 |
| Costing!J42 | CF CSV Upload!H32 |
| Costing!J43 | CF CSV Upload!H33 |
| Costing!J44 | CF CSV Upload!H34 |
| Costing!J45 | CF CSV Upload!H35 |
| Costing!J50 | CF CSV Upload!H46 |
| Costing!J51 | CF CSV Upload!H47 |
| Costing!J52 | CF CSV Upload!H48 |
| Costing!J53 | CF CSV Upload!H49 |
| Costing!J54 | CF CSV Upload!H50 |
| Costing!J55 | CF CSV Upload!H51 |
| Costing!J56 | CF CSV Upload!H52 |
| Costing!J57 | CF CSV Upload!H53 |
| Costing!J58 | CF CSV Upload!H54 |
| Costing!J59 | CF CSV Upload!H55 |
| Costing!J61 | CF CSV Upload!H56 |
| Costing!J62 | CF CSV Upload!H57 |
| Costing!J63 | CF CSV Upload!H58 |
| Costing!J64 | CF CSV Upload!H59 |
| Costing!J65 | CF CSV Upload!H60 |
| Costing!J66 | CF CSV Upload!H61 |
| Costing!J67 | CF CSV Upload!H62 |
| Costing!J68 | CF CSV Upload!H63 |
| Costing!J72 | CF CSV Upload!H85 |
| Costing!J73 | CF CSV Upload!H86 |
| Costing!J74 | CF CSV Upload!H87 |
| Costing!J75 | CF CSV Upload!H88 |
| Costing!J76 | CF CSV Upload!H89 |
| Costing!J77 | CF CSV Upload!H90 |
| Costing!J78 | CF CSV Upload!H91 |
| Costing!J79 | CF CSV Upload!H92 |
| Costing!J80 | CF CSV Upload!H93 |
| Costing!J81 | CF CSV Upload!H94 |
| Costing!J85 | CF CSV Upload!H108 |
| Costing!J86 | CF CSV Upload!H109 |
| Costing!J87 | CF CSV Upload!H110 |
| Costing!J91 | CF CSV Upload!H117 |
| Costing!K101 | CF CSV Upload!D118 |
| Costing!K102 | CF CSV Upload!D118 |
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
| Costing!M39 | CF CSV Upload!C36 |
| Costing!M40 | CF CSV Upload!C37 |
| Costing!M41 | CF CSV Upload!C38 |
| Costing!M42 | CF CSV Upload!C39 |
| Costing!M43 | CF CSV Upload!C40 |
| Costing!M44 | CF CSV Upload!C41 |
| Costing!M45 | CF CSV Upload!C42 |
| Costing!M50 | CF CSV Upload!C64 |
| Costing!M51 | CF CSV Upload!C65 |
| Costing!M52 | CF CSV Upload!C66 |
| Costing!M53 | CF CSV Upload!C67 |
| Costing!M54 | CF CSV Upload!C68 |
| Costing!M55 | CF CSV Upload!C69 |
| Costing!M56 | CF CSV Upload!C70 |
| Costing!M57 | CF CSV Upload!C71 |
| Costing!M58 | CF CSV Upload!C72 |
| Costing!M59 | CF CSV Upload!C73 |
| Costing!M61 | CF CSV Upload!C74 |
| Costing!M62 | CF CSV Upload!C75 |
| Costing!M63 | CF CSV Upload!C76 |
| Costing!M64 | CF CSV Upload!C77 |
| Costing!M65 | CF CSV Upload!C78 |
| Costing!M66 | CF CSV Upload!C79 |
| Costing!M67 | CF CSV Upload!C80 |
| Costing!M68 | CF CSV Upload!C81 |
| Costing!M72 | CF CSV Upload!C95 |
| Costing!M73 | CF CSV Upload!C96 |
| Costing!M74 | CF CSV Upload!C97 |
| Costing!M75 | CF CSV Upload!C98 |
| Costing!M76 | CF CSV Upload!C99 |
| Costing!M77 | CF CSV Upload!C100 |
| Costing!M78 | CF CSV Upload!C101 |
| Costing!M79 | CF CSV Upload!C102 |
| Costing!M80 | CF CSV Upload!C103 |
| Costing!M81 | CF CSV Upload!C104 |
| Costing!M85 | CF CSV Upload!C111 |
| Costing!M86 | CF CSV Upload!C112 |
| Costing!M87 | CF CSV Upload!C113 |
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
| Costing!O39 | CF CSV Upload!D36 |
| Costing!O40 | CF CSV Upload!D37 |
| Costing!O41 | CF CSV Upload!D38 |
| Costing!O42 | CF CSV Upload!D39 |
| Costing!O43 | CF CSV Upload!D40 |
| Costing!O44 | CF CSV Upload!D41 |
| Costing!O45 | CF CSV Upload!D42 |
| Costing!O50 | CF CSV Upload!D64 |
| Costing!O51 | CF CSV Upload!D65 |
| Costing!O52 | CF CSV Upload!D66 |
| Costing!O53 | CF CSV Upload!D67 |
| Costing!O54 | CF CSV Upload!D68 |
| Costing!O55 | CF CSV Upload!D69 |
| Costing!O56 | CF CSV Upload!D70 |
| Costing!O57 | CF CSV Upload!D71 |
| Costing!O58 | CF CSV Upload!D72 |
| Costing!O59 | CF CSV Upload!D73 |
| Costing!O61 | CF CSV Upload!D74 |
| Costing!O62 | CF CSV Upload!D75 |
| Costing!O63 | CF CSV Upload!D76 |
| Costing!O64 | CF CSV Upload!D77 |
| Costing!O65 | CF CSV Upload!D78 |
| Costing!O66 | CF CSV Upload!D79 |
| Costing!O67 | CF CSV Upload!D80 |
| Costing!O68 | CF CSV Upload!D81 |
| Costing!O72 | CF CSV Upload!D95 |
| Costing!O73 | CF CSV Upload!D96 |
| Costing!O74 | CF CSV Upload!D97 |
| Costing!O75 | CF CSV Upload!D98 |
| Costing!O76 | CF CSV Upload!D99 |
| Costing!O77 | CF CSV Upload!D100 |
| Costing!O78 | CF CSV Upload!D101 |
| Costing!O79 | CF CSV Upload!D102 |
| Costing!O80 | CF CSV Upload!D103 |
| Costing!O81 | CF CSV Upload!D104 |
| Costing!O85 | CF CSV Upload!D111 |
| Costing!O86 | CF CSV Upload!D112 |
| Costing!O87 | CF CSV Upload!D113 |
| Costing!O96 | CF CSV Upload!D119 |
| Costing!Q21 | CF CSV Upload!E14 |
| Costing!Q22 | CF CSV Upload!E15 |
| Costing!Q23 | CF CSV Upload!E16 |
| Costing!Q24 | CF CSV Upload!E17 |
| Costing!Q25 | CF CSV Upload!E18 |
| Costing!Q29 | CF CSV Upload!E19 |
| Costing!Q30 | CF CSV Upload!E20 |
| Costing!Q31 | CF CSV Upload!E21 |
| Costing!Q32 | CF CSV Upload!E22 |
| Costing!Q33 | CF CSV Upload!E23 |
| Costing!Q34 | CF CSV Upload!E24 |
| Costing!Q35 | CF CSV Upload!E25 |
| Costing!Q39 | CF CSV Upload!E36 |
| Costing!Q40 | CF CSV Upload!E37 |
| Costing!Q41 | CF CSV Upload!E38 |
| Costing!Q42 | CF CSV Upload!E39 |
| Costing!Q43 | CF CSV Upload!E40 |
| Costing!Q44 | CF CSV Upload!E41 |
| Costing!Q45 | CF CSV Upload!E42 |
| Costing!Q50 | CF CSV Upload!E64 |
| Costing!Q51 | CF CSV Upload!E65 |
| Costing!Q52 | CF CSV Upload!E66 |
| Costing!Q53 | CF CSV Upload!E67 |
| Costing!Q54 | CF CSV Upload!E68 |
| Costing!Q55 | CF CSV Upload!E69 |
| Costing!Q56 | CF CSV Upload!E70 |
| Costing!Q57 | CF CSV Upload!E71 |
| Costing!Q58 | CF CSV Upload!E72 |
| Costing!Q59 | CF CSV Upload!E73 |
| Costing!Q61 | CF CSV Upload!E74 |
| Costing!Q62 | CF CSV Upload!E75 |
| Costing!Q63 | CF CSV Upload!E76 |
| Costing!Q64 | CF CSV Upload!E77 |
| Costing!Q65 | CF CSV Upload!E78 |
| Costing!Q66 | CF CSV Upload!E79 |
| Costing!Q67 | CF CSV Upload!E80 |
| Costing!Q68 | CF CSV Upload!E81 |
| Costing!Q72 | CF CSV Upload!E95 |
| Costing!Q73 | CF CSV Upload!E96 |
| Costing!Q74 | CF CSV Upload!E97 |
| Costing!Q75 | CF CSV Upload!E98 |
| Costing!Q76 | CF CSV Upload!E99 |
| Costing!Q77 | CF CSV Upload!E100 |
| Costing!Q78 | CF CSV Upload!E101 |
| Costing!Q79 | CF CSV Upload!E102 |
| Costing!Q80 | CF CSV Upload!E103 |
| Costing!Q81 | CF CSV Upload!E104 |
| Costing!Q85 | CF CSV Upload!E111 |
| Costing!Q86 | CF CSV Upload!E112 |
| Costing!Q87 | CF CSV Upload!E113 |
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
| Costing!R39 | CF CSV Upload!H36 |
| Costing!R40 | CF CSV Upload!H37 |
| Costing!R41 | CF CSV Upload!H38 |
| Costing!R42 | CF CSV Upload!H39 |
| Costing!R43 | CF CSV Upload!H40 |
| Costing!R44 | CF CSV Upload!H41 |
| Costing!R45 | CF CSV Upload!H42 |
| Costing!R50 | CF CSV Upload!H64 |
| Costing!R51 | CF CSV Upload!H65 |
| Costing!R52 | CF CSV Upload!H66 |
| Costing!R53 | CF CSV Upload!H67 |
| Costing!R54 | CF CSV Upload!H68 |
| Costing!R55 | CF CSV Upload!H69 |
| Costing!R56 | CF CSV Upload!H70 |
| Costing!R57 | CF CSV Upload!H71 |
| Costing!R58 | CF CSV Upload!H72 |
| Costing!R59 | CF CSV Upload!H73 |
| Costing!R61 | CF CSV Upload!H74 |
| Costing!R62 | CF CSV Upload!H75 |
| Costing!R63 | CF CSV Upload!H76 |
| Costing!R64 | CF CSV Upload!H77 |
| Costing!R65 | CF CSV Upload!H78 |
| Costing!R66 | CF CSV Upload!H79 |
| Costing!R67 | CF CSV Upload!H80 |
| Costing!R68 | CF CSV Upload!H81 |
| Costing!R72 | CF CSV Upload!H95 |
| Costing!R73 | CF CSV Upload!H96 |
| Costing!R74 | CF CSV Upload!H97 |
| Costing!R75 | CF CSV Upload!H98 |
| Costing!R76 | CF CSV Upload!H99 |
| Costing!R77 | CF CSV Upload!H100 |
| Costing!R78 | CF CSV Upload!H101 |
| Costing!R79 | CF CSV Upload!H102 |
| Costing!R80 | CF CSV Upload!H103 |
| Costing!R81 | CF CSV Upload!H104 |
| Costing!R85 | CF CSV Upload!H111 |
| Costing!R86 | CF CSV Upload!H112 |
| Costing!R87 | CF CSV Upload!H113 |
| Customer Summary!C4 | CF CSV Upload!A2 |
| Customer Summary!C5 | CF CSV Upload!A29 |
| Customer Summary!C6 | CF CSV Upload!A46 |
| Customer Summary!C7 | CF CSV Upload!A85 |
| Customer Summary!C8 | CF CSV Upload!A108 |
| Customer Summary!C9 | CF CSV Upload!A117 |
| Customer Summary!D4 | CF CSV Upload!L26 |
| Customer Summary!D5 | CF CSV Upload!L43 |
| Customer Summary!D6 | CF CSV Upload!L82 |
| Customer Summary!D7 | CF CSV Upload!L105 |
| Customer Summary!D8 | CF CSV Upload!L114 |

### References FROM: Data Lists

| Target | Referenced By |
|--------|-------------|
| Costing!E4 | Data Lists!B63 |
| Customer Summary!C4 | Data Lists!A15 |
| Customer Summary!C5 | Data Lists!A16 |
| Customer Summary!C6 | Data Lists!A17 |
| Customer Summary!C7 | Data Lists!A18 |
| Customer Summary!C8 | Data Lists!A19 |
| Customer Summary!C9 | Data Lists!A20 |

## SECTION 9: NAMED RANGES

*No named ranges defined.*

## SECTION 10: CONDITIONAL FORMATTING

### Sheet: Report (131 rules)

**Rule 1** — Range: `<ConditionalFormatting H1:H2>`

- Type: `cellIs`
  Priority: 293
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
  Priority: 294
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

**Rule 2** — Range: `<ConditionalFormatting B41:B45 B181 H15:H17 H32:P32>`

- Type: `containsBlanks`
  Priority: 292
  Formula: `['LEN(TRIM(B15))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 3** — Range: `<ConditionalFormatting D47:P47>`

- Type: `containsBlanks`
  Priority: 291
  Formula: `['LEN(TRIM(D47))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 4** — Range: `<ConditionalFormatting D48:P49>`

- Type: `containsBlanks`
  Priority: 290
  Formula: `['LEN(TRIM(D48))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 5** — Range: `<ConditionalFormatting D99:P101>`

- Type: `containsBlanks`
  Priority: 289
  Formula: `['LEN(TRIM(D99))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 6** — Range: `<ConditionalFormatting D125:P127>`

- Type: `containsBlanks`
  Priority: 288
  Formula: `['LEN(TRIM(D125))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 7** — Range: `<ConditionalFormatting E155:E157>`

- Type: `containsBlanks`
  Priority: 287
  Formula: `['LEN(TRIM(E155))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 8** — Range: `<ConditionalFormatting D73:P73>`

- Type: `containsBlanks`
  Priority: 285
  Formula: `['LEN(TRIM(D73))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 9** — Range: `<ConditionalFormatting D74:P75>`

- Type: `containsBlanks`
  Priority: 284
  Formula: `['LEN(TRIM(D74))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 10** — Range: `<ConditionalFormatting F192:F194>`

- Type: `containsBlanks`
  Priority: 283
  Formula: `['LEN(TRIM(F192))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 11** — Range: `<ConditionalFormatting B151:B153>`

- Type: `containsBlanks`
  Priority: 281
  Formula: `['LEN(TRIM(B151))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 12** — Range: `<ConditionalFormatting B182:B191>`

- Type: `containsBlanks`
  Priority: 280
  Formula: `['LEN(TRIM(B182))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 13** — Range: `<ConditionalFormatting B192:B194>`

- Type: `containsBlanks`
  Priority: 279
  Formula: `['LEN(TRIM(B192))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 14** — Range: `<ConditionalFormatting B46:B49 B72:B75 B98:B101 B124:B127 B150>`

- Type: `containsBlanks`
  Priority: 277
  Formula: `['LEN(TRIM(B46))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 15** — Range: `<ConditionalFormatting B155:B157>`

- Type: `containsBlanks`
  Priority: 276
  Formula: `['LEN(TRIM(B155))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 16** — Range: `<ConditionalFormatting D53:J53>`

- Type: `cellIs`
  Priority: 273
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
  Priority: 274
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
  Priority: 275
  Formula: `['LEN(TRIM(D53))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 272
  Formula: `['OR(D53="Show",D53="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 17** — Range: `<ConditionalFormatting K53:P53>`

- Type: `cellIs`
  Priority: 269
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
  Priority: 270
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
  Priority: 271
  Formula: `['LEN(TRIM(K53))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 268
  Formula: `['OR(K53="Show",K53="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 18** — Range: `<ConditionalFormatting D55:J55>`

- Type: `expression`
  Priority: 252
  Formula: `['OR(D53="Hide",D53="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 259
  Formula: `['AND(D53="Show",D55="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 19** — Range: `<ConditionalFormatting K55:P55>`

- Type: `expression`
  Priority: 250
  Formula: `['OR(K53="Hide",K53="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 257
  Formula: `['AND(K53="Show",K55="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 20** — Range: `<ConditionalFormatting B53>`

- Type: `containsBlanks`
  Priority: 254
  Formula: `['LEN(TRIM(B53))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 21** — Range: `<ConditionalFormatting D54:J54>`

- Type: `expression`
  Priority: 253
  Formula: `['OR(D53="Hide",D53="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 22** — Range: `<ConditionalFormatting K54:P54>`

- Type: `expression`
  Priority: 251
  Formula: `['OR(K53="Hide",K53="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 23** — Range: `<ConditionalFormatting D60:J60>`

- Type: `cellIs`
  Priority: 247
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
  Priority: 248
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
  Priority: 249
  Formula: `['LEN(TRIM(D60))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 246
  Formula: `['OR(D60="Show",D60="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 24** — Range: `<ConditionalFormatting K60:P60>`

- Type: `cellIs`
  Priority: 243
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
  Priority: 244
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
  Priority: 245
  Formula: `['LEN(TRIM(K60))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 242
  Formula: `['OR(K60="Show",K60="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 25** — Range: `<ConditionalFormatting D62:J62>`

- Type: `expression`
  Priority: 237
  Formula: `['OR(D60="Hide",D60="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 241
  Formula: `['AND(D60="Show",D62="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 26** — Range: `<ConditionalFormatting K62:P62>`

- Type: `expression`
  Priority: 235
  Formula: `['OR(K60="Hide",K60="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 240
  Formula: `['AND(K60="Show",K62="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 27** — Range: `<ConditionalFormatting D61:J61>`

- Type: `expression`
  Priority: 238
  Formula: `['OR(D60="Hide",D60="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 28** — Range: `<ConditionalFormatting K61:P61>`

- Type: `expression`
  Priority: 236
  Formula: `['OR(K60="Hide",K60="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 29** — Range: `<ConditionalFormatting D67:J67>`

- Type: `cellIs`
  Priority: 232
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
  Priority: 233
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
  Priority: 234
  Formula: `['LEN(TRIM(D67))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 231
  Formula: `['OR(D67="Show",D67="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 30** — Range: `<ConditionalFormatting K67:P67>`

- Type: `cellIs`
  Priority: 228
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
  Priority: 230
  Formula: `['LEN(TRIM(K67))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 227
  Formula: `['OR(K67="Show",K67="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 31** — Range: `<ConditionalFormatting D69:J69>`

- Type: `expression`
  Priority: 222
  Formula: `['OR(D67="Hide",D67="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 226
  Formula: `['AND(D67="Show",D69="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 32** — Range: `<ConditionalFormatting K69:P69>`

- Type: `expression`
  Priority: 220
  Formula: `['OR(K67="Hide",K67="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 225
  Formula: `['AND(K67="Show",K69="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 33** — Range: `<ConditionalFormatting D68:J68>`

- Type: `expression`
  Priority: 223
  Formula: `['OR(D67="Hide",D67="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 34** — Range: `<ConditionalFormatting K68:P68>`

- Type: `expression`
  Priority: 221
  Formula: `['OR(K67="Hide",K67="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 35** — Range: `<ConditionalFormatting D79:J79>`

- Type: `cellIs`
  Priority: 217
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
  Priority: 218
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
  Priority: 219
  Formula: `['LEN(TRIM(D79))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 216
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

**Rule 36** — Range: `<ConditionalFormatting K79:P79>`

- Type: `cellIs`
  Priority: 213
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
  Priority: 214
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
  Priority: 215
  Formula: `['LEN(TRIM(K79))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 212
  Formula: `['OR(K79="Show",K79="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 37** — Range: `<ConditionalFormatting D81:J81>`

- Type: `expression`
  Priority: 207
  Formula: `['OR(D79="Hide",D79="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 211
  Formula: `['AND(D79="Show",D81="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 38** — Range: `<ConditionalFormatting K81:P81>`

- Type: `expression`
  Priority: 205
  Formula: `['OR(K79="Hide",K79="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 210
  Formula: `['AND(K79="Show",K81="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 39** — Range: `<ConditionalFormatting D80:J80>`

- Type: `expression`
  Priority: 208
  Formula: `['OR(D79="Hide",D79="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 40** — Range: `<ConditionalFormatting K80:P80>`

- Type: `expression`
  Priority: 206
  Formula: `['OR(K79="Hide",K79="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 41** — Range: `<ConditionalFormatting D86:J86>`

- Type: `cellIs`
  Priority: 202
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
  Priority: 204
  Formula: `['LEN(TRIM(D86))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 201
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

**Rule 42** — Range: `<ConditionalFormatting K86:P86>`

- Type: `cellIs`
  Priority: 198
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
  Priority: 199
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
  Priority: 200
  Formula: `['LEN(TRIM(K86))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 197
  Formula: `['OR(K86="Show",K86="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 43** — Range: `<ConditionalFormatting D88:J88>`

- Type: `expression`
  Priority: 192
  Formula: `['OR(D86="Hide",D86="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 196
  Formula: `['AND(D86="Show",D88="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 44** — Range: `<ConditionalFormatting K88:P88>`

- Type: `expression`
  Priority: 190
  Formula: `['OR(K86="Hide",K86="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 195
  Formula: `['AND(K86="Show",K88="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 45** — Range: `<ConditionalFormatting D87:J87>`

- Type: `expression`
  Priority: 193
  Formula: `['OR(D86="Hide",D86="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 46** — Range: `<ConditionalFormatting K87:P87>`

- Type: `expression`
  Priority: 191
  Formula: `['OR(K86="Hide",K86="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 47** — Range: `<ConditionalFormatting D93:J93>`

- Type: `cellIs`
  Priority: 187
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
  Priority: 188
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
  Priority: 189
  Formula: `['LEN(TRIM(D93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 186
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

**Rule 48** — Range: `<ConditionalFormatting K93:P93>`

- Type: `cellIs`
  Priority: 183
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
  Priority: 184
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
  Priority: 185
  Formula: `['LEN(TRIM(K93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 182
  Formula: `['OR(K93="Show",K93="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 49** — Range: `<ConditionalFormatting D95:J95>`

- Type: `expression`
  Priority: 177
  Formula: `['OR(D93="Hide",D93="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 181
  Formula: `['AND(D93="Show",D95="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 50** — Range: `<ConditionalFormatting K95:P95>`

- Type: `expression`
  Priority: 175
  Formula: `['OR(K93="Hide",K93="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 180
  Formula: `['AND(K93="Show",K95="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 51** — Range: `<ConditionalFormatting D94:J94>`

- Type: `expression`
  Priority: 178
  Formula: `['OR(D93="Hide",D93="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 52** — Range: `<ConditionalFormatting K94:P94>`

- Type: `expression`
  Priority: 176
  Formula: `['OR(K93="Hide",K93="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 53** — Range: `<ConditionalFormatting D105:J105>`

- Type: `cellIs`
  Priority: 172
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
  Priority: 173
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
  Priority: 174
  Formula: `['LEN(TRIM(D105))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 171
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

**Rule 54** — Range: `<ConditionalFormatting K105:P105>`

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
  Priority: 169
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
  Formula: `['LEN(TRIM(K105))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 167
  Formula: `['OR(K105="Show",K105="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 55** — Range: `<ConditionalFormatting D107:J107>`

- Type: `expression`
  Priority: 162
  Formula: `['OR(D105="Hide",D105="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 166
  Formula: `['AND(D105="Show",D107="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 56** — Range: `<ConditionalFormatting K107:P107>`

- Type: `expression`
  Priority: 160
  Formula: `['OR(K105="Hide",K105="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 165
  Formula: `['AND(K105="Show",K107="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 57** — Range: `<ConditionalFormatting D106:J106>`

- Type: `expression`
  Priority: 163
  Formula: `['OR(D105="Hide",D105="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 58** — Range: `<ConditionalFormatting K106:P106>`

- Type: `expression`
  Priority: 161
  Formula: `['OR(K105="Hide",K105="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 59** — Range: `<ConditionalFormatting D112:J112>`

- Type: `cellIs`
  Priority: 157
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
  Priority: 158
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
  Formula: `['LEN(TRIM(D112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 156
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

**Rule 60** — Range: `<ConditionalFormatting K112:P112>`

- Type: `cellIs`
  Priority: 153
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
  Priority: 155
  Formula: `['LEN(TRIM(K112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 152
  Formula: `['OR(K112="Show",K112="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 61** — Range: `<ConditionalFormatting D114:J114>`

- Type: `expression`
  Priority: 147
  Formula: `['OR(D112="Hide",D112="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 151
  Formula: `['AND(D112="Show",D114="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 62** — Range: `<ConditionalFormatting K114:P114>`

- Type: `expression`
  Priority: 145
  Formula: `['OR(K112="Hide",K112="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 150
  Formula: `['AND(K112="Show",K114="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 63** — Range: `<ConditionalFormatting D113:J113>`

- Type: `expression`
  Priority: 148
  Formula: `['OR(D112="Hide",D112="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 64** — Range: `<ConditionalFormatting K113:P113>`

- Type: `expression`
  Priority: 146
  Formula: `['OR(K112="Hide",K112="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 65** — Range: `<ConditionalFormatting D119:J119>`

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
  Priority: 143
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
  Priority: 144
  Formula: `['LEN(TRIM(D119))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 141
  Formula: `['OR(D119="Show",D119="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 66** — Range: `<ConditionalFormatting K119:P119>`

- Type: `cellIs`
  Priority: 138
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
  Priority: 139
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
  Priority: 140
  Formula: `['LEN(TRIM(K119))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 137
  Formula: `['OR(K119="Show",K119="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 67** — Range: `<ConditionalFormatting D121:J121>`

- Type: `expression`
  Priority: 132
  Formula: `['OR(D119="Hide",D119="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 136
  Formula: `['AND(D119="Show",D121="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 68** — Range: `<ConditionalFormatting K121:P121>`

- Type: `expression`
  Priority: 130
  Formula: `['OR(K119="Hide",K119="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 135
  Formula: `['AND(K119="Show",K121="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 69** — Range: `<ConditionalFormatting D120:J120>`

- Type: `expression`
  Priority: 133
  Formula: `['OR(D119="Hide",D119="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 70** — Range: `<ConditionalFormatting K120:P120>`

- Type: `expression`
  Priority: 131
  Formula: `['OR(K119="Hide",K119="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 71** — Range: `<ConditionalFormatting D131:J131>`

- Type: `cellIs`
  Priority: 127
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
  Priority: 128
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
  Priority: 129
  Formula: `['LEN(TRIM(D131))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 126
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

**Rule 72** — Range: `<ConditionalFormatting K131:P131>`

- Type: `cellIs`
  Priority: 123
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
  Priority: 124
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
  Priority: 125
  Formula: `['LEN(TRIM(K131))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 122
  Formula: `['OR(K131="Show",K131="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 73** — Range: `<ConditionalFormatting D133:J133>`

- Type: `expression`
  Priority: 117
  Formula: `['OR(D131="Hide",D131="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 121
  Formula: `['AND(D131="Show",D133="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 74** — Range: `<ConditionalFormatting K133:P133>`

- Type: `expression`
  Priority: 115
  Formula: `['OR(K131="Hide",K131="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 120
  Formula: `['AND(K131="Show",K133="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 75** — Range: `<ConditionalFormatting D132:J132>`

- Type: `expression`
  Priority: 118
  Formula: `['OR(D131="Hide",D131="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 76** — Range: `<ConditionalFormatting K132:P132>`

- Type: `expression`
  Priority: 116
  Formula: `['OR(K131="Hide",K131="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 77** — Range: `<ConditionalFormatting D138:J138>`

- Type: `cellIs`
  Priority: 112
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
  Priority: 114
  Formula: `['LEN(TRIM(D138))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 111
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

**Rule 78** — Range: `<ConditionalFormatting K138:P138>`

- Type: `cellIs`
  Priority: 108
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
  Priority: 109
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
  Priority: 110
  Formula: `['LEN(TRIM(K138))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 107
  Formula: `['OR(K138="Show",K138="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 79** — Range: `<ConditionalFormatting D140:J140>`

- Type: `expression`
  Priority: 102
  Formula: `['OR(D138="Hide",D138="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 106
  Formula: `['AND(D138="Show",D140="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 80** — Range: `<ConditionalFormatting K140:P140>`

- Type: `expression`
  Priority: 100
  Formula: `['OR(K138="Hide",K138="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 105
  Formula: `['AND(K138="Show",K140="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 81** — Range: `<ConditionalFormatting D139:J139>`

- Type: `expression`
  Priority: 103
  Formula: `['OR(D138="Hide",D138="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 82** — Range: `<ConditionalFormatting K139:P139>`

- Type: `expression`
  Priority: 101
  Formula: `['OR(K138="Hide",K138="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 83** — Range: `<ConditionalFormatting D145:J145>`

- Type: `cellIs`
  Priority: 97
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
  Priority: 98
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
  Priority: 99
  Formula: `['LEN(TRIM(D145))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 96
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

**Rule 84** — Range: `<ConditionalFormatting K145:P145>`

- Type: `cellIs`
  Priority: 93
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
  Priority: 94
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
  Priority: 95
  Formula: `['LEN(TRIM(K145))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 92
  Formula: `['OR(K145="Show",K145="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 85** — Range: `<ConditionalFormatting D147:J147>`

- Type: `expression`
  Priority: 87
  Formula: `['OR(D145="Hide",D145="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 91
  Formula: `['AND(D145="Show",D147="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 86** — Range: `<ConditionalFormatting K147:P147>`

- Type: `expression`
  Priority: 85
  Formula: `['OR(K145="Hide",K145="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 90
  Formula: `['AND(K145="Show",K147="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 87** — Range: `<ConditionalFormatting D146:J146>`

- Type: `expression`
  Priority: 88
  Formula: `['OR(D145="Hide",D145="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 88** — Range: `<ConditionalFormatting K146:P146>`

- Type: `expression`
  Priority: 86
  Formula: `['OR(K145="Hide",K145="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 89** — Range: `<ConditionalFormatting D161:J161>`

- Type: `cellIs`
  Priority: 82
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
  Priority: 83
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
  Priority: 84
  Formula: `['LEN(TRIM(D161))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 81
  Formula: `['OR(D161="Show",D161="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 90** — Range: `<ConditionalFormatting K161:P161>`

- Type: `cellIs`
  Priority: 78
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
  Priority: 79
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
  Priority: 80
  Formula: `['LEN(TRIM(K161))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 77
  Formula: `['OR(K161="Show",K161="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 91** — Range: `<ConditionalFormatting D163:J163>`

- Type: `expression`
  Priority: 72
  Formula: `['OR(D161="Hide",D161="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 76
  Formula: `['AND(D161="Show",D163="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 92** — Range: `<ConditionalFormatting K163:P163>`

- Type: `expression`
  Priority: 70
  Formula: `['OR(K161="Hide",K161="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 75
  Formula: `['AND(K161="Show",K163="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 93** — Range: `<ConditionalFormatting D162:J162>`

- Type: `expression`
  Priority: 73
  Formula: `['OR(D161="Hide",D161="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 94** — Range: `<ConditionalFormatting K162:P162>`

- Type: `expression`
  Priority: 71
  Formula: `['OR(K161="Hide",K161="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 95** — Range: `<ConditionalFormatting D168:J168>`

- Type: `cellIs`
  Priority: 67
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
  Priority: 68
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
  Priority: 69
  Formula: `['LEN(TRIM(D168))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 66
  Formula: `['OR(D168="Show",D168="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 96** — Range: `<ConditionalFormatting K168:P168>`

- Type: `cellIs`
  Priority: 63
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
  Priority: 65
  Formula: `['LEN(TRIM(K168))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 62
  Formula: `['OR(K168="Show",K168="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 97** — Range: `<ConditionalFormatting D170:J170>`

- Type: `expression`
  Priority: 57
  Formula: `['OR(D168="Hide",D168="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 61
  Formula: `['AND(D168="Show",D170="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 98** — Range: `<ConditionalFormatting K170:P170>`

- Type: `expression`
  Priority: 55
  Formula: `['OR(K168="Hide",K168="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 60
  Formula: `['AND(K168="Show",K170="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 99** — Range: `<ConditionalFormatting D169:J169>`

- Type: `expression`
  Priority: 58
  Formula: `['OR(D168="Hide",D168="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 100** — Range: `<ConditionalFormatting K169:P169>`

- Type: `expression`
  Priority: 56
  Formula: `['OR(K168="Hide",K168="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 101** — Range: `<ConditionalFormatting D175:J175>`

- Type: `cellIs`
  Priority: 52
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
  Priority: 54
  Formula: `['LEN(TRIM(D175))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 51
  Formula: `['OR(D175="Show",D175="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 102** — Range: `<ConditionalFormatting K175:P175>`

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
  Priority: 49
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
  Priority: 50
  Formula: `['LEN(TRIM(K175))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 47
  Formula: `['OR(K175="Show",K175="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 103** — Range: `<ConditionalFormatting D177:J177>`

- Type: `expression`
  Priority: 42
  Formula: `['OR(D175="Hide",D175="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 46
  Formula: `['AND(D175="Show",D177="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 104** — Range: `<ConditionalFormatting K177:P177>`

- Type: `expression`
  Priority: 40
  Formula: `['OR(K175="Hide",K175="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 45
  Formula: `['AND(K175="Show",K177="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 105** — Range: `<ConditionalFormatting D176:J176>`

- Type: `expression`
  Priority: 43
  Formula: `['OR(D175="Hide",D175="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 106** — Range: `<ConditionalFormatting K176:P176>`

- Type: `expression`
  Priority: 41
  Formula: `['OR(K175="Hide",K175="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 107** — Range: `<ConditionalFormatting B60>`

- Type: `containsBlanks`
  Priority: 39
  Formula: `['LEN(TRIM(B60))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 108** — Range: `<ConditionalFormatting B67>`

- Type: `containsBlanks`
  Priority: 38
  Formula: `['LEN(TRIM(B67))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 109** — Range: `<ConditionalFormatting B79>`

- Type: `containsBlanks`
  Priority: 37
  Formula: `['LEN(TRIM(B79))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 110** — Range: `<ConditionalFormatting B86>`

- Type: `containsBlanks`
  Priority: 36
  Formula: `['LEN(TRIM(B86))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 111** — Range: `<ConditionalFormatting B93>`

- Type: `containsBlanks`
  Priority: 35
  Formula: `['LEN(TRIM(B93))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 112** — Range: `<ConditionalFormatting B105>`

- Type: `containsBlanks`
  Priority: 34
  Formula: `['LEN(TRIM(B105))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 113** — Range: `<ConditionalFormatting B112>`

- Type: `containsBlanks`
  Priority: 33
  Formula: `['LEN(TRIM(B112))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 114** — Range: `<ConditionalFormatting B119>`

- Type: `containsBlanks`
  Priority: 32
  Formula: `['LEN(TRIM(B119))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 115** — Range: `<ConditionalFormatting B131>`

- Type: `containsBlanks`
  Priority: 31
  Formula: `['LEN(TRIM(B131))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 116** — Range: `<ConditionalFormatting B138>`

- Type: `containsBlanks`
  Priority: 30
  Formula: `['LEN(TRIM(B138))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 117** — Range: `<ConditionalFormatting B145>`

- Type: `containsBlanks`
  Priority: 29
  Formula: `['LEN(TRIM(B145))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 118** — Range: `<ConditionalFormatting B161>`

- Type: `containsBlanks`
  Priority: 28
  Formula: `['LEN(TRIM(B161))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 119** — Range: `<ConditionalFormatting B168>`

- Type: `containsBlanks`
  Priority: 27
  Formula: `['LEN(TRIM(B168))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 120** — Range: `<ConditionalFormatting B175>`

- Type: `containsBlanks`
  Priority: 26
  Formula: `['LEN(TRIM(B175))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 121** — Range: `<ConditionalFormatting D34:P34>`

- Type: `containsBlanks`
  Priority: 20
  Formula: `['LEN(TRIM(D34))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 122** — Range: `<ConditionalFormatting I27:I29>`

- Type: `containsBlanks`
  Priority: 18
  Formula: `['LEN(TRIM(I27))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 123** — Range: `<ConditionalFormatting D22:J22>`

- Type: `cellIs`
  Priority: 15
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
  Priority: 16
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
  Priority: 17
  Formula: `['LEN(TRIM(D22))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 14
  Formula: `['OR(D22="Show",D22="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 124** — Range: `<ConditionalFormatting K22:P22>`

- Type: `cellIs`
  Priority: 11
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
  Priority: 12
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
  Priority: 13
  Formula: `['LEN(TRIM(K22))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

- Type: `expression`
  Priority: 10
  Formula: `['OR(K22="Show",K22="Hide")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 125** — Range: `<ConditionalFormatting D24:J24>`

- Type: `expression`
  Priority: 5
  Formula: `['OR(D22="Hide",D22="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 9
  Formula: `['AND(D22="Show",D24="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 126** — Range: `<ConditionalFormatting K24:P24>`

- Type: `expression`
  Priority: 3
  Formula: `['OR(K22="Hide",K22="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

- Type: `expression`
  Priority: 8
  Formula: `['AND(K22="Show",K24="")']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 127** — Range: `<ConditionalFormatting B22>`

- Type: `containsBlanks`
  Priority: 7
  Formula: `['LEN(TRIM(B22))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 128** — Range: `<ConditionalFormatting D23:J23>`

- Type: `expression`
  Priority: 6
  Formula: `['OR(D22="Hide",D22="Show")']`
  Border: <openpyxl.styles.borders.Border object>
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

**Rule 129** — Range: `<ConditionalFormatting K23:P23>`

- Type: `expression`
  Priority: 4
  Formula: `['OR(K22="Hide",K22="Show")']`
  Border: <openpyxl.styles.borders.Border object>
Parameters:
outline=True, diagonalUp=False, diagonalDown=False, start=None, end=None, left=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, right=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, top=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, bottom=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, diagonal=None, vertical=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None, horizontal=<openpyxl.styles.borders.Side object>
Parameters:
style=None, color=None

**Rule 130** — Range: `<ConditionalFormatting D213:P213>`

- Type: `containsBlanks`
  Priority: 2
  Formula: `['LEN(TRIM(D213))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'

**Rule 131** — Range: `<ConditionalFormatting B213>`

- Type: `containsBlanks`
  Priority: 1
  Formula: `['LEN(TRIM(B213))=0']`
  Fill: <openpyxl.styles.fills.PatternFill object>
Parameters:
patternType=None, fgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='00000000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bgColor=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFFFF00', indexed=None, auto=None, theme=None, tint=0.0, type='rgb'


### Sheet: Costing (15 rules)

**Rule 1** — Range: `<ConditionalFormatting E1>`

- Type: `cellIs`
  Priority: 33
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
  Priority: 34
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

**Rule 3** — Range: `<ConditionalFormatting F27>`

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

**Rule 4** — Range: `<ConditionalFormatting F37>`

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

**Rule 5** — Range: `<ConditionalFormatting F47>`

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

**Rule 6** — Range: `<ConditionalFormatting F70>`

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

**Rule 7** — Range: `<ConditionalFormatting F83>`

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

**Rule 8** — Range: `<ConditionalFormatting F89>`

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

**Rule 9** — Range: `<ConditionalFormatting F92>`

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

**Rule 10** — Range: `<ConditionalFormatting F26>`

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

**Rule 11** — Range: `<ConditionalFormatting F36>`

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

**Rule 12** — Range: `<ConditionalFormatting F46>`

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

**Rule 13** — Range: `<ConditionalFormatting F69>`

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

**Rule 14** — Range: `<ConditionalFormatting F82>`

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

**Rule 15** — Range: `<ConditionalFormatting F88>`

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

**Rule 1** — Range: `<ConditionalFormatting B1>`

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

**Rule 2** — Range: `<ConditionalFormatting D4:D9>`

- Type: `cellIs`
  Priority: 4
  Operator: equal
  Formula: `['"Yes"']`
  Font: color=<openpyxl.styles.colors.Color object>
Parameters:
rgb='FFFF0000', indexed=None, auto=None, theme=None, tint=0.0, type='rgb', bold=False

**Rule 3** — Range: `<ConditionalFormatting E4:E9>`

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

**Rule 4** — Range: `<ConditionalFormatting F4:F9>`

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


### Sheet: Sub Contractor Costs (3 rules)

**Rule 1** — Range: `<ConditionalFormatting D11:D15>`

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

**Rule 2** — Range: `<ConditionalFormatting G11:G15>`

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

**Rule 3** — Range: `<ConditionalFormatting G17>`

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

**Rows:** 18  |  **Cols:** 8

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
R12: [B2]==B11+1 | [C3]=='Customer Summary'!C5 | [D4]==Costing!V46 | [G7]==Costing!O46
R13: [B2]==B12+1 | [C3]=='Customer Summary'!C6 | [D4]==Costing!V69 | [G7]==Costing!O69
R14: [B2]==B13+1 | [C3]=='Customer Summary'!C7 | [D4]==Costing!V82 | [G7]==Costing!O82
R15: [B2]==B14+1 | [C3]=='Customer Summary'!C8 | [D4]==Costing!V88 | [G7]==Costing!O88
R17: [C3]=Total | [D4]==SUM(D11:D16) | [G7]==SUM(G11:G16)
```

### Sheet: Sub Contractor Mats

**Rows:** 51  |  **Cols:** 9

```
R1: [B2]=Sub Contractor Materials
R3: [B2]=tbc
```

### Sheet: Changes

**Rows:** 27  |  **Cols:** 4

```
R1: [A1]=Date | [B2]=Version From | [C3]=Version To | [D4]=Change
R2: [A1]=2024-04-12 00:00:00 | [B2]=11 | [C3]=12 | [D4]=Added stripping wall paper to costing.
R3: [A1]=2024-04-12 00:00:00 | [B2]=11 | [C3]=12 | [D4]=Added Sub Contractor 'clarity' section on costing sheet - Vat registered and non vat registered
R4: [A1]=2024-04-12 00:00:00 | [B2]=11 | [C3]=12 | [D4]=Changed the refitting of ancilliaries (refit sockets, radiator and skirting boards) to be costed in chunks of 3 hours (approx half day).  E.g. If the total calculated hours equaled 2 hours then this w…
R5: [A1]=2024-04-12 00:00:00 | [B2]=11 | [C3]=12 | [D4]=Add VBA to updated the file name (date) on each click as the file names only changed on open so if clicking multiple times it was trying to save the same file again which is confusing)
R6: [A1]=2024-05-28 00:00:00 | [B2]=12 | [C3]=13 | [D4]=Added deposit value ex vat and inc vat for card readers.
R7: [A1]=2024-06-18 00:00:00 | [B2]=13 | [C3]=14 | [D4]=Costing: Added in percentage adjuster to sections.↵Costing: Added in questions and conditional logic for skirting boards refit.
R8: [A1]=2024-09-05 00:00:00 | [B2]=15 | [C3]=15 | [D4]=Removed the Office comments section at the bottom of the report as it is hiiden when the filter is applied so this is replaced with an 'Office Notes' tab.
R9: [A1]=2024-09-11 00:00:00 | [B2]=15 | [C3]=16 | [D4]=Added Sub Contractor Costs and Sub Contractor Mats Tabs
R10: [A1]=2024-09-30 00:00:00 | [B2]=16 | [C3]=17 | [D4]=Changed wording on Projects Specific Overheads to make it look more generic and to cover more areas and removed the vehicle costs statement.↵Added the On Site Approval Form Tab.
R11: [A1]=2024-11-04 00:00:00 | [B2]=17 | [C3]=18 | [D4]=Updated material pricing on:↵Plasterboards & Skimming.↵Updated hourly rate from £30.00 to £30.63 to cover the Employers NI increase.
R12: [A1]=2024-12-20 00:00:00 | [B2]=18 | [C3]=19 | [D4]=Updated Contractor cost sheet with hours.↵Amalgamated the strip out costs to one line.↵Allowed the editing of the customer summary lines for the surveyors including being able to set something as opti…
R13: [A1]=2024-12-20 00:00:00 | [B2]=18 | [C3]=19 | [D4]=Added extra line in on costing for CM3 20 metre rolls
R14: [A1]=2024-12-20 00:00:00 | [B2]=18 | [C3]=19 | [D4]=Updated the wording etc on the 'Overheads' sections to only show as Lab and Mats and added the description field to the csv upload as the wording was being cut off in the title.
R15: [A1]=2025-01-27 00:00:00 | [B2]=19 | [C3]=20 | [D4]=Added Estimate Coversheet Selections To Cost Sheet.
R16: [A1]=2025-02-10 00:00:00 | [B2]=20 | [C3]=21 | [D4]=Added more coversheet images
R17: [A1]=2025-06-06 00:00:00 | [B2]=21 | [C3]=22 | [D4]=Project Specifics Overhead description amended on csv upload for change to CF estimate to make it clear that the overheads may contain all or some of the items mentioned.↵Added floor insulation line a…
R18: [A1]=2025-09-26 00:00:00 | [B2]=22 | [C3]=23 | [D4]=Added line for engineered flooring
R19: [A1]=2025-10-02 00:00:00 | [B2]=23 | [C3]=24 | [D4]="Fixed margin value column on csv import for beta estimates.↵Applied filter to costing sheet for the headers."
R20: [A1]=2025-11-13 00:00:00 | [B2]=24 | [C3]=25 | [D4]=Updated master password.
R21: [A1]=2026-01-22 00:00:00 | [B2]=25 | [C3]=26 | [D4]=Updated pricing on the flooring labour as we have been undercharging.
```
