/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var connectStr = "90938150|-31949272994520502|90955131";
var dbname = "SCHOOL-DB";
var relationname = "STUDENT-TABLE";
var url = "http://api.login2explore.com:5577";
var iml = "/api/iml";
var irl = "/api/irl";

function rollfunction() {

    $("#fullname").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#birthdate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollmentdate").prop("disabled", false);
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    
    var jsonStr = JSON.stringify({
        Rollno: $("#rollno").val()
    });

    var getRequest = createGET_BY_KEYRequest(connectStr, dbname, relationname,
            jsonStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest,
            url, irl);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#change").prop("disabled", true);
        $("#fullname").focus();
    } 
    else if (resultObj.status === 200) {

        $("#rollno").prop("disabled", true);
        
        fillData(resultObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#fullname").focus();
    }
}

function savetolocale(jsonObj) {

    var ldata = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', ldata.rec_no);

}

function fillData(jsonObj) {
    
    savetolocale(jsonObj);

    var data = JSON.parse(jsonObj.data).record;

    $("#fullname").val(data.FullName);
    $("#class").val(data.Class);
    $("#birthdate").val(data.BirthDate);
    $("#address").val(data.Address);
    $("#enrollmentdate").val(data.EnrollmentDate);
}

function resetForm() {
    
    $("#rollno").val("").focus();
    $("#fullname").val("");
    $("#class").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrollmentdate").val("");
    $("#rollno").prop("disabled", false);
    $("#fullname").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#birthdate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentdate").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);

}
function validateAndGetFormData() {
    
    var rollno = $("#rollno").val();
    if (rollno === "") {
        alert("Roll No Required ");
        $("#rollno").focus();
        return "";
    }
    
    var fullname = $("#fullname").val();
    if (fullname === "") {
        alert("Full Name is Required ");
        $("#fullname").focus();
        return "";
    }
    
    var Class = $("#class").val();
    if (Class === "") {
        alert("Class is Required ");
        $("#class").focus();
        return "";
    }
    
    var birthdate = $("#birthdate").val();
    if (birthdate === "") {
        alert("Birth Date is Required ");
        $("#birthdate").focus();
        return "";
    }
    
    var address = $("#address").val();
    if (address === "") {
        alert("Address is Required ");
        $("#address").focus();
        return "";
    }
    
    var enrollmentdate = $("#enrollmentdate").val();
    if (enrollmentdate === "") {
        alert("Enrollment Date is Required ");
        $("#enrollmentdate").focus();
        return "";
    }
    
    var jsonStrObj = {
        Rollno: rollno,
        FullName: fullname,
        Class: Class,
        BirthDate: birthdate,
        Address: address,
        EnrollmentDate: enrollmentdate

    };
    
    return JSON.stringify(jsonStrObj);
}

// This method is used to create PUT Json request.

function saveEmployee() {
    
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connectStr,
            jsonStr, dbname, relationname);
    jQuery.ajaxSetup({async: false});
   executeCommandAtGivenBaseUrl(putReqStr,
            url, iml);
    jQuery.ajaxSetup({async: true});
    resetForm();
}

function changeData() {
    $('#change').prop("disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connectStr,
            jsonChg, dbname, relationname, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
 executeCommandAtGivenBaseUrl(updateRequest,
            url, iml);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}