$("#save").click(function () {
    if (valueCheck() == true) {
        save();
    }
});

$("#box").change(function () {
    duplicateCheck();
});

$("#block").change(function () {
    duplicateCheck();
});

$("#number").change(function () {
    duplicateCheck();
});

$("#searchBtn").click(function () {
    var search = $('#searchText').val();
    $.ajax({
        url: "/ajax/item/"+search,
        dataType: "json",
        type: "get",
        success: function (data) {
            if (data['result'] == true) {
                $("#searchTable tbody").remove();
                $.each(data['rows'], function(key, value){
                    var eachrow = '<tr>'
                        + '<th scope="row">' + value.id + '</td>'
                        + '<td>' + value.box + '</td>'
                        + '<td>' + value.block + '</td>'
                        + '<td>' + value.number + '</td>'
                        + '<td>' + value.title + '</td>'
                        + '</tr>';
                $("#searchTable").append(eachrow);
                });            
            }
        },
        error: function (request, status, error) {
            alert("Error");
        }
    });
});

function save() {
    var obj = new Object();
    obj.title = $('#title').val();
    obj.box = $('#box').val();
    obj.block = $('#block').val();
    obj.number = $('#number').val();
    $.ajax({
        url: "/ajax/item",
        dataType: "json",
        type: "POST",
        data: obj,
        success: function (data) {
            if (data['result'] == true) {
                $('#new').modal('toggle');
                alert("추가 되었습니다.");
            }
        },
        error: function (request, status, error) {
            alert("추가 실패 되었습니다.");
        }
    });
}

function duplicateCheck() {
    if ($('#number').val() == '선택') {
        duplicateChange('false')
    } else {
        var box = $('#box').val();
        var block = $('#block').val();
        var number = $('#number').val();
        $.ajax({
            url: "/ajax/item/"+box+"/"+block+"/"+number,
            dataType: "json",
            type: "get",
            success: function (data) {
                if (data['result'] == true) {
                    duplicateChange('true');
                } else if(data['result'] == false){
                    duplicateChange('false');
                }
            },
            error: function (request, status, error) {
                duplicateChange('false');
            }
        });
    }
}

function duplicateChange(value) {
    if (value == 'true') {
        $('#title').prop("disabled", false);
        $('#check').text('true');
    } else {
        $('#title').prop("disabled", true);
        $('#check').text('false');
    }
}

function valueCheck() {
    if ($('#check').text() == 'true') {
        if ($('#title').val() == '') {
            alert('확인해주세요(Title)');
        } else {
            return true;
        }
    } else {
        alert('확인해주세요');
        return false;
    }
}
function newModalReset() {
    duplicateChange('false')
    $('#title').val("");
    $('#box option').attr('selected', false);
    $('#block option').attr('selected', false);
    $('#number option').attr('selected', false);
}
function searchModalReset() {
    $('#searchText').val("");
    $("#searchTable tbody").remove();
}