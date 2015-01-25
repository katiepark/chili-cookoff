$(function(){
	var rubricSub = {
		init: function(){
			this.events();
		},
		events: function(){
			var self = this;

			$('.js-dropdown').on('change', function(){
				var value = $(this).find('option:selected').val(),
					$rubric = $('.chili-rubric[data-chili="' + value + '"]');

				if (value !== 'null'){
					self.showRubric($rubric);
				} else {
					self.hideRubric($('.chili-rubric'));
				}
			});

			$('.js-radio-fieldset').on('change', function(){
				var value = $('.js-dropdown').find('option:selected').val(),
					$rubric = $('.chili-rubric[data-chili="' + value + '"]');

				allChecked = self.countChecked($rubric.find('input[type="radio"]:checked'), $rubric.find('.js-radio-fieldset').length);

				if (allChecked){
					$rubric.removeClass('js-disabled')
				}
			});

			$(".chili-rubric").submit(function(e) {
				if (!$(this).hasClass('js-disabled')){
					var submission = self.getRatings($(this));
					self.submitEntry(submission, $(this));					
				}
				e.preventDefault();				
			});
		},
		countChecked: function(els, count){
			return els.length === count
		},
		hideRubric: function(el){
			el.addClass('hidden');
		},
		showRubric: function(el){
			el.removeClass('hidden').siblings('.chili-rubric').addClass('hidden');
		},
		getRatings: function(form){
			var $chili = form.attr('data-chili'),
				chili_id = form.attr('data-id');
			var d = {
				id: chili_id,
				dishname : $chili
			};

			$.each(form.find('.js-radio-fieldset'), function(index, criterion){
				var $checked = $(criterion).find('input:checked'),
					cat = $checked.attr('name'),
					val = $checked.val();

				d[cat] = val;
			});

			return d;

		},
		submitEntry: function(data, form){
			console.log("====== TODO: submit =====");
			console.log(data);

			this.freezeForm(form);
		},
		freezeForm: function(form){
			form.find('input[type="radio"]').prop('disabled', true);
			form.find('button[type="submit"]').prop('disabled',true);
			form.addClass('js-submitted js-disabled');
		}
	}

	rubricSub.init();
});