import {
  graphAlgorithmCode,
  linearAlgorithmCode,
  searchAlgorithmCode,
  sortingAlgorithmCode,
  stackQueueAlgorithmCode,
  stringAlgorithmCode,
  treeAlgorithmCode
} from '../algorithmCode'
import type { AlgorithmCode } from '../algorithmCode'
import type { Language } from './types'

type NonJsLanguage = Exclude<Language, 'js'>

function buildJsTemplateMap(): Record<string, string> {
  const allGroups: Array<Record<string, AlgorithmCode>> = [
    linearAlgorithmCode,
    sortingAlgorithmCode,
    searchAlgorithmCode,
    stackQueueAlgorithmCode,
    stringAlgorithmCode,
    treeAlgorithmCode,
    graphAlgorithmCode
  ]

  const result: Record<string, string> = {}

  allGroups.forEach((group) => {
    Object.entries(group).forEach(([key, item]) => {
      if (!result[key]) {
        result[key] = item.code
      }
    })
  })

  return result
}

const jsTemplateMap = buildJsTemplateMap()

const explicitTemplateMap: Record<string, Partial<Record<NonJsLanguage, string>>> = {
  kmp: {
    cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int kmpSearch(const string& text, const string& pattern) {
  if (pattern.empty()) return 0;
  vector<int> next(pattern.size(), 0);
  for (int i = 1, j = 0; i < (int)pattern.size();) {
    if (pattern[i] == pattern[j]) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < (int)text.size();) {
    if (text[i] == pattern[j]) { i++; j++; } // [帧:匹配]
    if (j == (int)pattern.size()) return i - j; // [帧:完成]
    if (i < (int)text.size() && text[i] != pattern[j]) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

int main() {
  string text = "ababcabcacbab";
  string pattern = "abcac";
  cout << kmpSearch(text, pattern) << endl;
  return 0;
}`,
    java: `public class KmpDemo {
  static int kmpSearch(String text, String pattern) {
  if (pattern.isEmpty()) return 0;
  int[] next = new int[pattern.length()];
  for (int i = 1, j = 0; i < pattern.length();) {
    if (pattern.charAt(i) == pattern.charAt(j)) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < text.length();) {
    if (text.charAt(i) == pattern.charAt(j)) { i++; j++; } // [帧:匹配]
    if (j == pattern.length()) return i - j; // [帧:完成]
    if (i < text.length() && text.charAt(i) != pattern.charAt(j)) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

  public static void main(String[] args) {
    String text = "ababcabcacbab";
    String pattern = "abcac";
    System.out.println(kmpSearch(text, pattern));
  }
}`,
    python: `def kmp_search(text, pattern):
    if not pattern:
        return 0
    next_arr = [0] * len(pattern)
    i, j = 1, 0
    while i < len(pattern):
        if pattern[i] == pattern[j]:
            j += 1
            next_arr[i] = j
            i += 1
        elif j > 0:
            j = next_arr[j - 1]
        else:
            i += 1
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:  # [帧:匹配]
            i += 1
            j += 1
        if j == len(pattern):
            return i - j  # [帧:完成]
        if i < len(text) and text[i] != pattern[j]:
            if j > 0:
                j = next_arr[j - 1]  # [帧:移位]
            else:
                i += 1  # [帧:失配]
        return -1  # [帧:完成]


      if __name__ == "__main__":
        text = "ababcabcacbab"
        pattern = "abcac"
        print(kmp_search(text, pattern))`,
        csharp: `using System;

      public class KmpDemo {
        static int KmpSearch(string text, string pattern) {
  if (string.IsNullOrEmpty(pattern)) return 0;
  int[] next = new int[pattern.Length];
  for (int i = 1, j = 0; i < pattern.Length;) {
    if (pattern[i] == pattern[j]) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < text.Length;) {
    if (text[i] == pattern[j]) { i++; j++; } // [帧:匹配]
    if (j == pattern.Length) return i - j; // [帧:完成]
    if (i < text.Length && text[i] != pattern[j]) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

  public static void Main(string[] args) {
    string text = "ababcabcacbab";
    string pattern = "abcac";
    Console.WriteLine(KmpSearch(text, pattern));
  }
}`
  },
  bruteForce: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int bruteForceSearch(const string& text, const string& pattern) {
  if (pattern.empty()) return 0;
  for (int i = 0; i <= (int)text.size() - (int)pattern.size(); i++) {
    int j = 0;
    while (j < (int)pattern.size() && text[i + j] == pattern[j]) j++; // [帧:比较]
    if (j == (int)pattern.size()) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

int main() {
  string text = "ababcabcacbab";
  string pattern = "abcac";
  cout << bruteForceSearch(text, pattern) << endl;
  return 0;
}`,
    java: `public class BruteForceSearchDemo {
  static int bruteForceSearch(String text, String pattern) {
  if (pattern.isEmpty()) return 0;
  for (int i = 0; i <= text.length() - pattern.length(); i++) {
    int j = 0;
    while (j < pattern.length() && text.charAt(i + j) == pattern.charAt(j)) j++; // [帧:比较]
    if (j == pattern.length()) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

  public static void main(String[] args) {
    String text = "ababcabcacbab";
    String pattern = "abcac";
    System.out.println(bruteForceSearch(text, pattern));
  }
}`,
    python: `def brute_force_search(text, pattern):
    if not pattern:
        return 0
    for i in range(len(text) - len(pattern) + 1):
        j = 0
        while j < len(pattern) and text[i + j] == pattern[j]:  # [帧:比较]
            j += 1
        if j == len(pattern):
            return i  # [帧:完成]
      return -1  # [帧:完成]


    if __name__ == "__main__":
      text = "ababcabcacbab"
      pattern = "abcac"
      print(brute_force_search(text, pattern))`,
      csharp: `using System;

    public class BruteForceSearchDemo {
      static int BruteForceSearch(string text, string pattern) {
  if (string.IsNullOrEmpty(pattern)) return 0;
  for (int i = 0; i <= text.Length - pattern.Length; i++) {
    int j = 0;
    while (j < pattern.Length && text[i + j] == pattern[j]) j++; // [帧:比较]
    if (j == pattern.Length) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

  public static void Main(string[] args) {
    string text = "ababcabcacbab";
    string pattern = "abcac";
    Console.WriteLine(BruteForceSearch(text, pattern));
  }
}`
  },
  sequential: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int sequentialSearch(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++) {
    if (arr[i] == target) return i; // [帧:比较]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {12, 7, 19, 3, 25, 8};
  int target = 25;
  int index = sequentialSearch(arr, target);
  cout << "数组: [12, 7, 19, 3, 25, 8]" << endl;
  cout << "目标值: " << target << endl;
  cout << (index >= 0 ? "找到下标: " + to_string(index) : "未找到") << endl;
  return 0;
}`,
    java: `import java.util.Arrays;

public class SequentialSearchDemo {
  static int sequentialSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {12, 7, 19, 3, 25, 8};
    int target = 25;
    int index = sequentialSearch(arr, target);
    System.out.println("数组: " + Arrays.toString(arr));
    System.out.println("目标值: " + target);
    System.out.println(index >= 0 ? "找到下标: " + index : "未找到");
  }
}`,
    python: `def sequential_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i  # [帧:比较]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [12, 7, 19, 3, 25, 8]
    target = 25
    idx = sequential_search(arr, target)
    print("数组:", arr)
    print("目标值:", target)
    print(f"找到下标: {idx}" if idx >= 0 else "未找到")`,
    csharp: `using System;

public class SequentialSearchDemo {
  static int SequentialSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {12, 7, 19, 3, 25, 8};
    int target = 25;
    int index = SequentialSearch(arr, target);
    Console.WriteLine("数组: [" + string.Join(", ", arr) + "]");
    Console.WriteLine("目标值: " + target);
    Console.WriteLine(index >= 0 ? "找到下标: " + index : "未找到");
  }
}`
  },
  binary: {
    cpp: `#include <algorithm>
#include <iostream>
#include <stdexcept>
#include <vector>

using namespace std;

bool isNonDecreasing(const vector<int>& arr) {
  return adjacent_find(arr.begin(), arr.end(), greater<int>()) == arr.end();
}

int binarySearchIterative(const vector<int>& arr, int target) {
  int left = 0;
  int right = static_cast<int>(arr.size()) - 1;

  while (left <= right) {
    int mid = left + (right - left) / 2; // [帧:中点]

    if (arr[mid] == target) {
      return mid; // [帧:比较]
    }

    if (arr[mid] < target) {
      left = mid + 1; // [帧:右移]
    } else {
      right = mid - 1; // [帧:左移]
    }
  }

  return -1; // [帧:完成]
}

int binarySearchRecursive(const vector<int>& arr, int target, int left, int right) {
  if (left > right) return -1;

  int mid = left + (right - left) / 2;
  if (arr[mid] == target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

void printArray(const vector<int>& arr) {
  cout << "[";
  for (size_t i = 0; i < arr.size(); ++i) {
    cout << arr[i] << (i + 1 == arr.size() ? "" : ", ");
  }
  cout << "]" << endl;
}

int main() {
  try {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;

    if (!isNonDecreasing(arr)) {
      throw invalid_argument("二分查找要求数组为非递减有序。");
    }

    cout << "数组: ";
    printArray(arr);
    cout << "目标值: " << target << endl;

    int iterativeIndex = binarySearchIterative(arr, target);
    int recursiveIndex = binarySearchRecursive(arr, target, 0, static_cast<int>(arr.size()) - 1);
    // 期望一致结果：target=23 时下标为 5

    if (iterativeIndex != -1) {
      cout << "迭代版本结果: 在下标 " << iterativeIndex << " 找到" << endl;
    } else {
      cout << "迭代版本结果: 未找到" << endl;
    }

    if (recursiveIndex != -1) {
      cout << "递归版本结果: 在下标 " << recursiveIndex << " 找到" << endl;
    } else {
      cout << "递归版本结果: 未找到" << endl;
    }

    return 0;
  } catch (const exception& ex) {
    cerr << "错误: " << ex.what() << endl;
    return 1;
  }
}`,
    java: `import java.util.Arrays;

public class BinarySearchDemo {
  static boolean isNonDecreasing(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  static int binarySearchIterative(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2; // [帧:中点]
      if (arr[mid] == target) return mid; // [帧:比较]
      if (arr[mid] < target) left = mid + 1; // [帧:右移]
      else right = mid - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  static int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
  }

  public static void main(String[] args) {
    try {
      int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
      int target = 23;

      if (!isNonDecreasing(arr)) {
        throw new IllegalArgumentException("二分查找要求数组为非递减有序。");
      }

      System.out.println("数组: " + Arrays.toString(arr));
      System.out.println("目标值: " + target);

      int iterativeIndex = binarySearchIterative(arr, target);
      int recursiveIndex = binarySearchRecursive(arr, target, 0, arr.length - 1);
      // 期望一致结果：target=23 时下标为 5

      System.out.println(iterativeIndex != -1
          ? "迭代版本结果: 在下标 " + iterativeIndex + " 找到"
          : "迭代版本结果: 未找到");

      System.out.println(recursiveIndex != -1
          ? "递归版本结果: 在下标 " + recursiveIndex + " 找到"
          : "递归版本结果: 未找到");
    } catch (Exception ex) {
      System.out.println("错误: " + ex.getMessage());
    }
  }
}`,
    python: `def is_non_decreasing(arr):
    return all(arr[i] >= arr[i - 1] for i in range(1, len(arr)))


def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2  # [帧:中点]
        if arr[mid] == target:
            return mid  # [帧:比较]
        if arr[mid] < target:
            left = mid + 1  # [帧:右移]
        else:
            right = mid - 1  # [帧:左移]
    return -1  # [帧:完成]


def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    mid = left + (right - left) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    return binary_search_recursive(arr, target, left, mid - 1)


if __name__ == "__main__":
    try:
        arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
        target = 23

        if not is_non_decreasing(arr):
            raise ValueError("二分查找要求数组为非递减有序。")

        print("数组:", arr)
        print("目标值:", target)

        iterative_index = binary_search_iterative(arr, target)
        recursive_index = binary_search_recursive(arr, target, 0, len(arr) - 1)
        # 期望一致结果：target=23 时下标为 5

        print(f"迭代版本结果: 在下标 {iterative_index} 找到" if iterative_index != -1 else "迭代版本结果: 未找到")
        print(f"递归版本结果: 在下标 {recursive_index} 找到" if recursive_index != -1 else "递归版本结果: 未找到")
    except Exception as ex:
        print("错误:", ex)`,
    csharp: `using System;
using System.Linq;

public class BinarySearchDemo {
  static bool IsNonDecreasing(int[] arr) {
    for (int i = 1; i < arr.Length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  static int BinarySearchIterative(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2; // [帧:中点]
      if (arr[mid] == target) return mid; // [帧:比较]
      if (arr[mid] < target) left = mid + 1; // [帧:右移]
      else right = mid - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  static int BinarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return BinarySearchRecursive(arr, target, mid + 1, right);
    return BinarySearchRecursive(arr, target, left, mid - 1);
  }

  public static void Main() {
    try {
      int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
      int target = 23;

      if (!IsNonDecreasing(arr)) {
        throw new ArgumentException("二分查找要求数组为非递减有序。");
      }

      Console.WriteLine("数组: [" + string.Join(", ", arr) + "]");
      Console.WriteLine("目标值: " + target);

      int iterativeIndex = BinarySearchIterative(arr, target);
      int recursiveIndex = BinarySearchRecursive(arr, target, 0, arr.Length - 1);
      // 期望一致结果：target=23 时下标为 5

      Console.WriteLine(iterativeIndex != -1
        ? $"迭代版本结果: 在下标 {iterativeIndex} 找到"
        : "迭代版本结果: 未找到");

      Console.WriteLine(recursiveIndex != -1
        ? $"递归版本结果: 在下标 {recursiveIndex} 找到"
        : "递归版本结果: 未找到");
    } catch (Exception ex) {
      Console.WriteLine("错误: " + ex.Message);
    }
  }
}`
  },
  interpolation: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int interpolationSearch(const vector<int>& arr, int target) {
  int low = 0, high = (int)arr.size() - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low == high) return arr[low] == target ? low : -1;
    if (arr[high] == arr[low]) break;
    int pos = low + (int)((long long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
    if (arr[pos] == target) return pos; // [帧:比较]
    if (arr[pos] < target) low = pos + 1; // [帧:右移]
    else high = pos - 1; // [帧:左移]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
  int target = 31;
  int index = interpolationSearch(arr, target);
  cout << "目标值: " << target << "，结果: " << index << endl;
  return 0;
}`,
    java: `public class InterpolationSearchDemo {
  static int interpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low == high) return arr[low] == target ? low : -1;
      if (arr[high] == arr[low]) break;
      int pos = low + (int)((long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
      if (arr[pos] == target) return pos; // [帧:比较]
      if (arr[pos] < target) low = pos + 1; // [帧:右移]
      else high = pos - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
    int target = 31;
    System.out.println("结果: " + interpolationSearch(arr, target));
  }
}`,
    python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        if arr[high] == arr[low]:
            break
        pos = low + (target - arr[low]) * (high - low) // (arr[high] - arr[low])  # [帧:探测]
        if arr[pos] == target:
            return pos  # [帧:比较]
        if arr[pos] < target:
            low = pos + 1  # [帧:右移]
        else:
            high = pos - 1  # [帧:左移]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [3, 7, 12, 18, 24, 31, 40, 52, 68]
    print("结果:", interpolation_search(arr, 31))`,
    csharp: `using System;

public class InterpolationSearchDemo {
  static int InterpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.Length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low == high) return arr[low] == target ? low : -1;
      if (arr[high] == arr[low]) break;
      int pos = low + (int)((long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
      if (arr[pos] == target) return pos; // [帧:比较]
      if (arr[pos] < target) low = pos + 1; // [帧:右移]
      else high = pos - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
    Console.WriteLine("结果: " + InterpolationSearch(arr, 31));
  }
}`
  },
  jump: {
    cpp: `#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

int jumpSearch(const vector<int>& arr, int target) {
  int n = (int)arr.size();
  int step = (int)sqrt(n);
  int prev = 0;
  while (prev < n && arr[min(step, n) - 1] < target) {
    prev = step;
    step += (int)sqrt(n); // [帧:跳跃]
    if (prev >= n) return -1;
  }
  while (prev < min(step, n)) {
    if (arr[prev] == target) return prev; // [帧:比较]
    prev++; // [帧:扫描]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
  cout << "结果: " << jumpSearch(arr, 31) << endl;
  return 0;
}`,
    java: `public class JumpSearchDemo {
  static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int)Math.sqrt(n);
    int prev = 0;
    while (prev < n && arr[Math.min(step, n) - 1] < target) {
      prev = step;
      step += (int)Math.sqrt(n); // [帧:跳跃]
      if (prev >= n) return -1;
    }
    while (prev < Math.min(step, n)) {
      if (arr[prev] == target) return prev; // [帧:比较]
      prev++; // [帧:扫描]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
    System.out.println("结果: " + jumpSearch(arr, 31));
  }
}`,
    python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))  # [帧:跳跃]
        if prev >= n:
            return -1
    while prev < min(step, n):
        if arr[prev] == target:
            return prev  # [帧:比较]
        prev += 1  # [帧:扫描]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [2, 5, 9, 12, 16, 23, 31, 44, 57]
    print("结果:", jump_search(arr, 31))`,
    csharp: `using System;

public class JumpSearchDemo {
  static int JumpSearch(int[] arr, int target) {
    int n = arr.Length;
    int step = (int)Math.Sqrt(n);
    int prev = 0;
    while (prev < n && arr[Math.Min(step, n) - 1] < target) {
      prev = step;
      step += (int)Math.Sqrt(n); // [帧:跳跃]
      if (prev >= n) return -1;
    }
    while (prev < Math.Min(step, n)) {
      if (arr[prev] == target) return prev; // [帧:比较]
      prev++; // [帧:扫描]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
    Console.WriteLine("结果: " + JumpSearch(arr, 31));
  }
}`
  },
  bst: {
    cpp: `#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v): val(v), left(nullptr), right(nullptr) {}
};

TreeNode* bstSearch(TreeNode* root, int target) {
  TreeNode* cur = root;
  while (cur != nullptr) {
    if (cur->val == target) return cur; // [帧:比较]
    if (target < cur->val) cur = cur->left; // [帧:左移]
    else cur = cur->right; // [帧:右移]
  }
  return nullptr; // [帧:完成]
}

int main() {
  TreeNode* root = new TreeNode(10);
  root->left = new TreeNode(5);
  root->right = new TreeNode(18);
  root->right->left = new TreeNode(13);
  cout << (bstSearch(root, 13) ? "找到" : "未找到") << endl;
  return 0;
}`,
    java: `public class BstSearchDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int v) { val = v; }
  }

  static TreeNode bstSearch(TreeNode root, int target) {
    TreeNode cur = root;
    while (cur != null) {
      if (cur.val == target) return cur; // [帧:比较]
      if (target < cur.val) cur = cur.left; // [帧:左移]
      else cur = cur.right; // [帧:右移]
    }
    return null; // [帧:完成]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(10);
    root.left = new TreeNode(5);
    root.right = new TreeNode(18);
    root.right.left = new TreeNode(13);
    System.out.println(bstSearch(root, 13) != null ? "找到" : "未找到");
  }
}`,
    python: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def bst_search(root, target):
    cur = root
    while cur is not None:
        if cur.val == target:
            return cur  # [帧:比较]
        if target < cur.val:
            cur = cur.left  # [帧:左移]
        else:
            cur = cur.right  # [帧:右移]
    return None  # [帧:完成]


if __name__ == "__main__":
    root = TreeNode(10)
    root.left = TreeNode(5)
    root.right = TreeNode(18)
    root.right.left = TreeNode(13)
    print("找到" if bst_search(root, 13) else "未找到")`,
    csharp: `using System;

public class BstSearchDemo {
  class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int v) { Val = v; }
  }

  static TreeNode? BstSearch(TreeNode? root, int target) {
    var cur = root;
    while (cur != null) {
      if (cur.Val == target) return cur; // [帧:比较]
      if (target < cur.Val) cur = cur.Left; // [帧:左移]
      else cur = cur.Right; // [帧:右移]
    }
    return null; // [帧:完成]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(10);
    root.Left = new TreeNode(5);
    root.Right = new TreeNode(18);
    root.Right.Left = new TreeNode(13);
    Console.WriteLine(BstSearch(root, 13) != null ? "找到" : "未找到");
  }
}`
  },
  hash: {
    cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int hashSearch(const unordered_map<int, int>& table, int key) {
  auto it = table.find(key); // [帧:探测]
  if (it == table.end()) return -1; // [帧:完成]
  return it->second; // [帧:比较]
}

int main() {
  unordered_map<int, int> table = {{17, 0}, {23, 1}, {31, 2}};
  cout << "查找 23 -> " << hashSearch(table, 23) << endl;
  return 0;
}`,
    java: `import java.util.HashMap;
import java.util.Map;

public class HashSearchDemo {
  static int hashSearch(Map<Integer, Integer> table, int key) {
    Integer value = table.get(key); // [帧:探测]
    if (value == null) return -1; // [帧:完成]
    return value; // [帧:比较]
  }

  public static void main(String[] args) {
    Map<Integer, Integer> table = new HashMap<>();
    table.put(17, 0);
    table.put(23, 1);
    table.put(31, 2);
    System.out.println("查找 23 -> " + hashSearch(table, 23));
  }
}`,
    python: `def hash_search(table, key):
    value = table.get(key)  # [帧:探测]
    if value is None:
        return -1  # [帧:完成]
    return value  # [帧:比较]


if __name__ == "__main__":
    table = {17: 0, 23: 1, 31: 2}
    print("查找 23 ->", hash_search(table, 23))`,
    csharp: `using System;
using System.Collections.Generic;

public class HashSearchDemo {
  static int HashSearch(Dictionary<int, int> table, int key) {
    if (!table.TryGetValue(key, out var value)) return -1; // [帧:探测]
    return value; // [帧:比较]
  }

  public static void Main(string[] args) {
    var table = new Dictionary<int, int> { {17, 0}, {23, 1}, {31, 2} };
    Console.WriteLine("查找 23 -> " + HashSearch(table, 23));
  }
}`
  },
  bubble: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]); // [帧:交换]
      }
    }
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  bubbleSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class BubbleSortDemo {
  static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp; // [帧:交换]
        }
      }
    }
  }

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    bubbleSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # [帧:交换]


