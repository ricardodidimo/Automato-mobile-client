import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, Feather, Entypo } from "@expo/vector-icons";
import { Category } from "../../api/api.types";

interface CategoryCarouselProps {
  categorySelectCallback: Function;
  categories: Category[];
}

export default function CategoryCarouselWithInlineSearch(
  props: CategoryCarouselProps
) {
  const [selected, setSelected] = useState("0");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesView, setCategoryView] = useState<Category[]>(
    props.categories
  );

  useEffect(() => {
    setCategoryView(props.categories);
  }, [props.categories]);

  const onSearch = (search: string) => {
    setCategoryView(props.categories.filter((c) => c.name.includes(search)));
    setSearchQuery(search);
  };

  const handleCategorySelect = (category: Category) => {
    setSelected(category.id);
    setSearchMode(false);
    setSearchQuery("");
    props.categorySelectCallback(category.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {searchMode ? (
          <View style={[styles.searchChip, styles.chipActive]}>
            <Feather name="search" size={14} color="#000" />
            <TextInput
              autoFocus
              value={searchQuery}
              onChangeText={onSearch}
              placeholder="Search..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
            <Pressable
              onPress={() => {
                setCategoryView(props.categories);
                setSearchMode(false);
                setSearchQuery("");
              }}
            >
              <Entypo name="cross" size={14} color="#000" />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setSearchMode(true)} style={styles.chip}>
            <Feather name="search" size={14} color="#fff" />
          </Pressable>
        )}

        {categoriesView.map((category) => {
          const isActive = selected === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => handleCategorySelect(category)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <MaterialCommunityIcons
                name="sitemap-outline"
                size={14}
                color={isActive ? "#000" : "#fff"}
              />
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  scrollContent: {
    gap: 8,
    paddingHorizontal: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303535",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#d4d4d4",
  },
  chipText: {
    color: "#fff",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#000",
  },
  searchChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  searchInput: {
    minWidth: 80,
    padding: 0,
    margin: 0,
    color: "#000",
  },
});
