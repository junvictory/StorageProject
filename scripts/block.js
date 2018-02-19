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
$('#delete').click(function(){
    if(confirm("삭제 하시겠습니까?")) {
        $.ajax({
            url: "/ajax/item/"+$('#id').val(),
            dataType: "json",
            type: "delete",
            success: function (data) {
                if (data['result'] == true) {
                    alert("삭제 되었습니다.");
                    $('#modi').modal('toggle');
                    location.reload();
                }else if(data['result'] == false){
                    alert('삭제 불가');
                }
            },
            error: function (request, status, error) {
                alert("ERROR");
            }
        });
    }
        
});

function getValue(id){
    $('#id').val(id); 
    $.ajax({
        url: "/ajax/item/id/"+id,
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data['result'] == true) {
                // alert(data['rows'][0].block);
                $('#ori_box').val(data['rows'][0].box);
                $('#ori_block').val(data['rows'][0].block);
                $('#ori_number').val(data['rows'][0].number);
                $('#ori_title').val(data['rows'][0].title);

                $('#box').val(data['rows'][0].box);
                $('#block').val(data['rows'][0].block);
                $('#number').val(data['rows'][0].number);
                $('#title').val(data['rows'][0].title);
                duplicateChange('true');

            }
        },
        error: function (request, status, error) {
            duplicateChange('false');
        }
    }); 
}

function save() {
    var obj = new Object();
    obj.title = $('#title').val();
    obj.box = $('#box').val();
    obj.block = $('#block').val();
    obj.number = $('#number').val();
    $.ajax({
        url: "/ajax/item/"+$('#id').val(),
        dataType: "json",
        type: "PUT",
        data: obj,
        success: function (data) {
            if (data['result'] == true) {
                $('#modi').modal('toggle');
                location.reload();
                alert("수정 되었습니다.");
            }
        },
        error: function (request, status, error) {
            alert("수정 실패 되었습니다.");
        }
    });
}
function duplicateChange(value) {
    if (value == 'true') {
        $('#title').prop("disabled", false);
        $('#check').text('true');
    } else if(value == 'false') {
        $('#title').prop("disabled", true);
        $('#check').text('false');
    }
}

function duplicateCheck() {
    var ori_box = $('#ori_box').val();
    var ori_block = $('#ori_block').val();
    var ori_number = $('#ori_number').val();    

    if ($('#number').val() == '선택') {
        duplicateChange('false')
    } else {
        var box = $('#box').val();
        var block = $('#block').val();
        var number = $('#number').val();

        if((ori_box == box)&&(ori_block == block)&&(ori_number == number)){
            duplicateChange('true');
        }else{
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
function modiModalReset() {
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