if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    bubble_sort(arr)
    print(arr)`,
    csharp: `using System;

public class BubbleSortDemo {
  static void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]); // [帧:交换]
        }
      }
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    BubbleSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  selection: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) swap(arr[i], arr[minIdx]); // [帧:交换]
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  selectionSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class SelectionSortDemo {
  static void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp; // [帧:交换]
    }
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    selectionSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j  # [帧:比较]
        if min_idx != i:
          arr[i], arr[min_idx] = arr[min_idx], arr[i]  # [帧:交换]


    if __name__ == "__main__":
      arr = [9, 4, 7, 1, 5]
      selection_sort(arr)
      print(arr)`,
    csharp: `using System;

public class SelectionSortDemo {
  static void SelectionSort(int[] arr) {
  int n = arr.Length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) {
      (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]); // [帧:交换]
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    SelectionSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  insertion: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
  for (int i = 1; i < (int)arr.size(); i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  insertionSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class InsertionSortDemo {
  static void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    insertionSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # [帧:移位]
            j -= 1
        arr[j + 1] = key  # [帧:插入]


    if __name__ == "__main__":
      arr = [9, 4, 7, 1, 5]
      insertion_sort(arr)
      print(arr)`,
    csharp: `using System;

public class InsertionSortDemo {
  static void InsertionSort(int[] arr) {
  for (int i = 1; i < arr.Length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    InsertionSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  quick: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void quickSort(vector<int>& arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]); // [帧:交换]
    }
  }
  swap(arr[i + 1], arr[right]); // [帧:分区]
  int p = i + 1;
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  quickSort(arr, 0, (int)arr.size() - 1);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class QuickSortDemo {
  static void quickSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp; // [帧:交换]
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp; // [帧:分区]
  int p = i + 1;
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    quickSort(arr, 0, arr.length - 1);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def quick_sort(arr, left, right):
    if left >= right:
        return
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # [帧:交换]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]  # [帧:分区]
    p = i + 1
    quick_sort(arr, left, p - 1)
    quick_sort(arr, p + 1, right)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    quick_sort(arr, 0, len(arr) - 1)
    print(arr)`,
    csharp: `using System;

public class QuickSortDemo {
  static void QuickSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      (arr[i], arr[j]) = (arr[j], arr[i]); // [帧:交换]
    }
  }
  (arr[i + 1], arr[right]) = (arr[right], arr[i + 1]); // [帧:分区]
  int p = i + 1;
  QuickSort(arr, left, p - 1);
  QuickSort(arr, p + 1, right);
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    QuickSort(arr, 0, arr.Length - 1);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  heap: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    swap(arr[i], arr[largest]); // [帧:交换]
    heapify(arr, n, largest);
  }
}

void heapSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]); // [帧:提取]
    heapify(arr, i, 0);
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  heapSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class HeapSortDemo {
  static void heapify(int[] arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp; // [帧:交换]
    heapify(arr, n, largest);
  }
}

