"use client";

import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { Card, CardHeader } from "@components/ui/card";
import { FormControl } from "@components/ui/form-control";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { toast } from "@components/ui/toaster/use-toast";
import { useAsyncAction } from "@hooks/use-async-action";
import { useReactQueryInvalidateQueries } from "@hooks/use-invalidate-queries";
import { createOrUpdateOrganizationParameter } from "@services/organizationParameters/fetch";
import { useSuspenseGetReviewModeConfig } from "@services/organizationParameters/hooks";
import { PARAMETERS_PATHS } from "@services/parameters";
import {
    OrganizationParametersConfigKey,
    ReviewModeConfig,
} from "@services/parameters/types";
import { usePermission } from "@services/permissions/hooks";
import { Action, ResourceType } from "@services/permissions/types";
import { SaveIcon } from "lucide-react";

const REVIEW_MODE_OPTIONS = [
    {
        value: ReviewModeConfig.LIGHT_MODE_FULL,
        label: "Light (default)",
        description:
            "Uses the diff-only review flow for faster feedback and lower cost.",
    },
    {
        value: ReviewModeConfig.HEAVY_MODE,
        label: "Heavy (force full context)",
        description:
            "Always includes full file context for deeper analysis.",
    },
];

export const ReviewModeConfigCard = () => {
    const reviewModeConfig = useSuspenseGetReviewModeConfig();
    const { resetQueries, generateQueryKey } = useReactQueryInvalidateQueries();

    const canEdit = usePermission(
        Action.Update,
        ResourceType.OrganizationSettings,
    );

    const currentMode =
        reviewModeConfig?.configValue?.reviewMode ??
        ReviewModeConfig.LIGHT_MODE_FULL;

    const [selectedMode, setSelectedMode] =
        useState<ReviewModeConfig>(currentMode);

    useEffect(() => {
        setSelectedMode(currentMode);
    }, [currentMode]);

    const [saveSettings, { loading }] = useAsyncAction(async () => {
        try {
            await createOrUpdateOrganizationParameter(
                OrganizationParametersConfigKey.REVIEW_MODE_CONFIG,
                { reviewMode: selectedMode },
            );

            await resetQueries({
                queryKey: generateQueryKey(PARAMETERS_PATHS.GET_BY_KEY, {
                    params: {
                        key: OrganizationParametersConfigKey.REVIEW_MODE_CONFIG,
                    },
                }),
            });

            toast({ description: "Review mode updated", variant: "success" });
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to update review mode. Please try again.",
                variant: "danger",
            });
            console.error("Error updating review mode config:", error);
        }
    });

    const selectedOption = REVIEW_MODE_OPTIONS.find(
        (option) => option.value === selectedMode,
    );

    return (
        <Card color="lv1" className="w-full">
            <CardHeader className="flex flex-col gap-4">
                <FormControl.Root className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <FormControl.Label className="mb-0 text-base font-bold">
                            Review mode
                        </FormControl.Label>
                        <FormControl.Helper className="mt-0">
                            Choose how much context Kody should use during code
                            review.
                        </FormControl.Helper>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Select
                            value={selectedMode}
                            onValueChange={(value) =>
                                setSelectedMode(value as ReviewModeConfig)
                            }>
                            <SelectTrigger disabled={!canEdit} size="lg">
                                <SelectValue placeholder="Select a review mode" />
                            </SelectTrigger>
                            <SelectContent>
                                {REVIEW_MODE_OPTIONS.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedOption?.description && (
                            <p className="text-text-secondary text-sm">
                                {selectedOption.description}
                            </p>
                        )}
                    </div>
                </FormControl.Root>

                <div className="flex justify-end">
                    <Button
                        size="md"
                        variant="primary"
                        leftIcon={<SaveIcon />}
                        onClick={saveSettings}
                        disabled={
                            !canEdit ||
                            loading ||
                            selectedMode === currentMode
                        }
                        loading={loading}>
                        Save review mode
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
};
