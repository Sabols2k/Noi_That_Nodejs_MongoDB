
function update() {
    return (
        $(".update-btn").click(function () {
            var id = $(this).attr("data-id")
            var email = $("." + id + "_email").html()
            var level = $("." + id + "_level").html()
            $(".update-form input[name=email]").val(email)
            $(".getId").html(id)
            alert("aaaaa");
            if (level == 0) {
                $(".update-option1").prop("selected", "selected")
            } else {
                $(".update-option2").prop("selected", "selected")
            }
        })
    )
}

$(".update-form").submit(function (e) {
    e.preventDefault()
    const formData = {
        id: $('.getId').html(),
        // email: $('.update-form input[name=email]').val(),
        level: $('#select2 option:selected').val(),
    }
    const id = $(".getId").html()
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/adminuser/${id}`,
        data: JSON.stringify(formData),
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        $("." + res.data._id + "_level").html(formData.level)
        $('#modalEdit').click()
    })

})