static void heapSort(int[] arr) {
  int n = arr.length;
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp; // [帧:提取]
    heapify(arr, i, 0);
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    heapSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # [帧:交换]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)  # [帧:建堆]
    for i in range(n - 1, 0, -1):
      arr[0], arr[i] = arr[i], arr[0]  # [帧:提取]
      heapify(arr, i, 0)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    heap_sort(arr)
    print(arr)`,
    csharp: `using System;

public class HeapSortDemo {
  static void Heapify(int[] arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    (arr[i], arr[largest]) = (arr[largest], arr[i]); // [帧:交换]
    Heapify(arr, n, largest);
  }
}

static void HeapSort(int[] arr) {
  int n = arr.Length;
  for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    (arr[0], arr[i]) = (arr[i], arr[0]); // [帧:提取]
    Heapify(arr, i, 0);
  }
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    HeapSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  shell: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void shellSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  shellSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class ShellSortDemo {
  static void shellSort(int[] arr) {
  int n = arr.length;
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    shellSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]  # [帧:移位]
                j -= gap
            arr[j] = temp  # [帧:插入]
          gap //= 2


      if __name__ == "__main__":
        arr = [9, 4, 7, 1, 5]
        shell_sort(arr)
        print(arr)`,
    csharp: `using System;

public class ShellSortDemo {
  static void ShellSort(int[] arr) {
  int n = arr.Length;
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    ShellSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  merge: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
  vector<int> temp;
  int i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
    else temp.push_back(arr[j++]);
  }
  while (i <= mid) temp.push_back(arr[i++]);
  while (j <= right) temp.push_back(arr[j++]);
  for (int k = 0; k < (int)temp.size(); k++) {
    arr[left + k] = temp[k]; // [帧:合并]
  }
}

void mergeSort(vector<int>& arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  mergeSort(arr, 0, (int)arr.size() - 1);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class MergeSortDemo {
  static void merge(int[] arr, int left, int mid, int right) {
  int[] temp = new int[right - left + 1];
  int i = left, j = mid + 1, k = 0;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp[k++] = arr[i++];
    else temp[k++] = arr[j++];
  }
  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];
  for (int t = 0; t < temp.length; t++) {
    arr[left + t] = temp[t]; // [帧:合并]
  }
}

static void mergeSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    mergeSort(arr, 0, arr.length - 1);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def merge(arr, left, mid, right):
    temp = []
    i, j = left, mid + 1
    while i <= mid and j <= right:
        if arr[i] <= arr[j]:
            temp.append(arr[i])
            i += 1
        else:
            temp.append(arr[j])
            j += 1
    while i <= mid:
        temp.append(arr[i])
        i += 1
    while j <= right:
        temp.append(arr[j])
        j += 1
    for k, value in enumerate(temp):
        arr[left + k] = value  # [帧:合并]

def merge_sort(arr, left, right):
    if left >= right:
        return
    mid = left + (right - left) // 2
    merge_sort(arr, left, mid)
    merge_sort(arr, mid + 1, right)
    merge(arr, left, mid, right)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    merge_sort(arr, 0, len(arr) - 1)
    print(arr)`,
    csharp: `using System;
using System.Collections.Generic;

public class MergeSortDemo {
  static void Merge(int[] arr, int left, int mid, int right) {
  var temp = new List<int>();
  int i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp.Add(arr[i++]);
    else temp.Add(arr[j++]);
  }
  while (i <= mid) temp.Add(arr[i++]);
  while (j <= right) temp.Add(arr[j++]);
  for (int k = 0; k < temp.Count; k++) {
    arr[left + k] = temp[k]; // [帧:合并]
  }
}

static void MergeSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  MergeSort(arr, left, mid);
  MergeSort(arr, mid + 1, right);
  Merge(arr, left, mid, right);
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    MergeSort(arr, 0, arr.Length - 1);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  insert: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertAt(vector<int>& arr, int index, int value) {
  if (index < 0 || index > (int)arr.size()) return;
  arr.push_back(0);
  for (int i = (int)arr.size() - 1; i > index; i--) {
    arr[i] = arr[i - 1]; // [帧:移位]
  }
  arr[index] = value; // [帧:插入]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  insertAt(arr, 2, 99);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LinearInsertDemo {
  static void insertAt(List<Integer> arr, int index, int value) {
  if (index < 0 || index > arr.size()) return;
  arr.add(0);
  for (int i = arr.size() - 1; i > index; i--) {
    arr.set(i, arr.get(i - 1)); // [帧:移位]
  }
  arr.set(index, value); // [帧:插入]
}

  public static void main(String[] args) {
    List<Integer> arr = new ArrayList<>(Arrays.asList(1, 3, 5, 7));
    insertAt(arr, 2, 99);
    System.out.println(arr);
  }
}`,
    python: `def insert_at(arr, index, value):
    if index < 0 or index > len(arr):
        return
    arr.append(0)
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]  # [帧:移位]
    arr[index] = value  # [帧:插入]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    insert_at(arr, 2, 99)
    print(arr)`,
    csharp: `using System;
using System.Collections.Generic;

public class LinearInsertDemo {
  static void InsertAt(List<int> arr, int index, int value) {
  if (index < 0 || index > arr.Count) return;
  arr.Add(0);
  for (int i = arr.Count - 1; i > index; i--) {
    arr[i] = arr[i - 1]; // [帧:移位]
  }
  arr[index] = value; // [帧:插入]
}

  public static void Main(string[] args) {
    var arr = new List<int> {1, 3, 5, 7};
    InsertAt(arr, 2, 99);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  delete: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void deleteAt(vector<int>& arr, int index) {
  if (index < 0 || index >= (int)arr.size()) return;
  for (int i = index; i < (int)arr.size() - 1; i++) {
    arr[i] = arr[i + 1]; // [帧:移位]
  }
  arr.pop_back(); // [帧:删除]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  deleteAt(arr, 2);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LinearDeleteDemo {
  static void deleteAt(List<Integer> arr, int index) {
  if (index < 0 || index >= arr.size()) return;
  for (int i = index; i < arr.size() - 1; i++) {
    arr.set(i, arr.get(i + 1)); // [帧:移位]
  }
  arr.remove(arr.size() - 1); // [帧:删除]
}

  public static void main(String[] args) {
    List<Integer> arr = new ArrayList<>(Arrays.asList(1, 3, 5, 7));
    deleteAt(arr, 2);
    System.out.println(arr);
  }
}`,
    python: `def delete_at(arr, index):
    if index < 0 or index >= len(arr):
        return
    for i in range(index, len(arr) - 1):
        arr[i] = arr[i + 1]  # [帧:移位]
    arr.pop()  # [帧:删除]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    delete_at(arr, 2)
    print(arr)`,
    csharp: `using System;
using System.Collections.Generic;

public class LinearDeleteDemo {
  static void DeleteAt(List<int> arr, int index) {
  if (index < 0 || index >= arr.Count) return;
  for (int i = index; i < arr.Count - 1; i++) {
    arr[i] = arr[i + 1]; // [帧:移位]
  }
  arr.RemoveAt(arr.Count - 1); // [帧:删除]
}

  public static void Main(string[] args) {
    var arr = new List<int> {1, 3, 5, 7};
    DeleteAt(arr, 2);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  search: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int findValue(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++) {
    if (arr[i] == target) return i; // [帧:比较]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  cout << findValue(arr, 5) << endl;
  return 0;
}`,
    java: `public class LinearSearchDemo {
  static int findValue(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {1, 3, 5, 7};
    System.out.println(findValue(arr, 5));
  }
}`,
    python: `def find_value(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i  # [帧:比较]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    print(find_value(arr, 5))`,
    csharp: `using System;

public class LinearSearchDemo {
  static int FindValue(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {1, 3, 5, 7};
    Console.WriteLine(FindValue(arr, 5));
  }
}`
  },
  reverse: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
  int left = 0, right = (int)arr.size() - 1;
  while (left < right) {
    swap(arr[left], arr[right]); // [帧:交换]
    left++;
    right--;
  }
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  reverseArray(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.Arrays;

public class LinearReverseDemo {
  static void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
      int temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp; // [帧:交换]
      left++;
      right--;
    }
  }

  public static void main(String[] args) {
    int[] arr = {1, 3, 5, 7};
    reverseArray(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,
    python: `def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]  # [帧:交换]
        left += 1
        right -= 1


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    reverse_array(arr)
    print(arr)`,
    csharp: `using System;

public class LinearReverseDemo {
  static void ReverseArray(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
      (arr[left], arr[right]) = (arr[right], arr[left]); // [帧:交换]
      left++;
      right--;
    }
  }

  public static void Main(string[] args) {
    int[] arr = {1, 3, 5, 7};
    ReverseArray(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`
  },
  linkedInsert: {
    cpp: `#include <iostream>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* insertAfter(ListNode* head, int target, int value) {
  ListNode* cur = head;
  while (cur != nullptr && cur->val != target) {
    cur = cur->next; // [帧:遍历]
  }
  if (cur == nullptr) return head;
  ListNode* node = new ListNode(value);
  node->next = cur->next;
  cur->next = node; // [帧:插入]
  return head;
}

int main() {
  auto* a = new ListNode(1);
  auto* b = new ListNode(3);
  auto* c = new ListNode(5);
  a->next = b;
  b->next = c;
  ListNode* head = insertAfter(a, 3, 4);
  for (ListNode* p = head; p != nullptr; p = p->next) cout << p->val << ' ';
  return 0;
}`,
    java: `public class LinkedInsertDemo {
  static class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
  }

  static ListNode insertAfter(ListNode head, int target, int value) {
    ListNode cur = head;
    while (cur != null && cur.val != target) {
      cur = cur.next; // [帧:遍历]
    }
    if (cur == null) return head;
    ListNode node = new ListNode(value);
    node.next = cur.next;
    cur.next = node; // [帧:插入]
    return head;
  }

  public static void main(String[] args) {
    ListNode a = new ListNode(1);
    ListNode b = new ListNode(3);
    ListNode c = new ListNode(5);
    a.next = b;
    b.next = c;
    ListNode head = insertAfter(a, 3, 4);
    for (ListNode p = head; p != null; p = p.next) System.out.print(p.val + " ");
  }
}`,
    python: `def insert_after(head, target, value):
    cur = head
    while cur is not None and cur.val != target:
        cur = cur.next  # [帧:遍历]
    if cur is None:
        return head
    node = ListNode(value)
    node.next = cur.next
    cur.next = node  # [帧:插入]
    return head


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


if __name__ == "__main__":
    head = ListNode(1, ListNode(3, ListNode(5)))
    head = insert_after(head, 3, 4)
    p = head
    while p is not None:
        print(p.val, end=" ")
        p = p.next`,
    csharp: `using System;

public class LinkedInsertDemo {
  public class ListNode {
    public int Val;
    public ListNode? Next;
    public ListNode(int val) { Val = val; }
  }

  static ListNode? InsertAfter(ListNode? head, int target, int value) {
    var cur = head;
    while (cur != null && cur.Val != target) {
      cur = cur.Next; // [帧:遍历]
    }
    if (cur == null) return head;
    var node = new ListNode(value);
    node.Next = cur.Next;
    cur.Next = node; // [帧:插入]
    return head;
  }

  public static void Main(string[] args) {
    var head = new ListNode(1) { Next = new ListNode(3) { Next = new ListNode(5) } };
    head = InsertAfter(head, 3, 4);
    for (var p = head; p != null; p = p.Next) Console.Write(p.Val + " ");
  }
}`
  },
  linkedDelete: {
    cpp: `#include <iostream>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* deleteValue(ListNode* head, int target) {
  ListNode dummy(0);
  dummy.next = head;
  ListNode* cur = &dummy;
  while (cur->next != nullptr && cur->next->val != target) {
    cur = cur->next; // [帧:遍历]
  }
  if (cur->next != nullptr) {
    ListNode* doomed = cur->next;
    cur->next = doomed->next; // [帧:删除]
    delete doomed;
  }
  return dummy.next;
}

int main() {
  auto* a = new ListNode(1);
  auto* b = new ListNode(3);
  auto* c = new ListNode(5);
  a->next = b;
  b->next = c;
  ListNode* head = deleteValue(a, 3);
  for (ListNode* p = head; p != nullptr; p = p->next) cout << p->val << ' ';
  return 0;
}`,
    java: `public class LinkedDeleteDemo {
  static class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
  }

  static ListNode deleteValue(ListNode head, int target) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode cur = dummy;
    while (cur.next != null && cur.next.val != target) {
      cur = cur.next; // [帧:遍历]
    }
    if (cur.next != null) {
      cur.next = cur.next.next; // [帧:删除]
    }
    return dummy.next;
  }

  public static void main(String[] args) {
    ListNode a = new ListNode(1);
    ListNode b = new ListNode(3);
    ListNode c = new ListNode(5);
    a.next = b;
    b.next = c;
    ListNode head = deleteValue(a, 3);
    for (ListNode p = head; p != null; p = p.next) System.out.print(p.val + " ");
  }
}`,
    python: `def delete_value(head, target):
    dummy = ListNode(0)
    dummy.next = head
    cur = dummy
    while cur.next is not None and cur.next.val != target:
        cur = cur.next  # [帧:遍历]
    if cur.next is not None:
        cur.next = cur.next.next  # [帧:删除]
    return dummy.next


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


if __name__ == "__main__":
    head = ListNode(1, ListNode(3, ListNode(5)))
    head = delete_value(head, 3)
    p = head
    while p is not None:
        print(p.val, end=" ")
        p = p.next`,
    csharp: `using System;

public class LinkedDeleteDemo {
  public class ListNode {
    public int Val;
    public ListNode? Next;
    public ListNode(int val) { Val = val; }
  }

  static ListNode? DeleteValue(ListNode? head, int target) {
    var dummy = new ListNode(0) { Next = head };
    var cur = dummy;
    while (cur.Next != null && cur.Next.Val != target) {
      cur = cur.Next; // [帧:遍历]
    }
    if (cur.Next != null) {
      cur.Next = cur.Next.Next; // [帧:删除]
    }
    return dummy.Next;
  }

  public static void Main(string[] args) {
    var head = new ListNode(1) { Next = new ListNode(3) { Next = new ListNode(5) } };
    head = DeleteValue(head, 3);
    for (var p = head; p != null; p = p.Next) Console.Write(p.Val + " ");
  }
}`
  },
  stackPush: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void stackPush(vector<int>& st, int value) {
  st.push_back(value); // [帧:入栈]
}

int main() {
  vector<int> st = {1, 2};
  stackPush(st, 3);
  for (int v : st) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPushDemo {
  static void stackPush(List<Integer> st, int value) {
    st.add(value); // [帧:入栈]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2));
    stackPush(st, 3);
    System.out.println(st);
  }
}`,
    python: `def stack_push(st, value):
    st.append(value)  # [帧:入栈]


if __name__ == "__main__":
    st = [1, 2]
    stack_push(st, 3)
    print(st)`,
    csharp: `using System;
using System.Collections.Generic;

public class StackPushDemo {
  static void StackPush(List<int> st, int value) {
    st.Add(value); // [帧:入栈]
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2};
    StackPush(st, 3);
    Console.WriteLine("[" + string.Join(", ", st) + "]");
  }
}`
  },
  stackPop: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int stackPop(vector<int>& st) {
  if (st.empty()) return -1;
  int value = st.back();
  st.pop_back(); // [帧:出栈]
  return value;
}

int main() {
  vector<int> st = {1, 2, 3};
  cout << stackPop(st) << endl;
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPopDemo {
  static int stackPop(List<Integer> st) {
    if (st.isEmpty()) return -1;
    return st.remove(st.size() - 1); // [帧:出栈]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2, 3));
    System.out.println(stackPop(st));
  }
}`,
    python: `def stack_pop(st):
    if not st:
        return -1
    return st.pop()  # [帧:出栈]


if __name__ == "__main__":
    st = [1, 2, 3]
    print(stack_pop(st))`,
    csharp: `using System;
using System.Collections.Generic;

public class StackPopDemo {
  static int StackPop(List<int> st) {
    if (st.Count == 0) return -1;
    int value = st[st.Count - 1];
    st.RemoveAt(st.Count - 1); // [帧:出栈]
    return value;
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2, 3};
    Console.WriteLine(StackPop(st));
  }
}`
  },
  stackPeek: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int stackPeek(const vector<int>& st) {
  if (st.empty()) return -1;
  return st.back(); // [帧:查看]
}

int main() {
  vector<int> st = {1, 2, 3};
  cout << stackPeek(st) << endl;
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPeekDemo {
  static int stackPeek(List<Integer> st) {
    if (st.isEmpty()) return -1;
    return st.get(st.size() - 1); // [帧:查看]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2, 3));
    System.out.println(stackPeek(st));
  }
}`,
    python: `def stack_peek(st):
    if not st:
        return -1
    return st[-1]  # [帧:查看]


if __name__ == "__main__":
    st = [1, 2, 3]
    print(stack_peek(st))`,
    csharp: `using System;
using System.Collections.Generic;

public class StackPeekDemo {
  static int StackPeek(List<int> st) {
    if (st.Count == 0) return -1;
    return st[st.Count - 1]; // [帧:查看]
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2, 3};
    Console.WriteLine(StackPeek(st));
  }
}`
  },
  queueEnqueue: {
    cpp: `#include <iostream>
#include <queue>
using namespace std;

void queueEnqueue(queue<int>& q, int value) {
  q.push(value); // [帧:入队]
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  queueEnqueue(q, 3);
  cout << q.front() << endl;
  return 0;
}`,
    java: `import java.util.LinkedList;
import java.util.Queue;

public class QueueEnqueueDemo {
  static void queueEnqueue(Queue<Integer> q, int value) {
    q.offer(value); // [帧:入队]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    queueEnqueue(q, 3);
    System.out.println(q);
  }
}`,
    python: `from collections import deque

def queue_enqueue(q, value):
    q.append(value)  # [帧:入队]


if __name__ == "__main__":
    q = deque([1, 2])
    queue_enqueue(q, 3)
    print(list(q))`,
    csharp: `using System;
using System.Collections.Generic;

public class QueueEnqueueDemo {
  static void QueueEnqueue(Queue<int> q, int value) {
    q.Enqueue(value); // [帧:入队]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    QueueEnqueue(q, 3);
    Console.WriteLine("[" + string.Join(", ", q) + "]");
  }
}`
  },
  queueDequeue: {
    cpp: `#include <iostream>
#include <queue>
using namespace std;

int queueDequeue(queue<int>& q) {
  if (q.empty()) return -1;
  int value = q.front();
  q.pop(); // [帧:出队]
  return value;
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  q.push(3);
  cout << queueDequeue(q) << endl;
  return 0;
}`,
    java: `import java.util.LinkedList;
import java.util.Queue;

public class QueueDequeueDemo {
  static int queueDequeue(Queue<Integer> q) {
    if (q.isEmpty()) return -1;
    return q.poll(); // [帧:出队]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    q.offer(3);
    System.out.println(queueDequeue(q));
  }
}`,
    python: `from collections import deque

def queue_dequeue(q):
    if not q:
        return -1
    return q.popleft()  # [帧:出队]


if __name__ == "__main__":
    q = deque([1, 2, 3])
    print(queue_dequeue(q))`,
    csharp: `using System;
using System.Collections.Generic;

public class QueueDequeueDemo {
  static int QueueDequeue(Queue<int> q) {
    if (q.Count == 0) return -1;
    return q.Dequeue(); // [帧:出队]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    q.Enqueue(3);
    Console.WriteLine(QueueDequeue(q));
  }
}`
  },
  queuePeek: {
    cpp: `#include <iostream>
#include <queue>
using namespace std;

int queuePeek(const queue<int>& q) {
  if (q.empty()) return -1;
  return q.front(); // [帧:查看]
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  q.push(3);
  cout << queuePeek(q) << endl;
  return 0;
}`,
    java: `import java.util.LinkedList;
import java.util.Queue;

public class QueuePeekDemo {
  static int queuePeek(Queue<Integer> q) {
    if (q.isEmpty()) return -1;
    return q.peek(); // [帧:查看]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    q.offer(3);
    System.out.println(queuePeek(q));
  }
}`,
    python: `from collections import deque

def queue_peek(q):
    if not q:
        return -1
    return q[0]  # [帧:查看]


if __name__ == "__main__":
    q = deque([1, 2, 3])
    print(queue_peek(q))`,
    csharp: `using System;
using System.Collections.Generic;

public class QueuePeekDemo {
  static int QueuePeek(Queue<int> q) {
    if (q.Count == 0) return -1;
    return q.Peek(); // [帧:查看]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    q.Enqueue(3);
    Console.WriteLine(QueuePeek(q));
  }
}`
  },
  preorder: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void preorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  out.push_back(root->val); // [帧:访问节点]
  preorder(root->left, out); // [帧:访问左子树]
  preorder(root->right, out); // [帧:访问右子树]
}

int main() {
  TreeNode* root = new TreeNode(1);
  root->left = new TreeNode(2);
  root->right = new TreeNode(3);
  vector<int> out;
  preorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class PreorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void preorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    out.add(root.val); // [帧:访问节点]
    preorder(root.left, out); // [帧:访问左子树]
    preorder(root.right, out); // [帧:访问右子树]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    preorder(root, out);
    System.out.println(out);
  }
}`,
    python: `def preorder(root, out):
    if root is None:
        return
    out.append(root.val)  # [帧:访问节点]
    preorder(root.left, out)  # [帧:访问左子树]
    preorder(root.right, out)  # [帧:访问右子树]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2), TreeNode(3))
    out = []
    preorder(root, out)
    print(out)`,
    csharp: `using System;
using System.Collections.Generic;

public class PreorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Preorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    output.Add(root.Val); // [帧:访问节点]
    Preorder(root.Left, output); // [帧:访问左子树]
    Preorder(root.Right, output); // [帧:访问右子树]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(1) { Left = new TreeNode(2), Right = new TreeNode(3) };
    var outList = new List<int>();
    Preorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`
  },
  inorder: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  inorder(root->left, out); // [帧:访问左子树]
  out.push_back(root->val); // [帧:访问节点]
  inorder(root->right, out); // [帧:访问右子树]
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  vector<int> out;
  inorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class InorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void inorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    inorder(root.left, out); // [帧:访问左子树]
    out.add(root.val); // [帧:访问节点]
    inorder(root.right, out); // [帧:访问右子树]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    inorder(root, out);
    System.out.println(out);
  }
}`,
    python: `def inorder(root, out):
    if root is None:
        return
    inorder(root.left, out)  # [帧:访问左子树]
    out.append(root.val)  # [帧:访问节点]
    inorder(root.right, out)  # [帧:访问右子树]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(2, TreeNode(1), TreeNode(3))
    out = []
    inorder(root, out)
    print(out)`,
    csharp: `using System;
using System.Collections.Generic;

public class InorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Inorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    Inorder(root.Left, output); // [帧:访问左子树]
    output.Add(root.Val); // [帧:访问节点]
    Inorder(root.Right, output); // [帧:访问右子树]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(2) { Left = new TreeNode(1), Right = new TreeNode(3) };
    var outList = new List<int>();
    Inorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`
  },
  postorder: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void postorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  postorder(root->left, out); // [帧:访问左子树]
  postorder(root->right, out); // [帧:访问右子树]
  out.push_back(root->val); // [帧:访问节点]
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  vector<int> out;
  postorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class PostorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void postorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    postorder(root.left, out); // [帧:访问左子树]
    postorder(root.right, out); // [帧:访问右子树]
    out.add(root.val); // [帧:访问节点]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    postorder(root, out);
    System.out.println(out);
  }
}`,
    python: `def postorder(root, out):
    if root is None:
        return
    postorder(root.left, out)  # [帧:访问左子树]
    postorder(root.right, out)  # [帧:访问右子树]
    out.append(root.val)  # [帧:访问节点]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(2, TreeNode(1), TreeNode(3))
    out = []
    postorder(root, out)
    print(out)`,
    csharp: `using System;
using System.Collections.Generic;

public class PostorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Postorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    Postorder(root.Left, output); // [帧:访问左子树]
    Postorder(root.Right, output); // [帧:访问右子树]
    output.Add(root.Val); // [帧:访问节点]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(2) { Left = new TreeNode(1), Right = new TreeNode(3) };
    var outList = new List<int>();
    Postorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`
  },
  levelorder: {
    cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

vector<int> levelOrder(TreeNode* root) {
  vector<int> out;
  if (root == nullptr) return out;
  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* node = q.front();
    q.pop();
    out.push_back(node->val); // [帧:访问节点]
    if (node->left) q.push(node->left); // [帧:访问左子树]
    if (node->right) q.push(node->right); // [帧:访问右子树]
  }
  return out;
}

int main() {
  TreeNode* root = new TreeNode(1);
  root->left = new TreeNode(2);
  root->right = new TreeNode(3);
  vector<int> out = levelOrder(root);
  for (int v : out) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class LevelOrderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static List<Integer> levelOrder(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    if (root == null) return out;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
      TreeNode node = q.poll();
      out.add(node.val); // [帧:访问节点]
      if (node.left != null) q.offer(node.left); // [帧:访问左子树]
      if (node.right != null) q.offer(node.right); // [帧:访问右子树]
    }
    return out;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    System.out.println(levelOrder(root));
  }
}`,
    python: `from collections import deque

