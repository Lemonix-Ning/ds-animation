有。不需要 AI，但需要换一个根本思路。

**核心问题**：你现在是试图把"带 frames 的 JS"翻译成其他语言，这条路走不通。正确的做法是**反过来**——每个算法单独维护一份"纯算法模板"，展示代码从模板生成，不从帧函数翻译。具体来说，每个算法文件从现在的一份 JS，变成这个结构：

```ts
// src/core/algorithms/sorting.ts  （现有，不动）
export function bubbleSort(arr) { ... frames.push ... }

// src/core/algorithms/templates/bubbleSort.ts  （新增）
export const bubbleSortTemplates = {
  cpp: `void bubbleSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-1-i; j++) {
      if (arr[j] > arr[j+1]) { // [frame:compare]
        swap(arr[j], arr[j+1]); // [frame:swap]
      }
    } // [frame:sorted]
  }
}`,

  java: `void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-1-i; j++) {
      if (arr[j] > arr[j+1]) { // [frame:compare]
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp; // [frame:swap]
      }
    } // [frame:sorted]
  }
}`,

  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(n-1-i):
            if arr[j] > arr[j+1]:  # [frame:compare]
                arr[j], arr[j+1] = arr[j+1], arr[j]  # [frame:swap]
        # [frame:sorted]`,

  csharp: `void BubbleSort(int[] arr) {
  int n = arr.Length;
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-1-i; j++) {
      if (arr[j] > arr[j+1]) { // [frame:compare]
        (arr[j], arr[j+1]) = (arr[j+1], arr[j]); // [frame:swap]
      }
    } // [frame:sorted]
  }
}`
}
```

注释 `// [frame:compare]` 就是高亮锚点，`LocalPatchEngine` 通过它找到对应的 JS 行做 patch，完全本地，零 AI。

---

## 工作量评估

你现在有多少个算法？每个算法写 4 种语言模板，冒泡排序这个量级大概 10 分钟一个。20 个算法 × 4 种语言，认真写大概 2 天，但这 2 天写出来的是**真正的该语言代码**，质量远超任何自动翻译。

而且这个工作量只做一次，后续加新算法同步写模板就行，维护成本极低。

---

## 和你现有架构的接入点

`LocalTranslator.ts` 的切换逻辑改成一行：

```ts
// 改前：调规则引擎翻译
const display = translateAlgorithmLocal(jsSource, language)

// 改后：直接读模板
const display = getTemplate(algorithmName, language)
//              ↑ 就是从 bubbleSortTemplates[language] 这样读
```

其他所有东西——缓存、`LocalPatchEngine`、`AiStatusBar`、播放联动——全部不动。

这个方案没有 AI 依赖、零网络请求、代码质量最高、可维护性最强。唯一的代价是要手写模板，但这个代价完全值得，因为你写的每一行 C++ 都是真正的 C++。