class CategorySelection extends BaseMenu {
  constructor(stage, width, height, categories, onCategorySelect) {
    super(stage, width, height, "Category selection");
    var self = this;

    var row = 0;
    for (var i = 0; i < categories.length; i++) {
      var category = categories[i];

      var x = (i - row * this.maxElements) * this.elementDimension + this.elementXOffset;
      var y = row * this.elementDimension + this.topOffset;
      var txt = this._text(category.label, "bold 20px Arial", x, y, {color: '#FFAA00', cursor: 'pointer'});

      txt.categoryId = category._id;
      txt.hitArea = this._hitArea(0, 0, 40, 40);

      txt.addEventListener('mouseover', function (evt) {
        self._mouseOver(evt, stage);
      });
      txt.addEventListener('mouseout', function (evt) {
        self._mouseOut(evt, stage);
      });
      txt.addEventListener('click', function (evt) {
        onCategorySelect(evt.target.categoryId);
      });
      stage.addChild(txt);
      if ((i + 1) % this.maxElements === 0) {
        row++;
      }
    }
    stage.update()
  }
}