def level_order(root):
    out = []
    if root is None:
        return out
    q = deque([root])
    while q:
        node = q.popleft()
        out.append(node.val)  # [帧:访问节点]
        if node.left is not None:
            q.append(node.left)  # [帧:访问左子树]
        if node.right is not None:
            q.append(node.right)  # [帧:访问右子树]
    return out`,
    csharp: `using System;
using System.Collections.Generic;

public class LevelOrderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static List<int> LevelOrder(TreeNode? root) {
    var output = new List<int>();
    if (root == null) return output;
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);
    while (queue.Count > 0) {
      var node = queue.Dequeue();
      output.Add(node.Val); // [帧:访问节点]
      if (node.Left != null) queue.Enqueue(node.Left); // [帧:访问左子树]
      if (node.Right != null) queue.Enqueue(node.Right); // [帧:访问右子树]
    }
    return output;
  }

  public static void Main(string[] args) {
    var root = new TreeNode(1) { Left = new TreeNode(2), Right = new TreeNode(3) };
    Console.WriteLine("[" + string.Join(", ", LevelOrder(root)) + "]");
  }
}`
  },
  avl: {
    cpp: `#include <algorithm>
#include <iostream>
using namespace std;

struct AvlNode {
  int val;
  int height;
  AvlNode* left;
  AvlNode* right;
  AvlNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};

