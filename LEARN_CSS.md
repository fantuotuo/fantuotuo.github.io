###display:flex
- 说明：弹性布局，分为父容器和项目，项目的float、clear、vertical-align失效
- 父容器属性
    + flex-direction：项目排列方向（row，column）
    + flex-wrap：是否换行（nowrap，wrap）
    + flex-flow：flex-direction和flex-wrap的合成
    + justify-content：在主轴上的排列（center，flex-start，flex-end）
    + align-items：在交叉轴上的排列方式（flex-start，center，flex-end）
    + align-content：多根轴线的对齐方式（flex-start，center，flex-end）
- 项目属性
    + order：排列顺序
    + flex-grow：放大比例（如果有剩余空间）0
    + flex-shrink：缩小比例（如果空间不足）1（收缩至此项目的最小尺寸，也就是其子元素的尺寸+padding等，此项目在主轴上的尺寸设置无效-width或height）
    + flex-basis：本来大小（auto）
    + flex：前者三个的缩写
    + align-self：覆盖父容器的align-items属性

###vertical-align
- （行内元素）基线的对齐方式
- 基线
    + img：margin底部
    + inline：文字的底部
    + inline-block：
        * overflow:hidden：margin底部
        * 其它：文字底部
