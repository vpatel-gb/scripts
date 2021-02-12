var VPUtils = {
  UI: {},
};

// UI functions
VPUtils.UI.setFormField = async (selector, value, isDropDown = false) => {
  console.log('looking for ' + selector);
  return new Promise((resolve, reject) => {
    if (isDropDown) {
      var interval = window.setInterval(() => {
        if ($(selector).find(`option[value="${value}"]`).length) {
          $(selector).val(value).change();
          window.clearInterval(interval);
          resolve();
        }
      }, 1000);
    } else {
      $(selector).val(value);
      resolve();
    }
  });
};

VPUtils.UI.showBadge = (text, top = '5px', left = -1, keepRecreating = false) => {
  var div = document.createElement('DIV');
  div.id = 'vp_badge';
  div.style = `top: ${top};left: ${left};position: fixed;font-weight: bolder; color: red;background-color: antiquewhite;border-radius: 30px;z-index: 99;border: 1px solid gray;box-shadow: blue 0px 0px 24px;font-size: 34px !important;padding: 15px 10px !important;`;
  div.innerHTML = text;
  document.body.appendChild(div);

  // adjust center position according to width of the DIV
  if (left === -1) {
    const newWidth = $(document).width() / 2 - ($('#vp_badge').width() / 2);
    $('#vp_badge').css({ left: newWidth });
  }

  if (keepRecreating) {
    // re-create badge
    window.setTimeout(() => { $('#vp_badge').remove(); VPUtils.UI.showBadge(text, top, left); }, 5000);
  }
};

VPUtils.UI.highlightText = (selector, text, bgColor = 'lime') => {
  const html = $(selector).html();
  $(selector).html(html.replace(/hello/ig, `<span style="font-weight: bolder; color: black; background-color: ${bgColor};">${text}</span>`));
}

// Common functions
VPUtils.wait = async (milliseconds) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, milliseconds);
  });
};

$(document).ready(function () {
  window.VPUtils = VPUtils;
  console.log('Loaded VPUtils: ', window.VPUtils);
});