int height(AvlNode* node) { return node ? node->height : 0; }

void updateHeight(AvlNode* node) {
  node->height = max(height(node->left), height(node->right)) + 1;
}

AvlNode* rotateLeft(AvlNode* x) {
  AvlNode* y = x->right;
  x->right = y->left;
  y->left = x;
  updateHeight(x);
  updateHeight(y);
  return y; // [帧:左旋]
}

AvlNode* rotateRight(AvlNode* y) {
  AvlNode* x = y->left;
  y->left = x->right;
  x->right = y;
  updateHeight(y);
  updateHeight(x);
  return x; // [帧:右旋]
}

int main() {
  AvlNode* y = new AvlNode(20);
  y->left = new AvlNode(10);
  y->left->left = new AvlNode(5);
  updateHeight(y->left);
  updateHeight(y);
  AvlNode* root = rotateRight(y);
  cout << root->val << endl;
  return 0;
}`,
    java: `public class AvlRotateDemo {
  static class AvlNode {
    int val;
    int height = 1;
    AvlNode left;
    AvlNode right;
    AvlNode(int val) { this.val = val; }
  }

  static int height(AvlNode node) { return node == null ? 0 : node.height; }

  static void updateHeight(AvlNode node) {
    node.height = Math.max(height(node.left), height(node.right)) + 1;
  }

  static AvlNode rotateLeft(AvlNode x) {
    AvlNode y = x.right;
    x.right = y.left;
    y.left = x;
    updateHeight(x);
    updateHeight(y);
    return y; // [帧:左旋]
  }

  static AvlNode rotateRight(AvlNode y) {
    AvlNode x = y.left;
    y.left = x.right;
    x.right = y;
    updateHeight(y);
    updateHeight(x);
    return x; // [帧:右旋]
  }

  public static void main(String[] args) {
    AvlNode y = new AvlNode(20);
    y.left = new AvlNode(10);
    y.left.left = new AvlNode(5);
    updateHeight(y.left);
    updateHeight(y);
    AvlNode root = rotateRight(y);
    System.out.println(root.val);
  }
}`,
    python: `class AvlNode:
    def __init__(self, val):
        self.val = val
        self.height = 1
        self.left = None
        self.right = None


def height(node):
    return 0 if node is None else node.height

def update_height(node):
    node.height = max(height(node.left), height(node.right)) + 1

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    update_height(x)
    update_height(y)
    return y  # [帧:左旋]

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    update_height(y)
    update_height(x)
    return x  # [帧:右旋]


if __name__ == "__main__":
    y = AvlNode(20)
    y.left = AvlNode(10)
    y.left.left = AvlNode(5)
    update_height(y.left)
    update_height(y)
    root = rotate_right(y)
    print(root.val)`,
    csharp: `using System;

public class AvlRotateDemo {
  public class AvlNode {
    public int Val;
    public int Height = 1;
    public AvlNode? Left;
    public AvlNode? Right;
    public AvlNode(int val) { Val = val; }
  }

  static int Height(AvlNode? node) => node?.Height ?? 0;

  static void UpdateHeight(AvlNode node) {
    node.Height = Math.Max(Height(node.Left), Height(node.Right)) + 1;
  }

  static AvlNode RotateLeft(AvlNode x) {
    var y = x.Right!;
    x.Right = y.Left;
    y.Left = x;
    UpdateHeight(x);
    UpdateHeight(y);
    return y; // [帧:左旋]
  }

  static AvlNode RotateRight(AvlNode y) {
    var x = y.Left!;
    y.Left = x.Right;
    x.Right = y;
    UpdateHeight(y);
    UpdateHeight(x);
    return x; // [帧:右旋]
  }

