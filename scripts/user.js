$("#save").click(function () {
    if (valueCheck() == true) {
        save();
    }
});

$("#duplicate").click(function () {
    var name = $('#name').val();
    if (name.length > 5) {
        duplicateCheck();
    } else {
        alert("6글자 이상 되게 해주세요 ")
    }
});

function save() {
    var obj = new Object();
    obj.name = $('#name').val();
    obj.password = $('#password').val();
    obj.description = $('#description').val();
    obj.authority = $('#authority').val();
    $.ajax({
        url: "/ajax/user",
        dataType: "json",
        type: "POST",
        data: obj,
        success: function (data) {
            if (data['result'] == true) {
                $('#newUser').modal('toggle');
                location.reload();
                alert("추가 되었습니다.");
            }
        },
        error: function (request, status, error) {
            alert("추가 실패 되었습니다.");
        }
    });
}

function duplicateCheck() {
    if ($('#name').val() == '') {
        alert('Name 을 입력해 주세요')
    } else {
        var name = $('#name').val();
        $.ajax({
            url: "/ajax/user_du/" + name,
            dataType: "json",
            type: "get",
            success: function (data) {
                if (data['result'] == true) {
                    duplicateChange('true');
                } else if (data['result'] == false) {
                    alert('동일한 이름이 존재합니다')
                }
            },
            error: function (request, status, error) {
                alert('Error')
            }
        });
    }
}

function userdelete(id) {
    if (confirm("삭제 하시겠습니까?")) {
        $.ajax({
            url: "/ajax/user/" + id,
            dataType: "json",
            type: "delete",
            success: function (data) {
                if (data['result'] == true) {
                    alert("삭제 되었습니다.");
                    location.reload();
                } else if (data['result'] == false) {
                    alert('삭제 불가');
                }
            },
            error: function (request, status, error) {
                alert("ERROR");
            }
        });
    }
}
function duplicateChange(value) {
    if (value == 'false') {
        $('#name').prop("disabled", false);
        $('#check').text('false');
    } else {
        $('#name').prop("disabled", true);
        $('#check').text('true');
    }
}

function valueCheck() {
    if ($('#check').text() == 'true') {
        var password = $('#password').val();
        var description = $('#description').val();
        if (password.length > 5 && description.length > 2) {
            return true;
        } else {
            alert("확인해 주세요")
            return false;
        }
    } else {
        alert('확인해주세요');
        return false;
    }
}
function userModalReset() {
    duplicateChange('false')
    $('#name').val("");
    $('#password').val("");
    $('#description').val("");
    $('#authority').attr('selected', false);

}