  public static void Main(string[] args) {
    var y = new AvlNode(20) { Left = new AvlNode(10) };
    y.Left.Left = new AvlNode(5);
    UpdateHeight(y.Left);
    UpdateHeight(y);
    var root = RotateRight(y);
    Console.WriteLine(root.Val);
  }
}`
  },
  bstInsert: {
    cpp: `#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* bstInsert(TreeNode* root, int value) {
  if (root == nullptr) return new TreeNode(value); // [帧:插入]
  if (value < root->val) root->left = bstInsert(root->left, value); // [帧:访问左子树]
  else if (value > root->val) root->right = bstInsert(root->right, value); // [帧:访问右子树]
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << ' ';
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  root = bstInsert(root, 5);
  root = bstInsert(root, 2);
  root = bstInsert(root, 8);
  inorder(root);
  return 0;
}`,
    java: `public class BstInsertDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static TreeNode bstInsert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value); // [帧:插入]
    if (value < root.val) root.left = bstInsert(root.left, value); // [帧:访问左子树]
    else if (value > root.val) root.right = bstInsert(root.right, value); // [帧:访问右子树]
    return root;
  }

  static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
  }

  public static void main(String[] args) {
    TreeNode root = null;
    root = bstInsert(root, 5);
    root = bstInsert(root, 2);
    root = bstInsert(root, 8);
    inorder(root);
  }
}`,
    python: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def bst_insert(root, value):
    if root is None:
        return TreeNode(value)  # [帧:插入]
    if value < root.val:
        root.left = bst_insert(root.left, value)  # [帧:访问左子树]
    elif value > root.val:
        root.right = bst_insert(root.right, value)  # [帧:访问右子树]
    return root


def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)


if __name__ == "__main__":
    root = None
    root = bst_insert(root, 5)
    root = bst_insert(root, 2)
    root = bst_insert(root, 8)
    inorder(root)`,
    csharp: `using System;

public class BstInsertDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static TreeNode BstInsert(TreeNode? root, int value) {
    if (root == null) return new TreeNode(value); // [帧:插入]
    if (value < root.val) root.left = bstInsert(root.left, value); // [帧:访问左子树]
    else if (value > root.val) root.right = bstInsert(root.right, value); // [帧:访问右子树]
    return root;
  }

  static void Inorder(TreeNode? root) {
    if (root == null) return;
    Inorder(root.Left);
    Console.Write(root.Val + " ");
    Inorder(root.Right);
  }

  public static void Main(string[] args) {
    TreeNode? root = null;
    root = BstInsert(root, 5);
    root = BstInsert(root, 2);
    root = BstInsert(root, 8);
    Inorder(root);
  }
}`
  },
  bstDelete: {
    cpp: `#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* minNode(TreeNode* node) {
  while (node->left != nullptr) node = node->left;
  return node;
}

TreeNode* bstDelete(TreeNode* root, int key) {
  if (root == nullptr) return nullptr;
  if (key < root->val) root->left = bstDelete(root->left, key); // [帧:访问左子树]
  else if (key > root->val) root->right = bstDelete(root->right, key); // [帧:访问右子树]
  else {
    if (root->left == nullptr) return root->right; // [帧:删除]
    if (root->right == nullptr) return root->left; // [帧:删除]
    TreeNode* succ = minNode(root->right);
    root->val = succ->val; // [帧:替换]
    root->right = bstDelete(root->right, succ->val);
  }
  return root;
}

TreeNode* insert(TreeNode* root, int value) {
  if (!root) return new TreeNode(value);
  if (value < root->val) root->left = insert(root->left, value);
  else if (value > root->val) root->right = insert(root->right, value);
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << ' ';
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  root = insert(root, 5);
  root = insert(root, 2);
  root = insert(root, 8);
  root = bstDelete(root, 5);
  inorder(root);
  return 0;
}`,
    java: `public class BstDeleteDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static TreeNode minNode(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
  }

  static TreeNode bstDelete(TreeNode root, int key) {
    if (root == null) return null;
    if (key < root.val) root.left = bstDelete(root.left, key); // [帧:访问左子树]
    else if (key > root.val) root.right = bstDelete(root.right, key); // [帧:访问右子树]
    else {
      if (root.left == null) return root.right; // [帧:删除]
      if (root.right == null) return root.left; // [帧:删除]
      TreeNode succ = minNode(root.right);
      root.val = succ.val; // [帧:替换]
      root.right = bstDelete(root.right, succ.val);
    }
    return root;
  }

  static TreeNode insert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.val) root.left = insert(root.left, value);
    else if (value > root.val) root.right = insert(root.right, value);
    return root;
  }

  static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
  }

  public static void main(String[] args) {
    TreeNode root = null;
    root = insert(root, 5);
    root = insert(root, 2);
    root = insert(root, 8);
    root = bstDelete(root, 5);
    inorder(root);
  }
}`,
    python: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def min_node(node):
    while node.left is not None:
        node = node.left
    return node


def bst_delete(root, key):
    if root is None:
        return None
    if key < root.val:
        root.left = bst_delete(root.left, key)  # [帧:访问左子树]
    elif key > root.val:
        root.right = bst_delete(root.right, key)  # [帧:访问右子树]
    else:
        if root.left is None:
            return root.right  # [帧:删除]
        if root.right is None:
            return root.left  # [帧:删除]
        succ = min_node(root.right)
        root.val = succ.val  # [帧:替换]
        root.right = bst_delete(root.right, succ.val)
    return root


def insert(root, value):
    if root is None:
        return TreeNode(value)
    if value < root.val:
        root.left = insert(root.left, value)
    elif value > root.val:
        root.right = insert(root.right, value)
    return root


def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)


if __name__ == "__main__":
    root = None
    root = insert(root, 5)
    root = insert(root, 2)
    root = insert(root, 8)
    root = bst_delete(root, 5)
    inorder(root)`,
    csharp: `using System;

public class BstDeleteDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static TreeNode MinNode(TreeNode node) {
    while (node.Left != null) node = node.Left;
    return node;
  }

  static TreeNode? BstDelete(TreeNode? root, int key) {
    if (root == null) return null;
    if (key < root.Val) root.Left = BstDelete(root.Left, key); // [帧:访问左子树]
    else if (key > root.Val) root.Right = BstDelete(root.Right, key); // [帧:访问右子树]
    else {
      if (root.Left == null) return root.Right; // [帧:删除]
      if (root.Right == null) return root.Left; // [帧:删除]
      var succ = MinNode(root.Right);
      root.Val = succ.Val; // [帧:替换]
      root.Right = BstDelete(root.Right, succ.Val);
    }
    return root;
  }

  static TreeNode Insert(TreeNode? root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.Val) root.Left = Insert(root.Left, value);
    else if (value > root.Val) root.Right = Insert(root.Right, value);
    return root;
  }

  static void Inorder(TreeNode? root) {
    if (root == null) return;
    Inorder(root.Left);
    Console.Write(root.Val + " ");
    Inorder(root.Right);
  }

  public static void Main(string[] args) {
    TreeNode? root = null;
    root = Insert(root, 5);
    root = Insert(root, 2);
    root = Insert(root, 8);
    root = BstDelete(root, 5);
    Inorder(root);
  }
}`
  },
  huffman: {
    cpp: `#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>
using namespace std;

struct Node {
  char ch;
  int freq;
  Node* left;
  Node* right;
  Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

Node* buildHuffman(const unordered_map<char, int>& freq) {
  auto cmp = [](Node* a, Node* b) { return a->freq > b->freq; };
  priority_queue<Node*, vector<Node*>, decltype(cmp)> pq(cmp);
  for (auto& [ch, f] : freq) pq.push(new Node(ch, f));
  while (pq.size() > 1) {
    Node* a = pq.top(); pq.pop();
    Node* b = pq.top(); pq.pop();
    Node* parent = new Node('\0', a->freq + b->freq);
    parent->left = a;
    parent->right = b;
    pq.push(parent); // [帧:合并]
  }
  return pq.top();
}

int main() {
  unordered_map<char, int> freq = {{'a', 5}, {'b', 9}, {'c', 12}, {'d', 13}};
  Node* root = buildHuffman(freq);
  cout << root->freq << endl;
  return 0;
}`,
    java: `import java.util.Map;
import java.util.HashMap;
import java.util.PriorityQueue;

public class HuffmanDemo {
  static class Node {
    char ch;
    int freq;
    Node left;
    Node right;
    Node(char ch, int freq) { this.ch = ch; this.freq = freq; }
  }

  static Node buildHuffman(Map<Character, Integer> freq) {
    PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.freq, b.freq));
    for (Map.Entry<Character, Integer> e : freq.entrySet()) {
      pq.offer(new Node(e.getKey(), e.getValue()));
    }
    while (pq.size() > 1) {
      Node a = pq.poll();
      Node b = pq.poll();
      Node parent = new Node('\0', a.freq + b.freq);
      parent.left = a;
      parent.right = b;
      pq.offer(parent); // [帧:合并]
    }
    return pq.peek();
  }

  public static void main(String[] args) {
    Map<Character, Integer> freq = new HashMap<>();
    freq.put('a', 5);
    freq.put('b', 9);
    freq.put('c', 12);
    freq.put('d', 13);
    Node root = buildHuffman(freq);
    System.out.println(root.freq);
  }
}`,
    python: `import heapq

class Node:
    def __init__(self, ch, freq):
        self.ch = ch
        self.freq = freq
        self.left = None
        self.right = None


def build_huffman(freq):
    heap = [[f, Node(ch, f)] for ch, f in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        fa, a = heapq.heappop(heap)
        fb, b = heapq.heappop(heap)
        parent = Node('\0', fa + fb)
        parent.left = a
        parent.right = b
        heapq.heappush(heap, [fa + fb, parent])  # [帧:合并]
    return heap[0][1]


if __name__ == "__main__":
    freq = {'a': 5, 'b': 9, 'c': 12, 'd': 13}
    root = build_huffman(freq)
    print(root.freq)`,
    csharp: `using System;
using System.Collections.Generic;

public class HuffmanDemo {
  public class Node {
    public char Ch;
    public int Freq;
    public Node? Left;
    public Node? Right;
    public Node(char ch, int freq) { Ch = ch; Freq = freq; }
  }

  static Node BuildHuffman(Dictionary<char, int> freq) {
    var pq = new PriorityQueue<Node, int>();
    foreach (var kv in freq) {
      pq.Enqueue(new Node(kv.Key, kv.Value), kv.Value);
    }
    while (pq.Count > 1) {
      var a = pq.Dequeue();
      var b = pq.Dequeue();
      var parent = new Node('\0', a.Freq + b.Freq) { Left = a, Right = b };
      pq.Enqueue(parent, parent.Freq); // [帧:合并]
    }
    return pq.Dequeue();
  }

  public static void Main(string[] args) {
    var freq = new Dictionary<char, int> { {'a', 5}, {'b', 9}, {'c', 12}, {'d', 13} };
    var root = BuildHuffman(freq);
    Console.WriteLine(root.Freq);
  }
}`
  },
  dijkstra: {
    cpp: `#include <climits>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct Graph {
  int n;
  vector<vector<pair<int, int>>> adj;
};

vector<int> dijkstra(const Graph& graph, int start) {
  vector<int> dist(graph.n, INT_MAX);
  vector<bool> used(graph.n, false);
  dist[start] = 0;
  for (int i = 0; i < graph.n; i++) {
    int v = -1;
    for (int j = 0; j < graph.n; j++) {
      if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
    }
    if (v == -1 || dist[v] == INT_MAX) break;
    used[v] = true; // [帧:访问节点]
    for (auto [to, w] : graph.adj[v]) {
      if (dist[v] + w < dist[to]) {
        dist[to] = dist[v] + w; // [帧:更新距离]
      }
    }
  }
  return dist;
}

int main() {
  Graph g{4, {{{1, 2}, {2, 5}}, {{2, 1}, {3, 4}}, {{3, 1}}, {}}};
  vector<int> dist = dijkstra(g, 0);
  for (int d : dist) cout << d << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DijkstraDemo {
  static class Edge {
    int to, w;
    Edge(int to, int w) { this.to = to; this.w = w; }
  }

  static class Graph {
    int n;
    List<Edge>[] adj;
    Graph(int n) {
      this.n = n;
      this.adj = new ArrayList[n];
      for (int i = 0; i < n; i++) this.adj[i] = new ArrayList<>();
    }
    void addEdge(int u, int v, int w) { this.adj[u].add(new Edge(v, w)); }
  }

  static int[] dijkstra(Graph graph, int start) {
    int[] dist = new int[graph.n];
    boolean[] used = new boolean[graph.n];
    java.util.Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    for (int i = 0; i < graph.n; i++) {
      int v = -1;
      for (int j = 0; j < graph.n; j++) {
        if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
      }
      if (v == -1 || dist[v] == Integer.MAX_VALUE) break;
      used[v] = true; // [帧:访问节点]
      for (Edge e : graph.adj[v]) {
        if (dist[v] + e.w < dist[e.to]) {
          dist[e.to] = dist[v] + e.w; // [帧:更新距离]
        }
      }
    }
    return dist;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 5);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 3, 4);
    g.addEdge(2, 3, 1);
    System.out.println(Arrays.toString(dijkstra(g, 0)));
  }
}`,
    python: `class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_edge(self, u, v, w):
        self.adj[u].append((v, w))


def dijkstra(graph, start):
    dist = [float('inf')] * graph.n
    used = [False] * graph.n
    dist[start] = 0
    for _ in range(graph.n):
        v = -1
        for j in range(graph.n):
            if not used[j] and (v == -1 or dist[j] < dist[v]):
                v = j
        if v == -1 or dist[v] == float('inf'):
            break
        used[v] = True  # [帧:访问节点]
        for to, w in graph.adj[v]:
            if dist[v] + w < dist[to]:
                dist[to] = dist[v] + w  # [帧:更新距离]
    return dist


if __name__ == "__main__":
    g = Graph(4)
    g.add_edge(0, 1, 2)
    g.add_edge(0, 2, 5)
    g.add_edge(1, 2, 1)
    g.add_edge(1, 3, 4)
    g.add_edge(2, 3, 1)
    print(dijkstra(g, 0))`,
    csharp: `using System;
using System.Collections.Generic;
using System.Linq;

public class DijkstraDemo {
  public class Edge {
    public int To;
    public int W;
    public Edge(int to, int w) { To = to; W = w; }
  }

  public class Graph {
    public int N;
    public List<Edge>[] Adj;
    public Graph(int n) {
      N = n;
      Adj = new List<Edge>[n];
      for (int i = 0; i < n; i++) Adj[i] = new List<Edge>();
    }
    public void AddEdge(int u, int v, int w) => Adj[u].Add(new Edge(v, w));
  }

  static int[] Dijkstra(Graph graph, int start) {
    int[] dist = Enumerable.Repeat(int.MaxValue, graph.N).ToArray();
    bool[] used = new bool[graph.N];
    dist[start] = 0;
    for (int i = 0; i < graph.N; i++) {
      int v = -1;
      for (int j = 0; j < graph.N; j++) {
        if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
      }
      if (v == -1 || dist[v] == int.MaxValue) break;
      used[v] = true; // [帧:访问节点]
      foreach (var edge in graph.Adj[v]) {
        if (dist[v] + edge.W < dist[edge.To]) {
          dist[edge.To] = dist[v] + edge.W; // [帧:更新距离]
        }
      }
    }
    return dist;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddEdge(0, 1, 2);
    g.AddEdge(0, 2, 5);
    g.AddEdge(1, 2, 1);
    g.AddEdge(1, 3, 4);
    g.AddEdge(2, 3, 1);
    Console.WriteLine("[" + string.Join(", ", Dijkstra(g, 0)) + "]");
  }
}`
  },
  prim: {
    cpp: `#include <climits>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct Edge {
  int from;
  int to;
  int w;
};

struct Graph {
  int n;
  vector<vector<pair<int, int>>> adj;
};

vector<Edge> prim(const Graph& graph, int start) {
  vector<bool> inMst(graph.n, false);
  vector<Edge> result;
  inMst[start] = true;
  while ((int)result.size() < graph.n - 1) {
    Edge best{-1, -1, INT_MAX};
    for (int v = 0; v < graph.n; v++) {
      if (!inMst[v]) continue;
      for (auto [to, w] : graph.adj[v]) {
        if (!inMst[to] && w < best.w) best = {v, to, w};
      }
    }
    if (best.from == -1) break;
    inMst[best.to] = true; // [帧:访问节点]
    result.push_back(best); // [帧:选边]
  }
  return result;
}

int main() {
  Graph g{4, {{{1, 2}, {2, 5}}, {{0, 2}, {2, 1}, {3, 4}}, {{0, 5}, {1, 1}, {3, 1}}, {{1, 4}, {2, 1}}}};
  auto mst = prim(g, 0);
  for (auto& e : mst) cout << "(" << e.from << "," << e.to << "," << e.w << ") ";
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class PrimDemo {
  static class Edge {
    int from, to, w;
    Edge(int from, int to, int w) { this.from = from; this.to = to; this.w = w; }
    public String toString() { return "(" + from + "," + to + "," + w + ")"; }
  }

  static class Graph {
    int n;
    List<Edge>[] adj;
    Graph(int n) {
      this.n = n;
      this.adj = new ArrayList[n];
      for (int i = 0; i < n; i++) this.adj[i] = new ArrayList<>();
    }
    void addUndirectedEdge(int u, int v, int w) {
      adj[u].add(new Edge(u, v, w));
      adj[v].add(new Edge(v, u, w));
    }
  }

  static List<Edge> prim(Graph graph, int start) {
    boolean[] inMst = new boolean[graph.n];
    List<Edge> result = new ArrayList<>();
    inMst[start] = true;
    while (result.size() < graph.n - 1) {
      Edge best = null;
      for (int v = 0; v < graph.n; v++) {
        if (!inMst[v]) continue;
        for (Edge e : graph.adj[v]) {
          if (!inMst[e.to] && (best == null || e.w < best.w)) best = new Edge(v, e.to, e.w);
        }
      }
      if (best == null) break;
      inMst[best.to] = true; // [帧:访问节点]
      result.add(best); // [帧:选边]
    }
    return result;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addUndirectedEdge(0, 1, 2);
    g.addUndirectedEdge(0, 2, 5);
    g.addUndirectedEdge(1, 2, 1);
    g.addUndirectedEdge(1, 3, 4);
    g.addUndirectedEdge(2, 3, 1);
    System.out.println(prim(g, 0));
  }
}`,
    python: `class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_undirected_edge(self, u, v, w):
        self.adj[u].append((v, w))
        self.adj[v].append((u, w))


def prim(graph, start):
    in_mst = [False] * graph.n
    result = []
    in_mst[start] = True
    while len(result) < graph.n - 1:
        best = None
        for v in range(graph.n):
            if not in_mst[v]:
                continue
            for to, w in graph.adj[v]:
                if not in_mst[to] and (best is None or w < best[2]):
                    best = (v, to, w)
        if best is None:
            break
        in_mst[best[1]] = True  # [帧:访问节点]
        result.append(best)  # [帧:选边]
    return result


if __name__ == "__main__":
    g = Graph(4)
    g.add_undirected_edge(0, 1, 2)
    g.add_undirected_edge(0, 2, 5)
    g.add_undirected_edge(1, 2, 1)
    g.add_undirected_edge(1, 3, 4)
    g.add_undirected_edge(2, 3, 1)
    print(prim(g, 0))`,
    csharp: `using System;
using System.Collections.Generic;

public class PrimDemo {
  public class Edge {
    public int From;
    public int To;
    public int W;
    public Edge(int from, int to, int w) { From = from; To = to; W = w; }
    public override string ToString() => $"({From},{To},{W})";
  }

  public class Graph {
    public int N;
    public List<Edge>[] Adj;
    public Graph(int n) {
      N = n;
      Adj = new List<Edge>[n];
      for (int i = 0; i < n; i++) Adj[i] = new List<Edge>();
    }
    public void AddUndirectedEdge(int u, int v, int w) {
      Adj[u].Add(new Edge(u, v, w));
      Adj[v].Add(new Edge(v, u, w));
    }
  }

  static List<Edge> Prim(Graph graph, int start) {
    bool[] inMst = new bool[graph.N];
    var result = new List<Edge>();
    inMst[start] = true;
    while (result.Count < graph.N - 1) {
      Edge? best = null;
      for (int v = 0; v < graph.N; v++) {
        if (!inMst[v]) continue;
        foreach (var e in graph.Adj[v]) {
          if (!inMst[e.To] && (best == null || e.W < best.W)) best = new Edge(v, e.To, e.W);
        }
      }
      if (best == null) break;
      inMst[best.To] = true; // [帧:访问节点]
      result.Add(best); // [帧:选边]
    }
    return result;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddUndirectedEdge(0, 1, 2);
    g.AddUndirectedEdge(0, 2, 5);
    g.AddUndirectedEdge(1, 2, 1);
    g.AddUndirectedEdge(1, 3, 4);
    g.AddUndirectedEdge(2, 3, 1);
    Console.WriteLine(string.Join(" ", Prim(g, 0)));
  }
}`
  },
  kruskal: {
    cpp: `#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Edge {
  int from;
  int to;
  int w;
};

struct Graph {
  int n;
  vector<Edge> edges;
};

struct DSU {
  vector<int> p, r;
  DSU(int n) : p(n), r(n, 0) { for (int i = 0; i < n; i++) p[i] = i; }
  int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
  bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (r[a] < r[b]) swap(a, b);
    p[b] = a;
    if (r[a] == r[b]) r[a]++;
    return true;
  }
};

vector<Edge> kruskal(Graph graph) {
  sort(graph.edges.begin(), graph.edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });
  DSU dsu(graph.n);
  vector<Edge> result;
  for (auto& e : graph.edges) {
    if (dsu.unite(e.from, e.to)) {
      result.push_back(e); // [帧:选边]
      if ((int)result.size() == graph.n - 1) break;
    }
  }
  return result;
}

int main() {
  Graph g{4, {{0,1,2}, {0,2,5}, {1,2,1}, {1,3,4}, {2,3,1}}};
  auto mst = kruskal(g);
  for (auto& e : mst) cout << "(" << e.from << "," << e.to << "," << e.w << ") ";
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class KruskalDemo {
  static class Edge {
    int from, to, w;
    Edge(int from, int to, int w) { this.from = from; this.to = to; this.w = w; }
    public String toString() { return "(" + from + "," + to + "," + w + ")"; }
  }

  static class Graph {
    int n;
    List<Edge> edges = new ArrayList<>();
    Graph(int n) { this.n = n; }
    void addEdge(int u, int v, int w) { edges.add(new Edge(u, v, w)); }
  }

  static class DSU {
    int[] p, r;
    DSU(int n) {
      p = new int[n];
      r = new int[n];
      for (int i = 0; i < n; i++) p[i] = i;
    }
    int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    boolean unite(int a, int b) {
      a = find(a); b = find(b);
      if (a == b) return false;
      if (r[a] < r[b]) { int t = a; a = b; b = t; }
      p[b] = a;
      if (r[a] == r[b]) r[a]++;
      return true;
    }
  }

  static List<Edge> kruskal(Graph graph) {
    graph.edges.sort((a, b) -> Integer.compare(a.w, b.w));
    DSU dsu = new DSU(graph.n);
    List<Edge> result = new ArrayList<>();
    for (Edge e : graph.edges) {
      if (dsu.unite(e.from, e.to)) {
        result.add(e); // [帧:选边]
        if (result.size() == graph.n - 1) break;
      }
    }
    return result;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 5);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 3, 4);
    g.addEdge(2, 3, 1);
    System.out.println(kruskal(g));
  }
}`,
    python: `class Edge:
    def __init__(self, from_, to, w):
        self.from_ = from_
        self.to = to
        self.w = w


class Graph:
    def __init__(self, n):
        self.n = n
        self.edges = []

    def add_edge(self, u, v, w):
        self.edges.append(Edge(u, v, w))


class DSU:
    def __init__(self, n):
        self.p = list(range(n))
        self.r = [0] * n

    def find(self, x):
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.r[a] < self.r[b]:
            a, b = b, a
        self.p[b] = a
        if self.r[a] == self.r[b]:
            self.r[a] += 1
        return True


def kruskal(graph):
    edges = sorted(graph.edges, key=lambda e: e.w)
    dsu = DSU(graph.n)
    result = []
    for e in edges:
        if dsu.unite(e.from_, e.to):
            result.append(e)  # [帧:选边]
            if len(result) == graph.n - 1:
                break
    return [(e.from_, e.to, e.w) for e in result]


if __name__ == "__main__":
    g = Graph(4)
    g.add_edge(0, 1, 2)
    g.add_edge(0, 2, 5)
    g.add_edge(1, 2, 1)
    g.add_edge(1, 3, 4)
    g.add_edge(2, 3, 1)
    print(kruskal(g))`,
    csharp: `using System;
using System.Collections.Generic;

public class KruskalDemo {
  public class Edge {
    public int From;
    public int To;
    public int W;
    public Edge(int from, int to, int w) { From = from; To = to; W = w; }
    public override string ToString() => $"({From},{To},{W})";
  }

  public class Graph {
    public int N;
    public List<Edge> Edges = new();
    public Graph(int n) { N = n; }
    public void AddEdge(int u, int v, int w) => Edges.Add(new Edge(u, v, w));
  }

  public class Dsu {
    private readonly int[] p;
    private readonly int[] r;
    public Dsu(int n) {
      p = new int[n];
      r = new int[n];
      for (int i = 0; i < n; i++) p[i] = i;
    }
    private int Find(int x) => p[x] == x ? x : p[x] = Find(p[x]);
    public bool Unite(int a, int b) {
      a = Find(a);
      b = Find(b);
      if (a == b) return false;
      if (r[a] < r[b]) (a, b) = (b, a);
      p[b] = a;
      if (r[a] == r[b]) r[a]++;
      return true;
    }
  }

  static List<Edge> Kruskal(Graph graph) {
    graph.Edges.Sort((a, b) => a.W.CompareTo(b.W));
    var dsu = new Dsu(graph.N);
    var result = new List<Edge>();
    foreach (var e in graph.Edges) {
      if (dsu.Unite(e.From, e.To)) {
        result.Add(e); // [帧:选边]
        if (result.Count == graph.N - 1) break;
      }
    }
    return result;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddEdge(0, 1, 2);
    g.AddEdge(0, 2, 5);
    g.AddEdge(1, 2, 1);
    g.AddEdge(1, 3, 4);
    g.AddEdge(2, 3, 1);
    Console.WriteLine(string.Join(" ", Kruskal(g)));
  }
}`
  },
  dfs: {
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int v, const vector<vector<int>>& g, vector<bool>& used, vector<int>& order) {
  used[v] = true; // [帧:访问节点]
  order.push_back(v); // [帧:访问节点]
  for (int to : g[v]) {
    if (!used[to]) dfs(to, g, used, order); // [帧:访问边]
  }
}

int main() {
  vector<vector<int>> g = {{1, 2}, {2, 3}, {3}, {}};
  vector<bool> used(g.size(), false);
  vector<int> order;
  dfs(0, g, used, order);
  for (int v : order) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DfsDemo {
  static void dfs(int v, List<List<Integer>> g, boolean[] used, List<Integer> order) {
    used[v] = true; // [帧:访问节点]
    order.add(v); // [帧:访问节点]
    for (int to : g.get(v)) {
      if (!used[to]) dfs(to, g, used, order); // [帧:访问边]
    }
  }

  public static void main(String[] args) {
    List<List<Integer>> g = new ArrayList<>();
    g.add(Arrays.asList(1, 2));
    g.add(Arrays.asList(2, 3));
    g.add(Arrays.asList(3));
    g.add(Arrays.asList());
    boolean[] used = new boolean[g.size()];
    List<Integer> order = new ArrayList<>();
    dfs(0, g, used, order);
    System.out.println(order);
  }
}`,
    python: `def dfs(v, g, used, order):
    used[v] = True  # [帧:访问节点]
    order.append(v)  # [帧:访问节点]
    for to in g[v]:
        if not used[to]:
            dfs(to, g, used, order)  # [帧:访问边]


if __name__ == "__main__":
    g = [[1, 2], [2, 3], [3], []]
    used = [False] * len(g)
    order = []
    dfs(0, g, used, order)
    print(order)`,
    csharp: `using System;
using System.Collections.Generic;

public class DfsDemo {
  static void Dfs(int v, List<int>[] g, bool[] used, List<int> order) {
    used[v] = true; // [帧:访问节点]
    order.Add(v); // [帧:访问节点]
    foreach (var to in g[v]) {
      if (!used[to]) Dfs(to, g, used, order); // [帧:访问边]
    }
  }

  public static void Main(string[] args) {
    var g = new[] {
      new List<int> {1, 2},
      new List<int> {2, 3},
      new List<int> {3},
      new List<int>()
    };
    var used = new bool[g.Length];
    var order = new List<int>();
    Dfs(0, g, used, order);
    Console.WriteLine("[" + string.Join(", ", order) + "]");
  }
}`
  },
  bfs: {
    cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> bfs(int start, const vector<vector<int>>& g) {
  vector<int> order;
  vector<bool> used(g.size(), false);
  queue<int> q;
  q.push(start);
  used[start] = true;
  while (!q.empty()) {
    int v = q.front();
    q.pop();
    order.push_back(v); // [帧:访问节点]
    for (int to : g[v]) {
      if (!used[to]) {
        used[to] = true;
        q.push(to); // [帧:访问边]
      }
    }
  }
  return order;
}

int main() {
  vector<vector<int>> g = {{1, 2}, {2, 3}, {3}, {}};
  auto order = bfs(0, g);
  for (int v : order) cout << v << ' ';
  return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BfsDemo {
  static List<Integer> bfs(int start, List<List<Integer>> g) {
    List<Integer> order = new ArrayList<>();
    boolean[] used = new boolean[g.size()];
    Queue<Integer> q = new LinkedList<>();
    q.offer(start);
    used[start] = true;
    while (!q.isEmpty()) {
      int v = q.poll();
      order.add(v); // [帧:访问节点]
      for (int to : g.get(v)) {
        if (!used[to]) {
          used[to] = true;
          q.offer(to); // [帧:访问边]
        }
      }
    }
    return order;
  }

  public static void main(String[] args) {
    List<List<Integer>> g = new ArrayList<>();
    g.add(Arrays.asList(1, 2));
    g.add(Arrays.asList(2, 3));
    g.add(Arrays.asList(3));
    g.add(Arrays.asList());
    System.out.println(bfs(0, g));
  }
}`,
    python: `from collections import deque

def bfs(start, g):
    order = []
    used = [False] * len(g)
    q = deque([start])
    used[start] = True
    while q:
        v = q.popleft()
        order.append(v)  # [帧:访问节点]
        for to in g[v]:
            if not used[to]:
                used[to] = True
                q.append(to)  # [帧:访问边]
    return order


if __name__ == "__main__":
    g = [[1, 2], [2, 3], [3], []]
    print(bfs(0, g))`,
    csharp: `using System;
using System.Collections.Generic;

public class BfsDemo {
  static List<int> Bfs(int start, List<int>[] g) {
    var order = new List<int>();
    var used = new bool[g.Length];
    var q = new Queue<int>();
    q.Enqueue(start);
    used[start] = true;
    while (q.Count > 0) {
      int v = q.Dequeue();
      order.Add(v); // [帧:访问节点]
      foreach (var to in g[v]) {
        if (!used[to]) {
          used[to] = true;
          q.Enqueue(to); // [帧:访问边]
        }
      }
    }
    return order;
  }

  public static void Main(string[] args) {
    var g = new[] {
      new List<int> {1, 2},
      new List<int> {2, 3},
      new List<int> {3},
      new List<int>()
    };
    Console.WriteLine("[" + string.Join(", ", Bfs(0, g)) + "]");
  }
}`
  }
}

export function getJsTemplate(algorithmName: string, fallbackJsSource: string): string {
  return jsTemplateMap[algorithmName] || fallbackJsSource
}

function toPascalCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function ensureCppCompleteTemplate(algorithmName: string, code: string): string {
  if (/\bmain\s*\(/.test(code)) return code

  return `#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
using namespace std;

${code}

int main() {
  cout << "${algorithmName} template loaded." << endl;
  return 0;
}`
}

function ensureJavaCompleteTemplate(algorithmName: string, code: string): string {
  if (/\bclass\s+\w+/.test(code) && /\bmain\s*\(/.test(code)) return code

  const className = `${toPascalCase(algorithmName) || 'Algorithm'}Demo`
  const methodized = code.replace(
    /^(\s*)(?!static\b)([A-Za-z_][\w<>,\[\]\s]*\s+[A-Za-z_]\w*\s*\()/gm,
    '$1static $2'
  )

  return `import java.util.*;

public class ${className} {
${methodized
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n')}

  public static void main(String[] args) {
    System.out.println("${algorithmName} template loaded.");
  }
}`
}

function ensurePythonCompleteTemplate(algorithmName: string, code: string): string {
  if (/if\s+__name__\s*==\s*['"]__main__['"]/.test(code)) return code

  return `${code}

if __name__ == "__main__":
    print("${algorithmName} template loaded.")`
}

function ensureCsharpCompleteTemplate(algorithmName: string, code: string): string {
  if (/\bstatic\s+void\s+Main\s*\(/.test(code)) return code

  const className = `${toPascalCase(algorithmName) || 'Algorithm'}Demo`
  const methodized = code.replace(
    /^(\s*)(?!static\b)([A-Za-z_][\w<>,\[\]\s]*\s+[A-Za-z_]\w*\s*\()/gm,
    '$1static $2'
  )

  return `using System;
using System.Collections.Generic;
using System.Linq;

public class ${className} {
${methodized
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n')}

  public static void Main(string[] args) {
    Console.WriteLine("${algorithmName} template loaded.");
  }
}`
}

function ensureCompleteTemplate(algorithmName: string, language: NonJsLanguage, code: string): string {
  switch (language) {
    case 'cpp':
      return ensureCppCompleteTemplate(algorithmName, code)
    case 'java':
      return ensureJavaCompleteTemplate(algorithmName, code)
    case 'python':
      return ensurePythonCompleteTemplate(algorithmName, code)
    case 'csharp':
      return ensureCsharpCompleteTemplate(algorithmName, code)
    default:
      return code
  }
}

export function getTemplate(algorithmName: string, language: string): string | null {
  const entry = explicitTemplateMap[algorithmName]
  const raw = entry?.[language as NonJsLanguage] || null
  const hit = raw ? ensureCompleteTemplate(algorithmName, language as NonJsLanguage, raw) : null
  if (typeof window !== 'undefined') {
    console.log(`getTemplate(${algorithmName}, ${language}) ->`, hit ? '命中' : '未命中')
  }
  return hit
}

export function getExplicitTemplate(algorithmName: string, language: NonJsLanguage): string | null {
  return getTemplate(algorithmName, language)
}
